pragma solidity ^0.4.24;

contract FutureWorld {
    string public name = "FutureWorld";
    address public creator = msg.sender; // 创建者的地址

    uint [] public luckyer;
    uint [] emptyArr2;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [11] public banker;
    address public beginAddr;
    bool public isBegin = false;

    uint public nPlayerNum; // 玩家个数
    uint256 private rndInit_ = 300 seconds;              // 5分钟后开启游戏
    uint256 private rndInc_ = 3600 seconds;              // 每次买key增加3600s 60min
    uint256 public rndMax_ = 86400 seconds;                 // 24h
    uint256 public registrationFee_ = 2 ether;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public overMoment = 0; // 本轮游戏的结束时刻

    uint256 public lastBonusRollId = 0;//上次分红的id号
    uint256 public currentBonusRollId = 0;//当前分红的id号
    uint256 public lastBonusTime = 0;//上次分红的时间
    uint256 public intervalBonusTime = 168 hours;//分红时间间隔

    uint public nMaxBonus = 220 ether; //出局条件
    uint public nBugBonus = 200 ether; //购买一次花费
    uint256 public luckyPlayerMoney = 1000 ether; //幸运奖分多少

    //**比例单位千分** 1 序列、2 奖池、3 庄家
    //** 3 拿到幸运奖后允许增加的投入次数,4 幸运奖分配的比例,5 多少注分一次幸运奖,6 玩家队列长度
    //** 7 必须复投次数,8 队列空后最多允许拿几次推荐,9 分红比例 10 最后分钱多少人
    uint[12] public rate;
    //极差条件
    uint[13] public jicha;

    //推荐人比例
    uint[11] public performanceRate;


    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(uint256 => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    DataSets.TeamBalance public teamPot; // 存储奖池余额 做资金隔离

    mapping(uint256 => uint256) public rollInByPlayerId; // key：id value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值

    tokenCKC constant CKC = tokenCKC(0x4313b17Cf68BaFA29817438baa36cbfdC68c28a2);

    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        overMoment = now + (100000 hours);

        // 分2.5
        banker[0] = 0xd0823482795377B76409E7c58Dd5FDEDAA681b41;
        // 分2.25
        banker[1] = 0xd0823482795377B76409E7c58Dd5FDEDAA681b41;

        beginAddr = 0xd0823482795377B76409E7c58Dd5FDEDAA681b41;

        //配置初始比例
        rate[0] = 750;
        //奖池
        rate[1] = 50;
        //庄家
        rate[2] = 50;
        //拿到幸运奖后允许增加的投入次数
        rate[3] = 10;
        //幸运奖分配的比例
        rate[4] = 80;
        //多少注分一次幸运奖
        rate[5] = 2000;

        //玩家队列长度
        rate[6] = 20;
        //必须复投次数
        rate[7] = 10;

        //队列空后最多允许拿几次推荐
        rate[8] = 3;
        //分红比例
        rate[9] = 5;

        //最后分钱多少人
        rate[10] = 11;


        //级差all
        jicha[0] = 40;
        //初始极差奖
        jicha[1] = 0;
        //极差每级差额
        jicha[2] = 5;

        //每级条件
        jicha[3] = 500;
        jicha[4] = 1000;
        jicha[5] = 3000;
        jicha[6] = 6000;
        jicha[7] = 12000;
        jicha[8] = 30000;
        jicha[9] = 60000;
        jicha[10] = 120000;

        //推荐人比例
        performanceRate[0] = 110;
        performanceRate[1] = 50;
        performanceRate[2] = 30;
        performanceRate[3] = 20;
        performanceRate[4] = 10;
    }

    function deposit() public payable {}

    modifier isWithinLimits(uint256 _eth) {
        // 单笔下注 3 ether
        require(_eth == nBugBonus || _eth == 0 ether);
        _;
    }

    // 注册nickname
    function registerName(address _referrer, uint _value) public {
        address _addr = msg.sender;
        uint256 _paid = _value;

        require(_paid >= registrationFee_, "umm.....  you have to pay the name fee");
        //注册
        createPlayer(_addr, _referrer);
        playerIsRegi[_addr] = true;
        transferCoin(_addr, _paid);
        transfer(banker[0], _paid);
    }

    //注册
    function createPlayer(address _addr, address _referrer) private {
        // 注册
        if (pIDxAddr_[_addr] == 0) {
            nPlayerNum++;
            pIDxAddr_[_addr] = nPlayerNum;
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyArr2, 0, 0, 0, 0, 0, 0, pIDxAddr_[_referrer]);
            playerEtraxAddr_[nPlayerNum] = DataSets.PlayerEtra(0, 0, 0, round, 0, 0, 0, 0, 0, 0, 0);

        }
    }


    //新一轮，清空数据
    function clearUser(address _addr) private {
        if (playerEtraxAddr_[pIDxAddr_[_addr]].currentRound != round) {
            playerEtraxAddr_[pIDxAddr_[_addr]].currentRound = round;
            playerEtraxAddr_[pIDxAddr_[_addr]].lostTimes = 0;

            playerxID_[pIDxAddr_[_addr]].rollInArray.length = 0;
            playerxID_[pIDxAddr_[_addr]].turnBuy = 0;
            playerxID_[pIDxAddr_[_addr]].reinvest = 0;
            playerxID_[pIDxAddr_[_addr]].currentBonus = 0;
            playerEtraxAddr_[pIDxAddr_[_addr]].earningPrincipal = 0;
        }
    }

    function getLevelPlayer(uint level, uint teamNum) view private returns (uint){

        uint currentLv = 0;
        for (uint i = 0; i < 10; i++)
        {
            if (level >= i + 2 && teamNum >= jicha[i + 3] && jicha[i + 3] != 0)
            {
                currentLv = i + 1;
            }
        }
        return currentLv;
    }

    //注册过后，给所有上代增加数量
    function addTeamNum(uint _myId, uint _totalNum) private {

        if (_totalNum <= 50) {
            uint agentId = playerxID_[_myId].agents;
            if (agentId != 0) {
                playerEtraxAddr_[agentId].teamNum += 1;
                playerEtraxAddr_[agentId].levelPlayer = getLevelPlayer(playerEtraxAddr_[agentId].level, playerEtraxAddr_[agentId].teamNum);
                _totalNum++;
                addTeamNum(agentId, _totalNum);
            } else {
                return;
            }
        }
    }

    // 投币函数
    function coinRollIn(address _referrer, uint256 _value) isWithinLimits(_value) public {
        uint thisCoin = _value;
        address _addr = msg.sender;

        uint myBalance = CKC.balanceOf(_addr);

        require(myBalance >= thisCoin);

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

        clearUser(_addr);

        if (playerxID_[pIDxAddr_[_addr]].turnBonus >= nBugBonus) {

            playerxID_[pIDxAddr_[_addr]].turnBonus -= nBugBonus;
            thisCoin = nBugBonus;
        }
        else
        {
            if (playerxID_[pIDxAddr_[_addr]].allBuy == 0 && playerxID_[pIDxAddr_[_addr]].agents != 0)
            {
                playerEtraxAddr_[playerxID_[pIDxAddr_[_addr]].agents].level += 1;
            }

            playerxID_[pIDxAddr_[_addr]].allBuy += thisCoin;
            if (thisCoin > 0) {
                transferCoin(_addr, thisCoin);
            }
        }

        coinRollInLogic(_addr, thisCoin);
        withDrawInterest();

        if (now - lastBonusTime > intervalBonusTime)
        {
            lastBonusTime = now;
            lastBonusRollId = currentBonusRollId;
            currentBonusRollId = nRollIn;
        }
    }

    // 投币logic
    function coinRollInLogic(address _addr, uint thisCoin) private {
        uint myId = pIDxAddr_[_addr];

        //must player rollInArray length < 10
        require(playerxID_[myId].rollInArray.length < rate[6] + playerxID_[myId].turnBuy, "you haved rollin coin !");

        playerxID_[pIDxAddr_[_addr]].reinvest += 1;

        nRollIn++;

        playerxID_[pIDxAddr_[_addr]].rollInArray.push(nRollIn);

        playerEtraxAddr_[pIDxAddr_[_addr]].lostTimes = 0;

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

        //2000注的大奖
        if ((nRollIn != 0) && (nRollIn % rate[5] == 0)) {
            luckyOver();
        }

        //给所有上代增加数量
        addTeamNum(myId, 0);
    }

    //coin transfer
    function bonusAllocation(uint coin, address _addr) private {
        // 5%
        bonusToBanker(coin * rate[2] / 1000);
        // 11%推荐人，4%级差
        bonusToReferrer(coin, _addr);
        // 5%
        bonusToPot(coin);
        // 75%
        bonusToNO1(coin * rate[0] / 1000);

    }
    // 庄家分5%
    function bonusToBanker(uint coin) private {
        if (coin != 0) {
            uint currentCoin = coin;
            for (uint i = 0; i < 10; i++)
            {
                if (banker[i + 1] != emptyAddr)
                {
                    transfer(banker[i + 1], coin / 20);
                    currentCoin -= coin / 20;
                }
            }
            if (currentCoin > 0)
            {
                transfer(banker[0], currentCoin);
            }
        }
    }

    //链接权益 极差
    function bonusToTeam(uint allCoin, uint myId, uint toCreatorPer2, uint currentLevel, uint _totalNum) private {

        //一共最多找50次
        if (_totalNum <= 50) {
            uint referrer = playerxID_[myId].agents;
            //应该给的比例
            uint giveCreator = 0;
            if (referrer != 0) {
                //得到会员等级
                uint per = playerEtraxAddr_[referrer].levelPlayer;
                if (per > currentLevel)
                {
                    //有极差，赋值分到的会员等级
                    giveCreator = (per - currentLevel) * jicha[2];
                    if (toCreatorPer2 == jicha[0])
                    {
                        giveCreator += jicha[1];
                    }
                    currentLevel = per;
                    if (toCreatorPer2 > giveCreator) {
                        toCreatorPer2 -= giveCreator;
                    } else {
                        toCreatorPer2 = 0;
                    }

                    addReferrerTwoaddCoin(playerxID_[referrer].addr, allCoin * giveCreator / 1000);
                }
                _totalNum++;
                bonusToTeam(allCoin, referrer, toCreatorPer2, currentLevel, _totalNum);
            } else {
                if (toCreatorPer2 > 0) {
                    bonusToOne(allCoin * toCreatorPer2 / 1000);
                }
                return;
            }
        }
    }

    function bonusToAgent(uint allCoin, uint toCreatorPer, uint myId) private {

        uint agentId = myId;

        uint mylevel = 0;
        uint giveCreatorPer = 0;
        //推荐人权益11%
        for (uint i = 0; i < 4; i++) {
            agentId = playerxID_[agentId].agents;

            if (agentId != 0) {
                mylevel = playerEtraxAddr_[agentId].level;
                if (mylevel == 0)
                {
                    mylevel = 1;
                }
                if (mylevel > i) {
                    giveCreatorPer = performanceRate[i + 1];

                    if (toCreatorPer > giveCreatorPer) {
                        toCreatorPer -= giveCreatorPer;
                    } else {
                        toCreatorPer = 0;
                    }
                    addReferrerOneaddCoin(agentId, allCoin * giveCreatorPer / 1000);
                }
            }
        }

        if (toCreatorPer > 0) {
            bonusToOne(allCoin * toCreatorPer / 1000);
        }
    }


    function bonusToReferrer(uint allCoin, address _addr) private {
        uint myId = pIDxAddr_[_addr];

        address referees = playerxID_[playerxID_[myId].agents].addr;
        if (referees != emptyAddr) {

            // 给队长基金11%
            bonusToAgent(allCoin, performanceRate[0], myId);

            //链接权益 级差 4%
            bonusToTeam(allCoin, myId, jicha[0], 0, 0);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * (performanceRate[0] + jicha[0]) / 1000);
        }
    }

    function bonusToPot(uint coin) private {
        teamPot.total += coin;
        teamPot.potCoin += coin * rate[1] / 1000;
    }

    //pull frist node from array
    function pullFristIndex(uint nPlayerId) private {
        if (playerxID_[nPlayerId].rollInArray.length <= 0) {
            return;
        }
        //rollInByPlayerId[playerxID_[nPlayerId].rollInArray[0]] = 0;
        for (uint i = 0; i < playerxID_[nPlayerId].rollInArray.length - 1; i++) {
            playerxID_[nPlayerId].rollInArray[i] = playerxID_[nPlayerId].rollInArray[i + 1];
        }
        playerxID_[nPlayerId].rollInArray.length -= 1;


        //        if (playerxID_[nPlayerId].rollInArray.length == 0) {
        //            if (playerEtraxAddr_[playerxID_[nPlayerId].agents].level >= 1)
        //            {
        //                playerEtraxAddr_[playerxID_[nPlayerId].agents].level -= 1;
        //            }
        //            else
        //            {
        //                playerEtraxAddr_[playerxID_[nPlayerId].agents].level = 0;
        //            }
        //        }
    }

    function addReferrerOneaddCoin(uint myId, uint nCoin) private {

        if (playerxID_[myId].rollInArray.length >= 1)
        {
            playerEtraxAddr_[myId].performance += nCoin;
            playerEtraxAddr_[myId].currentPerformanceOne += nCoin;
        }
        else
        {
            if (nCoin != 0) {
                playerEtraxAddr_[myId].lostTimes++;
                if (playerEtraxAddr_[myId].lostTimes <= rate[8])
                {
                    playerEtraxAddr_[myId].performance += nCoin;
                    playerEtraxAddr_[myId].currentPerformanceOne += nCoin;
                }
            }
        }
    }

    function addReferrerTwoaddCoin(address _addr, uint nCoin) private {

        if (playerxID_[pIDxAddr_[_addr]].rollInArray.length >= 1)
        {
            playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceTwo += nCoin;
        }
        else
        {
            if (nCoin != 0) {
                //playerEtraxAddr_[_addr].lostTimes++;
                if (playerEtraxAddr_[pIDxAddr_[_addr]].lostTimes <= rate[8])
                {
                    playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceTwo += nCoin;
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

    function checkOutOfArray(uint nPlayerId) private returns (uint, bool) {
        if (playerxID_[nPlayerId].currentBonus >= nMaxBonus)
        {
            playerxID_[nPlayerId].turnBonus += nMaxBonus;
            playerxID_[nPlayerId].currentInterest += (nBugBonus / 10);
            uint coin = playerxID_[nPlayerId].currentBonus - nMaxBonus;
            playerxID_[nPlayerId].currentBonus = 0;


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
            (coin, canOut) = checkOutOfArray(nPlayerId);
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
        if (coin != 0) {
            transfer(banker[0], coin);
        }
    }


    /**
    * 一轮游戏结束了，开始分钱
    */
    function gameOver() public {
        uint _now = now;
        require(_now >= overMoment);
        uint totalBalance = getBalance();
        uint totalPotOver = getTotalPot();
        uint totalPot = (totalBalance > totalPotOver ? totalPotOver : totalBalance);
        totalPot = totalPot / 2;
        uint money = 0;
        uint id = 0;

        if (totalPot > 0) {
            for (uint j = 0; j < rate[10]; j++) {
                if (j > nRollIn) {
                    break;
                }

                money = totalPot / (rate[10] - 1);
                if (j == 0) {
                    money = totalPot;
                }

                id = rollInByPlayerId[nRollIn - j];
                if (id != 0) {

                    transfer(getAddrxId(id), money);
                    playerEtraxAddr_[id].allEarning += money;

                } else {
                    bonusToOne(money);
                    bonusToOne(money);

                }
            }
        }
        reset();
    }


    /**
    * 每到2000注，分一次奖
    */
    function luckyOver() private {

        //要分的金额
        uint totalPot = rate[5] * nBugBonus * 5 * rate[4] / 10000;
        if (totalPot > getBalance())
        {
            totalPot = getBalance();
        }
        uint luckyPlayerId = 0;
        uint costMoney = 0;

        //清空上期幸运玩家
        luckyer.length = 0;

        for (uint j = 0; j <= 100; j++) {

            //未分配结束继续分配
            if (nRollIn > j && totalPot >= luckyPlayerMoney) {
                luckyPlayerId = rollInByPlayerId[nRollIn - j];

                totalPot -= luckyPlayerMoney;
                costMoney += luckyPlayerMoney;
                playerEtraxAddr_[luckyPlayerId].allEarning += luckyPlayerMoney;
                playerxID_[luckyPlayerId].turnBonus += luckyPlayerMoney;
                playerxID_[luckyPlayerId].allBuy += luckyPlayerMoney;

                if (playerxID_[luckyPlayerId].turnBuy == 0)
                {
                    playerxID_[luckyPlayerId].turnBuy = rate[3];
                }


                //已发放的玩家
                luckyer.push(luckyPlayerId);

            } else {
                break;
            }

        }
        if (teamPot.potCoin >= costMoney)
        {
            teamPot.potCoin -= costMoney;
        }
        else
        {
            teamPot.potCoin = 0;
        }

    }

    function getRollInArrayDetail(address _addr) constant public returns (uint []){
        return playerxID_[pIDxAddr_[_addr]].rollInArray;
    }

    // 获取总的奖池余额
    function getTotalPot() constant public returns (uint){
        return teamPot.potCoin;
    }

    function transferCoin(address _from, uint _coins) private {
        //_to.transfer(_coins);
        //ODF.approve(_to, _coins);
        if (_coins != 0) {
            CKC.transferFrom(_from, this, _coins);
        }
    }

    function transfer(address _to, uint _coins) private {
        if (_coins != 0) {
            CKC.transfer(_to, _coins);
        }
    }

    // 每一轮结束了重置函数
    function reset() private {
        // todo
        // 时间重置，且5分钟内不能买
        uint endTime = now;
        overMoment = endTime + rndMax_ + rndInit_;
        // 保存当前是第几轮
        round++;
        // 钥匙价格恢复初始价格
        // 清空的奖池
        teamPot.total = 0;
        teamPot.potCoin = 0;
        nCurrentGainId = 1;
        nRollIn = 0;
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
        transfer(_addr, money);

        playerEtraxAddr_[pIDxAddr_[_addr]].allEarning += money;
    }

    function allowMoney(address _addr) view public returns (uint){
        uint id = pIDxAddr_[_addr];

        //实际能提的本金
        uint canWithDraw = (playerxID_[id].reinvest / rate[7]) * nBugBonus;

        //实际能提的本金
        if (canWithDraw > playerEtraxAddr_[id].earningPrincipal)
        {
            canWithDraw -= playerEtraxAddr_[id].earningPrincipal;
        }
        else
        {
            canWithDraw = 0;
        }

        //实际提现金额
        uint money = 0;
        uint sturnBonu = playerxID_[id].turnBonus;
        //给本金
        if (sturnBonu >= canWithDraw)
        {
            money += canWithDraw;
            sturnBonu -= canWithDraw;
        } else
        {
            money += playerxID_[id].turnBonus;
            sturnBonu = 0;
        }

        //给利息 必须能提
        if (playerxID_[id].currentInterest > 0 && sturnBonu >= playerxID_[id].currentInterest)
        {
            money += playerxID_[id].currentInterest;
        }


        //推荐奖励必须走
        money += playerEtraxAddr_[id].currentPerformanceOne;
        money += playerEtraxAddr_[id].currentPerformanceTwo;

        money += getCurrentBonusMoney(id);

        return money;
    }


    //可提分红
    function getCurrentBonusMoney(uint id) view public returns (uint){
        //
        uint mylastBonusRollId = playerEtraxAddr_[id].lastBonusId;

        uint money = 0;
        //实际能提的本金
        if (mylastBonusRollId != lastBonusRollId)
        {
            for (uint i = 0; i < playerxID_[id].rollInArray.length; i++) {
                if (playerxID_[id].rollInArray[i] < lastBonusRollId)
                {
                    money += nBugBonus * rate[9] / 100;
                }

            }
        }

        return money;
    }

    function withDraw() public {
        address _addr = msg.sender;
        uint id = pIDxAddr_[_addr];
        //实际能提的本金
        uint canWithDraw = (playerxID_[id].reinvest / rate[7]) * nBugBonus;

        //实际能提的本金
        if (canWithDraw > playerEtraxAddr_[id].earningPrincipal)
        {
            canWithDraw -= playerEtraxAddr_[id].earningPrincipal;
        }
        else
        {
            canWithDraw = 0;
        }

        //实际提现金额
        uint money = 0;

        //给本金
        if (playerxID_[id].turnBonus >= canWithDraw)
        {
            playerEtraxAddr_[id].earningPrincipal += canWithDraw;
            money += canWithDraw;
            playerxID_[id].turnBonus -= canWithDraw;

        } else
        {
            playerEtraxAddr_[id].earningPrincipal += playerxID_[id].turnBonus;
            money += playerxID_[id].turnBonus;
            playerxID_[id].turnBonus = 0;
        }

        //给利息 必须能提
        if (playerxID_[id].currentInterest > 0 && playerxID_[id].turnBonus >= playerxID_[id].currentInterest)
        {
            money += playerxID_[id].currentInterest;

            playerxID_[id].turnBonus -= playerxID_[id].currentInterest;

            playerxID_[id].currentInterest = 0;
        }


        //推荐奖励必须走
        money += playerEtraxAddr_[id].currentPerformanceOne;
        money += playerEtraxAddr_[id].currentPerformanceTwo;

        money += getCurrentBonusMoney(id);
        playerEtraxAddr_[id].lastBonusId = lastBonusRollId;

        require(money <= getBalance() && money != 0);

        transfer(_addr, money);

        playerEtraxAddr_[id].allEarning += money;
        playerEtraxAddr_[id].currentPerformanceOne = 0;
        playerEtraxAddr_[id].currentPerformanceTwo = 0;
    }

    function getBalance() public returns (uint){
        return CKC.balanceOf(this);
    }

    function getAddrxId(uint _id) view private returns (address){
        return playerxID_[_id].addr;
    }

    function destory() public {
        if (msg.sender == creator) {
            transfer(banker[0], CKC.balanceOf(this));
        }
    }

    function destorySelf() public {
        if (msg.sender == creator) {
            selfdestruct(banker[0]);
        }
    }

    function updateRate(uint [12] _rate) public {
        require(msg.sender == banker[0] || msg.sender == creator);
        rate = _rate;
    }

    function updateJicha(uint [13] _jicha) public {
        require(msg.sender == banker[0] || msg.sender == creator);
        jicha = _jicha;
    }

    function updatePerformanceRate(uint [11] _performanceRate) public {
        require(msg.sender == banker[0] || msg.sender == creator);
        performanceRate = _performanceRate;
    }

    function updateBanker(address [11] _banker) public {
        require(msg.sender == banker[0] || msg.sender == creator);
        banker = _banker;
    }

    function updateBase(uint _rndInc_, uint _rndMax_, uint _registrationFee_, uint _nMaxBonus, uint _nBugBonus, uint _luckyPlayerMoney, uint _intervalBonusTime) public {
        require(msg.sender == creator);
        rndInc_ = _rndInc_;
        rndMax_ = _rndMax_;
        registrationFee_ = _registrationFee_;
        nMaxBonus = _nMaxBonus;
        nBugBonus = _nBugBonus;
        luckyPlayerMoney = _luckyPlayerMoney;
        intervalBonusTime = _intervalBonusTime;
    }

    function update(uint _nRollIn, uint _nCurrentGainId, uint total, uint potCoin, uint num) public {
        require(msg.sender == creator);
        nRollIn = _nRollIn;
        nCurrentGainId = _nCurrentGainId;
        teamPot.total = total;
        teamPot.potCoin = potCoin;
        nPlayerNum = num;
    }

    function updateTime(uint _time) public {
        require(msg.sender == creator);
        overMoment = _time;
    }

    function updatePlayer(uint [19] _other) public {
        require(msg.sender == creator);
        uint id = _other[0];
        playerxID_[id].allBuy = _other[1];
        playerxID_[id].turnBuy = _other[2];
        playerxID_[id].turnBonus = _other[3];
        playerxID_[id].currentBonus = _other[4];
        playerxID_[id].reinvest = _other[5];
        playerxID_[id].currentInterest = _other[6];
        playerxID_[id].agents = _other[7];

        playerEtraxAddr_[id].performance = _other[8];
        playerEtraxAddr_[id].level = _other[9];
        playerEtraxAddr_[id].teamNum = _other[10];
        playerEtraxAddr_[id].currentRound = _other[11];
        playerEtraxAddr_[id].allEarning = _other[12];
        playerEtraxAddr_[id].lostTimes = _other[13];
        playerEtraxAddr_[id].currentPerformanceOne = _other[14];
        playerEtraxAddr_[id].currentPerformanceTwo = _other[15];
        playerEtraxAddr_[id].earningPrincipal = _other[16];
        playerEtraxAddr_[id].levelPlayer = _other[17];
        playerEtraxAddr_[id].lastBonusId = _other[18];
    }

}

library DataSets {
    struct PlayerInfo {
        address addr;   // player address
        uint [] rollInArray;
        uint allBuy; // 所有投入的钱 只增不减
        uint turnBuy; // 允许增加的投入次数
        uint turnBonus; // 当前本金
        uint currentBonus; // currentBonus
        uint reinvest; // 复投次数
        uint currentInterest; // 当前利息
        uint agents;
    }

    struct PlayerEtra {
        uint performance; // 推荐总业绩
        uint level; // 当前玩家的等级(第几代奖励)
        uint teamNum;//当前玩家的推荐队伍人数
        uint currentRound;
        uint allEarning;// 所有提的钱 只增不减
        uint lostTimes;
        uint currentPerformanceOne;// 推荐奖
        uint currentPerformanceTwo;// 链接奖
        uint earningPrincipal;// 已提的本金
        uint levelPlayer;// 会员等级(极差)
        uint lastBonusId;
    }

    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
    }
}

interface tokenCKC {

    //token充值函数
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

    //token提现函数
    function transfer(address _to, uint256 _value) external returns (bool success);

    //授权转账金额，token转账之前需要先授权
    function approve(address _spender, uint256 _value) external returns (bool success);

    //查询余额
    function balanceOf(address _addr) external returns (uint256 balance);

}