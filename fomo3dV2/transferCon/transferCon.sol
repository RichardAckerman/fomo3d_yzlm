pragma solidity ^0.4.24;

contract transferCon {
    address [24] custom;
    address own = 0x707B6eE98f07e3A6C1c10F47452408Ccd4d84AbD;
    constructor()public{
        custom[0] = 0x22AAb9a2d10E77044aC55553Eb661cAfe67a2590;
        custom[1] = 0x5ad20e5E21d51A5C207a74FB19462Ad4657f0b5a;
        custom[2] = 0xD57b6e10958199c3E25494AB7Bda01b2eb4da6D2;
        custom[3] = 0x7E7Bbc10A24E7510c1cDCc7672EeCa386A046d79;
        custom[4] = 0x893CF2b4C3E0adA3cfD33Fe788ee487b10472290;
        custom[5] = 0xDDd8987C342fb5819b3C769aabF0e6B65e5cb2d9;
        custom[6] = 0xc7f142683Df694751B658A72CddbBAfC378d7819;
        custom[7] = 0x03762980489EC81B991E71f34dfe3d15B7EADEEA;
        custom[8] = 0xE33D06a83e489C59C91F7021031356cf1714a877;
        custom[9] = 0xA31b7Dbb8fE0847e2A94CE9Ca0F2085b8a4aCb23;
        custom[10] = 0x29Ddc94B9C171f35fB9CC32E2667d93333800655;
        custom[11] = 0x3F7C6dD3F4d532021F28cdcb9225482e3A8f3AC2;
        custom[12] = 0xedd00c0da6d7dE5Cc82B756b8a966b50bb5bF711;
        custom[13] = 0xBC7f6C0ba7AF4E0f716D17bBafFc1345fad61381;
        custom[14] = 0xB999763Dee0E6B979C7C13c8c02fb2Fef6ab1540;
        custom[15] = 0x398eCeF75432577DCa0351C6560E020208C630c4;
        custom[16] = 0x567DafA8e49C20631F23D6717cE0e8983997f522;
        custom[17] = 0x8365425bf5cBCC9603cBdC39C66F5812963eA9eA;
        custom[18] = 0x2B89D6020F8AFb226D7AB04Cd11741167797F9F6;
        custom[19] = 0xDd3ac9Ca170E28cb37533fd52Be15338c3f59C51;
        custom[20] = 0xe76eacc44328B92F3c98111B8758eC48359b69A6;
        custom[21] = 0x6c9f9a9F7c97efa231b91054D00A85357689432d;
        custom[22] = 0x2aDEC3797fDD8574E500b5DDF430cf6B778f969c;
        custom[23] = 0xA9C7d31BB1879BfF8BE25EaD2F59B310a52b7c5a;
    }

    function divideMoney() public payable {
        uint value = msg.value / 50;
        transferCoin(own, value * 26);
        for (uint i = 0; i < 24; i++) {
            transferCoin(custom[i], value);
        }
    }

    function transferCoin(address _to, uint _coins) private {
        _to.transfer(_coins);
    }
}
