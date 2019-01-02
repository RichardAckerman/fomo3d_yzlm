pragma solidity ^0.4.24;

contract FomoData {

    FomoDatabase constant private Database = FomoDatabase(0x97aace2ce59024b30b636ef19ccf6f55cc473eba);

    // 返回当前局总钥匙数
    function getTotalKey() public constant returns (uint){
        return Database.totalKey();
    }
    // 返回当前局Key分红总数
    function getTotalKeyBonus() public constant returns (uint){
        return Database.totalKeyBonus();
    }

    // 返回游戏创建者
    function getCreator() public constant returns (address){
        return Database.creator();
    }
    // 返回当前key价格
    function getKeyPriceCurrent() public constant returns (uint){
        return Database.keyPriceCurrent();
    }
    // 返回当前游戏是第几轮
    function getRound() public constant returns (uint){
        return Database.round();
    }
    // 返回当前轮游戏结算时间
    function getOverMoment() public constant returns (uint){
        return Database.overMoment();
    }

    // 返回当前轮游戏最后被购买的10把钥匙的归宿
    function getLuckyer(uint index) public constant returns (address){
        return Database.Luckyer(index);
    }

    // 返回用户id 未注册返回0
    function getPlayerId(address _addr) public constant returns (uint){
        return Database.pIDxAddr_(_addr);
    }

    // 根据用户id返回用户属性
    function getPlayerProp(uint _id) public constant returns (address, bytes32, uint, uint, uint, uint, uint, uint, address, uint){
        return Database.playerxID_(_id);
    }

    // 根据用户id返回用户地址
    function getPlayerAddress(uint _id) public constant returns (address){
        return Database.playerArr(_id);
    }

    // 根据队伍编号返回队伍奖池
    // total    总买入
    // potCoin  奖池占比
    function getTeamPot(uint256 index) public constant returns (uint256, uint256){
        return Database.teamPot(index);
    }
}

interface FomoDatabase {
    function totalKey() external view returns (uint);

    function totalKeyBonus() external view returns (uint);

    function creator() external view returns (address);

    function keyPriceCurrent() external view returns (uint);

    function round() external view returns (uint);

    function overMoment() external view returns (uint);

    function Luckyer(uint index) external view returns (address);

    function pIDxAddr_(address _addr) external view returns (uint);

    function playerxID_(uint _id) external view returns (address, bytes32, uint, uint, uint, uint, uint, uint, address, uint);

    function playerArr(uint _id) external view returns (address);

    function teamPot(uint256 index) external view returns (uint256, uint256);
}
