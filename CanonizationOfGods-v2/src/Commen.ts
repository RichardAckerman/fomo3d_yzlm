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
    approve: null,
    buyLoading: null,
    ainimeBg: null
};
let $Content = {
    container: null,
    game: null,
    armature: null,
    armatureDisplay: null
};
let tabStatus: number = 0;
let oldRollId: string = '0';

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
let $tokenContract;
let $tokenContractInstance;
let $gameContractInstance;
let $myAddress;
let ClipboardJS;
setInterval(getNetWork, 30000);

function getNetWork() {
    return new Promise(function (resolve) {
        if (typeof web3 !== 'undefined' || typeof (parent.window as any).web3 !== 'undefined') {
            web3 = web3 || (parent.window as any).web3;
            if (web3.version.getNetwork) {
                return getNetWork1().then(function () {
                    resolve();
                })
            }
            web3.eth.net.getId().then(netId => {
                switch (netId.toString()) {
                    case "1":
                        // Use Mist/MetaMask's provider
                        web3js = new Web3(web3.currentProvider);
                        resolve();
                        /**get user address */
                        web3js.eth.getAccounts(function (err, accounts) {
                            $myAddress = accounts[0];
                        });
                        var timer_1 = setInterval(function () {
                            web3js.eth.getAccounts(function (err, accounts) {
                                $myAddress = accounts[0];
                                if (!$myAddress) {
                                    clearInterval(timer_1);
                                }
                            })
                        }, 2000);
                        break;
                    default:
                        web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            })
        } else {
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    });
}

function getNetWork1() {
    return new Promise(resolve => {
        if (typeof web3 !== 'undefined') {
            web3.version.getNetwork((err, netId) => {
                switch (netId) {
                    case "1":
                        // Use Mist/MetaMask's provider
                        web3js = new Web3(web3.currentProvider);
                        
                        resolve();
                        /**get user address */
                        $myAddress = window.location.href.split("?")[1];
                        
                        if(!web3js.isAddress($myAddress)) {
                            $myAddress = web3js.eth.accounts[0];
                        }

                        let timer = setInterval(() => {
                            $myAddress = window.location.href.split("?")[1];
                            
                            if(!web3js.isAddress($myAddress)) {
                                $myAddress = web3js.eth.accounts[0];
                            }

                            if (!$myAddress) {
                                clearInterval(timer)
                            }
                        }, 2000);
                        break;
                    default:
                        web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        } else {
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    })
}

function getJson() {
    return new Promise((resolve, reject) => {
        fetch("contract/NineGods.json", {
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
            $gameContractInstance = $gameContract.at("0x13552c7cc9ce39af665955412faa08f0e6555a29");
            // $gameContractInstance = $gameContract.at("0xb4feeb8d5becfd588b14e048924ca3b467705766");
            fetch("contract/Token.json", {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then((response) => {
                return response.json();
            }, (error) => {
                reject(error);
            }).then((token) => {
                $tokenContract = web3js.eth.contract(token.abi);
                $tokenContractInstance = $tokenContract.at("0xAB4E1802c61e12fd7b10a69A226F5D727c76a8Aa");
                // $tokenContractInstance = $tokenContract.at("0x02a76dc136e16ed1f59aeeab43ecbf9126afb339");
                resolve($tokenContractInstance)
            });
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
 * 获取奖池总额
 */
function getTotalPot() {
    return new Promise((resolve, reject) => {
        $gameContractInstance.getTotalPot((err, keys) => {
            if (err) {
                reject(err)
            } else {
                resolve(web3js.fromWei(keys))
                // resolve(keys)
            }
        });
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
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, pid) => {
            if (err) {
                reject(err);
            } else {
                $gameContractInstance.playerEtraxAddr_(pid, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data)
                    }
                });
            }
        })
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

function $getQueryIdString() {
    let r = window.location.search.substr(1).split("?")[0];
    if (r.split("id=")[1] == undefined) {
        return window.btoa(r);
    } else {
        return r.split("id=")[1];
    }
}

/**
 * @param i
 * i:1 lianDan
 * i:2 lianDan_finish
 * i:3 lianDan_newFriand
 * i:4 lianDan_pickUp
 */
function $dragonBonesAnime(i) {
    let lang = localStorage.getItem('language');
    let aName = "";
    switch (i) {
        case 1:
            aName = "lianDan";
            break;
        case 2:
            if (lang) {
                aName = lang == "zhtw" ? "lianDan_finish_cn" : "lianDan_finish_en";
            } else {
                aName = "lianDan_finish_cn"
            }
            break;
        case 3:
            if (lang) {
                aName = lang == "zhtw" ? "lianDan_newFriand_cn" : "lianDan_newFriand_en";
            } else {
                aName = "lianDan_newFriand_cn"
            }
            break;
        case 4:
            aName = "lianDan_pickUp";
            break;
    }

    if (aName == "") {
        return
    }

    $Modal.ainimeBg.visible = true;
    $Content.container.addChild($Content.armatureDisplay);

    $Content.armature.animation.gotoAndPlay(aName);
    dragonBones.WorldClock.clock.timeScale = 3;
    dragonBones.WorldClock.clock.add($Content.armature);
}

function $showLoading(bool) {
    if (bool) {
        $Modal.buyLoading.visible = true;
        setTimeout(() => {
            $Modal.buyLoading.visible = false;
        }, 3000);
    } else {
        $Modal.buyLoading.visible = false;
    }
}