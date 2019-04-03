pragma solidity ^0.4.24;

contract LuckyStar {
    string public name = "LuckyStar";
    address public creator = msg.sender; // 创建者的地址

    uint [10] public Luckyer; // 保存最后10名玩家编号
    uint [10] public luckyPotPerson;//保存9名幸运玩家编号
    uint [] emptyArr2;
    uint [4] emptyArr3;
    address [] emptyAddArray;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [8] public banker;
    address public registerBonusTo;
    address public beginAddr;
    address public root;
    bool public isBegin = false;

    uint public nPlayerArraySize = 1; // 同时拥有的最大收益号数目
    uint public nMustRollInNum = 1; // 必须复投次数，为1时。不需要复投也可以提取本金

    uint public nPlayerNum; // 玩家个数
    uint256 public rndInit_ = 300 seconds;              // 5分钟后开启游戏
    uint256 public rndInc_ = 1200 seconds;              // 每次买key增加20min
    uint256 public rndMax_ = 86400 seconds;                 // 24h
    uint256 public registrationFee_ = 1000 wei;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻
    uint256 public lostTimesMax = 0;
    uint256 public levelAmount = 10;

    uint256 public grandPrize = 0;  //最后一人分的大奖数目
    uint256 public smallPrize = 0;  //最后2-9人分的大奖数目

    //**比例单位千分** 1 序列、2 奖池、3 庄家
    //** 3 拿到幸运奖后允许增加的投入次数,4 幸运奖分配的比例,5 多少注分一次幸运奖,6 玩家队列长度
    //** 7 必须复投次数,8 队列空后最多允许拿几次推荐,9 分红比例 10 最后分钱多少人
    uint[11] public rate;
    //极差条件
    uint[2] public jicha;

    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(uint256 => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    DataSets.TeamBalance public teamPot; // 存储奖池余额 做资金隔离
    uint public luckyPotMoney;    //幸运玩家编号对应的金额

    mapping(uint256 => uint256) public rollInByPlayerId; // key：序列号 value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值
    uint public nMaxBonus = 11000000 wei;
    uint public nBugBonus = 10000000 wei;

    uint private levelOne = 0;
    uint private levelTwo = 0;

    betToken constant Token = betToken(0xD98792127Cb7A0953669f2986af6fCAa37E40CD0);

    address bank = 0x9d5f9b38a69cadc70c45f7f7860f859bed0dd9ac;
    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        // 分0.5%
        banker[0] = 0xb357efec44c3d7d00102c103bbbaaa0130b1ce09;
        banker[1] = 0x389932808b1f7ee1fadfbae91c63d989b5da2b93;
        banker[2] = 0x9d5f9b38a69cadc70c45f7f7860f859bed0dd9ac;
        // 分1%
        banker[3] = bank;
        banker[4] = bank;
        //分2%
        banker[5] = bank;

        //存储奖金池地址
        banker[6] = bank;
        //存储幸运奖池地址
        banker[7] = bank;

        //配置初始比例
        //奖池
        rate[0] = 30;
        //出局收益70
        rate[1] = 500;
        //推荐
        rate[2] = 165;
        //联盟
        rate[3] = 50;
        //幸运奖分配的比例
        rate[4] = 30;
        //庄家0.5%
        rate[5] = 6750;
        rate[6] = 3375;
        rate[7] = 12375;
        rate[8] = 0;
        rate[9] = 0;
        //庄家10%
        rate[10] = 0;

        jicha[0] = 50;
        jicha[1] = 100;

        root = creator;
        registerBonusTo = bank;
        //沉淀资金
        beginAddr = 0x0a4128aae07d8e4b0fa2c7338ea5f082fb42edd7;
    }

    function deposit() public payable {}

    modifier isWithinLimits(uint256 _eth) {
        // 单笔下注 3 ether
        require(_eth == nBugBonus || _eth == 0 wei);
        _;
    }

    // 注册nickname
    function registerName(uint _paid, address _referrer) public {
        address _addr = msg.sender;

        require(_paid >= registrationFee_, "umm.....  you have to pay the name fee");
        //注册
        createPlayer(_addr, _referrer);
        playerIsRegi[_addr] = true;

        transferCoin(_addr, _paid);
        transfer(registerBonusTo, _paid);
    }


    //注册
    function createPlayer(address _addr, address _referrer) private {
        // 注册
        if (pIDxAddr_[_addr] == 0) {
            nPlayerNum++;
            pIDxAddr_[_addr] = nPlayerNum;
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyArr2, emptyArr3, 0, 0, 0, 0, 0, 0, 0, 0);
            playerEtraxAddr_[nPlayerNum] = DataSets.PlayerEtra(0, 0, round, 0, 0, 0, 0, 0);

            // 挂代理
            if (_referrer != emptyAddr && playerIsRegi[_referrer] == true) {
                playerxID_[nPlayerNum].agents = pIDxAddr_[_referrer];
                refereesLvUp(nPlayerNum, playerxID_[nPlayerNum].agents);
            }
        }
    }

    //新一轮，清空数据
    function clearUser(uint myId) private {
        if (playerEtraxAddr_[myId].currentRound != round) {
            playerEtraxAddr_[myId].currentRound = round;
            playerEtraxAddr_[myId].lostTimes = 0;

            playerxID_[myId].rollInArray.length = 0;
            playerxID_[myId].allBuy = 0;
            playerxID_[myId].turnBuy = 0;
            playerxID_[myId].reinvest = 0;
            playerxID_[myId].currentBonus = 0;
        }
    }

    //注册过后，代理人是否升级
    function refereesLvUp(uint myId, uint _referrer) private {
        uint referrerLevel = playerEtraxAddr_[_referrer].level;
        uint addrLevel = playerEtraxAddr_[myId].level;

        if (addrLevel >= referrerLevel && _referrer != 0) {
            playerxID_[_referrer].levelArray[addrLevel] += 1;
            uint num = 0;
            for (uint i = referrerLevel; i < 4; i++) {
                num += playerxID_[_referrer].levelArray[i];
            }

            if (num >= levelAmount)
            {
                playerEtraxAddr_[_referrer].level += 1;
                refereesLvUp(_referrer, playerxID_[_referrer].agents);
            }
        }
    }

    // 投币函数
    function coinRollIn(uint thisCoin, address _referrer) isWithinLimits(thisCoin) public {
        address _addr = msg.sender;

        uint myBalance = Token.balanceOf(_addr);
        require(myBalance >= thisCoin);

        clearUser(pIDxAddr_[_addr]);

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
            thisCoin = nBugBonus;
        }
        else
        {
            // register logic
            createPlayer(_addr, _referrer);
            playerxID_[pIDxAddr_[_addr]].allBuy += thisCoin;
            transferCoin(_addr, thisCoin);
        }

        require(thisCoin == nBugBonus);

        coinRollInLogic(_addr, thisCoin);
        withDrawInterest();
    }

    // 投币logic
    function coinRollInLogic(address _addr, uint thisCoin) private {
        // begin logic
        if (isBegin == false) {
            require(beginAddr == _addr);
            isBegin = true;
            // 第一人买后 此值改为true
            overMoment = now + rndMax_;
        }
        //must player rollInArray length < 10
        uint myId = pIDxAddr_[_addr];
        require(playerxID_[myId].rollInArray.length < nPlayerArraySize, "you haved rollin coin !");

        //data change
        playerxID_[myId].reinvest += 1;


        playerxID_[myId].turnBuy += thisCoin;
        nRollIn++;

        playerxID_[myId].rollInArray.push(nRollIn);

        rollInByPlayerId[nRollIn] = myId;

        // 资金分配
        bonusAllocation(thisCoin, myId);

        //time logic
        overMoment += rndInc_;
        uint timeInterval = 0;
        if (overMoment > now) {
            timeInterval = overMoment - now;
        }
        overMoment = timeInterval > rndMax_ ? (now + rndMax_) : overMoment;
        addLuckyer(myId);
    }

    function returnAgent(address _addr) public constant returns (uint){
        return playerxID_[pIDxAddr_[_addr]].agents;
    }

    //coin transfer
    function bonusAllocation(uint coin, uint myId) private {
        // 5.5%
        bonusToBanker(coin);
        // 17%推荐奖励，联盟奖励5%
        bonusToReferrer(coin, myId);
        // 0.5%
        bonusToPot(coin);
        // 2%
        bonusToLuckyPot(coin);
        // 70%
        bonusToNO1(coin * rate[1] / 1000);
    }
    // 分5.5%。社区合伙人2%，平台基金3%，慈善基金0.5%
    function bonusToBanker(uint coin) private {
        transfer(banker[0], coin * rate[5] / 100000);
        transfer(banker[1], coin * rate[6] / 100000);
        transfer(banker[2], coin * rate[7] / 100000);
        transfer(banker[3], coin * rate[8] / 100000);
        transfer(banker[4], coin * rate[9] / 100000);
        transfer(banker[5], coin * rate[10] / 100000);
    }

    function bonusToAgent(uint allCoin, uint myId, uint toCreatorPer2, uint currentLevel, uint _totalNum) private {
        //一共最多找50次
        if (_totalNum <= 50) {
            uint referrer = playerxID_[myId].agents;
            //应该给的比例
            uint giveCreator = 0;
            if (referrer != 0) {
                //得到会员等级
                uint per = playerEtraxAddr_[referrer].level;
                if (per > currentLevel)
                {
                    //有极差，赋值分到的会员等级
                    giveCreator = (per - currentLevel) * jicha[0];
                    currentLevel = per;

                    if (toCreatorPer2 > giveCreator) {
                        toCreatorPer2 -= giveCreator;
                    } else {
                        toCreatorPer2 = 0;
                    }

                    addReferrerOneaddCoin(referrer, allCoin * giveCreator / 1000);

                    uint agent2 = playerxID_[referrer].agents;
                    uint per2 = playerEtraxAddr_[agent2].level;

                    if (agent2 != 0 && per >= per2) {
                        uint giveCreator2 = giveCreator * jicha[1];

                        if (toCreatorPer2 > giveCreator2) {
                            toCreatorPer2 -= giveCreator2;
                        } else {
                            toCreatorPer2 = 0;
                        }

                        addReferrerTwoaddCoin(agent2, allCoin * giveCreator2 / 1000000);
                    }
                }
                _totalNum++;
                bonusToAgent(allCoin, referrer, toCreatorPer2, currentLevel, _totalNum);
            } else {
                if (toCreatorPer2 > 0) {
                    bonusToOne(allCoin * toCreatorPer2 / 1000);
                }
                return;
            }
        }
    }


    function bonusToReferrer(uint allCoin, uint myId) private {
        uint referees = playerxID_[myId].agents;
        //address referees = playerxID_[myId].referees;
        if (referees != 0) {

            //联盟奖5%
            bonusToTeam(allCoin, myId);

            //极差奖
            bonusToAgent(allCoin, myId, rate[2], 0, 0);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * (rate[2] + rate[3]) / 1000);
        }
    }

    function bonusToTeam(uint allCoin, uint myId) private {
        uint reagentId = playerxID_[myId].agents;
        for (uint i = 0; i < playerxID_[myId].reinvest - 1; i++) {
            reagentId = playerxID_[reagentId].agents;
        }

        if (reagentId != 0 && playerxID_[reagentId].rollInArray.length > 0)
        {
            playerxID_[reagentId].unionBonus += allCoin * rate[3] / 1000;
        }
        else
        {
            bonusToBanker(allCoin * rate[3] / 1000);
        }
    }

    function bonusToPot(uint allCoin) private {
        teamPot.total += allCoin;
        teamPot.potCoin += allCoin * rate[0] / 1000;
        //        transferCoin(banker[6], allCoin * rate[0] / 1000);
    }

    function bonusToLuckyPot(uint allCoin) private {
        teamPot.luckyPotCoin += allCoin * rate[4] / 1000;
        //        transferCoin(banker[7], allCoin * rate[4] / 1000);
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

    function addReferrerOneaddCoin(uint myId, uint nCoin) private {

        if (playerxID_[myId].rollInArray.length >= 1)
        {
            playerEtraxAddr_[myId].performance += nCoin;
            playerEtraxAddr_[myId].currentPerformanceOne += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            playerEtraxAddr_[myId].lostTimes++;
            if (playerEtraxAddr_[myId].lostTimes <= lostTimesMax)
            {
                playerEtraxAddr_[myId].performance += nCoin;
                playerEtraxAddr_[myId].currentPerformanceOne += nCoin;
            }
        }
    }

    function addReferrerTwoaddCoin(uint myId, uint nCoin) private {

        if (playerxID_[myId].rollInArray.length >= 1)
        {
            playerEtraxAddr_[myId].performance += nCoin;
            playerEtraxAddr_[myId].currentPerformanceTwo += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            playerEtraxAddr_[myId].lostTimes++;
            if (playerEtraxAddr_[myId].lostTimes <= lostTimesMax)
            {
                playerEtraxAddr_[myId].performance += nCoin;
                playerEtraxAddr_[myId].currentPerformanceTwo += nCoin;
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
        transfer(registerBonusTo, coin);
    }


    function addLuckyer(uint myId) private {
        for (uint i = 0; i < 9; i++) {
            Luckyer[i] = Luckyer[i + 1];
        }
        Luckyer[9] = myId;
    }
    /**
    * 一轮游戏结束了，开始分钱
    * ①总奖池50%分给买最后一个key的人,总奖池50%分给倒数2-10个令牌
    */
    function gameOver() public {
        uint _now = now;
        require(_now >= overMoment);

        uint totalBalance = getBalance();
        uint totalPotOver = teamPot.potCoin;
        uint luckyPotOver = teamPot.luckyPotCoin;
        uint totalPot = (totalBalance > totalPotOver ? totalPotOver : totalBalance);
        uint luckyPot = (totalBalance > luckyPotOver ? luckyPotOver : totalBalance);
        totalPot = totalPot / 2;
        if (totalPot > 0) {
            uint count = 0;

            for (uint i = 0; i < 10; i++) {
                if (Luckyer[i] != 0) {
                    count++;
                }
            }
            if (count > 0) {
                for (uint j = 0; j < 10; j++) {
                    if (Luckyer[j] != 0) {
                        if (j == 9) {
                            transfer(playerxID_[Luckyer[j]].addr, totalPot);
                            playerEtraxAddr_[Luckyer[j]].allEarning += totalPot;
                        } else {
                            transfer(playerxID_[Luckyer[j]].addr, totalPot / 9);
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
                grandPrize = totalPot;
                smallPrize = totalPot / 9;
            }
        }
        luckyOver();
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

        if (luckyPot > 0) {
            uint count = nPlayerNum > 10 ? 10 : nPlayerNum;

            if (nPlayerNum <= 10) {
                for (uint i = 0; i < count; i++) {
                    luckyPotPerson[i] = i + 1;
                }
            } else {
                uint randomNum = uint(keccak256(now, msg.sender)) % nPlayerNum;
                for (uint h = 0; h < count; h++) {
                    uint luckyNum = (randomNum + h) % nPlayerNum;
                    if (luckyNum == 0) {
                        luckyNum = nPlayerNum;
                    }
                    luckyPotPerson[h] = luckyNum;
                }
            }

            if (count > 0) {
                luckyPotMoney = luckyPot / count;
                for (uint j = 0; j < count; j++) {
                    if (playerxID_[luckyPotPerson[j]].addr != emptyAddr) {
                        transfer(playerxID_[luckyPotPerson[j]].addr, luckyPot / count);
                    }
                }
                teamPot.luckyPotCoin = 0;
            }
        }
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

    function transferCoin(address _from, uint _coins) private {
        if (_coins != 0) {
            Token.transferFrom(_from, this, _coins);
        }
    }

    function transfer(address _to, uint _coins) private {
        if (_coins != 0 && getBalance() >= _coins) {
            Token.transfer(_to, _coins);
        }
    }

    // 每一轮结束了重置函数
    function reset() private {
        // todo
        // 清空幸运儿的地址Luckyer[]
        for (uint k = 0; k < 10; k++) {
            Luckyer[k] = 0;
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
        }
    }

    function withDrawInterest() private {
        address _addr = msg.sender;
        uint myId = pIDxAddr_[_addr];

        //实际提现金额
        uint money = 0;

        //给利息 必须能提
        if (playerxID_[myId].currentInterest > 0 && playerxID_[myId].turnBonus >= playerxID_[myId].currentInterest)
        {
            money += playerxID_[myId].currentInterest;
        }

        if (money > getBalance() || money == 0)
        {
            return;
        }

        if (playerxID_[myId].currentInterest > 0 && playerxID_[myId].turnBonus >= playerxID_[myId].currentInterest)
        {
            playerxID_[myId].turnBonus -= playerxID_[myId].currentInterest;
            playerxID_[myId].currentInterest = 0;
        }

        transfer(_addr, money);

        playerEtraxAddr_[myId].allEarning += money;
    }

    function withDraw() public {
        address _addr = msg.sender;
        uint myId = pIDxAddr_[_addr];

        //实际能提的本金
        uint canWithDraw = (playerxID_[myId].reinvest / nMustRollInNum) * nBugBonus;

        //实际能提的本金
        if (canWithDraw > playerEtraxAddr_[myId].earningPrincipal)
        {
            canWithDraw -= playerEtraxAddr_[myId].earningPrincipal;
        }
        else
        {
            canWithDraw = 0;
        }

        //实际提现金额
        uint money = 0;

        //给本金
        if (playerxID_[myId].turnBonus >= canWithDraw)
        {
            playerEtraxAddr_[myId].earningPrincipal += canWithDraw;
            money += canWithDraw;
            playerxID_[myId].turnBonus -= canWithDraw;
        } else {
            playerEtraxAddr_[myId].earningPrincipal += playerxID_[myId].turnBonus;
            money += playerxID_[myId].turnBonus;
            playerxID_[myId].turnBonus = 0;
        }

        //给利息 必须能提
        if (playerxID_[myId].currentInterest > 0 && playerxID_[myId].turnBonus >= playerxID_[myId].currentInterest)
        {
            money += playerxID_[myId].currentInterest;

            playerxID_[myId].turnBonus -= playerxID_[myId].currentInterest;

            playerxID_[myId].currentInterest = 0;
        }

        //推荐奖励必须走
        money += playerEtraxAddr_[myId].currentPerformanceOne;
        money += playerEtraxAddr_[myId].currentPerformanceTwo;

        require(money <= getBalance() && money != 0);

        transfer(_addr, money);

        playerEtraxAddr_[myId].allEarning += money;
        playerEtraxAddr_[myId].currentPerformanceOne = 0;
        playerEtraxAddr_[myId].currentPerformanceTwo = 0;
    }

    function allowMoney(address _addr) public view returns (uint) {
        uint myId = pIDxAddr_[_addr];

        //实际能提的本金
        uint canWithDraw = (playerxID_[myId].reinvest / nMustRollInNum) * nBugBonus;

        //实际能提的本金
        if (canWithDraw > playerEtraxAddr_[myId].earningPrincipal)
        {
            canWithDraw -= playerEtraxAddr_[myId].earningPrincipal;
        }
        else
        {
            canWithDraw = 0;
        }

        //实际提现金额
        uint money = 0;

        //给本金
        if (playerxID_[myId].turnBonus >= canWithDraw)
        {
            money += canWithDraw;
        } else {
            money += playerxID_[myId].turnBonus;
        }

        //给利息 必须能提
        if (playerxID_[myId].currentInterest > 0 && playerxID_[myId].turnBonus >= playerxID_[myId].currentInterest)
        {
            money += playerxID_[myId].currentInterest;
        }

        //推荐奖励必须走
        money += playerEtraxAddr_[myId].currentPerformanceOne;
        money += playerEtraxAddr_[myId].currentPerformanceTwo;

        return money;
    }

    function getBalance() view public returns (uint){
        return Token.balanceOf(this);
    }

    function destory() public {
        if (msg.sender == root) {
            transfer(registerBonusTo, Token.balanceOf(this));
        }
    }

    function updateRate(uint [11] _rate) public {
        require(msg.sender == registerBonusTo || msg.sender == creator);
        rate = _rate;
    }

    function updateJicha(uint [2] _jicha) public {
        require(msg.sender == registerBonusTo || msg.sender == creator);
        jicha = _jicha;
    }

    function updateBanker(address [8] _banker) public {
        require(msg.sender == registerBonusTo || msg.sender == creator);
        banker = _banker;
    }

    function updateBase(uint _levelAmount, uint _nPlayerArraySize, uint _nMustRollInNum, uint _rndInit, uint _rndInc_, uint _rndMax_, uint _registrationFee_, uint _nMaxBonus, uint _nBugBonus) public {
        require(msg.sender == registerBonusTo || msg.sender == creator);
        levelAmount = _levelAmount;
        nPlayerArraySize = _nPlayerArraySize;
        nMustRollInNum = _nMustRollInNum;
        rndInit_ = _rndInit;
        rndInc_ = _rndInc_;
        rndMax_ = _rndMax_;
        registrationFee_ = _registrationFee_;
        nMaxBonus = _nMaxBonus;
        nBugBonus = _nBugBonus;
    }

    function update(uint _nRollIn, uint _nCurrentGainId, uint total, uint potCoin, uint luckyPotCoin, uint num) public {
        require(msg.sender == creator);
        nRollIn = _nRollIn;
        nCurrentGainId = _nCurrentGainId;
        teamPot.total = total;
        teamPot.potCoin = potCoin;
        teamPot.luckyPotCoin = luckyPotCoin;
        nPlayerNum = num;
    }

    function updateTime(uint _time) public {
        require(msg.sender == creator);
        overMoment = _time;
    }

    function updatePlayer(uint [17] _other) public {
        require(msg.sender == creator);
        uint id = _other[0];
        playerxID_[id].allBuy = _other[1];
        playerxID_[id].turnBuy = _other[2];
        playerxID_[id].turnBonus = _other[3];
        playerxID_[id].currentBonus = _other[4];
        playerxID_[id].reinvest = _other[5];
        playerxID_[id].unionBonus = _other[6];
        playerxID_[id].currentInterest = _other[7];
        playerxID_[id].agents = _other[8];

        playerEtraxAddr_[id].performance = _other[9];
        playerEtraxAddr_[id].level = _other[10];
        playerEtraxAddr_[id].currentRound = _other[11];
        playerEtraxAddr_[id].allEarning = _other[12];
        playerEtraxAddr_[id].lostTimes = _other[13];
        playerEtraxAddr_[id].currentPerformanceOne = _other[14];
        playerEtraxAddr_[id].currentPerformanceTwo = _other[15];
        playerEtraxAddr_[id].earningPrincipal = _other[16];
    }
}

library DataSets {
    struct PlayerInfo {
        address addr;   // player address
        uint [] rollInArray;
        uint [4] levelArray;//使我升级的玩家数
        uint allBuy; // 所有投入的钱 只增不减
        uint turnBuy; // 这一局买入花的钱
        uint turnBonus; // 当前本金
        uint currentBonus; // 本轮序列收益
        uint reinvest; // 复投次数
        uint unionBonus; // 联盟奖
        uint currentInterest; // 当前利息
        uint agents;//我的上级代理
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
    }
}

interface betToken {

    //token充值函数
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

    //token提现函数
    function transfer(address _to, uint256 _value) external returns (bool success);

    //授权转账金额，token转账之前需要先授权
    function approve(address _spender, uint256 _value) external returns (bool success);

    //查询余额
    function balanceOf(address _addr) external returns (uint256 balance);

}