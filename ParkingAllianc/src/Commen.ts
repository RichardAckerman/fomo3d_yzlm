/**
 * global and commen data and ts
 */

/**global Modal */
let $Modal = {
    help: null,
    statistics: null,
    gameStatistics: null,
    gameHelp: null,
    register: null,
    gameAlert: null,
    language: null,
};
let $Content = {
    container: null,
    game: null,
};
let tabStatus: number = 0;

/**left layout*/
function setHLayoutLeft() {
    let hLayout = new eui.HorizontalLayout();
    hLayout.gap = 20;
    hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
    return hLayout;
}

/**
 * web3js
 */
let Web3, web3;
let web3js;
let $gameContract;
let $tokenContractInstance;
let $gameContractInstance;
let $myAddress;
let ClipboardJS;

function getNetWork() {
    return new Promise(resolve => {
        if (typeof web3 !== 'undefined') {
            web3.version.getNetwork((err, netId) => {
                switch (netId) {
                    case "5777":
                        // Use Mist/MetaMask's provider
                        web3js = new Web3(web3.currentProvider);
                        resolve();
                        /**get user address */
                        $myAddress = web3js.eth.accounts[0];
                        let timer = setInterval(() => {
                            $myAddress = web3js.eth.accounts[0];
                            if (!$myAddress) {
                                clearInterval(timer)
                            }
                        }, 2000);
                        break;
                    default:
                        web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.9:7545"));
                        // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        } else {
            web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.9:7545"));
            // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    })
}


function getJson() {
    return new Promise((resolve, reject) => {
        fetch("contract/GPDA.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            return response.json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            $gameContract = web3js.eth.contract(json.abi);
            $gameContractInstance = $gameContract.at("0x85cb60bd46e215d77329abac85118a652c79dd0c");
            resolve($tokenContractInstance)
        });
    });
}

/*
转换时间
 */
function timestampToTime(timestamp) {
    if (timestamp.length === 10) {
        timestamp = timestamp * 1000
    } else {
        timestamp = timestamp * 1
    }
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '.';
    let M = fillZero(date.getMonth() + 1) + '.';
    let D = fillZero(date.getDate()) + ' ';
    let h = fillZero(date.getHours()) + ':';
    let m = fillZero(date.getMinutes()) + ':';
    let s = fillZero(date.getSeconds());
    return Y + M + D + h + m + s
}

function fillZero(time) {
    time = time < 10 ? "0" + time : time;
    return time;
}

function timestampToMoment(timestamp) {
    timestamp = timestamp < 0 ? 0 : timestamp;
    let h = fillZero(Math.floor(timestamp / 60 / 60)) + ':';
    let m = fillZero(Math.floor(timestamp / 60 % 60)) + ':';
    let s = fillZero(timestamp % 60);
    return h + m + s
}

/**
 * 设置结束时间
 */
function setOverTime() {
    // 获取北京时间
    return new Promise((resolve, reject) => {
        getBjTime().then((nowTime) => {
            $gameContractInstance.overMoment((err, time) => {
                if (err) {
                    reject(err)
                } else {
                    let overT = time.toString();
                    resolve(overT - Number(nowTime) / 1000);
                }
            })
        });
    })
}

// 获取北京时间 todo
function getBjTime() {
    return new Promise((resolve, reject) => {
        let now: any = Date.parse(new Date().toString());
        resolve(now);
    })
}

/**
 * 获取奖池字段
 * uint256 total;      // 买入总额
 * uint256 potCoin;    // 总额按百分比进入奖池的额度
 * uint256 luckyPotCoin;
 * uint256 totalNum;   //总投单数
 */
function $getTotalPot() {
    return new Promise((resolve, reject) => {
        $gameContractInstance.teamPot((err, Coin) => {
            if (err) {
                console.log("$getWeekTotalPot", err);
                reject(err)
            } else {
                resolve(Coin)
            }
        });
    });
}

/**
 * 获取当前玩家的Key属性
 */
function getMyKeyProp() {
    return new Promise((resolve, reject) => {
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, pid) => {
            if (err) {
                reject(err);
            } else {
                $gameContractInstance.playerxID_(pid, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data)
                    }
                });
            }
        });
    })
}

/**
 * 获取当前玩家的推荐属性
 */
function getMyEtraProp() {
    return new Promise((resolve, reject) => {
        $myAddress && $gameContractInstance.playerEtraxAddr_($myAddress, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    })
}

/**
 * 获取每把钥匙股息
 */
function getKeyMapping() {
    return new Promise((resolve, reject) => {
        $myAddress && $gameContractInstance.playerEtraxID_($myAddress, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data[4]);
            }
        });
    })
}

function getIsBegin() {
    return new Promise((resolve, reject) => {
        $gameContractInstance.isBegin((err, bool) => {
            if (err) {
                reject(err)
            } else {
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
    let group = modal.$children[1];
    let tw = egret.Tween.get(group);
    tw.to({y: y}, 200);
    tw = null;
}

function $closeModalFun(modal, y) {
    let group = modal.$children[1];
    let tw = egret.Tween.get(group);//开始动画
    tw.to({y: y}, 200).call(() => {
        modal.visible = false;
        tw = null;
    });
}