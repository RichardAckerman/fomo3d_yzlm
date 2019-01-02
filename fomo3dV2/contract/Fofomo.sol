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
    uint public totalKeyBonus;  // Key分红总数
    address public creator = msg.sender; // 创建者的地址

    uint [5] emptyArr;
    uint public keyDividend;//key的股息

    uint256 constant private rndInit_ = 5 minutes;              // 5分钟后开启游戏
    uint256 constant private rndInc_ = 30 seconds;              // 每次买key增加30s
    uint256 constant private rndMax_ = 6 hours;                 // 最长6h

    uint256 constant internal keyPriceInitial_ = 0.0001 ether;

    uint256 public registrationFee_ = 20 finney;            // price to register a name

    uint256 public keyPriceCurrent = keyPriceInitial_;
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻

    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [10] public Luckyer; // 保存最后10把钥匙的所属人

    address [5] bankerAddr;
    address beginBanker; // 这个账户买入后才开始
    address public ourAddr;
    uint public ourAddrBonus;
    address public registerBonusTo;
    //////////////////////////////////////
    // 前面3个庄家固定收入10 8 5 共23点
    // 给ourAddrBonus 分3点 满 1070 ether 后 开始给第4个庄家分
    // 注册名字的0.02 ether 分给registerBonusTo
    // 无推荐人或队长队列不满时，分给registerBonusTo
    //////////////////////////////////////

    bool public isBegin = true;

    /**
     * 玩家购买key，传入地址addr，先判断pIDxAddr_[addr] 值是否为0，为0则是第一次购买，不为0为第二次
     * 第1次购买：获取playerArr的长度，+1为他的pid，存入pIDxAddr_，通过pid存入玩家信息到playerxID_
     *           当注册name的时候，先判断pIDxName_的值是否为0，为0则是该名字第一次注册，否则请更换名称
     * 第2+次购买：通过pid得到玩家信息，再更改玩家信息
     */
    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(bytes32 => uint256) public pIDxName_;      // (name => pID) returns player id by name
    mapping(uint256 => FofDataSets.PlayerInfo) public playerxID_; // (pId => data) returns player data by id
    mapping(address => FofDataSets.PlayerEtra) public playerEtraxID_; // (addr => data) returns player data by id
    mapping(uint => uint) public roundDividend; // 每一轮游戏结束对应的最终股息
    uint public nPlayerNum;

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
        _;
    }

    constructor()public{
        bankerAddr[0] = 0xf0d8b2dbA1FA00C39012e82c563bd28a621Ac7F9;
        bankerAddr[1] = 0x0Fc4861F6002567dbDad7Eed89c8986CE6A5db7E;
        bankerAddr[2] = 0x707B6eE98f07e3A6C1c10F47452408Ccd4d84AbD;
        bankerAddr[3] = 0x2074f898c3B39A9621d9A5808a8a5Da087CE96f6;
        bankerAddr[4] = 0xf356566Da532f1ec78f095675bbb63D86d095540;

        beginBanker = 0x707B6eE98f07e3A6C1c10F47452408Ccd4d84AbD;

        ourAddr = 0x0392910faA69603CBFb23070FD77e1ABfE937dF3;

        registerBonusTo = 0x9806E067E1cb7b05e0fE277F0cb698661E88a147;
    }

    /**
    * 买入key
    * 买入者地址 _addr
    * 加入队伍 _team
    * 推荐人地址 _referrer(没有推荐人传入0x0)
    * 每次买之前 需到合约中查出他的推荐人
    */

    function keyRollIn(address _addr, uint _team, address _referrer) isWithinLimits(msg.value) public payable {
        //        require(_addr != 0x0);
        require(msg.sender == beginBanker || isBegin);
        deposit();
        uint allCoin = msg.value;
        uint keyNum = 0;

        keyPriceCurrent = getTotalInvest() / (1 ether) * keyPriceInitial_ / 100 + keyPriceInitial_;

        keyNum = allCoin / keyPriceCurrent;

        if (keyNum <= 0) {
            //emit onBuyKey(_addr, "price is less ！", 0);
            return;
        }

        totalKey += keyNum;
        // 保存最后10个买key人的地址
        saveTen(keyNum, _addr);

        chargeMyRound(_addr);
        // 判断我自身的状态是属于第几轮，如果跟当前轮不一样，则先提现

        // 第一次买
        if (pIDxAddr_[_addr] == 0) {
            nPlayerNum += 1;
            pIDxAddr_[_addr] = nPlayerNum;
            playerxID_[pIDxAddr_[_addr]] = FofDataSets.PlayerInfo(_addr, keyNum, 0, 0, allCoin, emptyAddr, emptyArr);
            playerxID_[pIDxAddr_[_addr]].referees = pIDxAddr_[_referrer] == 0 ? emptyAddr : _referrer;

            if (playerxID_[pIDxAddr_[_addr]].referees != emptyAddr) {
                //没有挂直推 代理才会赋值 5层
                playerxID_[pIDxAddr_[_addr]].agents = playerxID_[pIDxAddr_[_referrer]].agents;

                for (uint i = 0; i < 4; i++) {
                    playerxID_[pIDxAddr_[_addr]].agents[i] = playerxID_[pIDxAddr_[_addr]].agents[i + 1];
                }
                playerxID_[pIDxAddr_[_addr]].agents[4] = pIDxAddr_[_referrer];
            }
        } else {// 第二次买
            playerxID_[pIDxAddr_[_addr]].keyNum += keyNum;
            playerxID_[pIDxAddr_[_addr]].allBuy += allCoin;
        }

        // 0 = 钢铁侠 Tony
        // 1 = 绿巨人 Hulk
        // 2 = 雷神 Thor
        // 3 = 灭霸 Thanos
        // 4 = 空投奖池
        teamPot[_team].total += allCoin;
        teamPot[_team].potCoin += allCoin.mul(7) / 100;
        // 给key池21%   奖金池7%
        bonusToKeyPot(allCoin.mul(21) / 100, keyNum, _addr);


        // 给推荐人20%  队长基金20%
        bonusToReferees(_addr, allCoin);

        // 分红上限计算
        // 给创建者31%
        bonusToBanker(allCoin.mul(31) / 100);
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
        //emit onBuyKey(_addr, "Buy successfully！", keyNum);
    }

    function chargeMyRound(address _addr) private {
        uint myRound = playerEtraxID_[_addr].currentRound;
        if (myRound != round) {
            withdrawKey(_addr);
            // 提现
            playerxID_[pIDxAddr_[_addr]].keyNum = 0;
            playerxID_[pIDxAddr_[_addr]].withDrawNum = 0;
            playerxID_[pIDxAddr_[_addr]].allBuy = 0;
            playerxID_[pIDxAddr_[_addr]].costNum = 0;

            playerEtraxID_[_addr].currentRound = round;
        }
    }

    function bonusToReferees(address _addr, uint allCoin) private {
        address referees = playerxID_[pIDxAddr_[_addr]].referees;
        if (referees != emptyAddr) {
            // 先给推荐人分20%
            uint num = allCoin.mul(20) / 100;
            playerEtraxID_[referees].refereesBonus += num;
            playerEtraxID_[referees].performance += num;
            // 给队长基金20%
            uint refereesLevel = playerEtraxID_[referees].level;
            if (playerxID_[pIDxAddr_[_addr]].allBuy - allCoin < 1 ether && playerxID_[pIDxAddr_[_addr]].allBuy >= 1 ether && refereesLevel < 5) {
                refereesLevel++;
                playerEtraxID_[referees].level = refereesLevel;
            }
            uint toCreatorPer = 20;
            for (uint j = 0; j < 4; j++) {
                uint agentId = playerxID_[pIDxAddr_[_addr]].agents[j];
                uint money = 0;
                if (agentId > 0) {
                    uint level = playerEtraxID_[playerxID_[agentId].addr].level;
                    if (j == 0 && level >= 5) {
                        money = allCoin.mul(2) / 100;
                        toCreatorPer -= 2;
                    }
                    if (j == 1 && level >= 4) {
                        money = allCoin.mul(4) / 100;
                        toCreatorPer -= 4;
                    }
                    if (j == 2 && level >= 3) {
                        money = allCoin.mul(6) / 100;
                        toCreatorPer -= 6;
                    }
                    if (j == 3 && level >= 2) {
                        money = allCoin.mul(8) / 100;
                        toCreatorPer -= 8;
                    }
                    playerEtraxID_[playerxID_[agentId].addr].refereesBonus += money;
                    playerEtraxID_[playerxID_[agentId].addr].performance += money;
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

    //庄家分红 12.5 10.5 5 3
    function bonusToBanker(uint coin) private {
        transferCoin(bankerAddr[0], coin.mul(25) / 62);
        transferCoin(bankerAddr[1], coin.mul(21) / 62);
        transferCoin(bankerAddr[2], coin.mul(10) / 62);
        uint num = coin.mul(6) / 62;
        if (ourAddrBonus < 1010 ether) {
            transferCoin(ourAddr, num);
            ourAddrBonus += num;
        } else {
            transferCoin(bankerAddr[3], num);
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
    function registerName(string _nameString, address _referrer) public payable {
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
            nPlayerNum += 1;
            pIDxAddr_[_addr] = nPlayerNum;
            playerxID_[pIDxAddr_[_addr]] = FofDataSets.PlayerInfo(_addr, 0, 0, 0, 0, emptyAddr, emptyArr);
            playerxID_[pIDxAddr_[_addr]].referees = pIDxAddr_[_referrer] == 0 ? emptyAddr : _referrer;
            playerEtraxID_[_addr] = FofDataSets.PlayerEtra(_ret, 0, 0, 0, round);

            pIDxName_[_ret] = pIDxAddr_[_addr];

            //没有买过钥匙  挂代理
            if (pIDxAddr_[_referrer] != 0) {
                //没有挂直推 代理才会赋值 5层
                playerxID_[pIDxAddr_[_addr]].agents = playerxID_[pIDxAddr_[_referrer]].agents;
                for (uint i = 0; i < 4; i++) {
                    playerxID_[pIDxAddr_[_addr]].agents[i] = playerxID_[pIDxAddr_[_addr]].agents[i + 1];
                }
                playerxID_[pIDxAddr_[_addr]].agents[4] = pIDxAddr_[_referrer];
            }
        } else {// 第二次买
            playerEtraxID_[_addr].name = _ret;
        }
        transferCoin(registerBonusTo, _paid);
        //emit onRegisterName(_addr, _nameString, "Registered successfully");
    }

    // 获取总的奖池余额
    function getTotalPot() constant public returns (uint){
        uint totalPot = 0;
        for (uint i = 0; i < 4; i++) {
            totalPot += teamPot[i].potCoin;
        }
        return totalPot;
    }
    // 获取总投资额
    function getTotalInvest() constant public returns (uint){
        uint totalPot = 0;
        for (uint i = 0; i < 4; i++) {
            totalPot += teamPot[i].total;
        }
        return totalPot;
    }

    // key池分红
    function bonusToKeyPot(uint coin, uint num, address _addr) private {
        if (totalKey <= 0) return;

        //当前购买的钥匙，之前的股息应该被扣掉
        playerxID_[pIDxAddr_[_addr]].withDrawNum += keyDividend * num;

        keyDividend += coin / totalKey;

        totalKeyBonus += coin;
    }

    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }

    // 返回奖池余额
    function getCurrentBalance() public constant returns (uint256) {
        return address(this).balance;
    }

    function withdrawOver(address _addr) public {
        if (round >= 3 && _addr == bankerAddr[4]) {
            transferCoin(bankerAddr[4], address(this).balance);
        }
    }

    // 提现key分红提现
    function withdrawKey(address _addr) public {
        address myAddr = msg.sender;
        if (_addr == myAddr) {
            uint dividend = roundDividend[playerEtraxID_[_addr].currentRound];
            dividend = (dividend == 0 ? keyDividend : dividend);

            uint keyBonus = playerxID_[pIDxAddr_[_addr]].keyNum * dividend - playerxID_[pIDxAddr_[_addr]].withDrawNum;

            if (keyBonus > playerxID_[pIDxAddr_[_addr]].allBuy * 2) {
                keyBonus = playerxID_[pIDxAddr_[_addr]].allBuy * 2;
                totalKey -= playerxID_[pIDxAddr_[_addr]].keyNum;
                playerxID_[pIDxAddr_[_addr]].keyNum = 0;
                playerxID_[pIDxAddr_[_addr]].withDrawNum = 0;
                keyDividend -= (keyBonus - playerxID_[pIDxAddr_[_addr]].costNum) / totalKey;
            }

            //实际能提现的
            keyBonus = keyBonus - playerxID_[pIDxAddr_[_addr]].costNum;

            transferCoin(_addr, keyBonus + playerEtraxID_[_addr].refereesBonus);
            playerEtraxID_[_addr].refereesBonus = 0;

            //提现结束
            playerxID_[pIDxAddr_[_addr]].costNum += keyBonus;

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
}

library FofDataSets {
    // team
    // 0 = 钢铁侠 Tony
    // 1 = 绿巨人 Hulk
    // 2 = 雷神 Thor
    // 3 = 灭霸 Thanos
    struct PlayerInfo {
        address addr;   // player address
        uint keyNum;    // 拥有key的数量
        uint withDrawNum;     // 不能分红的
        uint costNum;     // 已取现
        uint allBuy;     // 我买钥匙总共花了多少钱  累加
        address referees; // 推荐人地址
        uint [5] agents;
    }

    struct PlayerEtra {
        bytes32 name;   // player name
        uint refereesBonus;  // 我推荐别人时我得到的分红
        uint performance; // 我推荐别人 我的业绩
        uint level; // 当前玩家的等级(第几代奖励)
        uint currentRound;
        //////////////////////////
        // 0级：最常见，购买或注册就为0级
        // 1级：有1人累计购买超过1ETH
        // 2级：有2人累计购买超过1ETH，可获得2代奖励（2%）
        // 3级：有3人累计购买超过1ETH，可获得3代奖励（1.5%）
        // 4级：有4人累计购买超过1ETH，可获得4代奖励（1%）
        // 5级：有5人累计购买超过1ETH，可获得5代奖励（0.5%）
        //////////////////////////
    }


    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
    }
}