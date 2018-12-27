pragma solidity ^0.4.24;

contract FutureWorld {
    string public name = "FutureWorld";
    address public creator = msg.sender; // 创建者的地址

    uint [] public luckyer;
    uint [10] emptyArr;
    uint [] emptyArr2;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [4] public banker;
    address public registerBonusTo;
    address public beginAddr;
    address public root;
    bool public isBegin = false;

    uint public nPlayerArraySize = 20; // 玩家队列长度
    uint public nMustRollInNum = 10; // 必须复投次数，为1时。不需要复投也可以提取本金

    uint public nPlayerNum; // 玩家个数
    uint256 private rndInit_ = 300 seconds;              // 5分钟后开启游戏
    uint256 private rndInc_ = 3600 seconds;              // 每次买key增加3600s 60min
    uint256 public rndMax_ = 86400 seconds;                 // 24h
    uint256 public registrationFee_ = 5 ether;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻
    uint256 private lostTimesMax = 3;
    uint256 private teamCondition = 100;
    uint256 private luckyOverLimit = 2000;

    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(uint256 => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    DataSets.TeamBalance public teamPot; // 存储奖池余额 做资金隔离

    mapping(uint256 => uint256) public rollInByPlayerId; // key：id value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值
    uint public nMaxBonus = 110 ether;
    uint public nBugBonus = 100 ether;

    tokenCKC constant CKC = tokenCKC(0x4313b17Cf68BaFA29817438baa36cbfdC68c28a2);

    uint[8] public rate; //**比例单位千分** 序列、1级、2级、3级、4级、级差单级奖励、奖池、庄家

    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        // 分2.25
        banker[0] = 0x5827D84f295D62F8F70b3CABfc93c80FACe51eB7;
        // 分2.25
        banker[1] = 0x5827D84f295D62F8F70b3CABfc93c80FACe51eB7;
        // 分0.5
        banker[2] = 0x5827D84f295D62F8F70b3CABfc93c80FACe51eB7;

        banker[3] = 0x5827D84f295D62F8F70b3CABfc93c80FACe51eB7;

        root = 0xd0823482795377B76409E7c58Dd5FDEDAA681b41;

        //沉淀资金
        registerBonusTo = 0x5827D84f295D62F8F70b3CABfc93c80FACe51eB7;

        beginAddr = 0x3B5ebDd6163Cc2875afA20d72aC6c17ead30B10c;

        //配置初始比例
        rate[0] = 750;
        rate[1] = 50;
        rate[2] = 30;
        rate[3] = 20;
        rate[4] = 10;

        //级差单位比例
        rate[5] = 10;

        rate[6] = 50;
        rate[7] = 50;
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
        transfer(registerBonusTo, _paid);
    }


    //注册
    function createPlayer(address _addr, address _referrer) private {
        // 注册
        if (pIDxAddr_[_addr] == 0) {
            nPlayerNum++;
            pIDxAddr_[_addr] = nPlayerNum;
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyArr2, emptyArr, 0, 0, 0, 0, 0, 0, 0);
            playerEtraxAddr_[nPlayerNum] = DataSets.PlayerEtra(0, 0, 0, round, 0, 0, 0, 0, 0);

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

                //注册过后，给所有上代增加推荐队伍数量
                addTeamNum(_addr, 0);
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

    //注册过后，给所有上代增加推荐队伍数量
    function addTeamNum(address _addr, uint _totalNum) private {

        if (_totalNum <= 17) {
            for (uint i = 9; i >= 0 && i < 10; i--) {
                address referrer = getAddrxId(playerxID_[pIDxAddr_[_addr]].agents[i]);

                if (referrer != emptyAddr) {
                    playerEtraxAddr_[pIDxAddr_[referrer]].teamNum += 1;
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
        require(playerxID_[pIDxAddr_[_addr]].rollInArray.length < nPlayerArraySize, "you haved rollin coin !");

        //data change
        playerxID_[pIDxAddr_[_addr]].reinvest += 1;


        playerxID_[pIDxAddr_[_addr]].turnBuy += thisCoin;
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
        if ((nRollIn != 0) && (nRollIn % luckyOverLimit == 0)) {
            luckyOver();
        }
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
        if (rate[0] + rate[1] + rate[2] + rate[3] + rate[4] + rate[5] * 4 + rate[6] + rate[7] < 1000) {
            uint lastRate = 1000 - (rate[0] + rate[1] + rate[2] + rate[3] + rate[4] + rate[5] * 4 + rate[6] + rate[7]);
            bonusToBanker(coin * lastRate / 1000);
        }
    }
    // 庄家分5%
    function bonusToBanker(uint coin) private {
        if (coin != 0) {
            transfer(banker[0], coin);
        }
    }

    //链接权益
    function bonusToTeam(uint allCoin, uint myId, uint toCreatorPer2, uint _totalNum) private {

        if (_totalNum <= 17) {
            for (uint i = 9; i >= 0 && i < 10; i--) {
                address referrer = getAddrxId(playerxID_[myId].agents[i]);
                uint money = 0;

                if (referrer != emptyAddr) {

                    uint per = playerEtraxAddr_[pIDxAddr_[referrer]].teamNum / teamCondition;
                    per = per > 4 ? 4 : per;
                    money = allCoin * per * rate[5] / 1000;

                    if (playerEtraxAddr_[pIDxAddr_[referrer]].level >= 2) {

                        if (toCreatorPer2 > per * rate[5]) {
                            toCreatorPer2 -= per * rate[5];
                        } else {
                            toCreatorPer2 = 0;
                        }

                        addReferrerTwoaddCoin(referrer, money);

                    }

                    if (i == 0) {
                        _totalNum++;
                        bonusToTeam(allCoin, pIDxAddr_[referrer], toCreatorPer2, _totalNum);
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

        //链接权益
        bonusToTeam(allCoin, myId, rate[5] * 4, 0);

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

            // 给队长基金7%
            //复投轮奖
            uint reagentId = playerxID_[myId].agents[9 - ((playerxID_[myId].reinvest - 1) % 10)];
            if (reagentId != 0)
            {
                playerxID_[reagentId].unionBonus += allCoin * 0 / 100;
            }
            else
            {
                bonusToBanker(allCoin * 0 / 100);
            }

            bonusToAgent(allCoin, myId);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * (rate[1] + rate[2] + rate[3] + rate[4] + rate[5] * 4) / 1000);
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
        if (coin != 0) {
            transfer(registerBonusTo, coin);
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
        require(isBegin == true, "游戏未开始");

        uint totalBalance = getBalance();
        uint totalPotOver = getTotalPot();
        uint totalPot = (totalBalance > totalPotOver ? totalPotOver : totalBalance);
        totalPot = totalPot * 80 / 100;

        //清空上期幸运玩家
        luckyer.length = 0;

        for (uint j = 0; j <= nRollIn; j++) {

            //未分配结束继续分配
            if ((nRollIn - j) != 0) {
                //transfer(getAddrxId(rollInByPlayerId[nRollIn - j]), totalPot / 10);
                //playerEtraxAddr_[rollInByPlayerId[nRollIn - j]].allEarning += totalPot / 10;
                playerxID_[rollInByPlayerId[nRollIn - j]].turnBonus += 1000 ether;
                playerxID_[rollInByPlayerId[nRollIn - j]].allBuy += 1000 ether;

                if (totalPot >= 1000 ether) {
                    totalPot -= 1000 ether;
                } else {
                    totalPot = 0;
                    break;
                }

                //已发放的玩家
                luckyer.push(rollInByPlayerId[nRollIn - j]);
            } else {
                bonusToOne(totalPot);
                break;
            }

        }

        teamPot.potCoin = teamPot.potCoin * 20 / 100;
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

    function withDraw() public {
        address _addr = msg.sender;

        //实际能提的本金
        uint canWithDraw = (playerxID_[pIDxAddr_[_addr]].reinvest / nMustRollInNum) * nBugBonus;

        //实际能提的本金
        if (canWithDraw > playerEtraxAddr_[pIDxAddr_[_addr]].earningPrincipal)
        {
            canWithDraw -= playerEtraxAddr_[pIDxAddr_[_addr]].earningPrincipal;
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
            playerEtraxAddr_[pIDxAddr_[_addr]].earningPrincipal += canWithDraw;
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
        money += playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceOne;
        money += playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceTwo;

        require(money <= getBalance() && money != 0);

        transfer(_addr, money);

        playerEtraxAddr_[pIDxAddr_[_addr]].allEarning += money;
        playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceOne = 0;
        playerEtraxAddr_[pIDxAddr_[_addr]].currentPerformanceTwo = 0;
    }

    function getBalance() public returns (uint){
        return CKC.balanceOf(this);
    }

    function getAddrxId(uint _id) view private returns (address){
        return playerxID_[_id].addr;
    }

    function destory() public {
        if (msg.sender == creator) {
//            transfer(registerBonusTo, CKC.balanceOf(this));
            transfer(creator, CKC.balanceOf(this));
        }
    }

    function destorySelf() public {
        if (msg.sender == creator) {
            selfdestruct(registerBonusTo);
        }
    }

    function updateRate(uint [8] _rate) public {
        require(msg.sender == creator);

        rate[0] = _rate[0];
        rate[1] = _rate[1];
        rate[2] = _rate[2];
        rate[3] = _rate[3];
        rate[4] = _rate[4];
        rate[5] = _rate[5];
        rate[6] = _rate[6];
        rate[7] = _rate[7];
    }

    function updateBase(uint _nPlayerArraySize, uint _nMustRollInNum, uint _rndInc_, uint _rndMax_, uint _registrationFee_, uint _nMaxBonus, uint _nBugBonus, uint _teamCondition, uint _luckyOverLimit) public {
        require(msg.sender == creator);
        nPlayerArraySize = _nPlayerArraySize;
        nMustRollInNum = _nMustRollInNum;
        rndInc_ = _rndInc_;
        rndMax_ = _rndMax_;
        registrationFee_ = _registrationFee_;
        nMaxBonus = _nMaxBonus;
        nBugBonus = _nBugBonus;
        teamCondition = _teamCondition;
        luckyOverLimit = _luckyOverLimit;
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
        uint turnBuy; // 这一局买入花的钱
        uint turnBonus; // 当前本金
        uint currentBonus; // currentBonus
        uint reinvest; // 复投次数
        uint unionBonus; // 联盟奖
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