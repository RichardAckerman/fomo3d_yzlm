pragma solidity ^0.4.24;

contract Fofevents {
    event onWithdraw
    (
        address indexed _addr,
        string _msg
    );
    event onRegisterName
    (
        address indexed _addr,
        string _name,
        string _msg
    );
    event onBuyKey
    (
        address indexed _addr,
        string _msg,
        uint _num
    );
}

contract modularLong is Fofevents {}

contract Fofomo is modularLong {
    using SafeMath for *;
    string public name = "CapitalPlateGame";
    string public symbol = "FOFM"; // nickname
    uint public totalKey;  // Key总数
    uint [25] keyPositionSection = [36500, 73000, 109500, 146000, 182500, 219000, 255500, 292000, 328500, 365000, 401500, 438000, 474500, 511000, 547500, 584000, 620500, 657000, 693500, 730000, 766500, 803000, 839500, 876000, 912500];
    uint [25] totalKeySection = [80300, 160600, 240900, 321200, 401500, 481800, 562100, 642400, 722700, 803000, 883300, 963600, 1043900, 1124200, 1204500, 1284800, 1365100, 1445400, 1525700, 1606000, 1686300, 1766600, 1846900, 1927200, 2007500];
    uint public totalKeyBonus;  // Key分红总数
    uint public lastBonus; //上一轮奖池结余
    address public creator = msg.sender; // 创建者的地址

    address [5] emptyArr;
    uint keyDividend;//key的股息

    uint256 constant private rndInit_ = 5 minutes;              // 5分钟后开启游戏
    uint256 constant private rndInc_ = 30 seconds;              // 每次买key增加30s
    uint256 constant private rndMax_ = 6 hours;                 // 最长6h

    uint256 constant internal keyPriceInitial_ = 0.00001 ether;
    uint256 constant internal keyPriceIncremental_ = 0.00000001 ether;
    uint256 public registrationFee_ = 20 finney;            // price to register a name

    uint256 public keyPriceCurrent = keyPriceInitial_;
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻

    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [10] public Luckyer; // 保存最后10把钥匙的所属人

    address [4] bankerAddr;
    address public ourAddr;
    uint public ourAddrBonus;
    address public registerBonusTo;
    //////////////////////////////////////
    // 前面3个庄家固定收入10 8 5 共23点
    // 给ourAddrBonus 分3点 满 1070 ether 后 开始给第4个庄家分
    // 注册名字的0.02 ether 分给registerBonusTo
    // 无推荐人或队长队列不满时，分给registerBonusTo
    //////////////////////////////////////

    bool public isBegin = false;

    /**
     * 玩家购买key，传入地址addr，先判断pIDxAddr_[addr] 值是否为0，为0则是第一次购买，不为0为第二次
     * 第1次购买：获取playerArr的长度，+1为他的pid，存入pIDxAddr_，通过pid存入玩家信息到playerxID_
     *           当注册name的时候，先判断pIDxName_的值是否为0，为0则是该名字第一次注册，否则请更换名称
     * 第2+次购买：通过pid得到玩家信息，再更改玩家信息
     */
    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(bytes32 => uint256) public pIDxName_;      // (name => pID) returns player id by name
    mapping(uint256 => FofDataSets.PlayerInfo) public playerxID_; // (pId => data) returns player data by id
    mapping(address => FofDataSets.KeyMapping) public keyMapxAddr_;
    mapping(uint => uint) public roundDividend; // 每一轮游戏结束对应的最终股息
    address [] public playerArr; // 玩家地址数组，下标+1就是pid

    // 0 = 钢铁侠 Tony
    // 1 = 绿巨人 Hulk
    // 2 = 雷神 Thor
    // 3 = 灭霸 Thanos
    // 买入key时
    //7% to 奖金池, 10% to 推荐人, 5%队长基金 , 15% 11% to 创建者, 1% to 空投(玩家好礼), 51% to key池


    // 一轮游戏结束时
    //30% to 最后一把钥匙, 70% to 倒数第2把钥匙至倒数第10把钥匙

    mapping(uint256 => FofDataSets.TeamBalance) public teamPot; // 存储4个队的奖池余额

    function deposit() public payable {}

    //开局每个地址只有1ETH的最大购买额度，当智能合约内的ETH达到20个时，不再限制
    modifier isWithinLimits(uint256 _eth) {
        require(_eth <= 20 ether, "Single order capped 20 ether lane");
        require(getCurrentBalance() >= 100 ether || _eth <= 1 ether, "When the bonus pool balance is less than 100ETH, the purchase key amount shall not exceed 1ETH");
        _;
    }

    constructor()public{
        bankerAddr[0] = 0xB4D62E93C1DB8146698481a6948Fb1fbB4c4d009;
        bankerAddr[1] = 0x9bEc04db355b7655c9e580fdf2A9fbf4Ab4D3F64;
        bankerAddr[2] = 0x31754Fb3e218605168cfF05db4F5B32be1124976;
        bankerAddr[3] = 0x6Ec2FB9B5506EaB0C4598db234d08E1F188b899B;

        ourAddr = 0xa1CbA1d38080D575eEB14BFceAF240104ea6A5ac;

        registerBonusTo = 0x1FeA5C6449C8917fE3fDd7dDE6CD70D579225a13;
    }

    /**
    * 买入key
    * 买入者地址 _addr
    * 加入队伍 _team
    * 推荐人地址 _referrer(没有推荐人传入0x0)
    * 每次买之前 需到合约中查出他的推荐人
    */

    function keyRollIn(address _addr, uint _team, address _referrer) isWithinLimits(msg.value) public payable {
        require(_addr != 0x0);
        deposit();
        uint allCoin = msg.value;
        uint keyNum = 0;

        uint numerator = keyPriceIncremental_ + ((2 * keyPriceCurrent - keyPriceIncremental_).sq().add(8 * keyPriceIncremental_ * allCoin)).sqrt() - 2 * keyPriceCurrent;
        uint denominator = 2 * keyPriceIncremental_;

        keyNum = numerator / denominator;
        keyPriceCurrent = keyPriceCurrent + keyPriceIncremental_.mul(keyNum);

        if (keyNum <= 0) {
            emit onBuyKey(_addr, "price is less ！", 0);
            return;
        }

        bool flag = false;

        totalKey += keyNum;
        // 保存最后50个买key人的地址
        saveTen(keyNum, _addr);

        chargeMyRound(_addr);
        // 判断我自身的状态是属于第几轮，如果跟当前轮不一样，则先提现

        // 第一次买
        if (pIDxAddr_[_addr] == 0) {
            pIDxAddr_[_addr] = playerArr.length + 1;
            playerArr.push(_addr);
            playerxID_[pIDxAddr_[_addr]] = FofDataSets.PlayerInfo(_addr, "", keyNum, 0, 0, 0, _team, allCoin, emptyAddr, emptyArr, 0);
            playerxID_[pIDxAddr_[_addr]].referees = pIDxAddr_[_referrer] == 0 ? emptyAddr : _referrer;
            flag = true;
        } else {// 第二次买
            playerxID_[pIDxAddr_[_addr]].keyNum += keyNum;
            playerxID_[pIDxAddr_[_addr]].team = _team;
            playerxID_[pIDxAddr_[_addr]].allBuy += allCoin;
        }

        if (playerxID_[pIDxAddr_[_addr]].referees == emptyAddr) {
            if (pIDxAddr_[_referrer] == 0) {
                playerxID_[pIDxAddr_[_addr]].referees = emptyAddr;
            } else {
                playerxID_[pIDxAddr_[_addr]].referees = _referrer;
                flag = true;
            }
        }
        //没有挂直推 代理才会赋值 5层
        if (flag) {
            playerxID_[pIDxAddr_[_addr]].agents = playerxID_[pIDxAddr_[_referrer]].agents;

            for (uint i = 0; i < 4; i++) {
                playerxID_[pIDxAddr_[_addr]].agents[i] = playerxID_[pIDxAddr_[_addr]].agents[i + 1];
            }

            playerxID_[pIDxAddr_[_addr]].agents[4] = _referrer;
        }
        setKeyPosition(_addr, keyNum);
        //三倍收益无效化计算
        // 0 = 钢铁侠 Tony
        // 1 = 绿巨人 Hulk
        // 2 = 雷神 Thor
        // 3 = 灭霸 Thanos
        // 4 = 空投奖池
        if (_team == 0) {
            teamPot[0].total += allCoin;
            teamPot[0].potCoin += allCoin.mul(7) / 100;
            // 给key池51%   奖金池7%
            bonusToKeyPot(allCoin.mul(51) / 100, keyNum, _addr);
        } else if (_team == 1) {
            teamPot[1].total += allCoin;
            teamPot[1].potCoin += allCoin.mul(7) / 100;
            // 给key池51%
            bonusToKeyPot(allCoin.mul(51) / 100, keyNum, _addr);
        } else if (_team == 2) {
            teamPot[2].total += allCoin;
            teamPot[2].potCoin += allCoin.mul(7) / 100;
            // 给key池51%
            bonusToKeyPot(allCoin.mul(51) / 100, keyNum, _addr);
        } else if (_team == 3) {
            teamPot[3].total += allCoin;
            teamPot[3].potCoin += allCoin.mul(7) / 100;
            // 给key池51%
            bonusToKeyPot(allCoin.mul(51) / 100, keyNum, _addr);
        }
        // 给推荐人10%  队长基金5%
        bonusToReferees(_addr, allCoin);

        // 给创建者26%
        bonusToBanker(allCoin.mul(26) / 100);
        // 给空投1%
        teamPot[4].total += allCoin;
        teamPot[4].potCoin += allCoin.mul(1) / 100;
        // 根据allCoin判断 5% 几率中，返还空投奖励的奖池占比
        if (airdropSign(100) < 5) {
            if (allCoin >= 0.1 ether && allCoin < 1 ether) {
                transferCoin(_addr, teamPot[4].potCoin.mul(25) / 100);
            } else if (allCoin >= 1 ether && allCoin < 10 ether) {
                transferCoin(_addr, teamPot[4].potCoin.mul(50) / 100);
            } else if (allCoin >= 10 ether) {
                transferCoin(_addr, teamPot[4].potCoin.mul(75) / 100);
            }
        }
        // 剩余时间加30s
        if (isBegin) {
            overMoment += rndInc_ * keyNum;
            uint timeInterval = overMoment - now;
            overMoment = timeInterval > rndMax_ ? (now + rndMax_) : overMoment;
        } else {
            isBegin = true;
            // 第一人买后 此值改为true
            overMoment = now + rndMax_;
        }
        emit onBuyKey(_addr, "Buy successfully！", keyNum);
    }

    function chargeMyRound(address _addr) private {
        uint myRound = keyMapxAddr_[_addr].currentRound;
        if (myRound == 0) {
            keyMapxAddr_[_addr].currentRound == round;
        } else if (myRound != round) {
            withdrawKey(_addr);
        }
    }

    function bonusToReferees(address _addr, uint allCoin) private {
        address referees = playerxID_[pIDxAddr_[_addr]].referees;
        if (referees != emptyAddr) {
            // 先给推荐人分10%
            uint num = allCoin.mul(10) / 100;
            playerxID_[pIDxAddr_[referees]].refereesBonus += num;
            playerxID_[pIDxAddr_[referees]].performance += allCoin;
            // 给队长基金5%
            uint refereesLevel = playerxID_[pIDxAddr_[referees]].level;
            if (playerxID_[pIDxAddr_[_addr]].allBuy >= 1 ether && refereesLevel < 5) {
                refereesLevel++;
                playerxID_[pIDxAddr_[referees]].level = refereesLevel;
            }
            uint toCreatorPer = 50;
            for (uint j = 0; j < 4; j++) {
                address agentAddr = playerxID_[pIDxAddr_[_addr]].agents[j];
                uint money = 0;
                if (agentAddr != emptyAddr) {
                    uint level = playerxID_[pIDxAddr_[agentAddr]].level;
                    if (j == 0 && level >= 5) {
                        money = allCoin.mul(5) / 1000;
                        toCreatorPer -= 5;
                    }
                    if (j == 1 && level >= 4) {
                        money = allCoin.mul(1) / 100;
                        toCreatorPer -= 10;
                    }
                    if (j == 2 && level >= 3) {
                        money = allCoin.mul(15) / 1000;
                        toCreatorPer -= 15;
                    }
                    if (j == 3 && level >= 2) {
                        money = allCoin.mul(2) / 100;
                        toCreatorPer -= 20;
                    }
                    playerxID_[pIDxAddr_[agentAddr]].refereesBonus += money;
                }

            }
            if (toCreatorPer > 0) {
                bonusToOne(allCoin.mul(toCreatorPer) / 1000);
            }
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin.mul(15) / 100);
        }
    }

    //庄家分红
    function bonusToBanker(uint coin) private {
        transferCoin(bankerAddr[0], coin.mul(5) / 13);
        transferCoin(bankerAddr[1], coin.mul(4) / 13);
        transferCoin(bankerAddr[2], coin.mul(5) / 26);
        if (ourAddrBonus < 1070 ether) {
            transferCoin(ourAddr, coin.mul(3) / 26);
            ourAddrBonus += coin.mul(3) / 26;
        } else {
            transferCoin(bankerAddr[3], coin.mul(3) / 26);
        }
    }

    function bonusToOne(uint coin) private {
        transferCoin(registerBonusTo, coin);
    }

    //保存最后10把钥匙的归属
    function saveTen(uint keyNum, address _addr) private {
        keyNum = keyNum < 10 ? keyNum : 10;
        for (uint k = 0; k < 10; k++) {
            if (k < (10 - keyNum)) {
                Luckyer[k] = Luckyer[keyNum + k];
            } else {
                Luckyer[k] = _addr;
            }
        }
    }

    // 设置钥匙区间
    function setKeyPosition(address _addr, uint keyNum) private {
        if (totalKey < keyPositionSection[0]) {
            keyMapxAddr_[_addr].keySection[0] += keyNum;
        } else {
            for (uint i = 0; i < keyPositionSection.length - 1; i++) {
                if (totalKey >= keyPositionSection[i] && totalKey < keyPositionSection[i + 1]) {
                    keyMapxAddr_[_addr].keySection[i + 1] += keyNum;
                }
            }
        }
    }

    function invalidPerson(address _addr) private {
        for (uint i = 0; i < 24; i++) {
            if (totalKey >= totalKeySection[i] && totalKey < totalKeySection[i + 1]) {
                uint keyNum = keyMapxAddr_[_addr].keySection[i];
                keyMapxAddr_[_addr].keySection[i] = 0;
                keyMapxAddr_[_addr].invalidKeyNum += keyNum;
            }
        }
        if (totalKey >= totalKeySection[24]) {
            uint lastKeyNum = keyMapxAddr_[_addr].keySection[24];
            keyMapxAddr_[_addr].keySection[24] = 0;
            keyMapxAddr_[_addr].invalidKeyNum += lastKeyNum;
        }
    }

    /**
    * 一轮游戏结束了，开始分钱
    * ①总奖池30%分给买最后一个key的人,总奖池70%分给倒数2-10个令牌
    */
    function gameOver() public {
        uint _now = now;
        require(_now >= overMoment);
        uint totalPot = getTotalPot();
        if (totalPot > 0) {
            uint count = 0;
            if (Luckyer[9] != emptyAddr) {
                transferCoin(Luckyer[9], totalPot.mul(3) / 10);
            }
            for (uint i = 0; i < 9; i++) {
                if (Luckyer[i] != emptyAddr) {
                    count++;
                }
            }
            if (count > 0) {
                for (uint j = 0; j < 9; j++) {
                    if (Luckyer[j] != emptyAddr) {
                        transferCoin(Luckyer[j], totalPot.mul(7) / 10 / count);
                    }
                }
            }
        }
        reset();
    }

    // 注册nickname
    function registerName(string _nameString) public payable {
        bytes memory _name = bytes(_nameString);
        bytes32 _ret;
        assembly {
            _ret := mload(add(_name, 32))
        }

        address _addr = msg.sender;
        uint256 _paid = msg.value;
        require(_paid >= registrationFee_, "umm.....  you have to pay the name fee");
        require(pIDxName_[_ret] == 0, "sorry that names already taken");

        if (pIDxAddr_[_addr] == 0) {
            pIDxAddr_[_addr] = playerArr.length + 1;
            playerArr.push(_addr);
            playerxID_[pIDxAddr_[_addr]] = FofDataSets.PlayerInfo(_addr, _ret, 0, 0, 0, 0, 5, 0, emptyAddr, emptyArr, 0);
            pIDxName_[_ret] = pIDxAddr_[_addr];
        } else {// 第二次买
            playerxID_[pIDxAddr_[_addr]].name = _ret;
        }
        transferCoin(registerBonusTo, _paid);
        emit onRegisterName(_addr, _nameString, "Registered successfully");
    }

    // 获取总的奖池余额
    function getTotalPot() constant public returns (uint){
        uint totalPot = 0;
        for (uint i = 0; i < 4; i++) {
            totalPot += teamPot[i].potCoin;
        }
        return totalPot + lastBonus;
    }

    // key池分红
    function bonusToKeyPot(uint coin, uint num, address _addr) private {
        if (totalKey <= 0) return;

        //当前购买的钥匙，之前的股息应该被扣掉
        playerxID_[pIDxAddr_[_addr]].withDrawNum += keyDividend * num;

        uint TotalNum = totalKey;
        for (uint i = 0; i < 24; i++) {
            if (totalKey >= totalKeySection[i] && totalKey < totalKeySection[i + 1]) {
                TotalNum = totalKey - totalKeySection[i] * 5 / 11;
            }
        }

        keyDividend += coin / TotalNum;

        totalKeyBonus += coin;
    }

    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }

    // 返回奖池余额
    function getCurrentBalance() public constant returns (uint256) {
        return address(this).balance;
    }

    // 提现key分红提现
    function withdrawKey(address _addr) public {
        address myAddr = msg.sender;
        if (_addr == myAddr) {
            invalidPerson(_addr);

            uint keyBonus = (playerxID_[pIDxAddr_[_addr]].keyNum - keyMapxAddr_[_addr].invalidKeyNum) * keyDividend - playerxID_[pIDxAddr_[_addr]].withDrawNum;

            transferCoin(_addr, keyBonus + playerxID_[pIDxAddr_[_addr]].refereesBonus);
            playerxID_[pIDxAddr_[_addr]].withDrawNum += keyBonus;
            playerxID_[pIDxAddr_[_addr]].refereesBonus = 0;

            emit onWithdraw(_addr, "key bonus withdrawal successful！");
        }
    }

    // 每一轮结束了重置函数
    function reset() private {
        // todo
        // 清空幸运儿的地址Luckyer[]
        for (uint k = 0; k < 10; k++) {
            Luckyer[k] = emptyAddr;
        }
        roundDividend[round] = keyDividend;
        keyDividend = 0;
        // 时间重置，且5分钟内不能买
        uint endTime = now;
        overMoment = endTime + rndMax_ + rndInit_;
        // 保存当前是第几轮
        round++;
        // 钥匙价格恢复初始价格
        keyPriceCurrent = keyPriceInitial_;
        // 清空4个队伍的奖池
        for (uint j = 0; j < 4; j++) {
            teamPot[j].total = 0;
            teamPot[j].potCoin = 0;
        }
        totalKey = 0;
        totalKeyBonus = 0;
    }

    // 返回空投sign值
    // 该值小于5的概率为5%
    function airdropSign(uint _per)
    private
    view
    returns (uint256){
        uint256 seed = uint256(keccak256(abi.encodePacked(
                (block.timestamp).add
                (block.difficulty).add
                ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (now)).add
                (block.gaslimit).add
                ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (now)).add
                (block.number)
            )));
        return ((seed - ((seed / _per) * _per)));
    }
}

