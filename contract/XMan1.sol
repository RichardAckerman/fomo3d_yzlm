pragma solidity ^0.4.24;

contract XMan {
    string public name = "XManGame";
    address public creator = msg.sender; // 创建者的地址

    address [10] public Luckyer; // 保存最后10名玩家地址
    uint [] public bonusQueue; // 队列
    uint [5] emptyArr;
    uint [] emptyArr2;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [1] public banker;
    address public registerBonusTo;
    address public beginAddr;
    bool public isBegin = false;

    uint public nPlayerNum; // 玩家个数
    uint256 constant private rndInit_ = 5 minutes;              // 5分钟后开启游戏
    uint256 constant private rndInc_ = 600 seconds;              // 每次买key增加600s
    uint256 constant private rndMax_ = 24 hours;                 // 最长24h
    uint256 public registrationFee_ = 20 finney;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻

    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(address => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    mapping(uint256 => DataSets.TeamBalance) public teamPot; // 存储4个队的奖池余额

    mapping(uint256 => uint256) public rollInByPlayerId; // key：id value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值
    uint nMaxBonus = 3.3 ether;

    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        banker[0] = 0xC088D05B877273f7E2B3eB72a84Ab2f711a17628;
        registerBonusTo = 0xfD0F6E962e15A6022aE57CeC5c2454bc79BDE4f6;
        beginAddr = 0x87261dC2d3cbE0Bf3b6A9485ff6Ee6aB696a5Cc7;
    }

    function deposit() public payable {}

    modifier isWithinLimits(uint256 _eth, address _addr) {
        // 单笔下注 3 ether
        require(_eth == 3 ether);
        _;
    }

    // 注册nickname
    function registerName(address _referrer) public payable {
        address _addr = msg.sender;
        uint256 _paid = msg.value;

        require(_paid >= registrationFee_, "umm.....  you have to pay the name fee");
        //注册
        createPlayer(_addr, _referrer);
        playerIsRegi[_addr] = true;
        transferCoin(registerBonusTo, _paid);
    }


    //注册
    function createPlayer(address _addr, address _referrer) private {
        // 注册
        if (pIDxAddr_[_addr] == 0) {
            nPlayerNum++;
            pIDxAddr_[_addr] = nPlayerNum;
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyAddr, emptyArr2,emptyArr, 0, 0, 0,0);
            playerEtraxAddr_[_addr] = DataSets.PlayerEtra(0, 0, round, 0);

            //赋直推
            if (pIDxAddr_[_referrer] != 0 && _referrer != _addr)
            {
                playerxID_[nPlayerNum].referees = _referrer;
            }
            else
            {
                playerxID_[nPlayerNum].referees = emptyAddr;
            }

            // 挂代理
            if (playerxID_[nPlayerNum].referees != emptyAddr) {
                playerxID_[nPlayerNum].agents = playerxID_[pIDxAddr_[_referrer]].agents;
                for (uint i = 0; i < 4; i++) {
                    playerxID_[nPlayerNum].agents[i] = playerxID_[nPlayerNum].agents[i + 1];
                }
                playerxID_[nPlayerNum].agents[4] = pIDxAddr_[_referrer];
            }
        }
    }

    // 投币函数
    function coinRollIn(uint _team, address _referrer) isWithinLimits(msg.value, msg.sender) public payable {
        uint thisCoin = msg.value;
        address _addr = msg.sender;

        //begin logic
        if (isBegin == false) {
            if (beginAddr == _addr) {
                isBegin = true;
                // 第一人买后 此值改为true
                overMoment = now + rndMax_;
            }
            require(isBegin == true, "game is not begin");
        }

        // register logic
        createPlayer(_addr, _referrer);

        //must rollInArray length < 10
        require(playerxID_[pIDxAddr_[_addr]].rollInArray.length < 10, "you haved rollin coin !");

        //data change
        playerxID_[pIDxAddr_[_addr]].allBuy += thisCoin;
        playerxID_[pIDxAddr_[_addr]].turnBuy += thisCoin;
        nRollIn++;
        playerxID_[pIDxAddr_[_addr]].rollInArray.push(nRollIn);
        rollInByPlayerId[nRollIn] = pIDxAddr_[_addr];




        // 资金分配
        bonusAllocation(thisCoin, _team, _addr);

        //time logic
        overMoment += rndInc_;
        uint timeInterval = 0;
        if (overMoment > now) {
            timeInterval = overMoment - now;
        }
        overMoment = timeInterval > rndMax_ ? (now + rndMax_) : overMoment;
        addLuckyer(_addr);
    }

    //coin transfer
    function bonusAllocation(uint coin, uint _team, address _addr) private {
        bonusToBanker(coin);
        bonusToReferrer(coin, _addr);
        bonusToPot(coin, _team);
        bonusToNO1(coin);
    }
    // 庄家分5%
    function bonusToBanker(uint allCoin) private {
        transferCoin(banker[0], allCoin * 5 / 100);
    }

    function bonusToReferrer(uint allCoin, address _addr) private {
        uint myId = pIDxAddr_[_addr];
        address referees = playerxID_[myId].referees;
        if (referees != emptyAddr) {

            // 先给推荐人分10%
            uint num = allCoin * 10 / 100;
            transferCoin(referees, num);
            playerEtraxAddr_[referees].allEarning += num;
            playerEtraxAddr_[referees].performance += num;

            // 给队长基金5%
            uint refereesLevel = playerEtraxAddr_[referees].level;

            //last allbug
            uint nLastAllBug = 0;
            if (playerxID_[myId].allBuy > allCoin) {
                nLastAllBug = playerxID_[myId].allBuy - allCoin;
            }

            //lv up
            if (nLastAllBug < 1 ether && playerxID_[myId].allBuy >= 1 ether && refereesLevel < 5) {
                refereesLevel++;
                playerEtraxAddr_[referees].level = refereesLevel;
            }

            uint toCreatorPer = 50;
            for (uint j = 0; j < 4; j++) {
                uint agentId = playerxID_[myId].agents[j];
                uint money = 0;
                if (agentId > 0) {
                    uint level = playerEtraxAddr_[playerxID_[agentId].addr].level;
                    if (j == 0 && level >= 5) {
                        money = allCoin * 1 / 200;
                        if (toCreatorPer > 5) {
                            toCreatorPer -= 5;
                        } else {
                            toCreatorPer = 0;
                        }
                    }
                    if (j == 1 && level >= 4) {
                        money = allCoin * 1 / 100;
                        if (toCreatorPer > 10) {
                            toCreatorPer -= 10;
                        } else {
                            toCreatorPer = 0;
                        }
                    }
                    if (j == 2 && level >= 3) {
                        money = allCoin * 3 / 200;
                        if (toCreatorPer > 15) {
                            toCreatorPer -= 15;
                        } else {
                            toCreatorPer = 0;
                        }
                    }
                    if (j == 3 && level >= 2) {
                        money = allCoin * 2 / 100;
                        if (toCreatorPer > 20) {
                            toCreatorPer -= 20;
                        } else {
                            toCreatorPer = 0;
                        }
                    }
                    playerEtraxAddr_[playerxID_[agentId].addr].performance += money;
                    playerEtraxAddr_[playerxID_[agentId].addr].allEarning += num;
                    transferCoin(playerxID_[agentId].addr, money);
                }
            }
            if (toCreatorPer > 0) {
                bonusToOne(allCoin * toCreatorPer / 1000);
            }
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * 15 / 100);
        }
    }

    function bonusToPot(uint allCoin, uint _team) private {
        teamPot[_team].total += allCoin;
        teamPot[_team].potCoin += allCoin * 5 / 100;
    }

    //pull frist node from array
    function pullFristIndex() private {
        if (playerxID_[rollInByPlayerId[nCurrentGainId]].rollInArray.length <= 0) {
            return;
        }
        for (uint i = 0; i < playerxID_[rollInByPlayerId[nCurrentGainId]].rollInArray.length - 1; i++) {
            playerxID_[rollInByPlayerId[nCurrentGainId]].rollInArray[i] = playerxID_[rollInByPlayerId[nCurrentGainId]].rollInArray[i + 1];
        }
        playerxID_[rollInByPlayerId[nCurrentGainId]].rollInArray.length -= 1;
    }


    function withDraw(){}


    function bonusToNO1(uint allCoin) private {
        uint coin = allCoin * 75 / 100;
        for (uint i = 0; i < 2; i++) {

            if(rollInByPlayerId[nCurrentGainId] == 0)
            {
                break;
            }

            playerxID_[rollInByPlayerId[nCurrentGainId]].currentBonus += coin;
            if(playerxID_[rollInByPlayerId[nCurrentGainId]].currentBonus > nMaxBonus)
            {
                coin = playerxID_[rollInByPlayerId[nCurrentGainId]].currentBonus - nMaxBonus;
                playerxID_[rollInByPlayerId[nCurrentGainId]].currentBonus = 0;
                playerxID_[rollInByPlayerId[nCurrentGainId]].turnBonus += nMaxBonus;
                playerEtraxAddr_[playerxID_[rollInByPlayerId[nCurrentGainId]].addr].allEarning += nMaxBonus;

                pullFristIndex();
                nCurrentGainId++;
            }
            else
            {
                break;
            }
        }
    }

    function bonusToOne(uint coin) private {
        transferCoin(banker[0], coin);
    }

    function addLuckyer(address _addr) private {
        for (uint i = 0; i < 9; i++) {
            Luckyer[i] = Luckyer[i + 1];
        }
        Luckyer[9] = _addr;
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
                transferCoin(Luckyer[9], totalPot * 3 / 10);
                playerEtraxAddr_[Luckyer[9]].allEarning += totalPot * 3 / 10;
            }
            for (uint i = 0; i < 9; i++) {
                if (Luckyer[i] != emptyAddr) {
                    count++;
                }
            }
            if (count > 0) {
                for (uint j = 0; j < 9; j++) {
                    if (Luckyer[j] != emptyAddr) {
                        transferCoin(Luckyer[j], totalPot * 7 / 10 / count);
                        playerEtraxAddr_[Luckyer[j]].allEarning += totalPot * 7 / 10 / count;
                    }
                }
            }
        }
        reset();
    }


    // 获取总的奖池余额
    function getTotalPot() constant public returns (uint){
        uint totalPot = 0;
        for (uint i = 0; i < 4; i++) {
            totalPot += teamPot[i].potCoin;
        }
        return totalPot;
    }

    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }

    // 每一轮结束了重置函数
    function reset() private {
        // todo
        // 清空幸运儿的地址Luckyer[]
        for (uint k = 0; k < 10; k++) {
            Luckyer[k] = emptyAddr;
        }
        // 时间重置，且5分钟内不能买
        uint endTime = now;
        overMoment = endTime + rndMax_ + rndInit_;
        bonusQueue.length = 0;
        // 保存当前是第几轮
        round++;
        // 钥匙价格恢复初始价格
        // 清空4个队伍的奖池
        for (uint j = 0; j < 4; j++) {
            teamPot[j].total = 0;
            teamPot[j].potCoin = 0;
        }
    }

    function getBalance() view public returns (uint){
        return address(this).balance;
    }

    function destory() public {
        if (round >= 2 && msg.sender == creator) {
            transferCoin(creator, address(this).balance);
        }
    }
}

library DataSets {
    struct PlayerInfo {
        address addr;   // player address
        address referees; // 推荐人地址
        uint [] rollInArray;
        uint [5] agents;
        uint allBuy; // 所有买入花的钱 只增不减
        uint turnBuy; // 这一局买入花的钱
        uint turnBonus; // 这局的收益
        uint currentBonus; // currentBonus
    }

    struct PlayerEtra {
        uint performance; // 我推荐别人 我的业绩
        uint level; // 当前玩家的等级(第几代奖励)
        uint currentRound;
        uint allEarning;// 所有赚的钱 只增不减
    }

    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
    }
}