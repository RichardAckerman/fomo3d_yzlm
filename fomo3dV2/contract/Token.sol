pragma solidity ^0.4.24;

contract Token {
    string public name = "FofomoToken";
    string public symbol = "FTOK"; // nickname
    uint8 public decimals = 18; // 多少次方
    uint256 public totalSupply;  // 总Token总数
    address public creator = msg.sender; // 创建者的地址
    uint256 public totalTransaction;  // 总交易量
    uint256 constant internal tokenPriceInitial_ = 0.0001 ether;
    uint256 constant internal tokenIncrementalRate_ = 0.0000001 ether;
    uint256 constant internal weinum = 10000;

    uint256 public tokenPriceCurrent = tokenPriceInitial_;

    struct TokenerInfo {
        uint amount; // 拥有的token数
        uint now; // 买入的时间
        uint256 unit; // 他买token时token的价格
        uint buyTokenCost;//总支出
        uint totalIncome; //卖出token总收入
    }

    mapping(address => TokenerInfo) public Tokener; // 保存用户的token信息

    mapping(address => uint) public performance; // 保存推荐人的业绩

    address [] private TokenerArr; // 保存所有购买token的用户地址

    //roll-in/roll-out
    event Transfer(address from, string behavior, uint256 amount);

    function deposit() public payable {}

    /**
    *_addr token买入
    *  买代币roll-in，amount += _value
    * 每买一个token，单价加一
    */
    function transferRollIn(address _addr, uint nBuyNum, address _referees) public payable {
        require(_addr != 0x0);
        deposit();
        uint ownCoin = msg.value;
        uint nMoney = (tokenPriceCurrent + tokenIncrementalRate_ * nBuyNum / weinum / 2) * nBuyNum / weinum;
        if (nMoney * 11 / 10 > ownCoin) {
            nBuyNum /= 2;
            nMoney = (tokenPriceCurrent + tokenIncrementalRate_ * nBuyNum / weinum / 2) * nBuyNum / weinum;
            if (nMoney * 11 / 10 > ownCoin) {
                transferCoin(_addr, msg.value);
                return;
            }
        }
        // 抽取10%
        transferCoin(creator, nMoney / 10);

        transferCoin(_addr, ownCoin - nMoney * 11 / 10);

        totalSupply += nBuyNum;
        updatePrice();

        if (Tokener[_addr].unit == 0) {
            TokenerArr.push(_addr);
        }
        Tokener[_addr].amount += nBuyNum;
        Tokener[_addr].now = now;
        Tokener[_addr].unit = tokenPriceCurrent;

        totalTransaction += nMoney * 11 / 10;
        Tokener[_addr].buyTokenCost += nMoney * 11 / 10;
        if (_referees != 0x0000000000000000000000000000000000000000) {
            performance[_referees] += nMoney * 11 / 10;
        }

        emit Transfer(_addr, "roll in", nBuyNum);
    }

    /**
       *_addr token转出
       *  卖代币roll-out，amount -= _value
       *_value 个数
       */
    function transferRollOut(address _addr, uint256 _value) public {
        require(_addr != 0x0);
        require(Tokener[_addr].amount >= _value);

        uint ownMoney = (tokenPriceCurrent - tokenIncrementalRate_ * _value / weinum / 2) * _value / weinum;
        //        tokenPriceInitial_
        totalSupply -= _value;
        updatePrice();
        require(getCurrentBalance() >= ownMoney);
        // 抽取10%
        transferCoin(creator, ownMoney / 10);
        transferCoin(_addr, ownMoney * 9 / 10);
        Tokener[_addr].amount -= _value;
        Tokener[_addr].now = now;

        totalTransaction += ownMoney;
        Tokener[_addr].totalIncome += ownMoney;
        emit Transfer(_addr, "roll out", ownMoney);
    }

    // 创建者提现
    function withdraw(uint _money) public {
        require(_money <= getCurrentBalance());
        address drawer = msg.sender;
        if (drawer == creator) {
            transferCoin(creator, _money);
        }
    }

    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }

    // 更新当前token价格
    function updatePrice() private {
        tokenPriceCurrent = tokenPriceInitial_ + totalSupply * tokenIncrementalRate_ / weinum;
    }
    // 返回token奖池余额
    function getCurrentBalance() public constant returns (uint256) {
        return address(this).balance;
    }

    // 返回token玩家地址
    function getTokenAddress() public constant returns (address[]) {
        return TokenerArr;
    }

    // 返回每个token玩家的token数
    function getTokenPer(address _addr) public constant returns (uint256) {
        return Tokener[_addr].amount;
    }
}