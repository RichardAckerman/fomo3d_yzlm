/**
 * global and commen data and ts
 */
/**global modal */
var $Modal = {
    help: null,
    statistics: null,
    gameStatistics: null,
    gameHelp: null,
    register: null,
    refereeInfo: null,
    gameAlert: null,
    language: null,
    buyKey: null,
    extract: null
};
var $Content = {
    container: null,
    game: null,
};
var tabStatus = 0;
/**left layout*/
function setHLayoutLeft() {
    var hLayout = new eui.HorizontalLayout();
    hLayout.gap = 20;
    hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
    return hLayout;
}
/**
 * web3js
 */
var Web3, web3;
var web3js;
var $gameContract;
var $tokenContractInstance;
var $gameContractInstance;
var $myAddress;
var ClipboardJS;
function getNetWork() {
    return new Promise(function (resolve) {
        if (typeof web3 !== 'undefined') {
            web3.version.getNetwork(function (err, netId) {
                switch (netId) {
                    case "1":
                        // Use Mist/MetaMask's provider
                        web3js = new Web3(web3.currentProvider);
                        resolve();
                        /**get user address */
                        $myAddress = web3js.eth.accounts[0];
                        var timer_1 = setInterval(function () {
                            $myAddress = web3js.eth.accounts[0];
                            if (!$myAddress) {
                                clearInterval(timer_1);
                            }
                        }, 2000);
                        break;
                    default:
                        // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.103:7545"));
                        web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        }
        else {
            // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.103:7545"));
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    });
}
function getJson() {
    return new Promise(function (resolve, reject) {
        fetch("contract/XMan.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            return response.json();
        }, function (error) {
            reject(error);
        }).then(function (json) {
            $gameContract = web3js.eth.contract(json.abi);
            // $gameContractInstance = $gameContract.at("0xb821470ccc7b0bd2ee45214a15b02a6395d2253f");
            // $gameContractInstance = $gameContract.at("0x101fbae009a704ab93d56a299068a5cd533c4918");
            $gameContractInstance = $gameContract.at("0x607acab3b6ecaa1bc34e1ff16c4d706faba85405");
            resolve($tokenContractInstance);
        });
    });
}
/*
转换时间
 */
function timestampToTime(timestamp) {
    if (timestamp.length === 10) {
        timestamp = timestamp * 1000;
    }
    else {
        timestamp = timestamp * 1;
    }
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '.';
    var M = fillZero(date.getMonth() + 1) + '.';
    var D = fillZero(date.getDate()) + ' ';
    var h = fillZero(date.getHours()) + ':';
    var m = fillZero(date.getMinutes()) + ':';
    var s = fillZero(date.getSeconds());
    return Y + M + D + h + m + s;
}
function fillZero(time) {
    time = time < 10 ? "0" + time : time;
    return time;
}
function timestampToMoment(timestamp) {
    timestamp = timestamp < 0 ? 0 : timestamp;
    var h = fillZero(Math.floor(timestamp / 60 / 60)) + ':';
    var m = fillZero(Math.floor(timestamp / 60 % 60)) + ':';
    var s = fillZero(timestamp % 60);
    return h + m + s;
}
/**
 * 设置结束时间
 */
function setOverTime() {
    // 获取北京时间
    return new Promise(function (resolve, reject) {
        getBjTime().then(function (nowTime) {
            $gameContractInstance.overMoment(function (err, time) {
                if (err) {
                    reject(err);
                }
                else {
                    var overT = time.toString();
                    resolve(overT - Number(nowTime) / 1000);
                }
            });
        });
    });
}
// 获取北京时间 todo
function getBjTime() {
    return new Promise(function (resolve, reject) {
        var now = Date.parse(new Date().toString());
        resolve(now);
    });
}
/**
 * 获取奖池总额
 */
function getTotalPot() {
    return new Promise(function (resolve, reject) {
        $gameContractInstance.getTotalPot(function (err, keys) {
            if (err) {
                reject(err);
            }
            else {
                resolve(web3js.fromWei(keys));
            }
        });
    });
}
/**
 * 获取ETH兑美元的汇率
 */
function getEthXUSDrate() {
    return new Promise(function (resolve, reject) {
        // fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR", {
        //     method: "GET",
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // }).then((response) => {
        //     return response.json();
        // }, (error) => {
        //     reject(error);
        // }).then((json) => {
        resolve("200");
        // });
    });
}
/**
 * 获取当前玩家的Key属性
 */
function getMyKeyProp() {
    return new Promise(function (resolve, reject) {
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, function (err, pid) {
            if (err) {
                reject(err);
            }
            else {
                $gameContractInstance.playerxID_(pid, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        // console.log(data[1].toString());
                        resolve(data);
                    }
                });
            }
        });
    });
}
/**
 * 获取当前玩家的推荐属性
 */
function getMyEtraProp() {
    return new Promise(function (resolve, reject) {
        $myAddress && $gameContractInstance.playerEtraxAddr_($myAddress, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
/**
 * 获取每把钥匙股息
 */
function getKeyMapping() {
    return new Promise(function (resolve, reject) {
        $myAddress && $gameContractInstance.playerEtraxID_($myAddress, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data[4]);
            }
        });
    });
}
function getIsBegin() {
    return new Promise(function (resolve, reject) {
        $gameContractInstance.isBegin(function (err, bool) {
            if (err) {
                reject(err);
            }
            else {
                resolve(bool);
            }
        });
    });
}
function $alert(msg) {
    console.log(tabStatus);
    if (tabStatus === 0) {
        $Modal.gameAlert.msg = msg;
        $Modal.gameAlert.visible = true;
    }
}
function notSignInMetamask() {
    $alert("You're not signed into metamask");
}
function netWorkError() {
    $alert("Network Error");
}
