/**
 * global and commen data and ts
 */

/**global Modal */
let $Modal:any = {
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


setInterval(getNetWork,30000);


function getNetWork() {
    return new Promise((resolve) => {
        if (typeof web3 !== 'undefined' || typeof (parent.window as any).web3 !== 'undefined') {
            web3 = web3 || (parent.window as any).web3;
            
            if (web3.version.getNetwork) {
                return getNetWork1().then(() => {
                    resolve();
                });
            }
            web3.eth.net.getId().then((netId) => {
                switch (netId.toString()) {
                    case "1":
                        // Use Mist/MetaMask's provider
                        web3js = new Web3(web3.currentProvider);
                        resolve();
                        /**get user address */
                        web3js.eth.getAccounts((err, accounts) => {
                            $myAddress = accounts[0];
                        });
                        let timer_1 = setInterval(() => {
                            web3js.eth.getAccounts((err, accounts) => {
                                $myAddress = accounts[0];
                                if (!$myAddress) {
                                    clearInterval(timer_1);
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
                        // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:7545"));
                        web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
                        resolve();
                }
            });
        } else {
            // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:7545"));
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            resolve();
        }
    })
}

function getJson() {
    return new Promise((resolve, reject) => {
        fetch("contract/FutureWorld.json", {
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
            $gameContractInstance = $gameContract.at("0x1a5D4d4A08123A6D6E194033e9E553867F3F1b0D");
            // $gameContractInstance = $gameContract.at("0x9cff38215a83946208138eb77b63920759c09b1d");
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
                // $tokenContractInstance = $tokenContract.at("0xbf654bfa38ec5b33db21b8b6bb05b7c9568e0f0c");
                $tokenContractInstance = $tokenContract.at("0x4313b17Cf68BaFA29817438baa36cbfdC68c28a2");
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
    $alert("未登錄，無法識別錢包賬戶");
}

function netWorkError() {
    $alert("Network Error");
}

function $modalShowEvent(modal) {
    modal.visible = true;
    let aniBg = modal.$children[1];
    let group = modal.$children[2];
    let twBg = egret.Tween.get(aniBg);
    group.alpha = 0;
    twBg.to({height: 630, opacity: 0.3}, 0)
        .to({height: 1185, opacity: 1}, 200).call(() => {
        let twGroup = egret.Tween.get(group);
        twGroup.to({alpha: 0}, 0)
            .to({alpha: 1}, 100);
        twBg = null;
        twGroup = null;
    });
}

function $closeModalFun(modal) {
    let aniBg = modal.$children[1];
    let group = modal.$children[2];
    let twGroup = egret.Tween.get(group);
    twGroup.to({alpha: 1}, 0)
        .to({alpha: 0}, 100)
        .call(() => {
            let twBg = egret.Tween.get(aniBg);
            twBg.to({height: 1185, opacity: 1}, 0)
                .to({height: 630, opacity: 0.3}, 200).call(() => {
                modal.visible = false;
                twBg = null;
                twGroup = null;
            });
        });
}

function $getQueryIdString() {
    let r = window.location.search.substr(1).split("&")[0];
    return r.split("id=")[1];
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

/**
 * @param i
 * i:1 1gogogo           // 探探
 * i:2 2comeBack_cn      // gameover
 * i:3 5zhuCe_cn         // 注册
 * i:4 3baoXiangOpen     // 提取
 */
function $dragonBonesAnime(i) {
    let lang = localStorage.getItem('language');
    let aName = "";
    switch (i) {
        case 1:
            aName = "1gogogo";
            break;
        case 2:
            if (lang) {
                aName = lang == "zhtw" ? "2comeBack_cn" : "2comeBack_en";
            } else {
                aName = "2comeBack_cn"
            }
            break;
        case 3:
            if (lang) {
                aName = lang == "zhtw" ? "5zhuCe_cn" : "5zhuCe_cn";
            } else {
                aName = "5zhuCe_cn"
            }
            break;
        case 4:
            aName = "3baoXiangOpen";
            break;
    }

    if(aName == ""){
        return
    }

    $Modal.ainimeBg.visible = true;
    $Content.container.addChild($Content.armatureDisplay);

    $Content.armature.animation.gotoAndPlay(aName);
    dragonBones.WorldClock.clock.timeScale = 3;
    dragonBones.WorldClock.clock.add($Content.armature);
}