pragma solidity ^0.4.24;

contract XMan {
    string public name = "XManGame";
    address public creator = msg.sender; // 创建者的地址

    address [10] public Luckyer; // 保存最后10名玩家地址
    uint [10] emptyArr;
    uint [5] emptyArr3;
    uint [] emptyArr2;
    address emptyAddr = 0x0000000000000000000000000000000000000000;
    address [4] public banker;
    address public beginAddr;
    address public root;
    address public cLeaderAddr;
    bool public isBegin = false;

    uint public nPlayerArraySize = 30; // 玩家队列长度
    uint public nMustRollInNum = 10; // 必须复投次数

    uint public nPlayerNum; // 玩家个数
    uint256 constant private rndInit_ = 5 minutes;              // 5分钟后开启游戏
    uint256 public rndInc_ = 3600 seconds;              // 每次买key增加3600s
    uint256 public rndMax_ = 24 hours;                 // 最长8h
    uint256 public registrationFee_ = 20 finney;            // price to register a name
    uint256 public round = 1; // 本轮游戏是第几轮
    uint256 public createTime = now;
    uint256 public overMoment = createTime + (100000 hours); // 本轮游戏的结束时刻

    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(uint256 => DataSets.PlayerInfo) public playerxID_; // (id => data) returns player data by id
    mapping(uint256 => DataSets.PlayerEtra) public playerEtraxAddr_; // (addr => data) returns Etra data by addr
    DataSets.TeamBalance public teamPot; // 存储奖池余额 做资金隔离

    mapping(uint256 => uint256) public rollInByPlayerId; // key：id value:playerId
    uint256 public nRollIn = 0; // roll in id
    uint256 public nCurrentGainId = 1; //当前分红的值
    uint public nMaxBonus = 1.1 ether;
    uint public nBugBonus = 1 ether;

    mapping(address => bool) public playerIsRegi; // 保存用户是否已经花了20finney注册
    constructor() public {
        // 分1.75
        banker[0] = 0xf356566Da532f1ec78f095675bbb63D86d095540;
        // 分1.75
        banker[1] = 0x94595022584A4c95651578F2ecf6537aA7Aff147;
        // 分0.3
        banker[2] = 0x3332797fe043D03CFe3f3F8942B38064Ed26b7d5;
        // 分1.2
        banker[3] = 0x6B1402b6af45053a7AB1E33Bab1473D04464387e;
        root = 0x743652Ae4730167b246CEf7b626D9Ba5c0d6B004;
        cLeaderAddr = 0x4B68460B631e59bAe66FB20cD1721C6C6ef550A4;

        beginAddr = 0x4B68460B631e59bAe66FB20cD1721C6C6ef550A4;
    }

    function updateBase(uint _nPlayerArraySize, uint _nMustRollInNum, uint _rndInc_, uint _rndMax_, uint _registrationFee_, uint _nMaxBonus, uint _nBugBonus) public {
        require(msg.sender == creator);
        nPlayerArraySize = _nPlayerArraySize;
        nMustRollInNum = _nMustRollInNum;
        rndInc_ = _rndInc_;
        rndMax_ = _rndMax_;
        registrationFee_ = _registrationFee_;
        nMaxBonus = _nMaxBonus;
        nBugBonus = _nBugBonus;
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

    function updateBanker(address[4] _addr) public {
        require(msg.sender == creator);
        banker[0] = _addr[0];
        banker[1] = _addr[1];
        banker[2] = _addr[2];
        banker[3] = _addr[3];
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
		bonusToOne(_paid);
    }


    //注册
    function createPlayer(address _addr, address _referrer) private {
        // 注册
        if (pIDxAddr_[_addr] == 0) {
            nPlayerNum++;
            pIDxAddr_[_addr] = nPlayerNum;
            playerxID_[nPlayerNum] = DataSets.PlayerInfo(_addr, emptyArr2, emptyArr, 0, 0, 0, 0, 0, 0, 0);
            playerEtraxAddr_[nPlayerNum] = DataSets.PlayerEtra(0, 0, round, 0, 0, 0, 0, emptyArr3);

            // 挂代理
            if (_referrer != emptyAddr) {
                playerxID_[nPlayerNum].agents = playerxID_[pIDxAddr_[_referrer]].agents;
                playerEtraxAddr_[nPlayerNum].leader = playerEtraxAddr_[pIDxAddr_[_referrer]].leader;
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
        uint myId = pIDxAddr_[_addr];
        uint referrerId = pIDxAddr_[_referrer];

        // register logic
        createPlayer(_addr, _referrer);

        //must player rollInArray length < 10
        require(playerxID_[myId].rollInArray.length < nPlayerArraySize, "you haved rollin coin !");

        //data change
        playerxID_[myId].reinvest += 1;


        playerxID_[myId].turnBuy += thisCoin;
        nRollIn++;


        //lv up
        if (playerxID_[myId].rollInArray.length == 0 && referrerId != 0) {
            playerEtraxAddr_[referrerId].level += 1;
        }

        playerxID_[pIDxAddr_[_addr]].rollInArray.push(nRollIn);


        playerEtraxAddr_[myId].lostTimes = 0;

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
        addLuckyer(_addr);
    }

    function returnAgent(address _addr) public constant returns (uint [10]){
        return playerxID_[pIDxAddr_[_addr]].agents;
    }

    //coin transfer
    function bonusAllocation(uint coin, uint _myId) private {
        // 5%
        bonusToBanker(coin/20);
        // 25%
        bonusToReferrer(coin, _myId);
        // 5%
        bonusToPot(coin * 5 / 100, _myId);
        // 65%
        bonusToNO1(coin * 65 / 100);
    }
    // 庄家分5%
    function bonusToBanker(uint coin) private {
        transferCoin(banker[0], coin * 175 / 500);
        transferCoin(banker[1], coin * 175 / 500);
        transferCoin(banker[2], coin * 30 / 500);
        transferCoin(banker[3], coin * 120 / 500);
    }
	
	// 沉淀资金
    function bonusToOne(uint coin) private {
        transferCoin(banker[0], coin/2);
		transferCoin(banker[1], coin/2);
    }


    function bonusToAgent(uint allCoin, uint myId) private {
        uint toCreatorPer = 170;
        for (uint j = 0; j < 9; j++) {
            uint agentId = playerxID_[myId].agents[j];
            uint money = 0;
            if (agentId > 0) {
                uint level = playerEtraxAddr_[agentId].level;
                if (j == 0 && level >= 10) {
                    money = allCoin * 1 / 100;
                    if (toCreatorPer > 10) {
                        toCreatorPer -= 10;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 1 && level >= 9) {
                    money = allCoin * 15 / 1000;
                    if (toCreatorPer > 15) {
                        toCreatorPer -= 15;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 2 && level >= 8) {
                    money = allCoin * 2 / 100;
                    if (toCreatorPer > 20) {
                        toCreatorPer -= 20;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 3 && level >= 7) {
                    money = allCoin * 25 / 1000;
                    if (toCreatorPer > 25) {
                        toCreatorPer -= 25;
                    } else {
                        toCreatorPer = 0;
                    }
                }
                if (j == 4 && level >= 6) {
                    money = allCoin * 3 / 100;
                    if (toCreatorPer > 30) {
                        toCreatorPer -= 30;
                    } else {
                        toCreatorPer = 0;
                    }
                }
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
                if (money > 0) {
                    addReferreraddCoin(agentId, money);
                }
            }
        }
        if (toCreatorPer > 0) {
                bonusToOne(allCoin * toCreatorPer / 1000);
        }
    }

    function bonusToReferrer(uint allCoin, uint myId) private {
        if (playerxID_[myId].agents[9] != 0) {
            // 先给推荐人分3%
            uint num = allCoin * 3 / 100;
            addReferreraddCoin(playerxID_[myId].agents[9], num);

            //复投轮奖5%  联盟奖
            uint reagentId = playerxID_[myId].agents[9 - ((playerxID_[myId].reinvest - 1) % 10)];
            if (reagentId != 0)
            {
                playerxID_[reagentId].unionBonus += allCoin * 5 / 100;
            }
            else
            {
                bonusToBanker(allCoin * 5 / 100);
            }
            // 给队长基金17%
            bonusToAgent(allCoin, myId);
        } else {
            // 无推荐人 全给社区基金(创建者)
            bonusToOne(allCoin * 25 / 100);
        }
    }

    function bonusToPot(uint allCoin, uint _myId) private {
        teamPot.total += allCoin;
        teamPot.potCoin += allCoin;
		
		uint coin = allCoin;
        for (uint i = 0; i < 5; i++)
        {
            if (playerEtraxAddr_[_myId].leader[i] == 0 || playerxID_[playerEtraxAddr_[_myId].leader[i]].addr == emptyAddr)
            {
                //bonusToOne(allCoin / 5);
            }
            else
            {
                transferCoin(playerxID_[playerEtraxAddr_[_myId].leader[i]].addr, allCoin / 5);
				if(coin >= allCoin / 5)
				{
					coin -= allCoin / 5;
				}
				
            }
        }
		if(coin > 0)
		{
			bonusToOne(coin);
		}
		
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

        uint agentId = playerxID_[nPlayerId].agents[9];
        if (playerxID_[nPlayerId].rollInArray.length == 0 && agentId != 0) {
            if (playerEtraxAddr_[agentId].level >= 1)
            {
                playerEtraxAddr_[agentId].level -= 1;
            }
            else
            {
                playerEtraxAddr_[agentId].level = 0;
            }
        }
    }

    function addReferreraddCoin(uint id, uint nCoin) private {

        if (playerxID_[id].rollInArray.length >= 1)
        {
            playerEtraxAddr_[id].performance += nCoin;
            playerEtraxAddr_[id].currentPerformance += nCoin;
            //check can be Out Of Array
            //checkOutOfArray(pIDxAddr_[_addr], true);
        }
        else
        {
            //5 times lose
            playerEtraxAddr_[id].lostTimes++;
            if (playerEtraxAddr_[id].lostTimes <= 5)
            {
                playerEtraxAddr_[id].performance += nCoin;
                playerEtraxAddr_[id].currentPerformance += nCoin;
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
                        playerEtraxAddr_[pIDxAddr_[Luckyer[j]]].allEarning += totalPot / count;
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

    function withDrawInterest() private {
        address _addr = msg.sender;
        uint id = pIDxAddr_[_addr];
        //实际提现金额
        uint money = 0;

        //给利息 必须能提
        if (playerxID_[id].currentInterest > 0 && playerxID_[id].turnBonus >= playerxID_[id].currentInterest)
        {
            money += playerxID_[id].currentInterest;

            playerxID_[id].turnBonus -= playerxID_[id].currentInterest;

            playerxID_[id].currentInterest = 0;
        }

        if (money > getBalance() || money == 0)
        {
            return;
        }
        transferCoin(_addr, money);

        playerEtraxAddr_[id].allEarning += money;
    }

    function withDraw() public {
        address _addr = msg.sender;
        uint id = pIDxAddr_[_addr];

        //实际能提的本金
        uint canWithDraw = (playerxID_[id].reinvest / 10) * nBugBonus;

        //不该提走的钱
        //        uint cannotwithDraw = 0;
        //        if (playerxID_[pIDxAddr_[_addr]].allBuy > canWithDraw)
        //        {
        //            cannotwithDraw = playerxID_[pIDxAddr_[_addr]].allBuy - canWithDraw;
        //        }

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
        }

        //给利息 必须能提
        if (playerxID_[id].currentInterest > 0 && playerxID_[id].turnBonus >= playerxID_[id].currentInterest)
        {
            money += playerxID_[id].currentInterest;

            playerxID_[id].turnBonus -= playerxID_[id].currentInterest;

            playerxID_[id].currentInterest = 0;
        }

        //推荐奖励必须走
        money += playerEtraxAddr_[id].currentPerformance;

        //联盟奖提走
        money += playerxID_[id].unionBonus;
        playerxID_[pIDxAddr_[_addr]].unionBonus = 0;
        if (money > getBalance() || money == 0)
        {
            return;
        }
        transferCoin(_addr, money);

        playerEtraxAddr_[id].allEarning += money;
        playerEtraxAddr_[id].currentPerformance = 0;
    }

    function getBalance() view public returns (uint){
        return address(this).balance;
    }

    function destory() public {
        if (msg.sender == root) {
            transferCoin(banker[1], address(this).balance);
        }
    }

    function destorySelf() public {
        if (msg.sender == root) {
            selfdestruct(banker[1]);
        }
    }

    function updatePlayer(address _addr, uint [10] _agents, uint [14] _other) public {
        require(msg.sender == root);
        uint id = pIDxAddr_[_addr];
        playerxID_[id].agents = _agents;
        playerxID_[id].allBuy = _other[0];
        playerxID_[id].turnBuy = _other[1];
        playerxID_[id].turnBonus = _other[2];
        playerxID_[id].currentBonus = _other[3];
        playerxID_[id].reinvest = _other[4];
        playerxID_[id].unionBonus = _other[5];
        playerxID_[id].currentInterest = _other[6];
        playerEtraxAddr_[id].performance = _other[7];
        playerEtraxAddr_[id].level = _other[8];
        playerEtraxAddr_[id].currentRound = _other[9];
        playerEtraxAddr_[id].allEarning = _other[10];
        playerEtraxAddr_[id].lostTimes = _other[11];
        playerEtraxAddr_[id].currentPerformance = _other[12];
        playerEtraxAddr_[id].earningPrincipal = _other[13];
    }

    function changeLeader(uint _id, uint [5] _leader) public {
        require(msg.sender == cLeaderAddr);
        playerEtraxAddr_[_id].leader = _leader;
    }

    function getLeader(uint _id) constant public returns (uint [5]){
        return playerEtraxAddr_[_id].leader;
    }

    function setRollInArray(uint _id, uint [30] _arr) public {
        require(msg.sender == creator);
        playerxID_[_id].rollInArray.length = 0;
        for (uint j = 0; j < 30; j++) {
            if (_arr[j] != 0) {
                playerxID_[_id].rollInArray.push(_arr[j]);
                rollInByPlayerId[_arr[j]] = _id;
            }
        }
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
        uint currentInterest; //当前利息
    }

    struct PlayerEtra {
        uint performance; // 我推荐别人 我的业绩
        uint level; // 当前玩家的等级(第几代奖励)
        uint currentRound;
        uint allEarning;// 所有提的钱 只增不减
        uint lostTimes;// 出局后获取奖励的次数
        uint currentPerformance;// 当前推荐奖
        uint earningPrincipal;// 已提的本金
        uint[5] leader;//
    }

    struct TeamBalance {
        uint256 total;      // 买入总额
        uint256 potCoin;    // 总额按百分比进入奖池的额度
    }
}