/**
 * global and commen data and ts
 */

/**global modal */
let $Modal = {
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
}
let $Content = {
    container: null,
    game: null,
}
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
                    case "1":
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
                        // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.102:7545"));
                        web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        } else {
            // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.102:7545"));
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    })
}


function getJson() {
    return new Promise((resolve, reject) => {
        fetch("contract/miracle.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            return response .json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            $gameContract = web3js.eth.contract(json.abi);
            $gameContractInstance = $gameContract.at("0xd823b5d18542506638b7cae1be63df7f8255c98f");
            // $gameContractInstance = $gameContract.at("0x25ebb70ea8c2bd8dc26d3b6e2da8cce1374ce28e");
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
    if(timestamp < 5875){
        timestamp += 72000;
    }
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
 * 获取奖池总额
 */
function getTotalPot() {
    return new Promise((resolve, reject) => {
        $gameContractInstance.getTotalPot((err, keys) => {
            if (err) {
                reject(err)
            } else {
                resolve(web3js.fromWei(keys))
            }
        });
    })
}

/**
 * 获取ETH兑美元的汇率
 */
function getEthXUSDrate() {
    return new Promise((resolve, reject) => {
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
        resolve("200")
        // });
    })
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
                // if(pid == 0){
                //     resolve([]);
                //     return
                // }
                $gameContractInstance.playerxID_(pid, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        // console.log(data[1].toString());
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
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err1, id) => {
            if (err1) {
                reject(err1);
            } else {
                $myAddress && $gameContractInstance.playerEtraxAddr_(id.toString(), (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data)
                    }
                });
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