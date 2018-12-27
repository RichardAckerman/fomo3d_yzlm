var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Game module
 */
var Game = /** @class */ (function (_super_1) {
    __extends(Game, _super_1);
    function Game() {
        var _this = _super_1.call(this) || this;
        _this.isPlay = false;
        _this.isGameOver = false;
        /**
         * game data
         */
        _this.data = {
            approveNum: "0",
            input: "200",
            currentNum: "1",
            round: "2",
            pot: "0",
            leftTime: "24:00:00",
            residueTimes: "20",
            totalBuyTimes: "20",
            allowAddTimes: "0",
            myNum: "0",
            buyTimes: "0",
            totalBuy: "0",
            inviteBonus: "0",
            linkBonus: "0",
            turnBonus: "0",
            canWithdraw: "0",
            bonusWithdraw: "0",
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
        _super_1.prototype.childrenCreated.call(this);
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
        $gameContractInstance.round(function (err, round) {
            if (err) {
                console.log("round" + err);
            }
            else {
                _this.data.round = round.toNumber();
                if ($Modal.gameStatistics) {
                    $Modal.gameStatistics.data.currentRound = round.toString();
                }
            }
        });
        // 介绍
        // this.ownGroup1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showIntro.bind(this, 1), this);
        // this.ownGroup2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showIntro.bind(this, 2), this);
        // this.ownGroup3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showIntro.bind(this, 3), this);
        // this.ownGroup4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showIntro.bind(this, 4), this);
        // this.ownGroup5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showIntro.bind(this, 5), this);
        // this.ownGroup6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showIntro.bind(this, 6), this);
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
        $gameContractInstance.nCurrentGainId(function (err, id) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.currentNum = id.toString();
            }
        });
        this.getMyApprove();
        this.mainAnimation();
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
                    _this.data.residueTimes = totalTimes - len + "";
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
        getMyKeyProp().then(function (data) {
            if (!data[0]) {
                return;
            }
            _this.data.allowAddTimes = data[2].toString();
            _this.data.totalBuyTimes = 20 + parseInt(data[2].toString()) + "";
            // 复投次数
            _this.data.buyTimes = data[5].toString();
            _this.data.totalBuy = Math.floor(parseFloat(web3js.fromWei(data[1].toString())) * 100) / 100 + "";
            $Modal.gameStatistics.data.stats.rewards = _this.data.totalBuy;
            $gameContractInstance.allowMoney($myAddress, function (err, money) {
                if (err) {
                    $alert($AlertMsg.errorNet);
                }
                else {
                    _this.data.canWithdraw = Math.floor(parseFloat(web3js.fromWei(money)) * 100) / 100 + "";
                }
            });
            $gameContractInstance.pIDxAddr_($myAddress, function (err, pid) {
                if (err) {
                    $alert($AlertMsg.errorNet);
                }
                else {
                    $gameContractInstance.getCurrentBonusMoney(pid, function (err, money) {
                        if (err) {
                            $alert($AlertMsg.errorNet);
                        }
                        else {
                            _this.data.bonusWithdraw = Math.floor(parseFloat(web3js.fromWei(money)) * 100) / 100 + "";
                        }
                    });
                }
            });
            var myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 100) / 100;
            _this.data.turnBonus = myBonus + "";
            // allEarnings = 邀请奖 + 可以提的利润 + 可提本金
            getMyEtraProp().then(function (etra) {
                // 邀请奖
                var invite1 = Math.floor(parseFloat(web3js.fromWei(etra[6].toString())) * 100) / 100;
                var invite2 = Math.floor(parseFloat(web3js.fromWei(etra[7].toString())) * 100) / 100;
                _this.data.inviteBonus = invite1 + "";
                _this.data.linkBonus = invite2 + "";
            });
            // 下注控制
            if (myBonus >= 200) {
                _this.data.input = "0";
            }
            else {
                _this.data.input = "200";
            }
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
                                if (!_this.isPlay) {
                                    _this.alertModal.visible = true;
                                    _this.outMusic();
                                    _this.isPlay = true;
                                    $Modal.mainIntro.visible = false;
                                    _this.playAnimation(_this.alertBgBling, true);
                                    setTimeout(function () {
                                        _this.closeOutAnimal();
                                    }, 10000);
                                }
                            }, 4000);
                        }
                        else {
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
                    if (round > 2 && !_this.isGameOver) {
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
                    // console.log("rollIN=",id.toString());
                    if (oldRollId != id.toString()) {
                        setOverTime().then(function (time) {
                            if (time > 0) {
                                // console.log("time：",time);
                                // time = time < 0 ? 0 : time;
                                _this.overTime = parseInt(time + "");
                                if (_this.overTime > 86430) {
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
                        // console.log("updatePlayerData",oldRollId,id.toString());
                        oldRollId = id.toString();
                    }
                }
            });
        }
        this.data.leftTime = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics && $Modal.gameStatistics.visible) {
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
    Game.prototype.gameOverAnimation = function () {
        var _this = this;
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
        this.closeOutAnimal();
        $showLoading(true);
        this.toMiniToBig(this.middle, 1, 1, 0.98, 0.98, 200);
        this.chargeLimit().then(function (has) {
            if (Number(has) > 0 && parseInt(web3js.fromWei(has, "ether")) >= parseInt(_this.data.input)) {
                _this.chargeBalance().then(function (coin) {
                    coin = web3js.fromWei(coin);
                    $showLoading(false);
                    if (Number(coin) < parseInt(_this.data.input)) {
                        $alert("\u60A8\u7684Token\u4F59\u984D\u70BA" + coin + ",\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u672C\u6B21\u8D2D\u4E70");
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
                var lang = localStorage.getItem('language');
                if (lang) {
                    $Modal.approve.msg = lang == "zhtw" ? '進行探探需要CKC\n現在將為你授權10000 CKC！' : "Send needs CKC\nAuthorize 10000 CKC !";
                }
                $Modal.approve.visible = true;
            }
        }, function (err) {
            $showLoading(false);
            $alert(err);
        });
    };
    Game.prototype.chargeBalance = function () {
        return new Promise(function (resolve, reject) {
            if (!$myAddress) {
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
                return;
            }
            var from = $myAddress;
            var to = $gameContractInstance.address;
            $tokenContractInstance.allowance(from, to, function (err, data) {
                if (err) {
                    $showLoading(false);
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
        if (addr) {
            addr = window.atob(addr);
            if (web3js.isAddress(addr)) { // 是地址
                _referrer = addr;
                this.rollIn(_referrer);
            }
            else if (isNaN(Number(addr))) { // 是名称
                // console.log(web3js.fromAscii(addr));
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            }
            else { // 是id
                $gameContractInstance.playerxID_(addr, function (err, data) {
                    if (err) {
                        $alert($AlertMsg.errorNet);
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
            var val = web3js.toWei(_this.data.input, "ether");
            // let val = this.data.input;
            console.log(_referrer, val);
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
                    }, 4000);
                }
            });
        }, function (err) {
            console.log(err);
        });
    };
    Game.prototype.withdrawFun = function () {
        if (this.data.canWithdraw == "0") {
            $alert($AlertMsg.zeroBalance);
            return;
        }
        $showLoading(true);
        this.toMiniToBig(this.withdrawG, 1, 1, 0.98, 0.98, 200);
        if ($myAddress) {
            $gameContractInstance.withDraw({
                from: $myAddress,
                gasPrice: 9000000000
            }, function (err, hash) {
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
        $showLoading(true);
        this.chargeLimit().then(function (has) {
            if (Number(has) > 0) {
                if ($myAddress) {
                    $gameContractInstance.playerIsRegi($myAddress, function (err, bool) {
                        $showLoading(false);
                        if (err) {
                            console.log(err);
                            $alert($AlertMsg.errorNet);
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
                            $modalShowEvent($Modal.register);
                        }
                    });
                }
                else {
                    $showLoading(false);
                    $Modal.register.registerGroup.visible = true;
                    $Modal.register.linkGroup.visible = false;
                    $modalShowEvent($Modal.register);
                }
            }
            else {
                console.log("没授权");
                $showLoading(false);
                var lang = localStorage.getItem('language');
                if (lang) {
                    $Modal.approve.msg = lang == "zhtw" ? '升級為探長需要CKC\n現在將為妳授權10000 CKC' : "Upgrading to detective requires 10000 CKC !";
                }
                $Modal.approve.visible = true;
            }
        });
    };
    // 语言弹窗
    Game.prototype.showLanguageModalFun = function () {
        $modalShowEvent($Modal.language);
    };
    // 攻略弹窗
    Game.prototype.showFaqModalFun = function () {
        if ($Modal.gameHelp == null) {
            $Modal.gameHelp = new GameHelp(); //游戏-攻略模态框
            $Modal.gameHelp.visible = false;
            this.addChild($Modal.gameHelp);
        }
        $modalShowEvent($Modal.gameHelp);
    };
    // 统计弹窗
    Game.prototype.showStatModalFun = function () {
        $Modal.gameStatistics.getExtractList();
        $modalShowEvent($Modal.gameStatistics);
    };
    // 主页开始动画
    Game.prototype.mainAnimation = function () {
        this.ownDataAnimation();
        this.trembling(this.withdrawTxt);
        this.menuShow.play();
        this.bigToMini(this.potLabel, 3, 3, 1, 1, 300);
        this.bigToMini(this.currentNum, 3, 3, 1, 1, 300);
        this.playAnimation(this.buyBling, true);
        this.playAnimation(this.eyeBling, true);
        this.rainLoop();
        this.withdrawLoop();
    };
    Game.prototype.ownDataAnimation = function () {
        var w = 341;
        var h = 210;
        var x = 85;
        var y = 50;
        // this.toBig(this.ownGroup1, x, y, 0, 0);
        // this.toBig(this.ownGroup2, x + w, y, w, 0);
        // this.toBig(this.ownGroup3, x + 2 * w, y, 2 * w, 0);
        // this.toBig(this.ownGroup4, x, y + h, 0, h);
        // this.toBig(this.ownGroup5, x + w, y + h, w, h);
        // this.toBig(this.ownGroup6, x + 2 * w, y + h, 2 * w, h);
        this.toWid(this.ownGroup1);
        this.toWid(this.ownGroup2);
        this.toWid(this.ownGroup3);
        this.toWid(this.ownGroup4);
        this.toWid(this.ownGroup5);
        this.toWid(this.ownGroup6);
    };
    // 变宽
    Game.prototype.toWid = function (target) {
        var time = 500;
        egret.Tween.get(target)
            .to({ width: 1 }, 0)
            .to({ width: 340 }, time);
    };
    // 变大
    Game.prototype.toBig = function (target, bx, by, ex, ey) {
        var time = 500;
        egret.Tween.get(target)
            .to({ scaleX: 0.5, scaleY: 0.5, x: bx, y: by }, 0)
            .to({ scaleX: 1, scaleY: 1, x: ex, y: ey }, time);
    };
    // 膨胀缩小
    Game.prototype.trembling = function (target) {
        var time = 300;
        egret.Tween.get(target, { loop: true })
            .to({ scaleX: 1, scaleY: 1 }, 0)
            .to({ scaleX: 1.06, scaleY: 1.06 }, time)
            .to({ scaleX: 1, scaleY: 1 }, time * 2);
    };
    // 从大到小 砸下去  奖池金额
    Game.prototype.bigToMini = function (target, bsx, bsy, esx, esy, t) {
        egret.Tween.get(target)
            .to({ scaleX: bsx, scaleY: bsy }, 0)
            .to({ scaleX: esx, scaleY: esy }, t);
    };
    // 按钮点击缩小再回来
    Game.prototype.toMiniToBig = function (target, bsx, bsy, esx, esy, t) {
        egret.Tween.get(target)
            .to({ scaleX: bsx, scaleY: bsy }, 0)
            .to({ scaleX: esx, scaleY: esy }, t)
            .to({ scaleX: bsx, scaleY: bsy }, t);
    };
    // 下雨特效
    Game.prototype.rainLoop = function () {
        var _this = this;
        egret.Tween.get(this.rainImg, { loop: true })
            .to({ x: 0, y: -1100 }, 0)
            .to({ x: -438, y: -500 }, 4000).call(function () {
            _this.rainImg.x = 0;
            _this.rainImg.y = -1100;
        });
    };
    // 提取按钮从左到右特效
    Game.prototype.withdrawLoop = function () {
        var _this = this;
        egret.Tween.get(this.withLight, { loop: true })
            .to({ x: -492 }, 0)
            .to({ x: 997 }, 1000).wait(10000).call(function () {
            _this.withLight.x = -492;
        });
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
    Game.prototype.showIntro = function (i) {
        var msg = "";
        switch (i) {
            case 1:
                msg = $AlertMsg.showIntro1;
                break;
            case 2:
                msg = $AlertMsg.showIntro2;
                break;
            case 3:
                msg = $AlertMsg.showIntro3;
                break;
            case 4:
                msg = $AlertMsg.showIntro4;
                break;
            case 5:
                msg = $AlertMsg.showIntro5;
                break;
            case 6:
                msg = $AlertMsg.showIntro6;
                break;
            default:
                msg = $AlertMsg.showIntro1;
        }
        $Modal.mainIntro.msg = msg;
        $Modal.mainIntro.visible = true;
    };
    return Game;
}(eui.Component));
