/**
 * global and commen data and ts
 */

/**global Modal */
let $Modal = {
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

let $Content = {
    container: null,
    game: null,
};

let $Guide = {
    guideHome: null
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
 * chain3Js
 */
let Chain3, chain3Js, $moac, moac;
let $gameContractInstance;
let $tokenContractInstance;
let $myAddress;
let ClipboardJS;
// const $contract = "0x3acbf2503d8963983d5194f16a187ad4d86831fc";
const $contract = "0x426f6a364ca09b88e190d51fbbda27001c72c95d";
const $tokenAddr = "0xD98792127Cb7A0953669f2986af6fCAa37E40CD0";
const $beginAddr = "0x0a4128aae07d8e4b0fa2c7338ea5f082fb42edd7";
const linkNet = "https://chain3.mytokenpocket.vip";

// http://gateway.moac.io/mainnet
// https://chain3.mytokenpocket.vip
// http://m.halobtc.com:8546

function getNetWork() {
    // $myAddress = "0x0a4128aae07d8e4b0fa2c7338ea5f082fb42edd7";
    // $myAddress = "0x9ae33f3B4c49bB8DE0D706ba4e0E93ac5af44fBb";
    return new Promise(resolve => {
        const chain3 = new Chain3();
        chain3.setProvider(new chain3.providers.HttpProvider(linkNet));
        chain3Js = chain3;
        $moac = moac;
        if (typeof $moac !== 'undefined') {
            let payload = {
                method: "net_version",
                params: [""],
            };
            $moac.sendAsync(payload, function (response) {
                if (response.code === 'fail') {
                    alert("网络错误");
                } else {
                    switch (response.data.result) {
                        case "99":
                            $myAddress = $moac.selectedAddress;
                            break;
                        default:
                    }
                }
            });
        }
        resolve();
    });
}

function getJson() {
    return new Promise((resolve, reject) => {
        fetch("contract/LuckyStar.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            return response.json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            $gameContractInstance = chain3Js.mc.contract(json.abi).at($contract);
            fetch("contract/token.json", {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then((response) => {
                return response.json();
            }, (error) => {
                reject(error);
            }).then((token) => {
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
    let h = fillZero(Math.floor(timestamp / 60 / 60)) + ':';
    let m = fillZero(Math.floor(timestamp / 60 % 60)) + ':';
    let s = fillZero(timestamp % 60);
    return h + m + s;
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
                    reject(err);
                } else {
                    let overT = time.toString();
                    resolve(overT - Number(nowTime) / 1000);
                }
            });
        });
    });
}

// 获取北京时间 todo
function getBjTime() {
    return new Promise((resolve, reject) => {
        let now: any = Date.parse(new Date().toString());
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
    return new Promise((resolve, reject) => {
        $gameContractInstance.teamPot((err, Coin) => {
            if (err) {
                console.log("$getWeekTotalPot", err);
                reject(err);
            } else {
                resolve(Coin);
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
    return new Promise((resolve, reject) => {
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, pid) => {
            $gameContractInstance.playerEtraxAddr_(pid, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    });
}

function getIsBegin() {
    return new Promise((resolve, reject) => {
        $gameContractInstance.isBegin((err, bool) => {
            if (err) {
                reject(err);
            } else {
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
    $alert("请在墨宝钱包中打开游戏");
}


function $isNotAtApp() {
    return $moac == 'undefined';
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
