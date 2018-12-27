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
var tr = egret.sys.tr;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.isPlay = false;
        _this.isGameOver = false;
        /**
         * game data
         */
        _this.data = {
            approveNum: "0",
            input: "200",
            currentNum: "1",
            round: "1",
            pot: "0",
            leftTime: "00:00:00",
            residueTimes: "30",
            totalBuyTimes: "30",
            allowAddTimes: "0",
            myNum: "0",
            buyTimes: "0",
            totalBuy: "0 ODF",
            inviteBonus: "0 ODF",
            earnings: "0 ODF",
            allEarnings: "0 ODF",
            canBonus: "0 ODF",
        };
        _this.currentMyNum = "0";
        _this.eventData = {
            begin: 0,
            end: 0,
        };
        /**lang data */
        _this.langData = $ZHTW.game;
        _this.intervalIsStart = false;
        _this.updateData = new egret.Timer(1000, 0);
        _this.overTime = 0; //剩余时间秒数
        _this.gainId = 0;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/GameUI.exml";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Game.prototype.layoutFuns = function () {
        var _this = this;
        this.invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInviteModalFun, this);
        this.lang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLanguageModalFun, this);
        this.faq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFaqModalFun, this);
        this.statistics.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showStatModalFun, this);
        // 买入
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
        // 提取
        this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.withdrawFun, this);
        this.alertBg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.closeOutAnimal();
        }, this);
        setOverTime().then(function (time) {
            time = time < 0 ? 0 : time;
            _this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then(function (coin) {
            coin = Number(coin);
            if (coin > 0) {
                _this.data.pot = coin.toString();
                //更新统计界面奖池金额
                $Modal.gameStatistics.data.round.activePot = _this.data.pot;
            }
        });
        this.playAnimation(this.btnBling, true);
        $gameContractInstance.nCurrentGainId(function (err, id) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.currentNum = id.toString();
                // $Modal.gameStatistics.data.stats.currentNum = id.toString();
            }
        });
        this.getMyApprove();
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.updatePlayerData();
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
                // this.updateData.stop();
                console.log("===========", err);
            });
        }
        else {
            this.intervalStart();
        }
    };
    Game.prototype.updatePlayerData = function () {
        var _this = this;
        if (!$myAddress) {
            return;
        }
        //授权
        this.getMyApprove();
        // 剩余炼丹次数
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
                    _this.data.residueTimes = _this.data.totalBuyTimes;
                    _this.data.myNum = "0";
                }
                else {
                    var totalTimes = parseInt(_this.data.totalBuyTimes);
                    _this.data.residueTimes = (totalTimes - len > 0 ? totalTimes - len : 0) + "";
                    _this.data.myNum = parseInt(roll[0].toString()) + "";
                    if (_this.currentMyNum != "0") {
                        if (parseInt(_this.data.myNum) > parseInt(_this.currentMyNum)) {
                            _this.playMusic();
                        }
                    }
                    _this.currentMyNum = _this.data.myNum;
                }
            }
        });
        /**更新我的数据信息 */
        $myAddress && getMyKeyProp().then(function (data) {
            if (!data[0]) {
                return;
            }
            _this.data.allowAddTimes = data[2].toString();
            _this.data.totalBuyTimes = 30 + parseInt(data[2].toString()) + "";
            // 复投次数
            _this.data.buyTimes = data[5].toString();
            _this.data.totalBuy = Math.floor(parseFloat(web3js.fromWei(data[1].toString())) * 100) / 100 + " ODF";
            var myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 100) / 100;
            _this.data.earnings = myBonus + " ODF";
            // allEarnings = 邀请奖 + 可以提的利润 + 可提本金
            getMyEtraProp().then(function (etra) {
                // 邀请奖
                var invite = Math.floor(parseFloat(web3js.fromWei(etra[5].toString())) * 100) / 100;
                _this.data.inviteBonus = invite + " ODF";
                $gameContractInstance.allowMoney($myAddress, function (err4, money) {
                    if (err4) {
                        console.log(err4);
                    }
                    else {
                        _this.data.allEarnings = Math.floor(parseFloat(web3js.fromWei(money.toString())) * 100) / 100 + " ODF";
                    }
                });
                $myAddress && $gameContractInstance.pIDxAddr_($myAddress, function (err, pid) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        $gameContractInstance.getCurrentBonusMoney(pid, function (err4, money) {
                            if (err4) {
                                console.log(err4);
                            }
                            else {
                                _this.data.canBonus = Math.floor(parseFloat(web3js.fromWei(money.toString())) * 100) / 100 + " ODF";
                            }
                        });
                    }
                });
            });
            // 下注控制
            if (myBonus >= 200) {
                _this.data.input = "0";
            }
            else {
                _this.data.input = "200";
            }
            if (parseInt(web3js.fromWei(data[1].toString())) > 0) {
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
                            _this.earning.visible = false;
                            _this.pToearning.visible = true;
                            setTimeout(function () {
                                if (!_this.isPlay) {
                                    _this.alertModal.visible = true;
                                    _this.outMusic();
                                    _this.isPlay = true;
                                    _this.playAnimation(_this.alertBgBling, true);
                                    setTimeout(function () {
                                        _this.closeOutAnimal();
                                    }, 10000);
                                }
                            }, 4000);
                        }
                        else {
                            _this.earning.visible = true;
                            _this.pToearning.visible = false;
                            _this.closeOutAnimal();
                        }
                    }
                });
            }
            else {
                _this.closeOutAnimal();
            }
        }, function (err) {
            console.log(err);
        });
    };
    Game.prototype.intervalStart = function () {
        var _this = this;
        this.overTime--;
        //轮次
        if (this.overTime % 300 == 0) {
            $gameContractInstance.round(function (err, round) {
                if (err) {
                    //$alert(err);
                    console.log("round" + err);
                }
                else {
                    if (round > 1 && !_this.isGameOver) {
                        $dragonBonesAnime(2);
                        _this.isGameOver = true;
                    }
                    _this.data.round = round.toNumber();
                    if ($Modal.gameStatistics) {
                        $Modal.gameStatistics.data.currentRound = round.toString();
                    }
                }
            });
        }
        if (this.overTime % 5 == 0) {
            $gameContractInstance.nRollIn(function (err, id) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (oldRollId != id.toString()) {
                        setOverTime().then(function (time) {
                            if (time > 0) {
                                // time = time < 0 ? 0 : time;
                                _this.overTime = parseInt(time + "");
                                if (_this.overTime > 86400) {
                                    _this.potLabel.visible = false;
                                    _this.readyTime.visible = true;
                                    _this.overTime -= 86400;
                                }
                                else {
                                    _this.potLabel.visible = true;
                                    _this.readyTime.visible = false;
                                }
                            }
                        });
                        //奖池
                        getTotalPot().then(function (coin) {
                            coin = Number(coin);
                            if (coin > 0) {
                                _this.data.pot = coin.toString();
                                //更新统计界面奖池金额
                                $Modal.gameStatistics.data.round.activePot = _this.data.pot;
                            }
                            // if (Number(coin) < Number(this.totalPot)) {
                            //     this.data.pot = "" + this.totalPot;
                            //     //更新统计界面奖池金额
                            //     if ($Modal.gameStatistics.visible) {
                            //         $Modal.gameStatistics.data.round.activePot = "" + parseFloat(this.totalPot).toFixed(0) + "e";
                            //     }
                            // } else {
                            //     this.data.pot = "" + Number(Number(coin).toFixed(0));
                            //     //更新统计界面奖池金额
                            //     if ($Modal.gameStatistics.visible) {
                            //         $Modal.gameStatistics.data.round.activePot = "" + parseFloat(coin + "").toFixed(0) + "e";
                            //     }
                            //     this.totalPot = Number(Number(coin).toFixed(0)) + "";
                            // }
                        });
                        /**当前分红序列 */
                        $gameContractInstance.nCurrentGainId(function (err, id) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                if (id.toNumber() > _this.gainId) {
                                    _this.data.currentNum = id.toString();
                                    $Modal.gameStatistics.data.stats.currentNum = id.toString();
                                    _this.gainId = id.toNumber();
                                }
                            }
                        });
                        _this.updatePlayerData();
                        oldRollId = id.toString();
                    }
                }
            });
        }
        this.data.leftTime = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.leftTime;
        }
    };
    Game.prototype.closeOutAnimal = function () {
        this.alertBgBling.stop();
        this.isPlay = true;
        this.alertModal.visible = false;
    };
    Game.prototype.getMyApprove = function () {
        var _this = this;
        var from = $myAddress;
        var to = $gameContractInstance.address;
        $myAddress && $tokenContractInstance.allowance(from, to, function (err, data) {
            if (err) {
                console.log("4545" + err);
            }
            else {
                _this.data.approveNum = web3js.fromWei(data.toString(), "ether");
            }
        });
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
        $showLoading(true);
        this.chargeLimit().then(function (has) {
            if (Number(has) > 0 && parseInt(web3js.fromWei(has, "ether")) >= parseInt(_this.data.input)) {
                _this.chargeBalance().then(function (coin) {
                    coin = web3js.fromWei(coin);
                    $showLoading(false);
                    if (Number(coin) < parseInt(_this.data.input)) {
                        $alert("\u60A8\u7684Token\u4F59\u984D\u70BA" + coin + ",\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u672C\u6B21\u7149\u4E39");
                        return;
                    }
                    getIsBegin().then(function (bool) {
                        if (!bool) {
                            _this.directBuy();
                        }
                        else {
                            setOverTime().then(function (time) {
                                // if (time > 86400) {
                                //     $alert($AlertMsg.readyTime);
                                //     return;
                                // }
                                _this.directBuy();
                            });
                        }
                    });
                });
            }
            else {
                // 弹窗去充值额度
                console.log("没授权");
                $showLoading(false);
                $Modal.approve.visible = true;
                $Modal.approve.msg = $AlertMsg.buyApprove;
            }
        }, function (err) {
            $showLoading(false);
            $alert(err);
        });
    };
    Game.prototype.chargeBalance = function () {
        return new Promise(function (resolve, reject) {
            if (!$myAddress) {
                $showLoading(false);
                notSignInMetamask();
                reject();
                return;
            }
            $tokenContractInstance.balanceOf($myAddress, function (err, token) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(token.toString());
                }
            });
        });
    };
    // 判断额度
    Game.prototype.chargeLimit = function () {
        return new Promise(function (resolve, reject) {
            if (!$myAddress) {
                $showLoading(false);
                notSignInMetamask();
                reject("You're not signed into metamask");
                return;
            }
            var from = $myAddress;
            var to = $gameContractInstance.address;
            $tokenContractInstance.allowance(from, to, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.toString());
                }
            });
        });
    };
    Game.prototype.directBuy = function () {
        var _this = this;
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        var addr = $getQueryIdString(); // 获取id
        var _referrer = "0x0000000000000000000000000000000000000000";
        console.log("--------addr=----", addr);
        if (addr) {
            addr = window.atob(addr);
            console.log("--------addr-atob=----", addr);
            if (web3js.isAddress(addr)) {
                _referrer = addr;
                this.rollIn(_referrer);
            }
            else if (isNaN(Number(addr))) {
                console.log(web3js.fromAscii(addr));
                ("請保持瀏覽器地址中推薦人的id為正確id");
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
        $myAddress && getMyKeyProp().then(function (data) {
            if (data[2].c.length >= 10) {
                $alert($AlertMsg.isQueue);
                return;
            }
            var val = web3js.toWei(_this.data.input, "ether");
            // let val = this.data.input;
            console.log(_referrer, val);
            setTimeout(function () {
                _this.btnLight.visible = false;
                _this.btnBling.stop();
            }, 1000);
            $gameContractInstance.coinRollIn(_referrer, val, {
                from: $myAddress,
                gasPrice: 9000000000
            }, function (err, hash) {
                err && console.log(err);
                console.log(hash);
                if ((err && err.hash) || hash) {
                    $dragonBonesAnime(1);
                    setTimeout(function () {
                        $alert($AlertMsg.alreadyBuy);
                        setTimeout(function () {
                            $Modal.gameAlert.visible = false;
                        }, 3000);
                    }, 6000);
                }
            });
        }, function (err) {
            console.log(err);
        });
    };
    Game.prototype.withdrawFun = function () {
        if ($myAddress) {
            $showLoading(true);
            if (this.data.allEarnings == "0 ODF") {
                $showLoading(false);
                $alert($AlertMsg.zeroBalance);
                return;
            }
            $gameContractInstance.withDraw({
                from: $myAddress,
                gasPrice: 9000000000
            }, function (err, hash) {
                $showLoading(false);
                err && console.log(err);
                console.log(hash);
                if ((err && err.hash) || hash) {
                    $dragonBonesAnime(4);
                    setTimeout(function () {
                        $alert($AlertMsg.alreadyBuy);
                        setTimeout(function () {
                            $Modal.gameAlert.visible = false;
                        }, 3000);
                    }, 4000);
                }
            });
        }
        else {
            notSignInMetamask();
        }
    };
    // 邀请人弹窗
    Game.prototype.showInviteModalFun = function () {
        var _this = this;
        $showLoading(true);
        this.chargeLimit().then(function (has) {
            if (Number(has) > 0 && parseInt(web3js.fromWei(has, "ether")) >= 2) {
                if ($myAddress) {
                    $gameContractInstance.playerIsRegi($myAddress, function (err, bool) {
                        if (err) {
                            console.log(err);
                            $alert(err);
                            $showLoading(false);
                        }
                        else {
                            if (bool) {
                                $showLoading(false);
                                $Modal.register.registerGroup.visible = false;
                                $Modal.register.linkGroup.visible = true;
                                $Modal.register.getUrl();
                            }
                            else {
                                _this.chargeBalance().then(function (coin) {
                                    coin = web3js.fromWei(coin);
                                    $showLoading(false);
                                    if (Number(coin) < 2) {
                                        $alert("\u60A8\u7684Token\u4F59\u984D\u70BA" + coin + ",\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u672C\u6B21\u8D2D\u4E70\u63A8\u8350\u4EBA");
                                        return;
                                    }
                                    else {
                                        $Modal.register.registerGroup.visible = true;
                                        $Modal.register.linkGroup.visible = false;
                                    }
                                });
                            }
                            $modalShowEvent($Modal.register, 205);
                        }
                    });
                }
                else {
                    $Modal.register.registerGroup.visible = true;
                    $Modal.register.linkGroup.visible = false;
                    $modalShowEvent($Modal.register, 205);
                }
            }
            else {
                // 弹窗去充值额度
                console.log("没授权");
                $showLoading(false);
                $Modal.approve.visible = true;
                $Modal.approve.msg = $AlertMsg.inviteApprove;
            }
        }, function (err) {
            $showLoading(false);
            $alert(err);
        });
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
        $Modal.gameStatistics.getTeamTotalPot();
        $modalShowEvent($Modal.gameStatistics, 205);
    };
    Game.prototype.playMusic = function () {
        var _this = this;
        this.sound = new egret.Sound();
        this.sound.addEventListener(egret.Event.COMPLETE, function (event) {
            var channel = _this.soundChannel;
            if (channel) {
                channel.stop();
                _this.soundChannel = null;
                return;
            }
            channel = _this.sound.play(0, 1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                console.log("onSoundComplete");
            }, _this);
            _this.soundChannel = channel;
        }, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
            console.log("loaded error!");
        }, this);
        this.sound.load("resource/assets/music/Win.mp3");
    };
    Game.prototype.outMusic = function () {
        var _this = this;
        var sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, function (event) {
            var channel = _this.outChannel;
            if (channel) {
                channel.stop();
                _this.outChannel = null;
                return;
            }
            channel = sound.play(0, 1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
                console.log("out music onSoundComplete");
            }, _this);
            _this.outChannel = channel;
        }, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
            console.log("out music loaded error!");
        }, this);
        sound.load("resource/assets/music/out.mp3");
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
