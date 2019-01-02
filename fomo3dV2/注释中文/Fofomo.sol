pragma solidity ^0.4.24;

library FofDataSets {
    // team
    // 0 = 鲸whales
    // 1 = 熊bears
    // 2 = 蛇sneks
    // 3 = 牛bulls
    struct PlayerInfo {
        address addr;   // player address
        bytes32 name;   // player name
        uint keyNum;    // Number of keys
        uint bonus;     // key Dividend
        uint tokenBonus;     // token Dividend
        uint refereesBonus;  // Dividends obtained when recommending others
        uint team;       // Ownership team
        address referees; // Referrer address
    }

    struct TeamBalance {
        uint256 total;      // Buy total
        uint256 potCoin;    // Total amount of money entering the prize pool by percentage
    }
}

library NameFilter {
    /**
     * @dev filters name strings
     * -Case conversion。
     * -There will be no spaces to end and start 
     * -Does not contain multiple spaces
     * -Not just numbers
     * -Cant start from 0X
     * -Limit character toA-Z、A-Z、0-9。
     * @return a string reprocessed in bytes32 format
     */
    function nameFilter(string _input)
    internal
    pure
    returns (bytes32){
        bytes memory _temp = bytes(_input);
        uint256 _length = _temp.length;

        //sorry limited to 32 characters
        require(_length <= 32 && _length > 0, "string must be between 1 and 32 characters");
        // make sure it doesnt start with or end with space
        require(_temp[0] != 0x20 && _temp[_length - 1] != 0x20, "string cannot start or end with space");
        // make sure first two characters are not 0x
        if (_temp[0] == 0x30)
        {
            require(_temp[1] != 0x78, "string cannot start with 0x");
            require(_temp[1] != 0x58, "string cannot start with 0X");
        }

        // create a bool to track if we have a non number character
        bool _hasNonNumber;

        // convert & check
        for (uint256 i = 0; i < _length; i++)
        {
            // if its uppercase A-Z
            if (_temp[i] > 0x40 && _temp[i] < 0x5b)
            {
                // convert to lower case a-z
                _temp[i] = byte(uint(_temp[i]) + 32);

                // we have a non number
                if (_hasNonNumber == false)
                    _hasNonNumber = true;
            } else {
                require
                (
                // require character is a space
                    _temp[i] == 0x20 ||
                // OR lowercase a-z
                (_temp[i] > 0x60 && _temp[i] < 0x7b) ||
                // or 0-9
                (_temp[i] > 0x2f && _temp[i] < 0x3a),
                    "string contains invalid characters"
                );
                // make sure theres not 2x spaces in a row
                if (_temp[i] == 0x20)
                    require(_temp[i + 1] != 0x20, "string cannot contain consecutive spaces");

                // see if we have a character other than a number
                if (_hasNonNumber == false && (_temp[i] < 0x30 || _temp[i] > 0x39))
                    _hasNonNumber = true;
            }
        }

        require(_hasNonNumber == true, "string cannot be only numbers");

        bytes32 _ret;
        assembly {
            _ret := mload(add(_temp, 32))
        }
        return (_ret);
    }
}
/**
 * @title SafeMath v0.1.9
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    *  todo multiplication
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
    * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    *  todo Subtraction
    */
    function sub(uint256 a, uint256 b)
    internal
    pure
    returns (uint256){
        require(b <= a, "SafeMath sub failed");
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    *  todo addition
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
     * @dev gives square root of given x.
     todo Square root
     */
    function sqrt(uint256 x)
    internal
    pure
    returns (uint256 y){
        uint256 z = ((add(x, 1)) / 2);
        y = x;
        while (z < y)
        {
            y = z;
            z = ((add((x / z), z)) / 2);
        }
    }

    /**
     * @dev gives square. multiplies x by x
      todo square
     */
    function sq(uint256 x)
    internal
    pure
    returns (uint256){
        return (mul(x, x));
    }

    /**
     * @dev x to the power of y
      todo Y power
     */
    function pwr(uint256 x, uint256 y)
    internal
    pure
    returns (uint256){
        if (x == 0)
            return (0);
        else if (y == 0)
            return (1);
        else
        {
            uint256 z = x;
            for (uint256 i = 1; i < y; i++)
                z = mul(z, x);
            return (z);
        }
    }
}

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
    using NameFilter for string;
    using SafeMath for *;
    linkTokenInterface constant private tokenContract = linkTokenInterface(0xf9a7adc6ca5ce951e38487147287c2947cc797d7);
    string public name = "Fofomo";
    string public symbol = "FOFM"; // nickname
    uint public totalKey;  // Keytotal
    uint public totalKeyBonus;  // Key Total dividends
    uint public totalTokenBonus;  // Token Total dividends
    address public creator = msg.sender; // Creator's address
    uint256 constant private rndInit_ = 1 hours;                // Open the game in an hour
    uint256 constant private rndInc_ = 30 seconds;              // Increase the Key by 30s each time
    uint256 constant private rndMax_ = 6 hours;                 // Up to 6h

    uint256 constant internal keyPriceInitial_ = 0.001 ether;
    uint256 constant internal keyPriceIncremental_ = 0.00001 ether;
    uint256 public registrationFee_ = 10 finney;            // price to register a name
    uint256 public keyPriceCurrent = keyPriceInitial_;
    uint256 public round = 1; // This round is the first round
    uint256 public createTime = now;
    uint256 public overMoment = createTime + rndMax_; // The end of the game

    address [] Luckyer; // Save the last three

    /**
     * BUY key，Incoming address addr，judgment pIDxAddr_[addr] Whether it is 0，0 is the first purchase, not 0 for the second time
     * First purchase：Get the length of playerArr，+1 for his pid，Deposit pIDxAddr_，by pid save player information to playerxID_
     *           When registering the name, first determine whether the value of pIDxName_ is 0. If it is 0, the name is registered for the first time. Otherwise, please change the name.
     * 2+th purchase：Get player information through pid, then change player information
     */
    mapping(address => uint256) public pIDxAddr_;      // (addr => pID) returns player id by address
    mapping(bytes32 => uint256) public pIDxName_;      // (name => pID) returns player id by name
    mapping(uint256 => FofDataSets.PlayerInfo) public playerxID_; // (pId => data) returns player data by id
    address [] public playerArr; // Player address array, subscript +1 is pid

    // 0 = 鲸whales
    // 1 = 熊bears
    // 2 = 蛇sneks
    // 3 = 牛bulls
    // buy key
    //50% to Bonus pool, 10% to Referrer, 3% to creator, 1% to airdrop,todo 30% to key pool, 6% to token pool
    //43% to Bonus pool, 10% to Referrer, 3% to creator, 1% to airdrop,todo 43% to key pool, 0% to token pool
    //20% to Bonus pool, 10% to Referrer, 3% to creator, 1% to airdrop,todo 56% to key pool, 10% to token pool
    //35% to Bonus pool, 10% to Referrer, 3% to creator, 1% to airdrop,todo 43% to key pool, 8% to token pool

    // 一轮游戏结束时
    //48% to winner, 3% to keyChoose 10 people, assign by Key ratio, 2% to creator, 24% to next round,todo 14% to key pool, 9% to token pool
    //48% to winner, 3% to keyChoose 10 people, assign by Key ratio, 2% to creator, 24% to next round,todo 23% to key pool, 0% to token pool
    //48% to winner, 3% to keyChoose 10 people, assign by Key ratio, 2% to creator, 9% to next round,todo 19% to key pool, 19% to token pool
    //48% to winner, 3% to keyChoose 10 people, assign by Key ratio, 2% to creator, 9% to next round,todo 29% to key pool, 9% to token pool

    mapping(uint256 => FofDataSets.TeamBalance) public teamPot; // Store 4 teams prize pool balance

    function deposit() public payable {}

    //The maximum purchase quota for each address is only 1 ETH. When the ETH in the smart contract reaches 100, it is no longer restricted.
    modifier isWithinLimits(uint256 _eth) {
        require(getCurrentBalance() > 100 ether || _eth <= 1 ether, "When the bonus pool balance is less than 100ETH, the purchase key amount shall not exceed 1ETH");
        _;
    }

    //    constructor() payable{}
    /**
    * Buy key
    * Buyer address _addr
    * Join the team _team
    * Referrer address _referrer(No referrals are introduced 0x0)
    * I need to find his referee in the contract before each purchase.
    */
    function keyRollIn(address _addr, uint _team, address _referrer) isWithinLimits(msg.value) public payable {
        require(_addr != 0x0);
        deposit();
        uint allCoin = msg.value;
        uint keyNum = allCoin / keyPriceCurrent;
        totalKey += keyNum;
        keyPriceCurrent += keyPriceIncremental_;
        // Save the last 3 addresses of the person who bought the key
        if (Luckyer.length <= 3) {
            Luckyer.push(_addr);
        } else {
            Luckyer[0] = Luckyer[1];
            Luckyer[1] = Luckyer[2];
            Luckyer[2] = _addr;
        }
        // First time to buy
        if (pIDxAddr_[_addr] == 0) {
            pIDxAddr_[_addr] = playerArr.length + 1;
            playerArr.push(_addr);
            playerxID_[pIDxAddr_[_addr]] = FofDataSets.PlayerInfo(_addr, "", keyNum, 0, 0, 0, _team, _referrer);
        } else {// Second purchase
            playerxID_[pIDxAddr_[_addr]].keyNum += keyNum;
            playerxID_[pIDxAddr_[_addr]].team = _team;
        }
        // 0 = 鲸whales
        // 1 = 熊bears
        // 2 = 蛇sneks
        // 3 = 牛bulls
        // 4 = airdrop奖 pool
        if (_team == 0) {
            teamPot[0].total += allCoin;
            teamPot[0].potCoin += allCoin.mul(50) / 100;
            // to key pool30%
            bonusToKeyPot(allCoin.mul(30) / 100);
        } else if (_team == 1) {
            teamPot[1].total += allCoin;
            teamPot[1].potCoin += allCoin.mul(43) / 100;
            // to key pool43%
            bonusToKeyPot(allCoin.mul(43) / 100);
        } else if (_team == 2) {
            teamPot[2].total += allCoin;
            teamPot[2].potCoin += allCoin.mul(20) / 100;
            // to key pool56%
            bonusToKeyPot(allCoin.mul(56) / 100);
        } else if (_team == 3) {
            teamPot[3].total += allCoin;
            teamPot[3].potCoin += allCoin.mul(35) / 100;
            // to key pool43%
            bonusToKeyPot(allCoin.mul(43) / 100);
        }
//        bonusToToken(_team,allCoin);
        // to referees 10%
        if (playerxID_[pIDxAddr_[_addr]].referees != 0x0) {
            address referees = playerxID_[pIDxAddr_[_addr]].referees;
            playerxID_[pIDxAddr_[referees]].refereesBonus = allCoin.mul(10) / 100;
        } else { // Not to token
//            bonusToTokenPot(allCoin.mul(10) / 100);
        }
        // to creator3%
        transferCoin(creator, allCoin.mul(3) / 100);
        // to airdrop1%
        teamPot[4].total += allCoin;
        teamPot[4].potCoin += allCoin.mul(1) / 100;
        // According to allCoin's 5% chance, return the prize pool of airdrop rewards
        if (airdropSign(100) < 5) {
            if (allCoin >= 0.1 ether && allCoin < 1 ether) {
                transferCoin(_addr, teamPot[4].potCoin.mul(25) / 100);
            } else if (allCoin >= 1 ether && allCoin < 10 ether) {
                transferCoin(_addr, teamPot[4].potCoin.mul(50) / 100);
            } else if (allCoin >= 10 ether) {
                transferCoin(_addr, teamPot[4].potCoin.mul(75) / 100);
            }
        }
        // Remaining time plus 30s
        overMoment += rndInc_ * keyNum;
        uint timeInterval = overMoment - now;
        overMoment = timeInterval > 6 hours ? (now + rndMax_) : overMoment;
        emit onBuyKey(_addr, "Buy success！", keyNum);
    }

    // not to token
    function bonusToToken(uint _team,uint allCoin) private{
        if (_team == 0) {
            // 给token pool6%
            bonusToTokenPot(allCoin.mul(6) / 100);
        } else if (_team == 1) {
            // 给token pool0%
        } else if (_team == 2) {
            // 给token pool10%
            bonusToTokenPot(allCoin.mul(10) / 100);
        } else if (_team == 3) {
            // 给token pool8%
            bonusToTokenPot(allCoin.mul(8) / 100);
        }
    }

    /**
     * The game is over and the money is started.
     * 1 total prize pool 48% is given to the last three people who buy the key, the last is the last: the second last: the third last = 3:2:1
     * 2 total prize pool3% for the lucky prize pool, random 10 people, assigned by key
     * 3key prize pool part
     * 4token prize pool part
     * 52% for creator
     * 6 part for next round
    */
    function gameOver() public {
        uint _now = now;
        require(_now >= overMoment);
        uint totalPot = getTotalPot();
        // obtain 48%
        transferCoin(Luckyer[0], totalPot.mul(8) / 100);
        transferCoin(Luckyer[1], totalPot.mul(16) / 100);
        transferCoin(Luckyer[2], totalPot.mul(24) / 100);
        // obtain 3% Lucky prize pool
        splitLuckyPot();

        //2% to creator
        transferCoin(creator, totalPot.mul(2) / 100);

        //key prize pool Dividend  &&  token prize pool Dividend   &&  Part of it next round
        // 0 = 鲸whales 14%  9%  24%
        // 1 = 熊bears  23%  0%  24%
        // 2 = 蛇sneks  19%  19% 9%
        // 3 = 牛bulls  29%  9%  9%
        // Get the team number of the last lucky guy who bought the key Luckyer[2]
        uint winTeam = playerxID_[pIDxAddr_[Luckyer[2]]].team;
        if (winTeam == 0) {
            bonusToKeyPot(totalPot.mul(14) / 100);
            bonusToTokenPot(totalPot.mul(9) / 100);
            teamPot[0].potCoin = totalPot.mul(24) / 100;
        } else if (winTeam == 1) {
            bonusToKeyPot(totalPot.mul(23) / 100);
            teamPot[1].potCoin = totalPot.mul(24) / 100;
        } else if (winTeam == 2) {
            bonusToKeyPot(totalPot.mul(19) / 100);
            bonusToTokenPot(totalPot.mul(19) / 100);
            teamPot[2].potCoin = totalPot.mul(9) / 100;
        } else if (winTeam == 3) {
            bonusToKeyPot(totalPot.mul(29) / 100);
            bonusToTokenPot(totalPot.mul(9) / 100);
            teamPot[3].potCoin = totalPot.mul(9) / 100;
        }
        reset();
    }

    // registered nickname
    function registerName(string _nameString) public payable {
        bytes32 _name = _nameString.nameFilter();
        address _addr = msg.sender;
        uint256 _paid = msg.value;
        require(_paid >= registrationFee_, "umm.....  you have to pay the name fee");
        require(pIDxName_[_name] == 0, "sorry that names already taken");
        playerxID_[pIDxAddr_[_addr]].name = _name;
        pIDxName_[_name] = pIDxAddr_[_addr];
        emit onRegisterName(_addr, _nameString, "Registered successfully");
    }

    // Lucky prize pool
    function splitLuckyPot() private {
        uint coin = getTotalPot().mul(3) / 100;
        uint subInit = airdropSign(100000000) % playerArr.length;
        for (uint i = 0; i < 10; i++) {
            uint sub = subInit + i;
            if (sub >= playerArr.length) {
                sub = sub % playerArr.length;
            }
            transferCoin(playerArr[sub], playerxID_[pIDxAddr_[playerArr[sub]]].keyNum * coin / totalKey);
        }
    }

    // Get the total prize pool balance
    function getTotalPot() constant public returns (uint){
        uint totalPot = 0;
        for (uint i = 0; i < 4; i++) {
            totalPot += teamPot[i].potCoin;
        }
        return totalPot;
    }

    // key pool Dividend
    // Only pay 10,000 people who bought the key recently
    function bonusToKeyPot(uint coin) private {
        totalKeyBonus += coin;
        uint sub = playerArr.length > 10000 ? (playerArr.length - 10000) : 0;
        for (uint i = sub; i < playerArr.length; i++) {
            playerxID_[pIDxAddr_[playerArr[i]]].bonus += playerxID_[pIDxAddr_[playerArr[i]]].keyNum * coin / totalKey;
        }
    }

    function aTest() public constant returns (address[], uint8){
        return (tokenContract.getTokenAddress(), tokenContract.decimals());
        //        return (tokenContract.decimals());
    }

    // token pool Dividend
    function bonusToTokenPot(uint coin) private {
        totalTokenBonus += coin;
        if (tokenContract.getTokenAddress().length > 0) {
            for (uint i = 0; i < tokenContract.getTokenAddress().length; i++) {
                // Stored value
                playerxID_[pIDxAddr_[playerArr[i]]].tokenBonus += tokenContract.getTokenPer(tokenContract.getTokenAddress()[i]) * coin / tokenContract.totalSupply();
            }
        }
    }

    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }

    // Return prize pool balance
    function getCurrentBalance() public constant returns (uint256) {
        return address(this).balance;
    }

    // Withdrawal of token dividends
    function withdrawToken(address _addr) public {
        //        if (_addr == msg.sender) {
        transferCoin(_addr, playerxID_[pIDxAddr_[_addr]].tokenBonus);
        playerxID_[pIDxAddr_[_addr]].tokenBonus = 0;
        emit onWithdraw(_addr, "Token bonus withdrawal successful！");
        //        }
    }

    // Cash withdrawal
    function withdrawKey(address _addr) public {
        //        if (_addr == msg.sender) {
        transferCoin(_addr, playerxID_[pIDxAddr_[_addr]].bonus);
        playerxID_[pIDxAddr_[_addr]].bonus = 0;
        emit onWithdraw(_addr, "key bonus withdrawal successful！");
        //        }
    }

    // The reset function ends at each round
    function reset() private {
        // todo
        // Clear the keys owned by everyone
        for (uint i = 0; i < playerArr.length; i++) {
            playerxID_[i + 1].keyNum = 0;
            playerxID_[i + 1].bonus = 0;
            playerxID_[i + 1].tokenBonus = 0;
            playerxID_[i + 1].refereesBonus = 0;
        }
        // Empty the lucky addressLuckyer[]
        Luckyer.length = 0;
        // Time reset and can't buy within 1 hour
        uint endTime = now;
        overMoment = endTime + rndMax_;
        // Save the current round
        round++;
        // Key price restores initial price
        keyPriceCurrent = keyPriceInitial_;
    }

    // Return airdropsign value
    // The probability that the value is less than 5 is 5%
    function airdropSign(uint _per)
    private
    view
    returns (uint256){
        uint256 seed = uint256(keccak256(abi.encodePacked(
                (block.timestamp).add
                (block.difficulty).add
                ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (now)).add
                (block.gaslimit).add
                ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (now)).add
                (block.number)
            )));
        return ((seed - ((seed / _per) * _per)));
    }
}

interface linkTokenInterface {
    function getTokenAddress() external returns (address[]);

    function getTokenPer(address _addr) external returns (uint256);

    function totalSupply() external returns (uint256);

    function decimals() external returns (uint8);
}