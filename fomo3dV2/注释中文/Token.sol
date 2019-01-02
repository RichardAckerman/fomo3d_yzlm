pragma solidity ^0.4.24;

contract Token {
    string public name = "FofomoToken";
    string public symbol = "FTOK"; // nickname
    uint8 public decimals = 18; // Second power
    uint256 public totalSupply;  // Token total
    address public creator = msg.sender; // Creators address

    uint256 constant internal tokenPriceInitial_ = 0.001 ether;
    uint256 constant internal tokenIncrementalRate_ = 0.00001 ether;
    uint256 public tokenPriceCurrent = tokenPriceInitial_;

    struct TokenerInfo {
        uint amount; // Number of tokens owned
        uint now; // Buy time
        uint256 unit; // The value of the token when he bought the token
    }

    mapping(address => TokenerInfo) public Tokener; // Save the user token information
    address [] private TokenerArr; // Save all user addresses for purchasing tokens

    //roll-in/roll-out
    event Transfer(address from, string behavior, uint256 amount);

    function deposit() public payable {}

    /**
    *_addr tokenBuy
    *  Buy tokens roll-in，amount += _value
    * Every time you buy a token, the unit price plus one
    */
    function transferRollIn(address _addr) public payable {
        require(_addr != 0x0);
        deposit();
        // Extract 10%
        transferCoin(creator, msg.value / 11);
        tokenPriceCurrent = tokenPriceInitial_ + totalSupply * tokenIncrementalRate_;
        uint256 amount = msg.value * 10 * 1000000000000000000 / 11 / tokenPriceCurrent;
        if (Tokener[_addr].unit == 0) {
            TokenerArr.push(_addr);
        }
        Tokener[_addr].amount += amount;
        Tokener[_addr].now = now;
        Tokener[_addr].unit = tokenPriceCurrent;
        totalSupply += amount;
        emit Transfer(_addr, "roll in", amount);
    }

    /**
       *_addr token Transfer out
       *  Selling tokens roll-out，amount -= _value
       *_value Number
       */
    function transferRollOut(address _addr, uint256 _value) public {
        require(_addr != 0x0);
        require(Tokener[_addr].amount >= _value * 1000000000000000000);
        uint256 money = _value * tokenPriceCurrent * 9 / 10;
        require(getCurrentBalance() >= money);
        // Extract 10%
        transferCoin(creator, money / 10);
        transferCoin(_addr, money * 9 / 10);
        Tokener[_addr].amount -= _value * 1000000000000000000;
        Tokener[_addr].now = now;
        totalSupply -= _value * 1000000000000000000;
        emit Transfer(_addr, "roll out", _value * 1000000000000000000);
    }

    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }

    // Return token pool balance
    function getCurrentBalance() public constant returns (uint256) {
        return address(this).balance;
    }

    // Return token player address
    function getTokenAddress() public constant returns (address[]) {
        return TokenerArr;
    }

    // Returns the number of tokens for each token player
    function getTokenPer(address _addr) public constant returns (uint256) {
        return Tokener[_addr].amount;
    }
}