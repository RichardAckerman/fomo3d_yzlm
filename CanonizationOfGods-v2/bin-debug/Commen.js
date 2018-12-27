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
    approve: null,
    buyLoading: null,
    ainimeBg: null
};
var $Content = {
    container: null,
    game: null,
    armature: null,
    armatureDisplay: null
};
var tabStatus = 0;
var oldRollId = '0';
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
var $tokenContract;
var $tokenContractInstance;
var $gameContractInstance;
var $myAddress;
var ClipboardJS;
setInterval(getNetWork, 30000);
function getNetWork() {
    return new Promise(function (resolve) {
        if (typeof web3 !== 'undefined' || typeof parent.window.web3 !== 'undefined') {
            web3 = web3 || parent.window.web3;
            if (web3.version.getNetwork) {
                return getNetWork1().then(function () {
                    resolve();
                });
            }
            web3.eth.net.getId().then(function (netId) {
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
                            });
                        }, 2000);
                        break;
                    default:
                        web3js = new Web3(new Web3.providers.HttpProvider("http://120.79.88.126:8551"));
                        // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        }
        else {
            web3js = new Web3(new Web3.providers.HttpProvider("http://120.79.88.126:8551"));
            // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    });
}
function getNetWork1() {
    return new Promise(function (resolve) {
        if (typeof web3 !== 'undefined') {
            web3.version.getNetwork(function (err, netId) {
                switch (netId) {
                    case "1":
                        // Use Mist/MetaMask's provider
                        web3js = new Web3(web3.currentProvider);
                        resolve();
                        /**get user address */
                        $myAddress = window.location.href.split("?")[1];
                        if (!web3js.isAddress($myAddress)) {
                            $myAddress = web3js.eth.accounts[0];
                        }
                        var timer_2 = setInterval(function () {
                            $myAddress = window.location.href.split("?")[1];
                            if (!web3js.isAddress($myAddress)) {
                                $myAddress = web3js.eth.accounts[0];
                            }
                            if (!$myAddress) {
                                clearInterval(timer_2);
                            }
                        }, 2000);
                        break;
                    default:
                        web3js = new Web3(new Web3.providers.HttpProvider("http://120.79.88.126:8551"));
                        // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        }
        else {
            web3js = new Web3(new Web3.providers.HttpProvider("http://120.79.88.126:8551"));
            // web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    });
}
function getJson() {
    return new Promise(function (resolve, reject) {
        fetch("contract/NineGods.json", {
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
            $gameContractInstance = $gameContract.at("0x13552c7cc9ce39af665955412faa08f0e6555a29");
            // $gameContractInstance = $gameContract.at("0xb4feeb8d5becfd588b14e048924ca3b467705766");
            fetch("contract/Token.json", {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (response) {
                return response.json();
            }, function (error) {
                reject(error);
            }).then(function (token) {
                $tokenContract = web3js.eth.contract(token.abi);
                $tokenContractInstance = $tokenContract.at("0xAB4E1802c61e12fd7b10a69A226F5D727c76a8Aa");
                // $tokenContractInstance = $tokenContract.at("0x02a76dc136e16ed1f59aeeab43ecbf9126afb339");
                resolve($tokenContractInstance);
            });
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
                // resolve(keys)
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
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, function (err, pid) {
            if (err) {
                reject(err);
            }
            else {
                $gameContractInstance.playerEtraxAddr_(pid, function (err, data) {
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
function $getQueryIdString() {
    var r = window.location.search.substr(1).split("?")[0];
    if (r.split("id=")[1] == undefined) {
        return window.btoa(r);
    }
    else {
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
    var lang = localStorage.getItem('language');
    var aName = "";
    switch (i) {
        case 1:
            aName = "lianDan";
            break;
        case 2:
            if (lang) {
                aName = lang == "zhtw" ? "lianDan_finish_cn" : "lianDan_finish_en";
            }
            else {
                aName = "lianDan_finish_cn";
            }
            break;
        case 3:
            if (lang) {
                aName = lang == "zhtw" ? "lianDan_newFriand_cn" : "lianDan_newFriand_en";
            }
            else {
                aName = "lianDan_newFriand_cn";
            }
            break;
        case 4:
            aName = "lianDan_pickUp";
            break;
    }
    if (aName == "") {
        return;
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
        setTimeout(function () {
            $Modal.buyLoading.visible = false;
        }, 3000);
    }
    else {
        $Modal.buyLoading.visible = false;
    }
}
