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
            roundNum: "1",
            jackpot: "e0",
            jackpotUs: "0",
            timeRemaining: '00:00:00',
            choosedTeam: 2,
            input: '1',
            exchangeRate: 0,
            remainingBet: '10',
            moduleData: {
                extractNum: "0",
                firstBonusUs: "0",
                currentBon: "0",
                secondBonusUs: "0",
                myAllBuy: "0",
                allBuyUs: "0",
                myBonus: "0",
                myBonusUs: "0",
                roundBuy: "0",
                roundBonus: "0",
                queueNum: "0",
                roundBonusUs: "(0)"
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
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/GameUI.exml";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.canBegin();
        /**buy key event */
        this.showBuyModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBuyModalFun, this);
        /**提取函数 */
        this.extractBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.extractFun, this);
        setOverTime().then(function (time) {
            time = time < 0 ? 0 : time;
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
    Game.prototype.showBuyModalFun = function () {
        // $Modal.buyKey.data.choosedTeam = this.data.choosedTeam;
        // this.modalShowEvent($Modal.buyKey,662);
        $Modal.buyKey.buyKeyFun();
    };
    Game.prototype.extractFun = function () {
        $Modal.extract.drawFun();
        // this.modalShowEvent($Modal.extract, 662);
    };
    Game.prototype.canBegin = function () {
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
    };
    Game.prototype.getData = function () {
        var _this = this;
        if (!this.intervalIsStart) {
            getIsBegin().then(function (bool) {
                if (bool) {
                    _this.intervalStart();
                    _this.intervalIsStart = true;
                }
                else {
                    _this.overTime = 28800;
                    _this.data.timeRemaining = timestampToMoment(_this.overTime);
                }
            });
        }
        else {
            this.intervalStart();
        }
    };
    Game.prototype.intervalStart = function () {
        var _this = this;
        this.overTime--;
        if (this.overTime % 3 == 0) {
            $Modal.gameStatistics.getTeamTotalPot();
            getEthXUSDrate().then(function (rate) {
                _this.rateUSD = parseFloat(rate + "");
            });
            $gameContractInstance.round(function (err, round) {
                if (err) {
                    console.log("4545" + err);
                    _this.updateData.stop();
                }
                else {
                    _this.data.roundNum = round.toNumber();
                }
            });
            setOverTime().then(function (time) {
                time = time < 0 ? 0 : time;
                _this.overTime = parseInt(time + "");
                if (_this.overTime > 28800) {
                    _this.jackPotLabel.visible = false;
                    _this.readyTimeLabel.visible = true;
                    _this.overTime -= 28800;
                }
                else {
                    _this.jackPotLabel.visible = true;
                    _this.readyTimeLabel.visible = false;
                }
            });
            getTotalPot().then(function (keys) {
                if (Number(keys) < Number(_this.totalPot)) {
                    _this.data.jackpot = "e" + _this.totalPot;
                    //更新统计界面奖池金额
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(_this.totalPot).toFixed(6) + "";
                    }
                }
                else {
                    _this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
                    //更新统计界面奖池金额
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(keys + "").toFixed(6) + "";
                    }
                    _this.totalPot = Number(Number(keys).toFixed(2)) + "";
                }
                // console.log("+++++++++++++",this.totalPot);
                var myRate = parseFloat(_this.rateUSD + "");
                _this.data.jackpotUs = parseFloat(Number(keys) * myRate + "").toFixed(4) + "";
            });
            /**当前分红序列 */
            $gameContractInstance.nCurrentGainId(function (err, id) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (parseInt(id.toString()) < parseInt(_this.gainId)) {
                        _this.data.totalInvest = _this.gainId;
                        $Modal.gameStatistics.data.stats.totalInvested = _this.gainId;
                    }
                    else {
                        _this.data.totalInvest = id.toString();
                        $Modal.gameStatistics.data.stats.totalInvested = id.toString();
                        _this.gainId = id.toString();
                    }
                    // console.log("-------------",this.gainId);
                    $gameContractInstance.getRollInArrayLen(function (err2, len) {
                        if (err2) {
                            console.log(err2);
                        }
                        else {
                            if (len > 0) {
                                $gameContractInstance.getRollInArray(0, function (err1, n) {
                                    if (err1) {
                                        console.log(err1);
                                    }
                                    else {
                                        $Modal.gameStatistics.data.stats.extractNum = n[0].toString();
                                        _this.data.remainingBet = 10 - parseInt(n[1].toString()) + "";
                                        // this.data.moduleData.extractNum = parseFloat(n[0].toString()) - parseFloat(id.toString()) + "";
                                        _this.data.moduleData.extractNum = parseFloat(n[0].toString()) + "";
                                        if (_this.data.moduleData.extractNum == "0") {
                                            _this.data.moduleData.extractNum = "正在收益";
                                        }
                                    }
                                });
                            }
                            else {
                                _this.data.remainingBet = '10';
                                _this.data.moduleData.extractNum = "0";
                            }
                        }
                    });
                }
            });
            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then(function (data) {
                _this.data.moduleData.myAllBuy = parseFloat(web3js.fromWei(data[3].toString())).toFixed(2);
                _this.data.moduleData.roundBuy = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
                _this.data.moduleData.roundBonus = parseFloat(web3js.fromWei(data[5].toString())).toFixed(2);
                _this.data.moduleData.currentBon = parseFloat(web3js.fromWei(data[7].toString())).toFixed(2);
                $Modal.gameStatistics.data.stats.extractCoin1 = _this.data.moduleData.currentBon;
                // this.data.moduleData.myBonus = (parseFloat(web3js.fromWei(data[4].toString())) + parseFloat(web3js.fromWei(data[5].toString()))).toFixed(2);
                _this.data.moduleData.myBonus = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
                if (parseFloat(_this.data.moduleData.myBonus) + parseFloat(_this.data.moduleData.currentBon) >= 3) {
                    $Modal.buyKey.data.input = "0";
                }
                else {
                    $Modal.buyKey.data.input = "3";
                }
                var myRate = parseFloat(_this.rateUSD + "");
                _this.data.moduleData.allBuyUs = parseFloat(Number(_this.data.moduleData.myAllBuy) * myRate + "").toFixed(4) + "";
                _this.data.moduleData.secondBonusUs = (parseFloat(Number(_this.data.moduleData.currentBon) * myRate + "")).toFixed(4) + "";
                _this.data.moduleData.myBonusUs = parseFloat(Number(_this.data.moduleData.myBonus) * myRate + "").toFixed(4) + "";
                _this.data.moduleData.roundBonusUs = "(" + parseFloat(Number(_this.data.moduleData.roundBonus) * myRate + "").toFixed(4) + ")";
                if (data[2] > 0) {
                    $gameContractInstance.getRollInArrayLen(function (err2, len) {
                        if (err2) {
                            console.log(err2);
                        }
                        else {
                            if (len == 0) {
                                setTimeout(function () {
                                    _this.alertModal.visible = true;
                                    _this.playAnimation(_this.alertBgBling, true);
                                }, 4000);
                            }
                            else {
                                _this.alertBgBling.stop();
                                _this.alertModal.visible = false;
                            }
                        }
                    });
                }
                else {
                    _this.alertBgBling.stop();
                    _this.alertModal.visible = false;
                }
            }, function (err) {
                console.log(err);
            });
        }
        this.data.timeRemaining = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.timeRemaining;
        }
    };
    /**
     * open modal events
     */
    Game.prototype.openModalsEvent = function () {
        var _this = this;
        this.statisticsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.gameStatistics, 545);
            $Modal.gameStatistics.getData();
            $Modal.gameStatistics.updateData.start();
        }, this);
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.gameHelp, 662);
        }, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if ($myAddress) {
                $gameContractInstance.playerIsRegi($myAddress, function (err, bool) {
                    if (err) {
                        console.log(err);
                    }
                    else {
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