/**
 * @title SafeMath v0.1.9
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    *  todo 乘法
    */
    function mul(uint256 a, uint256 b)
    internal
    pure
    returns (uint256 c){
        if (a == 0) {
            return 0;
        }
        c = a * b;
        require(c / a == b, "SafeMath mul failed");
        return c;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    *  todo 加法
    */
    function add(uint256 a, uint256 b)
    internal
    pure
    returns (uint256 c){
        c = a + b;
        require(c >= a, "SafeMath add failed");
        return c;
    }

    /**
   *  todo 平方根
   */
    function sqrt(uint256 x)
    internal
    pure
    returns (uint256 y)
    {
        uint256 z = ((add(x, 1)) / 2);
        y = x;
        while (z < y)
        {
            y = z;
            z = ((add((x / z), z)) / 2);
        }
    }
    /**
      *  todo 平方
      */
    function sq(uint256 x)
    internal
    pure
    returns (uint256)
    {
        return (mul(x, x));
    }
    /**
    *  todo 次方
    */
    function pwr(uint256 x, uint256 y)
    internal
    pure
    returns (uint256)
    {
        if (x == 0)
            return (0);
        else if (y == 0)
            return (1);
        else
        {
            uint256 z = x;
            for (uint256 i = 1; i < y; i++)
                z = mul(z, x);
            return (z);
        }
    }
}

