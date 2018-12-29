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
            input: "3",
            round: "1",
            weekPot: "e0",
            totalFinalPot: "e0",
            leftTime: "00:00:00",
            weekLeftTime: "00:00:00",
            residueTimes: "30",
            totalBuy: "0",
            buyTimes: "0",
            outTimes: "0",
            notoutTimes: "0",
            earnings: "0",
            levelupBonus: "0",
            leaderBonus: "0",
            roundBonus: "0",
            myNum: "0",
            currentNum: "1",
            inviteBonus: "0",
        };
        _this.eventData = {
            begin: 0,
            end: 0,
        };
        /**lang data */
        _this.langData = $ZHTW.game;
        _this.intervalIsStart = false;
        _this.updateData = new egret.Timer(1000, 0);
        _this.overTime = 0; //剩余时间秒数
        _this.overWeekTime = 0; //剩余周时间秒数
        _this.gainId = "0";
        _this.totalPot = "0";
        _this.totalWeekPot = "0";
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/GameUI.exml";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInviteModalFun, this);
        this.lang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLanguageModalFun, this);
        this.faq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFaqModalFun, this);
        this.statistics.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showStatModalFun, this);
        // 买入
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
        // 注册
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerFun, this);
        // 提取
        this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.withdrawFun, this);
        setOverTime().then(function (time) {
            time = time < 0 ? 0 : time;
            _this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        $getTotalPot().then(function (coin) {
            _this.data.totalFinalPot = "e" + Number(Number(web3js.fromWei(coin[1])).toFixed(3));
            _this.data.weekPot = "e" + Number(Number(web3js.fromWei(coin[2])).toFixed(2));
        });
        $gameContractInstance.nCurrentGainId(function (err, id) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.currentNum = id.toString();
                $Modal.gameStatistics.data.stats.currentNum = id.toString();
            }
        });
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
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
                    _this.overTime = 86400;
                    _this.data.leftTime = timestampToMoment(_this.overTime);
                }
            }, function (err) {
                _this.updateData.stop();
                console.log("===========", err);
            });
        }
        else {
            this.intervalStart();
        }
        // 每周倒计时
        getBjTime().then(function (now) {
            var d = new Date();
            d.setHours(12, 0, 0, 0);
            var day = 0;
            switch (d.getDay()) {
                case 6:
                    day = -1;
                    break;
                case 7:
                    day = 0;
                    break;
                default:
                    day = d.getDay();
            }
            var week = 5 - day;
            var thisHour = new Date().getHours();
            week = (week == 0 && thisHour >= 12) ? 7 : week;
            var result = d.getTime() + week * 86400000;
            var final = result - now;
            _this.data.weekLeftTime = timestampToMoment(final / 1000);
        });
    };
    Game.prototype.intervalStart = function () {
        var _this = this;
        this.overTime--;
        if (this.overTime % 3 == 0) {
            $Modal.gameStatistics.getTeamTotalPot();
            $gameContractInstance.round(function (err, round) {
                if (err) {
                    console.log("4545" + err);
                    _this.updateData.stop();
                }
                else {
                    _this.data.round = round.toNumber();
                }
            });
            setOverTime().then(function (time) {
                time = time < 0 ? 0 : time;
                _this.overTime = parseInt(time + "");
                // console.log(this.overTime);
                if (_this.overTime > 86400) {
                    _this.potLabel.visible = false;
                    _this.readyTime.visible = true;
                    _this.overTime -= 86400;
                    _this.gainId = "0";
                }
                else {
                    _this.potLabel.visible = true;
                    _this.readyTime.visible = false;
                }
            });
            $getTotalPot().then(function (coin) {
                if (Number(coin) < Number(_this.totalPot)) {
                    _this.data.totalFinalPot = "e" + _this.totalPot;
                    _this.data.weekPot = "e" + _this.totalWeekPot;
                    //更新统计界面奖池金额
                }
                else {
                    _this.data.totalFinalPot = "e" + Number(Number(web3js.fromWei(coin[1])).toFixed(3));
                    _this.data.weekPot = "e" + Number(Number(web3js.fromWei(coin[2])).toFixed(2));
                    //更新统计界面奖池金额
                    _this.totalPot = Number(Number(web3js.fromWei(coin[1])).toFixed(3)) + "";
                    _this.totalWeekPot = Number(Number(web3js.fromWei(coin[2])).toFixed(2)) + "";
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.stats.totalBuyTimes = coin[3].toString();
                        $Modal.gameStatistics.data.round.activePot = _this.totalPot;
                    }
                }
            });
            /**当前分红序列 */
            $gameContractInstance.nCurrentGainId(function (err, id) {
                if (err) {
                    console.log(err);
                    _this.updateData.stop();
                }
                else {
                    if (parseInt(id.toString()) < parseInt(_this.gainId)) {
                        _this.data.currentNum = _this.gainId;
                        $Modal.gameStatistics.data.stats.currentNum = _this.gainId;
                    }
                    else {
                        _this.data.currentNum = id.toString();
                        $Modal.gameStatistics.data.stats.currentNum = id.toString();
                        _this.gainId = id.toString();
                    }
                    // 剩余炼丹次数
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
                                        _this.data.residueTimes = 30 - parseInt(n[1].toString()) + "";
                                        _this.data.myNum = parseInt(n[0].toString()) + "";
                                    }
                                });
                            }
                            else {
                                _this.data.residueTimes = '30';
                                _this.data.myNum = "0";
                            }
                        }
                    });
                }
            });
            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then(function (data) {
                if (!data[0]) {
                    return;
                }
                _this.data.totalBuy = Math.floor(parseFloat(web3js.fromWei(data[1].toString())) * 1000) / 1000 + "";
                _this.data.buyTimes = data[5].toString();
                // 联盟奖
                _this.data.roundBonus = Math.floor(parseFloat(web3js.fromWei(data[6].toString())) * 1000) / 1000 + "";
                if ($Modal.gameStatistics.visible) {
                    $Modal.gameStatistics.data.stats.myReinvest = data[5].toString();
                }
                getMyEtraProp().then(function (etra) {
                    _this.data.outTimes = etra[4].toString();
                    // 晋级收益   领袖收益
                    _this.data.levelupBonus = Math.floor(parseFloat(web3js.fromWei(etra[5].toString())) * 1000) / 1000 + "";
                    _this.data.leaderBonus = Math.floor(parseFloat(web3js.fromWei(etra[6].toString())) * 1000) / 1000 + "";
                });
                var myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 1000) / 1000;
                _this.data.earnings = myBonus + "";
                // 下注控制
                if (myBonus >= 3) {
                    _this.data.input = "0";
                }
                else {
                    _this.data.input = "3";
                }
                $gameContractInstance.getRollInArrayLen(function (errLen, len) {
                    if (errLen) {
                        console.log(errLen);
                    }
                    else {
                        _this.data.notoutTimes = len;
                    }
                });
                if (data[1] > 0) {
                    $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, roll) {
                        if (err3) {
                            console.log(err3);
                        }
                        else {
                            roll = roll.map(function (item, i) {
                                return parseInt(item.toString());
                            });
                            var len = roll.length;
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
        this.data.leftTime = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.leftTime;
        }
        if (this.overTime <= 0) {
            this.alertBgBling.stop();
            this.alertModal.visible = false;
            $gameContractInstance.round(function (err, round) {
                if (err) {
                    $alert(err);
                }
                else {
                    if (round > 1) {
                        // this.gameoverAnimation();
                    }
                }
            });
            setTimeout(function () {
                _this.gameoverModel.visible = false;
                _this.gameoverBling.stop();
            }, 15000);
        }
    };
    /*
     * 动画循环播放函数
     */
    Game.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    /*
     * 游戏结束 丹成封神
     */
    Game.prototype.gameoverAnimation = function () {
        var _this = this;
        this.gameoverModel.visible = true;
        this.gameoverBling.play();
        setTimeout(function () {
            _this.playAnimation(_this.goTextBling, true);
            _this.updateData.stop();
        }, 1500);
    };
    /**
     * 买入函数
     */
    Game.prototype.buyKeyFun = function () {
        var _this = this;
        getIsBegin().then(function (bool) {
            if (!bool) {
                _this.directBuy();
            }
            else {
                setOverTime().then(function (time) {
                    if (time > 86400) {
                        $alert($AlertMsg.readyTime);
                        return;
                    }
                    _this.directBuy();
                });
            }
        });
    };
    Game.prototype.directBuy = function () {
        var _this = this;
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        var href = location.href;
        var addr = href.split("?")[1];
        var _referrer = "0x0000000000000000000000000000000000000000";
        if (addr) {
            if (web3js.isAddress(addr)) {
                _referrer = addr;
                this.rollIn(_referrer);
            }
            else if (isNaN(Number(addr))) {
                console.log(web3js.fromAscii(addr));
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            }
            else {
                $gameContractInstance.playerxID_(addr, function (err, data) {
                    if (err) {
                        $alert(err);
                    }
                    else {
                        _referrer = data[0];
                        _this.rollIn(_referrer);
                    }
                });
            }
        }
        else {
            this.rollIn(_referrer);
        }
    };
    Game.prototype.rollIn = function (_referrer) {
        var _this = this;
        if ($myAddress == _referrer) {
            _referrer = "0x0000000000000000000000000000000000000000";
        }
        console.log(_referrer);
        $myAddress && getMyKeyProp().then(function (data) {
            if (data[2].c.length >= 10) {
                $alert($AlertMsg.isQueue);
                return;
            }
            console.log(web3js.toWei(_this.data.input, "ether"));
            $gameContractInstance.coinRollIn(_referrer, { gasPrice: 10000000000 }, {
                from: $myAddress,
                value: web3js.toWei(_this.data.input, "ether")
            }, function (err, hash) {
                err && console.log(err);
                console.log(hash);
            });
        }, function (err) {
            console.log(err);
        });
    };
    // 注册
    Game.prototype.registerFun = function () {
        $myAddress && $gameContractInstance.playerIsRegi($myAddress, function (err, bool) {
            if (err) {
                console.log(err);
            }
            else {
                if (bool) {
                    $Modal.register.registerGroup.visible = false;
                    $Modal.register.linkGroup.visible = true;
                    $Modal.register.getUrl();
                    $modalShowEvent($Modal.register, 205);
                }
                else {
                    $Modal.register.registerReg();
                }
            }
        });
        if (!$myAddress) {
            notSignInMetamask();
        }
    };
    Game.prototype.withdrawFun = function () {
        if ($myAddress) {
            $gameContractInstance.withDraw({
                from: $myAddress,
            }, function (err, hash) {
                err && console.log(err);
                console.log(hash);
            });
        }
        else {
            notSignInMetamask();
        }
    };
    // 邀请人弹窗
    Game.prototype.showInviteModalFun = function () {
        if ($myAddress) {
            $gameContractInstance.playerIsRegi($myAddress, function (err, bool) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (bool) {
                        $Modal.register.registerGroup.visible = false;
                        $Modal.register.linkGroup.visible = true;
                        $Modal.register.getUrl();
                    }
                    else {
                        $Modal.register.registerGroup.visible = true;
                        $Modal.register.linkGroup.visible = false;
                    }
                }
            });
        }
        else {
            $Modal.register.registerGroup.visible = true;
            $Modal.register.linkGroup.visible = false;
        }
        $modalShowEvent($Modal.register, 205);
    };
    // 语言弹窗
    Game.prototype.showLanguageModalFun = function () {
        $modalShowEvent($Modal.language, 205);
    };
    // 攻略弹窗
    Game.prototype.showFaqModalFun = function () {
        $modalShowEvent($Modal.gameHelp, 205);
    };
    // 统计弹窗
    Game.prototype.showStatModalFun = function () {
        $Modal.gameStatistics.getExtractList();
        $modalShowEvent($Modal.gameStatistics, 205);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
