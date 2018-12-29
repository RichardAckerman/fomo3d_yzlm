pragma solidity ^0.4.24;

contract GlobalParkingDigitalAlliance {
    string public name = "GlobalParkingDigitalAlliance";
    address public creator = msg.sender; // 创建者的地址

    address [10] public Luckyer; // 保存最后10名玩家地址
    uint [9] public luckyPotPerson;//保存9名幸运玩家编号
    uint [99] emptyArr;
    uint [] emptyArr2;
    uint [4] emptyArr3;
    address [] emptyAddArray;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [5] public banker;
    address public registerBonusTo;
    address public beginAddr;
    address public root;
    bool public isBegin = false;

    uint public nPlayerArraySize = 30; // 同时拥有的最大收益号数目
    uint public nMustRollInNum = 1; // 必须复投次数，为1时。不需要复投也可以提取本金

    uint public nPlayerNum; // 玩家个数
    uint256 private rndInit_ = 300 seconds;              // 5分钟后开启游戏
    uint256 private rndInc_ = 1800 seconds;              // 每次买key增加1800s
    uint256 public rndMax_ = 86400 seconds;                 // 24h
    uint256 public registrationFee_ = 20 finney;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻
    uint256 private lostTimesMax = 0;

    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(address => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    DataSets.TeamBalance public teamPot; // 存储奖池余额 做资金隔离
    mapping(uint256 => uint256)public luckyPotMoney;    //幸运玩家编号对应的金额

    mapping(uint256 => uint256) public rollInByPlayerId; // key：id value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值
    uint public nMaxBonus = 3.3 ether;
    uint public nBugBonus = 3 ether;

    uint private levelOne = 0;
    uint private levelTwo = 0;

    uint [9] rateArray;

    address test = 0xdbFadDBd3958eE725f3fef0ebBd692c20814bf43;
    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        // 分2%，社区合伙人
        banker[0] = test;
        // 分3%，平台基金
        banker[1] = test;
        // 分0.5%，慈善基金
        banker[2] = test;

        //存储奖金池地址
        banker[3] = test;
        //存储幸运奖池地址
        banker[4] = test;
        root = test;
        registerBonusTo = test;
        //沉淀资金
        beginAddr = test;
    }

    function deposit() public payable {}

    modifier isWithinLimits(uint256 _eth) {
        // 单笔下注 3 ether
        require(_eth == nBugBonus || _eth == 0 ether);
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
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyArr2, emptyArr, emptyArr3, 0, 0, 0, 0, 0, 0, 0);
            playerEtraxAddr_[_addr] = DataSets.PlayerEtra(0, 0, round, 0, 0, 0, 0, 0);

            // 挂代理
            if (_referrer != emptyAddr && playerIsRegi[_referrer] == true) {
                playerxID_[nPlayerNum].agents = playerxID_[pIDxAddr_[_referrer]].agents;
                for (uint i = 0; i < 98; i++) {
                    playerxID_[nPlayerNum].agents[i] = playerxID_[nPlayerNum].agents[i + 1];
                }
                playerxID_[nPlayerNum].agents[98] = pIDxAddr_[_referrer];
                refereesLvUp(_addr, _referrer);
            }
        }
    }

    //新一轮，清空数据
    function clearUser(address _addr) private {
        if (playerEtraxAddr_[_addr].currentRound != round) {
            playerEtraxAddr_[_addr].currentRound = round;
            playerEtraxAddr_[_addr].lostTimes = 0;

            playerxID_[pIDxAddr_[_addr]].rollInArray.length = 0;
            playerxID_[pIDxAddr_[_addr]].allBuy = 0;
            playerxID_[pIDxAddr_[_addr]].turnBuy = 0;
            playerxID_[pIDxAddr_[_addr]].reinvest = 0;
            playerxID_[pIDxAddr_[_addr]].currentBonus = 0;
        }
    }

    //注册过后，代理人是否升级
    function refereesLvUp(address _addr, address _referrer) private {
        uint referrerLevel = playerEtraxAddr_[_referrer].level;
        uint addrLevel = playerEtraxAddr_[_addr].level;

        if (addrLevel >= referrerLevel && _referrer != emptyAddr) {
            playerxID_[pIDxAddr_[_referrer]].levelArray[addrLevel] += 1;
            uint num = 0;
            for (uint i = referrerLevel; i < 4; i++) {
                num += playerxID_[pIDxAddr_[_referrer]].levelArray[i];
            }

            if (num >= 10)
            {
                playerEtraxAddr_[_referrer].level += 1;
                refereesLvUp(_referrer, getIDxAddr(playerxID_[pIDxAddr_[_referrer]].agents[98]));
            }
        }
    }

    // 投币函数
    function coinRollIn(address _referrer) isWithinLimits(msg.value) public payable {
        uint thisCoin = msg.value;
        address _addr = msg.sender;

        clearUser(_addr);

        if (playerxID_[pIDxAddr_[_addr]].turnBonus + playerxID_[pIDxAddr_[_addr]].unionBonus >= nBugBonus) {
            if (playerxID_[pIDxAddr_[_addr]].unionBonus >= nBugBonus)
            {
                playerxID_[pIDxAddr_[_addr]].unionBonus -= nBugBonus;
            }
            else
            {
                uint num = nBugBonus - playerxID_[pIDxAddr_[_addr]].unionBonus;
                playerxID_[pIDxAddr_[_addr]].turnBonus -= num;
                if (playerxID_[pIDxAddr_[_addr]].currentInterest > playerxID_[pIDxAddr_[_addr]].turnBonus)
                {
                    playerxID_[pIDxAddr_[_addr]].currentInterest = playerxID_[pIDxAddr_[_addr]].turnBonus;
                }
                playerxID_[pIDxAddr_[_addr]].unionBonus = 0;
            }
            if (msg.value > 0) {
                transferCoin(_addr, msg.value);
            }
            thisCoin = nBugBonus;
        }
        else
        {
            // register logic
            createPlayer(_addr, _referrer);
            playerxID_[pIDxAddr_[_addr]].allBuy += thisCoin;
        }

        teamPot.totalNum++;

        if (thisCoin < nBugBonus)
        {
            return;
        }

        coinRollInLogic(_addr, _referrer, thisCoin);
        withDrawInterest();
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
        require(playerxID_[pIDxAddr_[_addr]].rollInArray.length < nPlayerArraySize, "you haved rollin coin !");

        //data change
        playerxID_[pIDxAddr_[_addr]].reinvest += 1;


        playerxID_[pIDxAddr_[_addr]].turnBuy += thisCoin;
        nRollIn++;

        playerxID_[pIDxAddr_[_addr]].rollInArray.push(nRollIn);

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

    function returnAgent(address _addr) public constant returns (uint [99]){
        return playerxID_[pIDxAddr_[_addr]].agents;
    }

    //coin transfer
    function bonusAllocation(uint coin, address _addr) private {
        // 5.5%
        bonusToBanker(coin);
        // 17%推荐奖励，联盟奖励5%
        bonusToReferrer(coin, _addr);
        // 0.5%
        bonusToPot(coin);
        // 2%
        bonusToLuckyPot(coin);
        // 70%
        bonusToNO1(coin * 70 / 100);
    }
    // 分5.5%。社区合伙人2%，平台基金3%，慈善基金0.5%
    function bonusToBanker(uint coin) private {
        transferCoin(banker[0], coin * 2 / 100);
        transferCoin(banker[1], coin * 3 / 100);
        transferCoin(banker[2], coin * 5 / 1000);
    }


    function bonusToAgent(uint allCoin, uint myId) private {
        levelOne = 0;
        levelTwo = 0;
        uint toCreatorPer = 170;

        address refereesAddr = getIDxAddr(playerxID_[myId].agents[98]);
        if (playerxID_[myId].agents[98] != 0) {
            if (playerEtraxAddr_[refereesAddr].level == playerEtraxAddr_[playerxID_[myId].addr].level && playerEtraxAddr_[refereesAddr].level > 1) {
                if (playerxID_[playerxID_[myId].agents[98]].rollInArray.length > 0) {
                    addReferrerOneaddCoin(refereesAddr, allCoin * 5 / 100);
                }
                toCreatorPer -= 50;

                if (playerxID_[playerxID_[myId].agents[97]].addr != emptyAddr && playerEtraxAddr_[playerxID_[playerxID_[myId].agents[97]].addr].level == playerEtraxAddr_[refereesAddr].level) {
                    if (playerxID_[playerxID_[myId].agents[98]].rollInArray.length > 0) {
                        addReferrerTwoaddCoin(playerxID_[playerxID_[myId].agents[97]].addr, allCoin * 5 / 1000);
                    }
                    toCreatorPer -= 5;
                }
            }

            for (uint n = 98; 99 > n && n > 0; n--) {
                if (playerxID_[playerxID_[myId].agents[n]].addr != emptyAddr) {
                    if (playerEtraxAddr_[playerxID_[playerxID_[myId].agents[n]].addr].level > playerEtraxAddr_[playerxID_[myId].addr].level && playerEtraxAddr_[playerxID_[playerxID_[myId].agents[n]].addr].level > levelOne) {
                        levelOne = playerEtraxAddr_[playerxID_[playerxID_[myId].agents[n]].addr].level;

                        if (n != 98) {
                            levelTwo = playerEtraxAddr_[playerxID_[playerxID_[myId].agents[n + 1]].addr].level;
                        } else {
                            levelTwo = playerEtraxAddr_[playerxID_[myId].addr].level;
                        }
                        if (playerxID_[playerxID_[myId].agents[n]].rollInArray.length > 0) {
                            addReferrerOneaddCoin(playerxID_[playerxID_[myId].agents[n]].addr, allCoin * 5 / 100 * (levelOne - levelTwo));
                        }
                        toCreatorPer -= 50 * (levelOne - levelTwo);
                    }
                } else {
                    break;
                }
            }
        }

        if (toCreatorPer > 0) {
            bonusToOne(allCoin * toCreatorPer / 1000);
        }
    }


    function bonusToReferrer(uint allCoin, address _addr) private {
        uint myId = pIDxAddr_[_addr];
        address referees = getIDxAddr(playerxID_[myId].agents[98]);
        //address referees = playerxID_[myId].referees;
        if (referees != emptyAddr) {

            //复投轮奖5%
            uint reagentId = playerxID_[myId].agents[98 - ((playerxID_[myId].reinvest - 1) % 10)];
            if (reagentId != 0 && playerxID_[reagentId].rollInArray.length > 0)
            {
                playerxID_[reagentId].unionBonus += allCoin * 5 / 100;
            }
            else
            {
                bonusToBanker(allCoin * 5 / 100);
            }

            bonusToAgent(allCoin, myId);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * 22 / 100);
        }
    }

    function bonusToPot(uint allCoin) private {
        teamPot.total += allCoin;
        teamPot.potCoin += allCoin * rateArray[6] / 1000;
        transferCoin(banker[3], allCoin * rateArray[6] / 1000);
    }

    function bonusToLuckyPot(uint allCoin) private {
        teamPot.luckyPotCoin += allCoin * rateArray[7] / 1000;
        transferCoin(banker[4], allCoin * rateArray[7] / 1000);
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

    }

    function addReferrerOneaddCoin(address _addr, uint nCoin) private {

        if (playerxID_[pIDxAddr_[_addr]].rollInArray.length >= 1)
        {
            playerEtraxAddr_[_addr].performance += nCoin;
            playerEtraxAddr_[_addr].currentPerformanceOne += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            playerEtraxAddr_[_addr].lostTimes++;
            if (playerEtraxAddr_[_addr].lostTimes <= lostTimesMax)
            {
                playerEtraxAddr_[_addr].performance += nCoin;
                playerEtraxAddr_[_addr].currentPerformanceOne += nCoin;
            }
        }
    }

    function addReferrerTwoaddCoin(address _addr, uint nCoin) private {

        if (playerxID_[pIDxAddr_[_addr]].rollInArray.length >= 1)
        {
            playerEtraxAddr_[_addr].performance += nCoin;
            playerEtraxAddr_[_addr].currentPerformanceTwo += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            playerEtraxAddr_[_addr].lostTimes++;
            if (playerEtraxAddr_[_addr].lostTimes <= lostTimesMax)
            {
                playerEtraxAddr_[_addr].performance += nCoin;
                playerEtraxAddr_[_addr].currentPerformanceTwo += nCoin;
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
                playerxID_[nPlayerId].currentInterest += (nBugBonus / 10);
            }
            uint coin = playerxID_[nPlayerId].currentBonus - nMaxBonus;
            playerxID_[nPlayerId].currentBonus = 0;
            if (playerxID_[nPlayerId].turnBuy >= nBugBonus)
            {
                playerxID_[nPlayerId].turnBuy -= nBugBonus;
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
    * ①总奖池50%分给买最后一个key的人,总奖池50%分给倒数2-10个令牌
    */
    function gameOver() public {
        uint _now = now;
//        require(_now >= overMoment);
        uint totalBalance = getBalance();
        uint totalPotOver = teamPot.potCoin;
        uint luckyPotOver = teamPot.luckyPotCoin;
        uint totalPot = (totalBalance > totalPotOver ? totalPotOver : totalBalance);
        uint luckyPot = (totalBalance > luckyPotOver ? luckyPotOver : totalBalance);
        totalPot = totalPot / 2;
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
                        if (j == 9) {
                            transferCoin(Luckyer[j], totalPot);
                            playerEtraxAddr_[Luckyer[j]].allEarning += totalPot;
                        } else {
                            transferCoin(Luckyer[j], totalPot / 9);
                            playerEtraxAddr_[Luckyer[j]].allEarning += totalPot / 9;
                        }
                    } else {
                        if (j == 9) {
                            bonusToOne(totalPot);
                        } else {
                            bonusToOne(totalPot / 9);
                        }
                    }
                }
            }
        }
        if (luckyPot > 0) {
            bonusToOne(luckyPot);
        }
        reset();
    }

    function luckyOver() public {
        require(isBegin == true, "游戏未开始");
        require(msg.sender == root);

        //清空上期幸运奖池玩家
        resetLuckyPotPerson();

        uint totalBalance = getBalance();
        uint luckyPotOver = teamPot.luckyPotCoin;
        uint luckyPot = (totalBalance > luckyPotOver ? luckyPotOver : totalBalance);
        uint randomNum;
        luckyPot = luckyPot / 2;
        if (luckyPot > 0) {
            uint count = nPlayerNum > 9 ? 9 : nPlayerNum;

            bool randomRepeat;

            for (uint i = 0; i < count; i++) {
                randomNum = uint(keccak256(now, msg.sender)) % nPlayerNum;
                randomRepeat = false;

                if (randomNum == 0) {
                    randomNum = nPlayerNum;
                }


                for (uint k = 0; k < luckyPotPerson.length; k++) {
                    if (luckyPotPerson[k] == randomNum) {
                        i--;
                        randomRepeat = true;
                        return;
                    }
                }

                if (!randomRepeat) {
                    luckyPotPerson[i] = randomNum;
                }
            }

            if (count > 0) {
                for (uint j = 0; j < 9; j++) {
                    if (playerxID_[luckyPotPerson[j]].addr != emptyAddr) {
                        if (j == 0) {
                            transferCoin(playerxID_[luckyPotPerson[j]].addr, luckyPot);
                            playerEtraxAddr_[playerxID_[luckyPotPerson[j]].addr].allEarning += luckyPot;

                            luckyPotMoney[luckyPotPerson[j]] = luckyPot;
                        } else {
                            transferCoin(playerxID_[luckyPotPerson[j]].addr, luckyPot / 8);
                            playerEtraxAddr_[playerxID_[luckyPotPerson[j]].addr].allEarning += luckyPot / 8;

                            luckyPotMoney[luckyPotPerson[j]] = luckyPot / 8;
                        }
                    } else {
                        if (j == 0) {
                            bonusToOne(luckyPot);
                        } else {
                            bonusToOne(luckyPot / 8);
                        }
                    }
                }
            }
        }
        teamPot.luckyPotCoin = 0;
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
        // 保存当前是第几轮
        round++;
        // 钥匙价格恢复初始价格+
        // 清空的奖池
        teamPot.total = 0;
        teamPot.potCoin = 0;
        teamPot.totalNum = 0;

        nCurrentGainId = 1;
        nRollIn = 0;

        //重置幸运奖池
        teamPot.luckyPotCoin = 0;
        //清空幸运奖池玩家
        resetLuckyPotPerson();
    }

    //重置获得幸运奖池的玩家以及信息
    function resetLuckyPotPerson() private {
        // 清空幸运奖池的地址luckyPotPerson
        for (uint k = 0; k < 9; k++) {
            luckyPotPerson[k] = 0;

            luckyPotPerson[k] = 0;
            luckyPotPerson[k] = 0;
            luckyPotPerson[k] = 0;
        }
    }

    function withDrawInterest() private {
        address _addr = msg.sender;

        //实际提现金额
        uint money = 0;

        //给利息 必须能提
        if (playerxID_[pIDxAddr_[_addr]].currentInterest > 0 && playerxID_[pIDxAddr_[_addr]].turnBonus >= playerxID_[pIDxAddr_[_addr]].currentInterest)
        {
            money += playerxID_[pIDxAddr_[_addr]].currentInterest;

            playerxID_[pIDxAddr_[_addr]].turnBonus -= playerxID_[pIDxAddr_[_addr]].currentInterest;

            playerxID_[pIDxAddr_[_addr]].currentInterest = 0;
        }

        if (money > getBalance() || money == 0)
        {
            return;
        }
        transferCoin(_addr, money);

        playerEtraxAddr_[_addr].allEarning += money;
    }

    function withDraw() public {
        address _addr = msg.sender;


        //实际能提的本金
        uint canWithDraw = (playerxID_[pIDxAddr_[_addr]].reinvest / nMustRollInNum) * nBugBonus;

        //实际能提的本金
        if (canWithDraw > playerEtraxAddr_[_addr].earningPrincipal)
        {
            canWithDraw -= playerEtraxAddr_[_addr].earningPrincipal;
        }
        else
        {
            canWithDraw = 0;
        }

        //实际提现金额
        uint money = 0;

        //给本金
        if (playerxID_[pIDxAddr_[_addr]].turnBonus >= canWithDraw)
        {
            playerEtraxAddr_[_addr].earningPrincipal += canWithDraw;
            money += canWithDraw;
            playerxID_[pIDxAddr_[_addr]].turnBonus -= canWithDraw;
        }

        //给利息 必须能提
        if (playerxID_[pIDxAddr_[_addr]].currentInterest > 0 && playerxID_[pIDxAddr_[_addr]].turnBonus >= playerxID_[pIDxAddr_[_addr]].currentInterest)
        {
            money += playerxID_[pIDxAddr_[_addr]].currentInterest;

            playerxID_[pIDxAddr_[_addr]].turnBonus -= playerxID_[pIDxAddr_[_addr]].currentInterest;

            playerxID_[pIDxAddr_[_addr]].currentInterest = 0;
        }

        //推荐奖励必须走
        money += playerEtraxAddr_[_addr].currentPerformanceOne;
        money += playerEtraxAddr_[_addr].currentPerformanceTwo;


        if (money > getBalance() || money == 0)
        {
            return;
        }
        transferCoin(_addr, money);

        playerEtraxAddr_[_addr].allEarning += money;
        playerEtraxAddr_[_addr].currentPerformanceOne = 0;
        playerEtraxAddr_[_addr].currentPerformanceTwo = 0;
    }

    function getBalance() view public returns (uint){
        return address(this).balance;
    }

    function getIDxAddr(uint _id) private returns (address){
        return playerxID_[_id].addr;
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
}

library DataSets {
    struct PlayerInfo {
        address addr;   // player address
        uint [] rollInArray;
        uint [99] agents;//我的上级代理
        uint [4] levelArray;//使我升级的玩家数
        uint allBuy; // 所有投入的钱 只增不减
        uint turnBuy; // 这一局买入花的钱
        uint turnBonus; // 当前本金
        uint currentBonus; // 本轮序列收益
        uint reinvest; // 复投次数
        uint unionBonus; // 联盟奖
        uint currentInterest; // 当前利息
    }

    struct PlayerEtra {
        uint performance; // 我推荐别人 我的业绩
        uint level; // 当前玩家的等级，0普通会员，1银级会员，2金级会员，3钻级会员
        uint currentRound;
        uint allEarning;// 所有提的钱 只增不减
        uint lostTimes;
        uint currentPerformanceOne;// 当前晋级奖1
        uint currentPerformanceTwo;// 当前晋级奖2
        uint earningPrincipal;// 已提的本金
    }

    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
        uint256 luckyPotCoin;//本周幸运奖池
        uint256 totalNum;   //总投单数
    }
}