library FofDataSets {
    // team
    // 0 = 钢铁侠 Tony
    // 1 = 绿巨人 Hulk
    // 2 = 雷神 Thor
    // 3 = 灭霸 Thanos
    struct PlayerInfo {
        address addr;   // player address
        bytes32 name;   // player name
        uint keyNum;    // 拥有key的数量
        uint withDrawNum;     // 取现+不能分红的
        uint refereesBonus;  // 我推荐别人时我得到的分红
        uint performance; // 我推荐别人 我的业绩
        uint team;       // 所属队伍
        uint allBuy;     // 我买钥匙总共花了多少钱  累加
        address referees; // 推荐人地址
        address [5] agents;
        uint level; // 当前玩家的等级(第几代奖励)
        //////////////////////////
        // 0级：最常见，购买或注册就为0级
        // 1级：有1人累计购买超过1ETH
        // 2级：有2人累计购买超过1ETH，可获得2代奖励（2%）
        // 3级：有3人累计购买超过1ETH，可获得3代奖励（1.5%）
        // 4级：有4人累计购买超过1ETH，可获得4代奖励（1%）
        // 5级：有5人累计购买超过1ETH，可获得5代奖励（0.5%）
        //////////////////////////
    }

    struct KeyMapping {
        uint [25] keySection; // 钥匙区间
        uint invalidKeyNum; // 无效钥匙数
        uint currentRound;
    }

    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
    }
}