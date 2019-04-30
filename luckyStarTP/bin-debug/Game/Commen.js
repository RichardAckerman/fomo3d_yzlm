/**
 * global and commen data and ts
 */
/**global Modal */
var $Modal = {
    gameStatistics: null,
    gameHelp: null,
    register: null,
    gameAlert: null,
    gamePrompt: null,
    bandCodeAlert: null,
    language: null,
    finalBonus: null,
    gameLucky: null,
    loading: null,
};
var $Content = {
    container: null,
    game: null,
};
var $Guide = {
    guideHome: null
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
 * chain3Js
 */
var Chain3, chain3Js, $tp, tp;
var $gameContractInstance;
var $tokenContractInstance;
var $myAddress;
var ClipboardJS;
var $contract = "0x426f6a364ca09b88e190d51fbbda27001c72c95d";
var $tokenAddr = "0xD98792127Cb7A0953669f2986af6fCAa37E40CD0";
var $beginAddr = "0x0a4128aae07d8e4b0fa2c7338ea5f082fb42edd7";
var linkNet = "https://chain3.mytokenpocket.vip";
// http://gateway.moac.io/mainnet
// https://chain3.mytokenpocket.vip
// http://m.halobtc.com:8546
function getNetWork() {
    return new Promise(function (resolve) {
        var chain3 = new Chain3();
        chain3.setProvider(new chain3.providers.HttpProvider(linkNet));
        chain3Js = chain3;
        $tp = tp;
        if (typeof $tp !== 'undefined') {
            $tp.getCurrentWallet().then(function (response) {
                if (response.result) {
                    $myAddress = response.data.address;
                }
                else {
                    alert('查询失败！' + response.message);
                }
            });
        }
        resolve();
    });
}
function getJson() {
    return new Promise(function (resolve, reject) {
        fetch("contract/LuckyStar.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(function (response) {
            return response.json();
        }, function (error) {
            reject(error);
        }).then(function (json) {
            $gameContractInstance = chain3Js.mc.contract(json.abi).at($contract);
            fetch("contract/token.json", {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (response) {
                return response.json();
            }, function (error) {
                reject(error);
            }).then(function (token) {
                $tokenContractInstance = chain3Js.mc.contract(token.abi).at($tokenAddr);
                resolve($tokenContractInstance);
            });
        });
    });
}
/**
 * 返回数据保留n位小数
 */
function $toFixedDecimal(coin) {
    return Math.floor(parseFloat(coin.toString()) / 100) / 100 + "";
}
/*
转换时间
 */
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
                        $loadingDisplay(false);
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
            $gameContractInstance.playerEtraxAddr_(pid, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
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
        $loadingDisplay(false);
        $Modal.gameAlert.msg = msg;
        $Modal.gameAlert.visible = true;
    }
}
function $testtttt() {
    console.log(33);
}
function $alertFun(msg, f) {
    $Modal.gameAlert.msg = msg;
    $Modal.gameAlert.visible = true;
    if (f) {
        f();
    }
}
function notSignInMetamask() {
    $alert("请在tp钱包中打开游戏");
}
function $isNotAtApp() {
    return !$tp.isConnected();
}
function $modalShowEvent(modal, y) {
    modal.visible = true;
    // let group = modal.$children[1];
    // let tw = egret.Tween.get(group);
    // tw.to({y: y}, 200);
    // tw = null;
}
function $closeModalFun(modal, y) {
    modal.visible = false;
    // let group = modal.$children[1];
    // let tw = egret.Tween.get(group);//开始动画
    // tw.to({y: y}, 200).call(() => {
    //     modal.visible = false;
    //     tw = null;
    // });
}
function $loadingDisplay(bool) {
    bool && $Modal.loading.show();
    !bool && $Modal.loading.hide();
}
function $chargeEquelAddr(addr1, addr2) {
    addr1 = chain3Js.toChecksumAddress(addr1);
    addr2 = chain3Js.toChecksumAddress(addr2);
    return addr1 == addr2;
}
