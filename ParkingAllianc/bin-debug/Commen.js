/**
 * global and commen data and ts
 */
/**global Modal */
var $Modal = {
    help: null,
    statistics: null,
    gameStatistics: null,
    gameHelp: null,
    register: null,
    gameAlert: null,
    language: null,
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
                    case "5777":
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
                        web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.9:7545"));
                        // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        }
        else {
            web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.9:7545"));
            // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    });
}
function getJson() {
    return new Promise(function (resolve, reject) {
        fetch("contract/GPDA.json", {
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
            $gameContractInstance = $gameContract.at("0x85cb60bd46e215d77329abac85118a652c79dd0c");
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
 * 获取奖池字段
 * uint256 total;      // 买入总额
 * uint256 potCoin;    // 总额按百分比进入奖池的额度
 * uint256 luckyPotCoin;
 * uint256 totalNum;   //总投单数
 */
function $getTotalPot() {
    return new Promise(function (resolve, reject) {
        $gameContractInstance.teamPot(function (err, Coin) {
            if (err) {
                console.log("$getWeekTotalPot", err);
                reject(err);
            }
            else {
                resolve(Coin);
            }
        });
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
function $modalShowEvent(modal, y) {
    modal.visible = true;
    var group = modal.$children[1];
    var tw = egret.Tween.get(group);
    tw.to({ y: y }, 200);
    tw = null;
}
function $closeModalFun(modal, y) {
    var group = modal.$children[1];
    var tw = egret.Tween.get(group); //开始动画
    tw.to({ y: y }, 200).call(function () {
        modal.visible = false;
        tw = null;
    });
}
