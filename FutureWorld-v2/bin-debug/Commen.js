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
    mainIntro: null,
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
                        var timer_1_1 = setInterval(function () {
                            web3js.eth.getAccounts(function (err, accounts) {
                                $myAddress = accounts[0];
                                if (!$myAddress) {
                                    clearInterval(timer_1_1);
                                }
                            });
                        }, 2000);
                        break;
                    default:
                        // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:7545"));
                        web3js = new Web3(new Web3.providers.HttpProvider("https:///mainnet.infura.io/"));
                        resolve();
                }
            });
        }
        else {
            // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:7545"));
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
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
                        // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:7545"));
                        web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        }
        else {
            // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:7545"));
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    });
}
function getJson() {
    return new Promise(function (resolve, reject) {
        fetch("contract/FutureWorld.json", {
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
            $gameContractInstance = $gameContract.at("0x1a5D4d4A08123A6D6E194033e9E553867F3F1b0D");
            // $gameContractInstance = $gameContract.at("0x9cff38215a83946208138eb77b63920759c09b1d");
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
                // $tokenContractInstance = $tokenContract.at("0xbf654bfa38ec5b33db21b8b6bb05b7c9568e0f0c");
                $tokenContractInstance = $tokenContract.at("0x4313b17Cf68BaFA29817438baa36cbfdC68c28a2");
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
    $alert("未登錄，無法識別錢包賬戶");
}
function netWorkError() {
    $alert("Network Error");
}
function $modalShowEvent(modal) {
    modal.visible = true;
    var aniBg = modal.$children[1];
    var group = modal.$children[2];
    var twBg = egret.Tween.get(aniBg);
    group.alpha = 0;
    twBg.to({ height: 630, opacity: 0.3 }, 0)
        .to({ height: 1185, opacity: 1 }, 200).call(function () {
        var twGroup = egret.Tween.get(group);
        twGroup.to({ alpha: 0 }, 0)
            .to({ alpha: 1 }, 100);
        twBg = null;
        twGroup = null;
    });
}
function $closeModalFun(modal) {
    var aniBg = modal.$children[1];
    var group = modal.$children[2];
    var twGroup = egret.Tween.get(group);
    twGroup.to({ alpha: 1 }, 0)
        .to({ alpha: 0 }, 100)
        .call(function () {
        var twBg = egret.Tween.get(aniBg);
        twBg.to({ height: 1185, opacity: 1 }, 0)
            .to({ height: 630, opacity: 0.3 }, 200).call(function () {
            modal.visible = false;
            twBg = null;
            twGroup = null;
        });
    });
}
function $getQueryIdString() {
    var r = window.location.search.substr(1).split("&")[0];
    return r.split("id=")[1];
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
/**
 * @param i
 * i:1 1gogogo           // 探探
 * i:2 2comeBack_cn      // gameover
 * i:3 5zhuCe_cn         // 注册
 * i:4 3baoXiangOpen     // 提取
 */
function $dragonBonesAnime(i) {
    var lang = localStorage.getItem('language');
    var aName = "";
    switch (i) {
        case 1:
            aName = "1gogogo";
            break;
        case 2:
            if (lang) {
                aName = lang == "zhtw" ? "2comeBack_cn" : "2comeBack_en";
            }
            else {
                aName = "2comeBack_cn";
            }
            break;
        case 3:
            if (lang) {
                aName = lang == "zhtw" ? "5zhuCe_cn" : "5zhuCe_cn";
            }
            else {
                aName = "5zhuCe_cn";
            }
            break;
        case 4:
            aName = "3baoXiangOpen";
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
