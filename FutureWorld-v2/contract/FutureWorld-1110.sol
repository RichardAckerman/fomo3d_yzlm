pragma solidity ^0.4.24;

contract FutureWorld {
    string public name = "FutureWorld";
    address public creator = msg.sender; // 创建者的地址

    uint [] public luckyer;
    uint [10] emptyArr;
    uint [] emptyArr2;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [11] public banker;
    address public beginAddr;
    bool public isBegin = false;

    uint public nPlayerArraySize = 20; // 玩家队列长度
    uint public nMustRollInNum = 10; // 必须复投次数，为1时。不需要复投也可以提取本金

    uint public nPlayerNum; // 玩家个数
    uint256 private rndInit_ = 300 seconds;              // 5分钟后开启游戏
    uint256 private rndInc_ = 3600 seconds;              // 每次买key增加3600s 60min
    uint256 public rndMax_ = 86400 seconds;                 // 24h
    uint256 public registrationFee_ = 2 ether;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻


    uint public nMaxBonus = 110 ether; //出局条件
    uint public nBugBonus = 100 ether; //购买一次花费
    uint256 luckyPlayerMoney = 1000 ether; //幸运奖分多少
    uint public lostTimesMax = 3; //队列空后最多允许拿几次推荐

    //**比例单位千分** 序列、1级、2级、3级、4级、级差奖励、奖池、庄家、级差条件
    //** 16 拿到幸运奖后允许增加的投入次数,17 幸运奖分配的比例,18 多少注分一次幸运奖
    uint[19] public rate;


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
        // 分2.5
        banker[0] = 0xaAC9F23C2Db4764Cd0A8078050Dbb5809c8AdD99;
        // 分2.25
        banker[1] = 0x6F10C2ed3d99C3825e4164ff1Af42632A422419E;
        banker[2] = banker[1];
        banker[3] = banker[1];
        banker[4] = banker[1];
        banker[5] = banker[1];
        banker[6] = banker[1];
        banker[7] = banker[1];
        banker[8] = banker[1];
        banker[9] = banker[1];
        banker[10] = banker[1];

        beginAddr = 0xf25B94B9C913D47Eee97f597D4c2f9124779527f;

        //配置初始比例
        rate[0] = 750;
        rate[1] = 50;
        rate[2] = 30;
        rate[3] = 20;
        rate[4] = 10;

        //级差单位比例
        rate[5] = 40;

        rate[6] = 50;
        rate[7] = 50;

        rate[8] = 500;
        rate[9] = 1000;
        rate[10] = 3000;
        rate[11] = 6000;
        rate[12] = 12000;
        rate[13] = 30000;
        rate[14] = 60000;
        rate[15] = 120000;

        rate[16] = 10;
        rate[17] = 80;
        rate[18] = 2000;
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
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyArr2, emptyArr, 0, 0, 0, 0, 0, 0);
            playerEtraxAddr_[nPlayerNum] = DataSets.PlayerEtra(0, 0, 0, round, 0, 0, 0, 0, 0, 0);

            // 挂代理
            if (_referrer != emptyAddr && playerIsRegi[_referrer] == true) {
                for (uint i = 0; i < 9; i++) {
                    playerxID_[nPlayerNum].agents[i] = playerxID_[pIDxAddr_[_referrer]].agents[i + 1];
                }
                playerxID_[nPlayerNum].agents[9] = pIDxAddr_[_referrer];

                //lv up
                if (playerEtraxAddr_[pIDxAddr_[_referrer]].level < 4) {
                    playerEtraxAddr_[pIDxAddr_[_referrer]].level += 1;
                }
            }
        }
    }

    //新一轮，清空数据
    function clearUser(address _addr) private {
        if (playerEtraxAddr_[pIDxAddr_[_addr]].currentRound != round) {
            playerEtraxAddr_[pIDxAddr_[_addr]].currentRound = round;
            playerEtraxAddr_[pIDxAddr_[_addr]].lostTimes = 0;

            playerxID_[pIDxAddr_[_addr]].rollInArray.length = 0;
            playerxID_[pIDxAddr_[_addr]].allBuy = 0;
            playerxID_[pIDxAddr_[_addr]].turnBuy = 0;
            playerxID_[pIDxAddr_[_addr]].reinvest = 0;
            playerxID_[pIDxAddr_[_addr]].currentBonus = 0;
            playerEtraxAddr_[pIDxAddr_[_addr]].earningPrincipal = 0;
        }
    }

    function getLevelPlayer(uint level, uint teamNum) view private returns (uint){
        if (level >= 2 && teamNum >= rate[8])
        {
            if (level >= 3 && teamNum >= rate[9])
            {
                if (level >= 4 && teamNum >= rate[10])
                {
                    if (level >= 5 && teamNum >= rate[11])
                    {
                        if (level >= 6 && teamNum >= rate[12])
                        {
                            if (level >= 7 && teamNum >= rate[13])
                            {
                                if (level >= 8 && teamNum >= rate[14])
                                {
                                    if (level >= 9 && teamNum >= rate[15])
                                    {
                                        return 8;
                                    }
                                    return 7;
                                }
                                return 6;
                            }
                            return 5;
                        }
                        return 4;
                    }
                    return 3;
                }
                return 2;
            }
            return 1;
        }
        return 0;
    }

    //注册过后，给所有上代增加数量
    function addTeamNum(address _addr, uint _totalNum) private {

        if (_totalNum <= 5) {
            for (uint i = 9; i >= 0 && i < 10; i--) {
                address referrer = getAddrxId(playerxID_[pIDxAddr_[_addr]].agents[i]);

                if (referrer != emptyAddr) {
                    playerEtraxAddr_[pIDxAddr_[referrer]].teamNum += 1;
                    playerEtraxAddr_[pIDxAddr_[referrer]].levelPlayer = getLevelPlayer(playerEtraxAddr_[pIDxAddr_[referrer]].level, playerEtraxAddr_[pIDxAddr_[referrer]].teamNum);
                    if (i == 0) {
                        _totalNum++;
                        addTeamNum(referrer, _totalNum);
                    }
                } else {
                    return;
                }
            }
        }

    }

    // 投币函数
    function coinRollIn(address _referrer, uint256 _value) isWithinLimits(_value) public {
        uint thisCoin = _value;
        address _addr = msg.sender;

        uint myBalance = CKC.balanceOf(_addr);

        require(myBalance >= thisCoin);

        // register logic
        createPlayer(_addr, _referrer);

        clearUser(_addr);

        if (playerxID_[pIDxAddr_[_addr]].turnBonus >= nBugBonus) {

            playerxID_[pIDxAddr_[_addr]].turnBonus -= nBugBonus;
            thisCoin = nBugBonus;
        }
        else
        {
            playerxID_[pIDxAddr_[_addr]].allBuy += thisCoin;
            if (thisCoin > 0) {
                transferCoin(_addr, thisCoin);
            }
        }

        if (thisCoin < nBugBonus)
        {
            return;
        }

        coinRollInLogic(_addr, thisCoin);
        withDrawInterest();
    }

    // 投币logic
    function coinRollInLogic(address _addr, uint thisCoin) private {
        //begin logic
        if (isBegin == false) {
            if (beginAddr == _addr) {
                isBegin = true;
                // 第一人买后 此值改为true
                overMoment = now + rndMax_;
            }
            require(isBegin == true, "game is not begin");
        }

        //must player rollInArray length < 10
        require(playerxID_[pIDxAddr_[_addr]].rollInArray.length < nPlayerArraySize + playerxID_[pIDxAddr_[_addr]].turnBuy, "you haved rollin coin !");

        //data change
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
        if ((nRollIn != 0) && (nRollIn % rate[18] == 0)) {
            luckyOver();
        }

        //给所有上代增加数量
        addTeamNum(_addr, 0);
    }

    function returnAgent(address _addr) public constant returns (uint [10]){
        return playerxID_[pIDxAddr_[_addr]].agents;
    }

    //coin transfer
    function bonusAllocation(uint coin, address _addr) private {
        // 5%
        bonusToBanker(coin * rate[7] / 1000);
        // 11%推荐人，4%级差
        bonusToReferrer(coin, _addr);
        // 5%
        bonusToPot(coin);
        // 75%
        bonusToNO1(coin * rate[0] / 1000);

        //剩余比例
        uint allRate = rate[0] + rate[1] + rate[2] + rate[3] + rate[4] + rate[5] + rate[6] + rate[7];
        if (allRate < 1000) {
            uint lastRate = 1000 - allRate;
            bonusToOne(coin * lastRate / 1000);
        }
    }
    // 庄家分5%
    function bonusToBanker(uint coin) private {
        if (coin != 0) {
            transfer(banker[0], coin / 2);
            for (uint i = 0; i < 10; i++)
            {
                if (banker[i + 1] != emptyAddr)
                {
                    transfer(banker[i + 1], coin / 20);
                }
            }
        }
    }

    //链接权益 极差
    function bonusToTeam(uint allCoin, uint myId, uint toCreatorPer2, uint currentLevel, uint _totalNum) private {

        //一共最多找50次
        if (_totalNum <= 5) {
            for (uint i = 9; i >= 0 && i < 10; i--) {
                address referrer = getAddrxId(playerxID_[myId].agents[i]);
                //应该给的比例
                uint giveCreator = 0;

                if (referrer != emptyAddr) {
                    //得到会员等级
                    uint per = playerEtraxAddr_[pIDxAddr_[referrer]].levelPlayer;
                    if (per > currentLevel)
                    {
                        //有极差，赋值分到的会员等级
                        currentLevel = per;
                        giveCreator = per * rate[5] / 8;

                        if (toCreatorPer2 > giveCreator) {
                            toCreatorPer2 -= giveCreator;
                        } else {
                            toCreatorPer2 = 0;
                        }

                        addReferrerTwoaddCoin(referrer, allCoin * giveCreator / 1000);
                    }
                    if (i == 0) {
                        _totalNum++;
                        bonusToTeam(allCoin, pIDxAddr_[referrer], toCreatorPer2, currentLevel, _totalNum);
                    }

                } else {
                    if (toCreatorPer2 > 0) {
                        bonusToOne(allCoin * toCreatorPer2 / 1000);
                    }
                    return;
                }
            }
        }

    }

    function bonusToAgent(uint allCoin, uint myId) private {
        uint toCreatorPer = rate[2] + rate[3] + rate[4];

        //推荐人权益6%
        for (uint j = 0; j < 9; j++) {
            uint agentId = playerxID_[myId].agents[j];
            uint money = 0;
            if (agentId > 0) {
                uint level = playerEtraxAddr_[agentId].level;
                if (j == 6 && level >= 4) {
                    money = allCoin * rate[4] / 1000;
                    if (toCreatorPer > rate[4]) {
                        toCreatorPer -= rate[4];
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 7 && level >= 3) {
                    money = allCoin * rate[3] / 1000;
                    if (toCreatorPer > rate[3]) {
                        toCreatorPer -= rate[3];
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 8 && level >= 2) {
                    money = allCoin * rate[2] / 1000;
                    if (toCreatorPer > rate[2]) {
                        toCreatorPer -= rate[2];
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (money > 0)
                {
                    addReferrerOneaddCoin(playerxID_[agentId].addr, money);
                }
            }
        }

        if (toCreatorPer > 0) {
            bonusToOne(allCoin * toCreatorPer / 1000);
        }
    }


    function bonusToReferrer(uint allCoin, address _addr) private {
        uint myId = pIDxAddr_[_addr];

        address referees = playerxID_[playerxID_[myId].agents[9]].addr;
        if (referees != emptyAddr) {
            // 先给推荐人分5%
            uint num = allCoin * rate[1] / 1000;
            addReferrerOneaddCoin(referees, num);

            // 给队长基金6%
            bonusToAgent(allCoin, myId);

            //链接权益 级差 4%
            bonusToTeam(allCoin, myId, rate[5], 0, 0);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * (rate[1] + rate[2] + rate[3] + rate[4] + rate[5]) / 1000);
        }
    }

    function bonusToPot(uint coin) private {
        teamPot.total += coin;
        teamPot.potCoin += coin * rate[6] / 1000;
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
        //            if (playerEtraxAddr_[playerxID_[nPlayerId].referees].level >= 1)
        //            {
        //                playerEtraxAddr_[playerxID_[nPlayerId].referees].level -= 1;
        //            }
        //            else
        //            {
        //                playerEtraxAddr_[playerxID_[nPlayerId].referees].level = 0;
        //            }
        //        }
    }

    function addReferrerOneaddCoin(address _addr, uint nCoin) private {

        if (playerxID_[pIDxAddr_[_addr]].rollInArray.length >= 1)
        {
            playerEtraxAddr_[pIDxAddr_[_addr]].performance += nCoin;
            playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceOne += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            if (nCoin != 0) {
                playerEtraxAddr_[pIDxAddr_[_addr]].lostTimes++;
                if (playerEtraxAddr_[pIDxAddr_[_addr]].lostTimes <= lostTimesMax)
                {
                    playerEtraxAddr_[pIDxAddr_[_addr]].performance += nCoin;
                    playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceOne += nCoin;
                }
            }
        }
    }

    function addReferrerTwoaddCoin(address _addr, uint nCoin) private {

        if (playerxID_[pIDxAddr_[_addr]].rollInArray.length >= 1)
        {
            playerEtraxAddr_[pIDxAddr_[_addr]].performance += nCoin;
            playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceTwo += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            if (nCoin != 0) {
                //playerEtraxAddr_[_addr].lostTimes++;
                if (playerEtraxAddr_[pIDxAddr_[_addr]].lostTimes <= lostTimesMax)
                {
                    playerEtraxAddr_[pIDxAddr_[_addr]].performance += nCoin;
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
        bool exist = true;
        totalPot = totalPot / 2;

        if (totalPot > 0) {
            for (uint j = 0; j < 11; j++) {
                //没有玩家，分给庄家
                if (exist) {
                    if (nRollIn - j == 0) {
                        exist = false;
                    }
                }

                if (exist) {
                    if (j == 0) {
                        transfer(getAddrxId(rollInByPlayerId[nRollIn - j]), totalPot);
                        playerEtraxAddr_[rollInByPlayerId[nRollIn - j]].allEarning += totalPot;
                    } else {
                        transfer(getAddrxId(rollInByPlayerId[nRollIn - j]), totalPot / 10);
                        playerEtraxAddr_[rollInByPlayerId[nRollIn - j]].allEarning += totalPot / 10;
                    }
                } else {
                    if (j == 0) {
                        bonusToOne(totalPot);
                    } else {
                        bonusToOne(totalPot / 10);
                    }
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
        uint totalPot = rate[18] * nBugBonus * 5 * rate[17] / 10000;
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
                    playerxID_[luckyPlayerId].turnBuy = rate[16];
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
        uint canWithDraw = (playerxID_[id].reinvest / nMustRollInNum) * nBugBonus;

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

        return money;
    }

    function withDraw() public {
        address _addr = msg.sender;
        uint id = pIDxAddr_[_addr];
        //实际能提的本金
        uint canWithDraw = (playerxID_[id].reinvest / nMustRollInNum) * nBugBonus;

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

    function updateRate(uint [19] _rate) public {
        require(msg.sender == banker[0] || msg.sender == creator);
        rate = _rate;
    }

    function updateBanker(address [11] _banker) public {
        require(msg.sender == banker[0] || msg.sender == creator);
        banker = _banker;
    }

    function updateBase(uint _nPlayerArraySize, uint _nMustRollInNum, uint _rndInc_, uint _rndMax_, uint _registrationFee_, uint _nMaxBonus, uint _nBugBonus, uint _luckyPlayerMoney) public {
        require(msg.sender == creator);
        nPlayerArraySize = _nPlayerArraySize;
        nMustRollInNum = _nMustRollInNum;
        rndInc_ = _rndInc_;
        rndMax_ = _rndMax_;
        registrationFee_ = _registrationFee_;
        nMaxBonus = _nMaxBonus;
        nBugBonus = _nBugBonus;
        luckyPlayerMoney = _luckyPlayerMoney;
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

}

library DataSets {
    struct PlayerInfo {
        address addr;   // player address
        uint [] rollInArray;
        uint [10] agents;
        uint allBuy; // 所有投入的钱 只增不减
        uint turnBuy; // 允许增加的投入次数
        uint turnBonus; // 当前本金
        uint currentBonus; // currentBonus
        uint reinvest; // 复投次数
        uint currentInterest; // 当前利息
    }

    struct PlayerEtra {
        uint performance; // 我推荐别人 我的业绩
        uint level; // 当前玩家的等级(第几代奖励)
        uint teamNum;//当前玩家的推荐队伍人数
        uint currentRound;
        uint allEarning;// 所有提的钱 只增不减
        uint lostTimes;
        uint currentPerformanceOne;// 推荐奖
        uint currentPerformanceTwo;// 链接奖
        uint earningPrincipal;// 已提的本金
        uint levelPlayer;// 会员等级(极差)
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