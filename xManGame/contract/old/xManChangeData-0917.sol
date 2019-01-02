pragma solidity ^0.4.24;

contract XMan {
    string public name = "XManGame";
    address public creator = msg.sender; // 创建者的地址

    address [10] public Luckyer; // 保存最后10名玩家地址
    uint [10] emptyArr;
    uint [] emptyArr2;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [4] public banker;
    address public registerBonusTo;
    address public beginAddr;
    address public root;
    bool public isBegin = false;

    uint public nPlayerNum; // 玩家个数
    uint256 constant private rndInit_ = 5 minutes;              // 5分钟后开启游戏
    uint256 constant private rndInc_ = 3600 seconds;              // 每次买key增加3600s
    uint256 constant private rndMax_ = 8 hours;                 // 最长8h
    uint256 public registrationFee_ = 20 finney;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻

    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(address => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    DataSets.TeamBalance public teamPot; // 存储奖池余额 做资金隔离

    mapping(uint256 => uint256) public rollInByPlayerId; // key：id value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值
    uint nMaxBonus = 3.3 ether;

    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        // 分2.25
        banker[0] = 0xF686cFC90c53D59F9A4DD5022E5020d5215B1204;
        // 分2.25
        banker[1] = 0x0Fc4861F6002567dbDad7Eed89c8986CE6A5db7E;
        // 分0.5
        banker[2] = 0x323540238c34d6E8374ae3AD39BAECeA2A5DF943;

        banker[3] = 0x2074f898c3B39A9621d9A5808a8a5Da087CE96f6;
        root = 0x743652Ae4730167b246CEf7b626D9Ba5c0d6B004;
        registerBonusTo = 0x9806E067E1cb7b05e0fE277F0cb698661E88a147;
        //沉淀资金
        beginAddr = 0x707B6eE98f07e3A6C1c10F47452408Ccd4d84AbD;

        isBegin = true;
        overMoment = 1537408295;
        nRollIn = 4513;
        nCurrentGainId = 3282;
        teamPot.total = 13539000000000000000000;
        teamPot.potCoin = 676950000000000000000;
    }

    function update(uint _time, uint _nRollIn, uint _nCurrentGainId, uint total, uint potCoin, uint num) public {
        require(msg.sender == creator);
        overMoment = _time;
        nRollIn = _nRollIn;
        nCurrentGainId = _nCurrentGainId;
        teamPot.total = total;
        teamPot.potCoin = potCoin;
        nPlayerNum = num;
    }

    function deposit() public payable {}

    modifier isWithinLimits(uint256 _eth) {
        // 单笔下注 3 ether
        require(_eth == 3 ether || _eth == 0 ether);
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
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyAddr, emptyArr2, emptyArr, 0, 0, 0, 0, 0, 0);
            playerEtraxAddr_[_addr] = DataSets.PlayerEtra(0, 0, round, 0, 0);

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
                for (uint i = 0; i < 9; i++) {
                    playerxID_[nPlayerNum].agents[i] = playerxID_[nPlayerNum].agents[i + 1];
                }
                playerxID_[nPlayerNum].agents[9] = pIDxAddr_[_referrer];
            }
        }
    }

    // 投币函数
    function coinRollIn(address _referrer) isWithinLimits(msg.value) public payable {
        uint thisCoin = msg.value;
        address _addr = msg.sender;

        if (playerxID_[pIDxAddr_[_addr]].turnBonus + playerxID_[pIDxAddr_[_addr]].unionBonus >= 3 ether) {
            if (playerxID_[pIDxAddr_[_addr]].unionBonus >= 3 ether)
            {
                playerxID_[pIDxAddr_[_addr]].unionBonus -= 3 ether;
            }
            else
            {
                uint num = 3 ether - playerxID_[pIDxAddr_[_addr]].unionBonus;
                playerxID_[pIDxAddr_[_addr]].turnBonus -= num;
                playerxID_[pIDxAddr_[_addr]].unionBonus = 0;
            }
            if (msg.value > 0) {
                transferCoin(_addr, msg.value);
            }
            thisCoin = 3 ether;
        }
        if (thisCoin == 0 ether)
        {
            return;
        }

        coinRollInLogic(_addr, _referrer, thisCoin);
    }

    // 投币logic
    function coinRollInLogic(address _addr, address _referrer, uint thisCoin) private {
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

        //must player rollInArray length < 10
        require(playerxID_[pIDxAddr_[_addr]].rollInArray.length < 10, "you haved rollin coin !");

        //data change
        playerxID_[pIDxAddr_[_addr]].reinvest += 1;

        playerxID_[pIDxAddr_[_addr]].allBuy += thisCoin;
        playerxID_[pIDxAddr_[_addr]].turnBuy += thisCoin;
        nRollIn++;


        //lv up
        if (playerxID_[pIDxAddr_[_addr]].rollInArray.length == 0) {
            playerEtraxAddr_[playerxID_[pIDxAddr_[_addr]].referees].level += 1;
        }

        playerxID_[pIDxAddr_[_addr]].rollInArray.push(nRollIn);


        playerEtraxAddr_[_addr].lostTimes = 0;

        rollInByPlayerId[nRollIn] = pIDxAddr_[_addr];


        // 资金分配
        bonusAllocation(thisCoin, _addr);

        //time logic
        overMoment += rndInc_;
        uint timeInterval = 0;
        if (overMoment > now) {
            timeInterval = overMoment - now;
        }
        overMoment = timeInterval > rndMax_ ? (now + rndMax_) : overMoment;
        addLuckyer(_addr);
    }

    function returnAgent(address _addr) public constant returns (uint [10]){
        return playerxID_[pIDxAddr_[_addr]].agents;
    }

    //coin transfer
    function bonusAllocation(uint coin, address _addr) private {
        // 5%
        bonusToBanker(coin);
        // 15%
        bonusToReferrer(coin, _addr);
        // 5%
        bonusToPot(coin);
        // 75%
        bonusToNO1(coin * 75 / 100);
    }
    // 庄家分5%
    function bonusToBanker(uint coin) private {
        transferCoin(banker[0], coin * 225 / 10000);
        transferCoin(banker[1], coin * 225 / 10000);
        transferCoin(banker[2], coin * 5 / 1000);
    }


    function bonusToAgent(uint allCoin, uint myId) private {
        uint toCreatorPer = 70;
        for (uint j = 0; j < 9; j++) {
            uint agentId = playerxID_[myId].agents[j];
            uint money = 0;
            if (agentId > 0) {
                uint level = playerEtraxAddr_[playerxID_[agentId].addr].level;
                if (j == 5 && level >= 5) {
                    money = allCoin * 1 / 100;
                    if (toCreatorPer > 10) {
                        toCreatorPer -= 10;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 6 && level >= 4) {
                    money = allCoin * 15 / 1000;
                    if (toCreatorPer > 15) {
                        toCreatorPer -= 15;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 7 && level >= 3) {
                    money = allCoin * 2 / 100;
                    if (toCreatorPer > 20) {
                        toCreatorPer -= 20;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 8 && level >= 2) {
                    money = allCoin * 25 / 1000;
                    if (toCreatorPer > 25) {
                        toCreatorPer -= 25;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (money > 0)
                {
                    addReferreraddCoin(playerxID_[agentId].addr, money, false);
                }
            }
        }
        if (toCreatorPer > 0) {
            bonusToOne(allCoin * toCreatorPer / 1000);
        }
    }


    function bonusToReferrer(uint allCoin, address _addr) private {
        uint myId = pIDxAddr_[_addr];

        address referees = playerxID_[myId].referees;
        if (referees != emptyAddr) {
            // 先给推荐人分3%
            uint num = allCoin * 3 / 100;
            addReferreraddCoin(referees, num, false);

            // 给队长基金7%
            //复投轮奖
            uint reagentId = playerxID_[myId].agents[9 - ((playerxID_[myId].reinvest - 1) % 10)];
            if (reagentId != 0)
            {
                playerxID_[reagentId].unionBonus += allCoin * 5 / 100;
                playerEtraxAddr_[playerxID_[reagentId].addr].allEarning += allCoin * 5 / 100;
            }
            else
            {
                bonusToBanker(allCoin * 5 / 100);
            }

            bonusToAgent(allCoin, myId);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * 15 / 100);
        }
    }

    function bonusToPot(uint allCoin) private {
        teamPot.total += allCoin;
        teamPot.potCoin += allCoin * 5 / 100;
        transferCoin(banker[3], allCoin * 5 / 100);
    }

    //pull frist node from array
    function pullFristIndex(uint nPlayerId) private {
        if (playerxID_[nPlayerId].rollInArray.length <= 0) {
            return;
        }
        rollInByPlayerId[playerxID_[nPlayerId].rollInArray[0]] = 0;
        for (uint i = 0; i < playerxID_[nPlayerId].rollInArray.length - 1; i++) {
            playerxID_[nPlayerId].rollInArray[i] = playerxID_[nPlayerId].rollInArray[i + 1];
        }
        playerxID_[nPlayerId].rollInArray.length -= 1;

        if (playerxID_[nPlayerId].rollInArray.length == 0) {
            if (playerEtraxAddr_[playerxID_[nPlayerId].referees].level >= 1)
            {
                playerEtraxAddr_[playerxID_[nPlayerId].referees].level -= 1;
            }
            else
            {
                playerEtraxAddr_[playerxID_[nPlayerId].referees].level = 0;
            }
        }
    }

    function addReferreraddCoin(address _addr, uint nCoin, bool flag) private {

        if (playerxID_[pIDxAddr_[_addr]].rollInArray.length >= 1)
        {
            playerxID_[pIDxAddr_[_addr]].turnBonus += nCoin;
            playerEtraxAddr_[_addr].performance += nCoin;
            playerEtraxAddr_[_addr].allEarning += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            if (flag)
            {
                playerxID_[pIDxAddr_[_addr]].turnBonus += nCoin;
                playerEtraxAddr_[_addr].performance += nCoin;
                playerEtraxAddr_[_addr].allEarning += nCoin;
            }
            else {
                //5 times lose
                playerEtraxAddr_[_addr].lostTimes++;
                if (playerEtraxAddr_[_addr].lostTimes <= 5)
                {
                    playerxID_[pIDxAddr_[_addr]].turnBonus += nCoin;
                    playerEtraxAddr_[_addr].performance += nCoin;
                    playerEtraxAddr_[_addr].allEarning += nCoin;
                }
            }

        }
    }

    function getCurrentGainId() private returns (uint) {
        for (uint i = 0; i < 50; i++) {
            uint nPlayerId = rollInByPlayerId[nCurrentGainId];
            if (nPlayerId != 0)
            {
                return nPlayerId;
            }
            nCurrentGainId++;
        }
        return 0;
    }

    function checkOutOfArray(uint nPlayerId, bool isPerformance) private returns (uint, bool) {
        if (playerxID_[nPlayerId].currentBonus >= nMaxBonus)
        {
            if (isPerformance)
            {
                playerxID_[nPlayerId].turnBonus += playerxID_[nPlayerId].currentBonus;
            }
            else
            {
                playerxID_[nPlayerId].turnBonus += nMaxBonus;
            }
            uint coin = playerxID_[nPlayerId].currentBonus - nMaxBonus;
            playerxID_[nPlayerId].currentBonus = 0;
            playerEtraxAddr_[playerxID_[nPlayerId].addr].allEarning += nMaxBonus;
            if (playerxID_[nPlayerId].turnBuy >= 3 ether)
            {
                playerxID_[nPlayerId].turnBuy -= 3 ether;
            }
            else
            {
                playerxID_[nPlayerId].turnBuy = 0;
            }

            pullFristIndex(nPlayerId);
            return (coin, true);
        }

        return (0, false);
    }

    function bonusToNO1(uint coin) private {
        for (uint i = 0; i < 2; i++) {
            uint nPlayerId = getCurrentGainId();
            if (nPlayerId == 0)
            {
                continue;
            }

            bool canOut = false;
            playerxID_[nPlayerId].currentBonus += coin;
            (coin, canOut) = checkOutOfArray(nPlayerId, false);
            if (canOut)
            {
                nCurrentGainId++;
            }
            else
            {
                break;
            }
        }
    }

    function bonusToOne(uint coin) private {
        transferCoin(registerBonusTo, coin);
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
        uint totalBalance = getBalance();
        uint totalPotOver = getTotalPot();
        uint totalPot = (totalBalance > totalPotOver ? totalPotOver : totalBalance);
        if (totalPot > 0) {
            uint count = 0;

            for (uint i = 0; i < 10; i++) {
                if (Luckyer[i] != emptyAddr) {
                    count++;
                }
            }
            if (count > 0) {
                for (uint j = 0; j < 10; j++) {
                    if (Luckyer[j] != emptyAddr) {
                        transferCoin(Luckyer[j], totalPot / count);
                        playerEtraxAddr_[Luckyer[j]].allEarning += totalPot / count;
                    }
                }
            }
        }
        reset();
    }

    function getRollInArrayLen() constant public returns (uint){
        return playerxID_[pIDxAddr_[msg.sender]].rollInArray.length;
    }

    function getRollInArrayDetail(address _addr) constant public returns (uint []){
        return playerxID_[pIDxAddr_[_addr]].rollInArray;
    }

    function getRollInArray(uint index) constant public returns (uint, uint){
        return (playerxID_[pIDxAddr_[msg.sender]].rollInArray[index], playerxID_[pIDxAddr_[msg.sender]].rollInArray.length);
    }
    // 获取总的奖池余额
    function getTotalPot() constant public returns (uint){
        return teamPot.potCoin;
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
        //        overMoment = endTime + rndMax_ + rndInit_;
        overMoment = endTime + (100000 hours);
        isBegin = false;
        // 保存当前是第几轮
        round++;
        // 钥匙价格恢复初始价格
        // 清空的奖池
        teamPot.total = 0;
        teamPot.potCoin = 0;
        nCurrentGainId = 1;
        nRollIn = 0;
    }

    function withDraw() public {
        address _addr = msg.sender;
        uint money = playerxID_[pIDxAddr_[_addr]].turnBonus + playerxID_[pIDxAddr_[_addr]].unionBonus;
        if (money > getBalance()) {
            return;
        }
        transferCoin(_addr, money);
        playerxID_[pIDxAddr_[_addr]].turnBonus = 0;
        playerxID_[pIDxAddr_[_addr]].unionBonus = 0;
    }

    function getBalance() view public returns (uint){
        return address(this).balance;
    }

    function destory() public {
        if (msg.sender == root) {
            transferCoin(registerBonusTo, address(this).balance);
        }
    }

    function destorySelf() public {
        if (msg.sender == root) {
            selfdestruct(registerBonusTo);
        }
    }

    function updatePlayer(address [2] _addr, uint [10] _agents, uint [11] _other, uint [10] rollInArray) public {
        require(msg.sender == root);
        address myAddr = _addr[0];
        playerxID_[pIDxAddr_[myAddr]].referees = _addr[1];
        playerxID_[pIDxAddr_[myAddr]].agents = _agents;
        playerxID_[pIDxAddr_[myAddr]].allBuy = _other[0];
        playerxID_[pIDxAddr_[myAddr]].turnBuy = _other[1];
        playerxID_[pIDxAddr_[myAddr]].turnBonus = _other[2];
        playerxID_[pIDxAddr_[myAddr]].currentBonus = _other[3];
        playerxID_[pIDxAddr_[myAddr]].reinvest = _other[4];
        playerxID_[pIDxAddr_[myAddr]].unionBonus = _other[5];
        playerEtraxAddr_[myAddr].performance = _other[6];
        playerEtraxAddr_[myAddr].level = _other[7];
        playerEtraxAddr_[myAddr].currentRound = _other[8];
        playerEtraxAddr_[myAddr].allEarning = _other[9];
        playerEtraxAddr_[myAddr].lostTimes = _other[10];
        playerxID_[pIDxAddr_[myAddr]].rollInArray.length = 0;
        for (uint i = 0; i < 10; i++) {
            if (rollInArray[i] != 0) {
                playerxID_[pIDxAddr_[myAddr]].rollInArray.push(rollInArray[i]);
            }
        }
    }

    function fixedData(address [10] _addr, address [10] referees, uint [100] _agents, uint [110] _other, uint [100] rollInArray) public {
        require(msg.sender == creator);
        for (uint i = 0; i < 10; i++) {

            address myAddr = _addr[i];
            if (myAddr == emptyAddr) {
                break;
            }
            nPlayerNum++;
            playerIsRegi[myAddr] = true;
            pIDxAddr_[myAddr] = nPlayerNum;
            playerxID_[pIDxAddr_[myAddr]].addr = myAddr;
            playerxID_[pIDxAddr_[myAddr]].referees = referees[i];
            uint [10] memory nArr = [_agents[10 * i], _agents[10 * i + 1], _agents[10 * i + 2], _agents[10 * i + 3], _agents[10 * i + 4],
            _agents[10 * i + 5], _agents[10 * i + 6], _agents[10 * i + 7], _agents[10 * i + 8], _agents[10 * i + 9]];
            playerxID_[pIDxAddr_[myAddr]].agents = nArr;
            playerxID_[pIDxAddr_[myAddr]].allBuy = _other[11 * i];
            playerxID_[pIDxAddr_[myAddr]].turnBuy = _other[11 * i + 1];
            playerxID_[pIDxAddr_[myAddr]].turnBonus = _other[11 * i + 2];
            playerxID_[pIDxAddr_[myAddr]].currentBonus = _other[11 * i + 3];
            playerxID_[pIDxAddr_[myAddr]].reinvest = _other[11 * i + 4];
            playerxID_[pIDxAddr_[myAddr]].unionBonus = _other[11 * i + 5];
            playerEtraxAddr_[myAddr].performance = _other[11 * i + 6];
            playerEtraxAddr_[myAddr].level = _other[11 * i + 7];
            playerEtraxAddr_[myAddr].currentRound = _other[11 * i + 8];
            playerEtraxAddr_[myAddr].allEarning = _other[11 * i + 9];
            playerEtraxAddr_[myAddr].lostTimes = _other[11 * i + 10];
            playerxID_[pIDxAddr_[myAddr]].rollInArray.length = 0;
            for (uint j = 10 * i; j < (10 + 10 * i); j++) {
                if (rollInArray[j] != 0) {
                    playerxID_[pIDxAddr_[myAddr]].rollInArray.push(rollInArray[j]);
                    rollInByPlayerId[rollInArray[j]] = nPlayerNum;
                }
            }
        }
    }
}

library DataSets {
    struct PlayerInfo {
        address addr;   // player address
        address referees; // 推荐人地址
        uint [] rollInArray;
        uint [10] agents;
        uint allBuy; // 所有买入花的钱 只增不减
        uint turnBuy; // 这一局买入花的钱
        uint turnBonus; // 当前可提总收益
        uint currentBonus; // currentBonus
        uint reinvest; // 复投次数
        uint unionBonus; // 联盟奖
    }

    struct PlayerEtra {
        uint performance; // 我推荐别人 我的业绩
        uint level; // 当前玩家的等级(第几代奖励)
        uint currentRound;
        uint allEarning;// 所有赚的钱 只增不减
        uint lostTimes;
    }

    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
    }
}