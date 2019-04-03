var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Game module
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        /**
         * game data
         */
        _this.data = {
            totalInvest: "0",
            totalInvestUsd: "0",
            roundNum: "",
            jackpot: "e0",
            jackpotUs: "0",
            timeRemaining: '00:00:00',
            choosedTeam: 2,
            input: '1',
            exchangeRate: 0,
            remainingBet: '30',
            moduleData: {
                rcmdid: "0",
                allTime: "0",
                allBuy: "0",
                unionBonus: "0",
                teamProf: "0",
                myAllBuy: "0",
                allBuyUs: "0",
                myBonus: "0",
                roundBuy: "0",
                roundBonus: "0",
                queueNum: "0",
            },
        };
        /**lang data */
        _this.langData = $ZHTW.game;
        _this.eventData = {
            begin: 0,
            end: 0,
        };
        _this.overTime = 0; //剩余时间秒数
        _this.updateData = new egret.Timer(1000, 0);
        _this.intervalIsStart = false;
        _this.myRound = "0"; // 我当前属于第几轮
        _this.roundError = false;
        _this.tempKeyNum = "0";
        _this.rateUSD = 0;
        _this.gainId = "0";
        _this.totalPot = "0";
        _this.oldRollId = "0";
        _this.oldAddr = $myAddress;
        /**
         * 更新玩家数据
         */
        _this.isUpdatePlayerData = false;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/GameUI.exml";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        // this.canBegin();
        this.updateRound();
        /**buy key event */
        this.alertModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopAlertBgBling, this);
        /**buy key event */
        this.showBuyModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBuyModalFun, this);
        /**提取函数 */
        this.extractBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.extractFun, this);
        setOverTime().then(function (time) {
            // time = time < 0 ? 0 : time;
            if (time < 5875) {
                time = 72000 + parseInt(time + "");
            }
            _this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then(function (keys) {
            _this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
            _this.totalPot = Number(Number(keys).toFixed(2)) + "";
        });
        $gameContractInstance.nCurrentGainId(function (err, id) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.totalInvest = id.toString();
                _this.gainId = id.toString();
            }
        });
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        /**modals event */
        this.openModalsEvent();
    };
    Game.prototype.stopAlertBgBling = function () {
        if (this.alertModal.visible) {
            this.alertBgBling.stop();
            this.alertModal.visible = false;
        }
    };
    Game.prototype.showBuyModalFun = function () {
        $Modal.buyKey.buyKeyFun();
    };
    Game.prototype.extractFun = function () {
        $Modal.extract.drawFun();
    };
    // private canBegin() {
    //     return new Promise((resolve, reject) => {
    //         $gameContractInstance.isBegin((err, bool) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 resolve(bool);
    //             }
    //         });
    //     });
    // }
    Game.prototype.getData = function () {
        var _this = this;
        if (!this.intervalIsStart) {
            getIsBegin().then(function (bool) {
                if (bool) {
                    _this.intervalStart();
                    _this.intervalIsStart = true;
                }
                else {
                    _this.overTime = 86400;
                    _this.data.timeRemaining = timestampToMoment(_this.overTime);
                }
            }, function (err) {
                // console.log(err);
            });
        }
        else {
            this.intervalStart();
        }
    };
    Game.prototype.intervalStart = function () {
        var _this = this;
        this.overTime--;
        if (this.overTime % 1800 == 0) {
            this.updateRound();
            this.updateOverTime();
        }
        if (this.oldAddr !== $myAddress) {
            this.updateCurrentGainId();
            this.updatePlayerData();
            this.oldAddr = $myAddress;
        }
        else if (this.overTime % 60 == 0) {
            this.updateCurrentGainId();
            this.updatePlayerData();
        }
        if (this.overTime % 3 == 0) {
            $gameContractInstance.nRollIn(function (err, id) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (_this.oldRollId != id.toString()) {
                        _this.updateOverTime();
                        _this.updateTotalPot();
                        _this.updateCurrentGainId();
                        _this.updatePlayerData();
                        setTimeout(function () {
                            if (!_this.isUpdatePlayerData) {
                                _this.updatePlayerData();
                            }
                        }, 3000);
                        _this.oldRollId = id.toString();
                    }
                }
            });
            getEthXUSDrate().then(function (rate) {
                _this.rateUSD = parseFloat(rate + "");
            });
        }
        this.data.timeRemaining = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        // if ($Modal.gameStatistics.visible) {
        //     $Modal.gameStatistics.data.round.drainTime = this.data.timeRemaining;
        // }
    };
    /**
     * 更新轮次
     */
    Game.prototype.updateRound = function () {
        var _this = this;
        $gameContractInstance.round(function (err, round) {
            if (err) {
                console.log("4545" + err);
            }
            else {
                _this.data.roundNum = round.toNumber();
            }
        });
    };
    /**
     * 更新倒计时
     */
    Game.prototype.updateOverTime = function () {
        var _this = this;
        setOverTime().then(function (time) {
            // time = time < 0 ? 0 : time;
            if (time < 5875) {
                time = 72000 + parseInt(time + "");
            }
            _this.overTime = parseInt(time + "");
            if (_this.overTime > 86400) {
                // this.jackPotLabel.visible = false;
                // this.readyTimeLabel.visible = true;
                // this.overTime -= 86400;
            }
            else {
                _this.jackPotLabel.visible = true;
                _this.readyTimeLabel.visible = false;
            }
        });
    };
    /**
     * 更新奖池
     */
    Game.prototype.updateTotalPot = function () {
        var _this = this;
        getTotalPot().then(function (keys) {
            if (Number(keys) < Number(_this.totalPot)) {
                _this.data.jackpot = "e" + _this.totalPot;
                //更新统计界面奖池金额
                // if ($Modal.gameStatistics.visible) {
                //     $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(this.totalPot).toFixed(6) + "";
                // }
            }
            else {
                _this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
                //更新统计界面奖池金额
                // if ($Modal.gameStatistics.visible) {
                //     $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(keys + "").toFixed(6) + "";
                // }
                _this.totalPot = Number(Number(keys).toFixed(2)) + "";
            }
            // console.log("+++++++++++++",this.totalPot);
            var myRate = parseFloat(_this.rateUSD + "");
            _this.data.jackpotUs = parseFloat(Number(keys) * myRate + "").toFixed(4) + "";
        }, function (err) {
        });
    };
    /**
     * 更新当前分红序列
     */
    Game.prototype.updateCurrentGainId = function () {
        var _this = this;
        $gameContractInstance.nCurrentGainId(function (err, id) {
            if (err) {
                console.log(err);
            }
            else {
                if (parseInt(id.toString()) < parseInt(_this.gainId)) {
                    _this.data.totalInvest = _this.gainId;
                    // $Modal.gameStatistics.data.stats.totalInvested = this.gainId;
                }
                else {
                    _this.data.totalInvest = id.toString();
                    // $Modal.gameStatistics.data.stats.totalInvested = id.toString();
                    _this.gainId = id.toString();
                }
                // console.log("-------------",this.gainId);
                $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err2, arr) {
                    if (err2) {
                        console.log(err2);
                    }
                    else {
                        var len = arr.length;
                        if (len > 0) {
                            $gameContractInstance.getRollInArray(0, function (err1, n) {
                                if (err1) {
                                    console.log(err1);
                                }
                                else {
                                    // $Modal.gameStatistics.data.stats.extractNum = n[0].toString();
                                    _this.data.remainingBet = 30 - parseInt(n[1].toString()) + "";
                                    // this.data.moduleData.extractNum = parseFloat(n[0].toString()) + "";
                                }
                            });
                        }
                        else {
                            _this.data.remainingBet = '30';
                            // this.data.moduleData.extractNum = "0";
                        }
                    }
                });
            }
        });
    };
    Game.prototype.updatePlayerData = function () {
        var _this = this;
        if (!$myAddress) {
            return;
        }
        return new Promise(function (resolve) {
            getMyKeyProp().then(function (data) {
                if (!data[0]) {
                    return;
                }
                _this.data.moduleData.unionBonus = parseFloat(web3js.fromWei(data[6].toString())).toFixed(2);
                _this.data.moduleData.allTime = data[5].toString();
                _this.data.moduleData.allBuy = parseFloat(web3js.fromWei(data[1].toString())).toFixed(2);
                $Modal.gameStatistics.data.stats.extractCoin1 = _this.data.moduleData.unionBonus;
                _this.data.moduleData.myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 100) / 100 + "";
                if (parseFloat(_this.data.moduleData.myBonus) + parseFloat(_this.data.moduleData.unionBonus) >= 1) {
                    $Modal.buyKey.data.input = "0";
                }
                else {
                    $Modal.buyKey.data.input = "1";
                }
                var flag = Number(_this.data.moduleData.myBonus) >= 1;
                if (data[2] > 0) {
                    $gameContractInstance.getRollInArrayDetail($myAddress, function (err2, arr) {
                        if (err2) {
                            console.log(err2);
                        }
                        else {
                            var len = arr.length;
                            if (len == 0 || flag) {
                                // setTimeout(() => {
                                _this.alertModal.visible = true;
                                _this.playAnimation(_this.alertBgBling, true);
                                // }, 1000);
                            }
                            else {
                                _this.alertBgBling.stop();
                                _this.alertModal.visible = false;
                            }
                            _this.isUpdatePlayerData = true;
                            getMyEtraProp().then(function (etra) {
                                _this.data.moduleData.teamProf = parseFloat(web3js.fromWei(etra[5].toString())).toFixed(2);
                                $Modal.gameStatistics.data.stats.rcmdid = etra[1].toString();
                                _this.data.moduleData.rcmdid = etra[1].toString();
                                resolve();
                            });
                        }
                    });
                }
                else {
                    if (flag) {
                        // setTimeout(() => {
                        _this.alertModal.visible = true;
                        _this.playAnimation(_this.alertBgBling, true);
                        // }, 1000);
                    }
                    else {
                        _this.alertBgBling.stop();
                        _this.alertModal.visible = false;
                    }
                    _this.isUpdatePlayerData = true;
                    getMyEtraProp().then(function (etra) {
                        _this.data.moduleData.teamProf = parseFloat(web3js.fromWei(etra[5].toString())).toFixed(2);
                        $Modal.gameStatistics.data.stats.rcmdid = etra[1].toString();
                        _this.data.moduleData.rcmdid = etra[1].toString();
                        resolve();
                    });
                }
            }, function (err) {
                console.log(err);
            });
        });
    };
    /**
     * open modal events
     */
    Game.prototype.openModalsEvent = function () {
        var _this = this;
        this.statisticsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.gameStatistics, 116);
            $Modal.gameStatistics.getData();
        }, this);
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.gameHelp, 662);
        }, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if ($myAddress) {
                $Modal.betLoad.visible = true;
                $gameContractInstance.playerIsRegi($myAddress, function (err, bool) {
                    if (err) {
                        // console.log(err)
                        $alert('网络错误');
                    }
                    else {
                        $Modal.betLoad.visible = false;
                        if (bool) {
                            _this.modalShowEvent($Modal.refereeInfo, 662);
                            $Modal.refereeInfo.getUrl();
                            $Modal.refereeInfo.updateData.start();
                        }
                        else {
                            _this.modalShowEvent($Modal.register, 662);
                        }
                    }
                });
            }
            else {
                _this.modalShowEvent($Modal.register, 662);
            }
        }, this);
        this.languageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.language, 662);
        }, this);
    };
    Game.prototype.modalShowEvent = function (modal, y) {
        modal.visible = true;
        var group = modal.$children[1];
        var tw = egret.Tween.get(group);
        tw.to({ y: y }, 200);
        tw = null;
    };
    /*
        动画循环播放函数
   */
    Game.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
