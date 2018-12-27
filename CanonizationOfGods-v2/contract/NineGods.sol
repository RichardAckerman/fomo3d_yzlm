pragma solidity ^0.4.24;

contract NineGods {
    string public name = "NineGods";
    address public creator = msg.sender; // 创建者的地址

    uint [] luckyer;
    uint [3] emptyArr;
    uint [] emptyArr2;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [4] public banker;
    address public registerBonusTo;
    address public beginAddr;
    address public root;
    bool public isBegin = false;

    uint public nPlayerArraySize = 30; // 玩家队列长度
    uint public nMustRollInNum = 10; // 必须复投次数

    uint public nPlayerNum; // 玩家个数
    uint256 private rndInit_ = 300 seconds;              // 5分钟后开启游戏
    uint256 private rndInc_ = 3600 seconds;              // 每次买key增加3600s
    uint256 public rndMax_ = 86400 seconds;                 // 24h
    uint256 public registrationFee_ = 5 ether;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻
    uint256 private luckyOverLimit = 1000;
    uint256 private lostTimesMax = 5;

    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(uint256 => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    DataSets.TeamBalance public teamPot; // 存储奖池余额 做资金隔离

    mapping(uint256 => uint256) public rollInByPlayerId; // key：id value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值
    uint public nMaxBonus = 220 ether;
    uint public nBugBonus = 200 ether;

    uint[11] public rate; //**比例单位千分** 序列、推荐1、推荐2、推荐3、级差1、级差2、级差3、级差4、级差5、庄家、奖池

    tokenODF constant ODF = tokenODF(0x73f9e7abc8cf1e4621085e510105cb99fb89ccf6);

    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        banker[0] = 0x10A259e91B88876067DFa9c2e2E11F65475EFbCd;
        root = 0x10A259e91B88876067DFa9c2e2E11F65475EFbCd;

        //沉淀资金
        registerBonusTo = 0x10A259e91B88876067DFa9c2e2E11F65475EFbCd;

        beginAddr = 0x10A259e91B88876067DFa9c2e2E11F65475EFbCd;

        //配置初始比例
        rate[0] = 750;
        rate[1] = 50;
        rate[2] = 30;
        rate[3] = 20;

        rate[4] = 10;
        rate[5] = 20;
        rate[6] = 30;
        rate[7] = 40;
        rate[8] = 50;

        rate[9] = 50;
        rate[10] = 50;
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
            playerEtraxAddr_[nPlayerNum] = DataSets.PlayerEtra(0, 0, round, 0, 0, 0, 0, 0, 0);

            // 挂代理
            if (_referrer != emptyAddr && playerIsRegi[_referrer] == true) {
                playerxID_[nPlayerNum].agents = playerxID_[pIDxAddr_[_referrer]].agents;
                for (uint i = 0; i < 2; i++) {
                    playerxID_[nPlayerNum].agents[i] = playerxID_[nPlayerNum].agents[i + 1];
                }
                playerxID_[nPlayerNum].agents[2] = pIDxAddr_[_referrer];
            }

            //lv up
            playerEtraxAddr_[pIDxAddr_[_referrer]].level += 1;

            //注册过后，给所有上代增加推荐队伍数量
            addTeamNum(_addr);
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
    function addTeamNum(address _addr) private {

        for (uint i = 2; i >= 0 && i < 3; i--) {
            address referrer = getAddrxId(playerxID_[pIDxAddr_[_addr]].agents[i]);

            if (referrer != emptyAddr) {
                playerEtraxAddr_[pIDxAddr_[referrer]].teamNum += 1;
                if (i == 0) {
                    addTeamNum(referrer);
                }
            } else {
                return;
            }
        }

    }

    // 投币函数
    function coinRollIn(address _referrer, uint256 _value) isWithinLimits(_value) public {
        uint thisCoin = _value;
        address _addr = msg.sender;

        uint myBalance = ODF.balanceOf(_addr);

        require(myBalance >= thisCoin, "ODF余额不足");

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

    function returnAgent(address _addr) public constant returns (uint [3]){
        return playerxID_[pIDxAddr_[_addr]].agents;
    }

    //coin transfer
    function bonusAllocation(uint coin, address _addr) private {
        // 5%
        bonusToBanker(coin * rate[9] / 1000);
        // 推荐人10%，链接5%
        bonusToReferrer(coin, _addr);
        // 10%
        bonusToPot(coin);
        // 75%
        bonusToNO1(coin * rate[0] / 1000);
    }
    // 庄家分5%
    function bonusToBanker(uint coin) private {
        if (coin != 0) {
            transfer(banker[0], coin);
        }
    }

    //链接权益
    function bonusToTeam(uint allCoin, uint myId, uint toCreatorPer2) private {

        for (uint i = 2; i >= 0 && i < 3; i--) {
            address referrer = getAddrxId(playerxID_[myId].agents[i]);
            uint money = 0;

            if (referrer != emptyAddr) {

                uint teamNum = playerEtraxAddr_[pIDxAddr_[referrer]].teamNum;
                uint level = playerEtraxAddr_[pIDxAddr_[referrer]].level;
                uint per = 0;

                if (teamNum >= 400) {
                    if (level >= 10) {
                        per = 50;
                    } else if (level >= 8) {
                        per = 40;
                    } else if (level >= 6) {
                        per = 30;
                    } else if (level >= 4) {
                        per = 20;
                    } else if (level >= 2) {
                        per = 10;
                    }
                } else if (teamNum >= 300) {
                    if (level >= 8) {
                        per = 40;
                    } else if (level >= 6) {
                        per = 30;
                    } else if (level >= 4) {
                        per = 20;
                    } else if (level >= 2) {
                        per = 10;
                    }
                } else if (teamNum >= 200) {
                    if (level >= 6) {
                        per = 30;
                    } else if (level >= 4) {
                        per = 20;
                    } else if (level >= 2) {
                        per = 10;
                    }
                } else if (teamNum >= 100) {
                    if (level >= 4) {
                        per = 20;
                    } else if (level >= 2) {
                        per = 10;
                    }
                } else if (teamNum >= 50) {
                    if (level >= 2) {
                        per = 10;
                    }
                }

                money = allCoin * per / 1000;

                if (money > 0) {
                    if (toCreatorPer2 > per) {
                        toCreatorPer2 -= per;
                    } else {
                        toCreatorPer2 = 0;
                    }

                    addReferrerTwoaddCoin(referrer, money);
                }

                if (i == 0) {
                    bonusToTeam(allCoin, pIDxAddr_[referrer], toCreatorPer2);
                }

            } else {
                if (toCreatorPer2 > 0) {
                    bonusToOne(allCoin * toCreatorPer2 / 1000);
                }
                return;
            }
        }

    }

    function bonusToAgent(uint allCoin, uint myId) private {
        uint toCreatorPer = rate[2] + rate[3];
        for (uint j = 0; j < 3; j++) {
            uint agentId = playerxID_[myId].agents[j];
            uint money = 0;
            if (agentId > 0) {
                uint level = playerEtraxAddr_[agentId].level;
                if (j == 0 && level >= 3) {
                    money = allCoin * rate[3] / 1000;
                    if (toCreatorPer > rate[3]) {
                        toCreatorPer -= rate[3];
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 1 && level >= 2) {
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
        bonusToTeam(allCoin, myId, rate[8]);

        if (toCreatorPer > 0) {
            bonusToOne(allCoin * toCreatorPer / 1000);
        }
    }


    function bonusToReferrer(uint allCoin, address _addr) private {
        uint myId = pIDxAddr_[_addr];

        address referees = playerxID_[playerxID_[myId].agents[2]].addr;
        if (referees != emptyAddr) {
            // 先给推荐人分5%
            uint num = allCoin * rate[1] / 1000;
            addReferrerOneaddCoin(referees, num);

            bonusToAgent(allCoin, myId);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * (rate[1] + rate[2] + rate[3]) / 1000);
        }
    }

    function bonusToPot(uint coin) private {
        teamPot.total += coin;
        teamPot.potCoin += coin * rate[10] / 1000;
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
        transfer(registerBonusTo, coin);
    }


    /**
    * 一轮游戏结束了，开始分钱
    * ①总奖池50%分给买最后一个key的人,总奖池50%分给倒数2-10个令牌
    */
    function gameOver() public {
        uint _now = now;
        //require(_now >= overMoment);
        uint totalBalance = getBalance();
        uint totalPotOver = getTotalPot();
        uint totalPot = (totalBalance > totalPotOver ? totalPotOver : totalBalance);
        bool exist = true;
        totalPot = totalPot / 2;

        if (totalPot > 0) {
            for (uint j = 0; j < 10; j++) {
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
                        transfer(getAddrxId(rollInByPlayerId[nRollIn - j]), totalPot / 9);
                        playerEtraxAddr_[rollInByPlayerId[nRollIn - j]].allEarning += totalPot / 9;
                    }
                } else {
                    if (j == 0) {
                        bonusToOne(totalPot);
                    } else {
                        bonusToOne(totalPot / 9);
                    }
                }

            }
        }
        reset();
    }

    /**
    * 每到1000注，分一次奖
    */
    function luckyOver() private {
        require(isBegin == true, "游戏未开始");

        uint totalBalance = getBalance();
        uint totalPotOver = getTotalPot();
        uint totalPot = (totalBalance > totalPotOver ? totalPotOver : totalBalance);
        totalPot = totalPot * 5 / 100 + luckyOverLimit * nBugBonus * 4 / 100;
        teamPot.potCoin -= totalPot;

        //清空上期幸运玩家
        for (uint k = 0; k < luckyer.length; k++) {
            luckyer[k] = 0;
        }

        for (uint j = 0; j <= nRollIn; j++) {
            bool exist = false;
            //判断是否发放过奖励
            for (uint i = 0; i < luckyer.length; i++) {
                if (luckyer[i] == rollInByPlayerId[nRollIn - j]) {
                    exist = true;
                    break;
                }
            }

            //未分配结束继续分配
            if (luckyer.length == 8) {
                break;
            } else {
                if (((nRollIn - j) != 0) && (totalPot > 0)) {
                    if (!exist) {
                        if (totalPot >= 1000 ether) {
                            //已发放的玩家
                            luckyer.push(rollInByPlayerId[nRollIn - j]);

                            transfer(getAddrxId(rollInByPlayerId[nRollIn - j]), 1000 ether);
                            playerEtraxAddr_[rollInByPlayerId[nRollIn - j]].allEarning += 1000 ether;
                            totalPot -= 1000 ether;
                        } else {
                            //已发放的玩家
                            if (totalPot > 0) {
                                luckyer.push(rollInByPlayerId[nRollIn - j]);
                            }

                            transfer(getAddrxId(rollInByPlayerId[nRollIn - j]), totalPot);
                            playerEtraxAddr_[rollInByPlayerId[nRollIn - j]].allEarning += totalPot;
                            totalPot = 0;
                            break;
                        }
                    }
                } else {
                    if (totalPot > 0) {
                        bonusToOne(totalPot);
                    }
                    break;
                }
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
    // 获取总的奖池余额
    function getTotalPot() constant public returns (uint){
        return teamPot.potCoin;
    }

    function transferCoin(address _from, uint _coins) private {
        //_to.transfer(_coins);
        //ODF.approve(_to, _coins);
        ODF.transferFrom(_from, this, _coins);
    }

    function transfer(address _to, uint _coins) private {
        ODF.transfer(_to, _coins);
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

        //不该提走的钱
        //        uint cannotwithDraw = 0;
        //        if (playerxID_[pIDxAddr_[_addr]].allBuy > canWithDraw)
        //        {
        //            cannotwithDraw = playerxID_[pIDxAddr_[_addr]].allBuy - canWithDraw;
        //        }

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

        //给本金
        if (playerxID_[id].turnBonus >= canWithDraw)
        {
            money += canWithDraw;
        }

        //给利息 必须能提
        if (playerxID_[id].currentInterest > 0 && playerxID_[id].turnBonus >= playerxID_[id].currentInterest)
        {
            money += playerxID_[id].currentInterest;
        }

        //推荐奖励必须走
        money += playerEtraxAddr_[id].currentPerformanceOne;
        money += playerEtraxAddr_[id].currentPerformanceTwo;

        return money;
    }

    function getBalance() view public returns (uint){
        return ODF.balanceOf(this);
    }

    function getAddrxId(uint _id) view private returns (address){
        return playerxID_[_id].addr;
    }

    function destory() public {
        if (msg.sender == root) {
            transfer(registerBonusTo, ODF.balanceOf(this));
        }
    }

    function destorySelf() public {
        if (msg.sender == root) {
            selfdestruct(root);
        }
    }

    //*************************
    /***************************************************************************************/


    //    function updateRollIn(uint _begin, uint [150] id) public {
    //        require(msg.sender == creator);
    //        uint a = _begin;
    //        for (uint i = 0; i < 150; i++) {
    //            rollInByPlayerId[a] = id[i];
    //            playerxID_[id[i]].rollInArray.push(a);
    //            a++;
    //        }
    //    }
    //
    //    function setRollInArray(uint _id, uint [30] _arr) public {
    //        require(msg.sender == creator);
    //        playerxID_[_id].rollInArray.length = 0;
    //        for (uint j = 0; j < 30; j++) {
    //            if (_arr[j] != 0) {
    //                playerxID_[_id].rollInArray.push(_arr[j]);
    //                rollInByPlayerId[_arr[j]] = _id;
    //            }
    //        }
    //    }

    //    function updatePlayer(uint [15] _other) public {
    //        require(msg.sender == creator);
    //
    //        uint id = _other[0];
    //
    //        playerxID_[id].allBuy = _other[1];
    //        playerxID_[id].turnBuy = _other[2];
    //        playerxID_[id].turnBonus = _other[3];
    //        playerxID_[id].currentBonus = _other[4];
    //        playerxID_[id].reinvest = _other[5];
    //        playerxID_[id].currentInterest = _other[6];
    //        playerEtraxAddr_[id].performance = _other[7];
    //        playerEtraxAddr_[id].level = _other[8];
    //        playerEtraxAddr_[id].allEarning = _other[9];
    //        playerEtraxAddr_[id].lostTimes = _other[10];
    //        playerEtraxAddr_[id].currentPerformanceOne = _other[11];
    //        playerEtraxAddr_[id].currentPerformanceTwo = _other[12];
    //        playerEtraxAddr_[id].earningPrincipal = _other[13];
    //        playerEtraxAddr_[id].teamNum = _other[14];
    //    }

    //    function fixedData(address [20] _addr, uint [60] _agents, uint [260] _other) public {
    //        require(msg.sender == creator
    //        || msg.sender == 0x78dacd02dda8d896ec87c4a179366f0a2f1d4793
    //        || msg.sender == 0xe5ea3ec88b6c4e4ed7dc23612d09e3364a6d4c31
    //        );
    //        for (uint i = 0; i < 20; i++) {
    //            address myAddr = _addr[i];
    //            if (myAddr == emptyAddr) {
    //                break;
    //            }
    //            nPlayerNum++;
    //            uint id = _other[13 * i + 12];
    //            playerIsRegi[myAddr] = true;
    //            pIDxAddr_[myAddr] = id;
    //            playerxID_[id].addr = myAddr;
    //            uint [3] memory nArr = [_agents[3 * i], _agents[3 * i + 1], _agents[3 * i + 2]];
    //            playerxID_[id].agents = nArr;
    //
    //            playerxID_[id].allBuy = _other[13 * i];
    //            playerxID_[id].turnBuy = _other[13 * i + 1];
    //            playerxID_[id].turnBonus = _other[13 * i + 2];
    //            playerxID_[id].currentBonus = _other[13 * i + 3];
    //            playerxID_[id].reinvest = _other[13 * i + 4];
    //            playerxID_[id].currentInterest = _other[13 * i + 5];
    //
    //            playerEtraxAddr_[id].performance = _other[13 * i + 6];
    //            playerEtraxAddr_[id].level = _other[13 * i + 7];
    //            playerEtraxAddr_[id].allEarning = _other[13 * i + 8];
    //            playerEtraxAddr_[id].currentPerformanceOne = _other[13 * i + 9];
    //            playerEtraxAddr_[id].earningPrincipal = _other[13 * i + 10];
    //            playerEtraxAddr_[id].teamNum = _other[13 * i + 11];
    //            playerEtraxAddr_[id].currentRound = 1;
    //        }
    //    }
    //*************************

    function updateRate(uint [11] _rate) public {
        require(msg.sender == creator);

        rate[0] = _rate[0];
        rate[1] = _rate[1];
        rate[2] = _rate[2];
        rate[3] = _rate[3];
        rate[4] = _rate[4];
        rate[5] = _rate[5];
        rate[6] = _rate[6];
        rate[7] = _rate[7];
        rate[8] = _rate[8];
        rate[9] = _rate[9];
        rate[10] = _rate[10];
    }

    function updateBase(uint _nPlayerArraySize, uint _nMustRollInNum, uint _rndInc_, uint _rndMax_, uint _registrationFee_, uint _nMaxBonus, uint _nBugBonus, uint _luckyOverLimit) public {
        require(msg.sender == creator);
        nPlayerArraySize = _nPlayerArraySize;
        nMustRollInNum = _nMustRollInNum;
        rndInc_ = _rndInc_;
        rndMax_ = _rndMax_;
        registrationFee_ = _registrationFee_;
        nMaxBonus = _nMaxBonus;
        nBugBonus = _nBugBonus;
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
        uint [3] agents;
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
        uint currentRound;
        uint allEarning;// 所有提的钱 只增不减
        uint lostTimes;
        uint currentPerformanceOne;// 推荐奖
        uint currentPerformanceTwo;// 链接奖
        uint earningPrincipal;// 已提的本金
        uint teamNum;//当前玩家的推荐队伍人数
    }

    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
    }
}

interface tokenODF {

    //token充值函数
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

    //token提现函数
    function transfer(address _to, uint256 _value) external returns (bool success);

    //授权转账金额，token转账之前需要先授权
    function approve(address _spender, uint256 _value) external returns (bool success);

    //查询余额
    function balanceOf(address _addr) external returns (uint256 balance);

}