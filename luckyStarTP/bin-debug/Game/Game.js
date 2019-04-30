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
        /**
         * game data
         */
        _this.data = {
            input: "3",
            round: "1",
            weekPot: "0",
            totalFinalPot: "0",
            leftTime: "24:00:00",
            weekLeftTime: "168:00:00",
            canWithDraw: "0",
            residueTimes: "1",
            canBetTimes: "1",
            pageShowTime: "1/1",
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
            approveNum: '0',
            price: "0 CBE"
        };
        _this.intervalIsStart = false;
        _this.updateData = new egret.Timer(1000, 0);
        _this.overTime = 86400; //剩余时间秒数
        _this.gainId = "0";
        _this.totalPot = "0";
        _this.totalWeekPot = "0";
        _this.currentMen = 0; //当前人的个数
        _this.myLastNum = 0; //我的最新出局序号，这个值一增加 车儿就开着走
        /**load Container skin */
        _this.skinName = "resource/eui_skins/GameUI.exml";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 展开信息面板
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDataModalFun, this);
        // 关闭信息面板
        this.dataPanelBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeDataModalFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeDataModalFun, this);
        this.dataPanelClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeDataModalFun, this);
        // 5个按钮点击事件
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInviteModalFun, this);
        this.luckyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Game.showLuckyModalFun, this);
        // this.langBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Game.showLanguageModalFun, this);
        this.langBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Game.showLastBigPrizeFun, this);
        this.strategyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Game.showFaqModalFun, this);
        this.statisticsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Game.showStatModalFun, this);
        // 买入
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
        this.house.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
        // 提取
        this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.withdrawFun, this);
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        // //初始化数据
        this.initData();
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
        this.getWeekTime();
    };
    Game.prototype.intervalStart = function () {
        var _this = this;
        this.overTime--;
        if (this.overTime % 3 == 0) {
            $gameContractInstance.round(function (err, round) {
                if (err) {
                    console.log("4545" + err);
                }
                else {
                    _this.data.round = round.toNumber();
                }
            });
            setOverTime().then(function (time) {
                time = time < 0 ? 0 : time;
                _this.overTime = parseInt(time + "");
                if (_this.overTime > 86400) {
                    _this.gainId = "0";
                    if (_this.overTime > 87000) {
                        _this.overTime = 86400;
                    }
                }
                else {
                }
            });
            $getTotalPot().then(function (coin) {
                if (Number(coin[1]) < Number(_this.totalPot)) {
                    _this.data.totalFinalPot = _this.totalPot;
                    _this.data.weekPot = _this.totalWeekPot;
                    $Modal.gameLucky.data.pot = _this.data.weekPot;
                    //更新统计界面奖池金额
                }
                else {
                    _this.data.totalFinalPot = $toFixedDecimal(coin[1]);
                    _this.data.weekPot = $toFixedDecimal(coin[2]);
                    //更新统计界面奖池金额
                    _this.totalPot = _this.data.totalFinalPot;
                    _this.totalWeekPot = _this.data.weekPot;
                    $Modal.gameLucky.data.pot = _this.data.weekPot;
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
                    }
                    else {
                        _this.data.currentNum = id.toString();
                        _this.gainId = id.toString();
                    }
                    $Modal.gameStatistics.data.stats.currentNum = _this.data.currentNum;
                }
            });
            /**剩余投入次数 */
            $gameContractInstance.nPlayerArraySize(function (err, size) {
                if (err) {
                    console.log("nPlayerArraySize++++++:", err);
                }
                else {
                    _this.data.canBetTimes = size.toString();
                    var numSize_1 = parseInt(size.toString());
                    $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, n) {
                        if (err3) {
                            console.log("getRollInArrayDetail++++++:", err3);
                            _this.data.residueTimes = size.toString();
                        }
                        else {
                            var len = n.length;
                            if (len > 0) {
                                var num = numSize_1 - len < 0 ? 0 : numSize_1 - len;
                                _this.data.residueTimes = num + "";
                                _this.data.myNum = parseInt(n[0].toString()) + "";
                            }
                            else {
                                _this.data.residueTimes = size.toString();
                                _this.data.myNum = "0";
                            }
                        }
                        _this.data.pageShowTime = _this.data.residueTimes + "/" + _this.data.canBetTimes;
                    });
                }
            });
            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then(function (data) {
                if (data[1] == 0) {
                    return;
                }
                _this.data.totalBuy = $toFixedDecimal(data[1]);
                _this.data.buyTimes = data[5].toString();
                // 联盟奖
                _this.data.roundBonus = $toFixedDecimal(data[6]);
                if ($Modal.gameStatistics.visible) {
                    $Modal.gameStatistics.data.stats.myReinvest = data[5].toString();
                }
                getMyEtraProp().then(function (etra) {
                    // 晋级收益   领袖收益
                    _this.data.levelupBonus = $toFixedDecimal(etra[5]);
                    _this.data.leaderBonus = $toFixedDecimal(etra[6]);
                });
                var myBonus = data[3];
                _this.data.earnings = $toFixedDecimal(myBonus) + "";
                if (data[1] > 0) {
                    $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, roll) {
                        if (err3) {
                            console.log(err3);
                        }
                        else {
                            roll = roll.map(function (item, i) {
                                return parseInt(item.toString());
                            });
                            if (_this.myLastNum != 0) {
                                if (_this.myLastNum < roll[0]) {
                                    _this.myLastNum = roll[0];
                                    $Content.container.trainRun();
                                }
                                if (!roll[0]) {
                                    $Content.container.trainRun();
                                    _this.myLastNum = 0;
                                }
                            }
                            else if (roll[0]) {
                                _this.myLastNum = roll[0].toString();
                            }
                            var len = roll.length;
                            if (_this.currentMen > len) {
                                var difference = _this.currentMen - len;
                                for (var i = 0; i < difference; i++) {
                                    $Content.container.removeOneMiner();
                                }
                            }
                            else {
                                var difference = len - _this.currentMen;
                                for (var i = 0; i < difference; i++) {
                                    $Content.container.addOneMiner();
                                }
                            }
                            _this.currentMen = len;
                            var num = data[5].toString() - len.toString();
                            num = num < 0 ? 0 : num;
                            _this.data.outTimes = num + "";
                            _this.data.notoutTimes = len.toString();
                            if ($Modal.gameStatistics.visible) {
                                $Modal.gameStatistics.data.stats.myOutTimes = num + "";
                            }
                        }
                    });
                }
                else {
                    _this.data.outTimes = "0";
                    _this.data.notoutTimes = "0";
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.stats.myOutTimes = "0";
                    }
                }
            }, function (err) {
                console.log(err);
            });
            $myAddress && this.getCanWithdraw();
        }
        this.data.leftTime = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.leftTime;
        }
    };
    // 获取本周日中午12点倒计时
    Game.prototype.getWeekTime = function () {
        var _this = this;
        getBjTime().then(function (now) {
            var d = new Date();
            d.setHours(12, 0, 0, 0);
            var day = 0;
            switch (d.getDay()) {
                case 0:
                    day = 7;
                    break;
                default:
                    day = d.getDay();
            }
            var week = 7 - day;
            var thisHour = new Date().getHours();
            week = (week == 0 && thisHour >= 12) ? 7 : week;
            var result = d.getTime() + week * 86400000;
            var final = result - now;
            _this.data.weekLeftTime = timestampToMoment(final / 1000);
            $Modal.gameLucky.data.drainTime = _this.data.weekLeftTime;
        });
    };
    //获取初始化数据
    Game.prototype.initData = function () {
        var _this = this;
        $getTotalPot().then(function (coin) {
            _this.data.totalFinalPot = $toFixedDecimal(coin[1]);
            _this.data.weekPot = $toFixedDecimal(coin[2]);
            $Modal.gameLucky.data.pot = _this.data.weekPot;
        });
        this.getWeekTime();
        /**剩余投入次数 */
        $gameContractInstance.nPlayerArraySize(function (err, size) {
            if (err) {
                console.log("nPlayerArraySize++++++:", err);
            }
            else {
                _this.data.canBetTimes = size.toString();
                _this.data.residueTimes = size.toString();
                var numSize_2 = parseInt(size.toString());
                $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, n) {
                    if (err3) {
                        console.log("getRollInArrayDetail++++++:", err3);
                    }
                    else {
                        var len = n.length;
                        if (len > 0) {
                            var num = numSize_2 - len < 0 ? 0 : numSize_2 - len;
                            _this.data.residueTimes = num + "";
                            _this.data.myNum = parseInt(n[0].toString()) + "";
                        }
                        else {
                            _this.data.residueTimes = size.toString();
                            _this.data.myNum = "0";
                        }
                    }
                    _this.data.pageShowTime = _this.data.residueTimes + "/" + _this.data.canBetTimes;
                });
            }
        });
        $gameContractInstance.nCurrentGainId(function (err, id) {
            if (err) {
                console.log("nCurrentGainId++", err);
            }
            else {
                _this.data.currentNum = id.toString();
            }
        });
        $gameContractInstance.nBugBonus(function (err, coin) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.input = coin.toString();
                _this.data.price = parseInt(coin.toString()) / 10000 + " CBE";
            }
        });
        // 获取CanWithdraw
        $myAddress && this.getCanWithdraw();
        //生成小人
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, roll) {
            if (err3) {
                console.log(err3);
            }
            else {
                var len = roll.length;
                _this.currentMen = len;
                if (roll[0]) {
                    _this.myLastNum = roll[0].toString();
                }
                for (var i = 0; i < len; i++) {
                    setTimeout(function () {
                        $Content.container.addOneMiner();
                    }, i * 400);
                }
            }
        });
        Game.playAnimation(this.jitter, true);
        /**
         * show引导框
         */
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, function (err, id) {
            if (err) {
                console.log(err);
            }
            else {
                var hasGuide = localStorage.getItem("hasGuide");
                $Guide.guideHome.visible = id.toString() == "0" && hasGuide != "hadGuide";
                localStorage.setItem("hasGuide", "hadGuide");
            }
        });
    };
    /**
     * 提取
     */
    Game.prototype.withdrawFun = function () {
        if ($myAddress) {
            if (this.data.canWithDraw == "0") {
                $alert('可提金额为0');
                return;
            }
            var data = $gameContractInstance.withDraw.getData();
            var parameters = {
                from: $myAddress,
                to: $contract,
                gasPrice: 30000000000,
                gasLimit: 2000000,
                data: data,
                value: '0',
                chainId: 99,
                via: '',
                shardingFlag: 0,
            };
            $tp.pushMoacTransaction(parameters).then(function (response) {
                if (!response.result) {
                    alert('交易发送失败！' + JSON.stringify(response));
                }
                else {
                    $alert('提取交易发送成功，请等待交易完成！'); // 链上的失败消息也会弹出来
                }
            });
        }
        else {
            notSignInMetamask();
        }
    };
    // house click
    Game.prototype.trainGo = function () {
        $Content.container.trainRun();
        // $Content.container.removeOneMiner();
        // $Content.container.clearAllMiner();
    };
    // 判断额度
    Game.prototype.chargeLimit = function () {
        return new Promise(function (resolve, reject) {
            if (!$myAddress) {
                notSignInMetamask();
                reject("请在tp钱包中打开游戏");
                return;
            }
            var from = $myAddress;
            var to = $gameContractInstance.address;
            $tokenContractInstance.allowance(from, to, function (err, data) {
                if (err) {
                    $loadingDisplay(false);
                    reject(err);
                }
                else {
                    resolve(data.toString());
                }
            });
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
                    $loadingDisplay(false);
                }
                else {
                    resolve(token.toString());
                }
            });
        });
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
                _this.data.approveNum = data.toString();
            }
        });
    };
    /**
     * 买入
     */
    Game.prototype.buyKeyFun = function () {
        var _this = this;
        if (parseInt(this.data.residueTimes) < 1) {
            $alert("购买次数达到上限!请等待出局后再购买!");
            return;
        }
        $loadingDisplay(true);
        this.chargeLimit().then(function (has) {
            // 下注控制
            getMyKeyProp().then(function (data) {
                var input = parseInt(data[3]);
                $gameContractInstance.nBugBonus(function (err, coin) {
                    if (err) {
                        $alert(err);
                    }
                    else {
                        if (input >= coin) {
                            _this.data.input = "0";
                        }
                        else {
                            _this.data.input = coin;
                        }
                        if (Number(has) > 0 && parseInt(has + "") >= parseInt(_this.data.input)) {
                            _this.chargeBalance().then(function (coin) {
                                if (Number(coin) < parseInt(_this.data.input)) {
                                    $alert("\u60A8\u7684CBE\u4F59\u984D\u70BA" + $toFixedDecimal(coin) + ",\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u672C\u6B21\u6295\u5165");
                                    return;
                                }
                                _this.buyEntrance();
                            });
                        }
                        else {
                            // 弹窗去充值额度
                            $loadingDisplay(false);
                            if (confirm("您的授权额度为" + $toFixedDecimal(has) + ",将为您进行授权")) {
                                _this.approveFun(function () {
                                    $loadingDisplay(true);
                                    var timer = setInterval(function () {
                                        if ($Content.game.data.approveNum == "0") {
                                            $Content.game.getMyApprove();
                                        }
                                        else {
                                            $loadingDisplay(false);
                                            clearInterval(timer);
                                            if (confirm("授权成功，将发起投注交易！")) {
                                                // $Content.game.buyEntrance();
                                                $Content.game.buyKeyFun();
                                            }
                                        }
                                    }, 1500);
                                });
                            }
                        }
                    }
                });
            });
        }, function (err) {
            $alert(err);
        });
    };
    Game.prototype.approveFun = function (f) {
        var approve = "10000000000";
        var data = $tokenContractInstance.approve.getData($gameContractInstance.address, approve);
        var parameters = {
            from: $myAddress,
            to: $tokenAddr,
            gasPrice: 30000000000,
            gasLimit: 2000000,
            data: data,
            value: '0',
            chainId: 99,
            via: '',
            shardingFlag: 0,
        };
        $tp.pushMoacTransaction(parameters).then(function (response) {
            if (!response.result) {
                $alert('交易发送失败！' + response.message);
            }
            else {
                if (f) {
                    f();
                }
            }
        });
    };
    // 下注入口
    Game.prototype.buyEntrance = function () {
        var _this = this;
        getIsBegin().then(function (bool) {
            if (!bool) {
                _this.chargeFirst();
            }
            else {
                setOverTime().then(function (time) {
                    // if (time > 86400) {
                    //     $alert($AlertMsg.readyTime);
                    //     return;
                    // }
                    _this.chargeFirst();
                });
            }
        });
    };
    /**
     * 判断是否是第一次购买
     */
    Game.prototype.chargeFirst = function () {
        var _this = this;
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        $gameContractInstance.pIDxAddr_($myAddress, function (err, id) {
            if (err) {
                $alert("pIDxAddr_===" + err);
            }
            else {
                var _referrer = "0x0000000000000000000000000000000000000000";
                if (id.toString() == "0" && !$chargeEquelAddr($beginAddr, $myAddress)) {
                    $loadingDisplay(false);
                    $Modal.bandCodeAlert.visible = true;
                }
                else {
                    _this.rollIn(_referrer);
                }
            }
        });
    };
    Game.prototype.rollIn = function (_referrer) {
        if ($myAddress == _referrer) {
            _referrer = "0x0000000000000000000000000000000000000000";
        }
        this.moacBuyFun(_referrer);
    };
    Game.prototype.moacBuyFun = function (_referrer) {
        try {
            // alert('this.data.input：' + this.data.input);
            // alert('_referrer：' + _referrer);
            $loadingDisplay(false);
            var data = $gameContractInstance.coinRollIn.getData(this.data.input, _referrer);
            var parameters = {
                from: $myAddress,
                to: $contract,
                gasPrice: 30000000000,
                gasLimit: 2000000,
                data: data,
                value: '0',
                chainId: 99,
                via: '',
                shardingFlag: 0,
            };
            $tp.pushMoacTransaction(parameters).then(function (response) {
                if (!response.result) {
                    alert('交易发送失败！' + response.message);
                }
                else {
                    $alert('交易发送成功，请等待交易完成！'); // 链上的失败消息也会弹出来
                    // alert('交易发送成功，请等待交易完成！' + JSON.stringify(response.data)); // 链上的失败消息也会弹出来
                }
            });
        }
        catch (e) {
            alert("catch+++:" + e);
        }
    };
    Game.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    // 统计弹窗
    Game.showStatModalFun = function () {
        $Modal.gameStatistics.getExtractList();
        $modalShowEvent($Modal.gameStatistics, 205);
    };
    // 邀请人弹窗
    Game.prototype.showInviteModalFun = function () {
        $myAddress && $gameContractInstance.playerIsRegi($myAddress, function (err, bool) {
            if (err) {
                alert(err);
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
                $Modal.register.getMyInviter();
                $modalShowEvent($Modal.register, 205);
            }
        });
        if (!$myAddress) {
            notSignInMetamask();
        }
    };
    // 幸运奖弹窗
    Game.showLuckyModalFun = function () {
        $Modal.gameLucky.getLuckyList();
        $modalShowEvent($Modal.gameLucky, 205);
    };
    // 最后大奖弹窗
    Game.showLastBigPrizeFun = function () {
        $Modal.finalBonus.getLastList();
        $modalShowEvent($Modal.finalBonus, 205);
    };
    // 语言弹窗
    Game.showLanguageModalFun = function () {
        $modalShowEvent($Modal.language, 205);
    };
    // 攻略弹窗
    Game.showFaqModalFun = function () {
        $modalShowEvent($Modal.gameHelp, 205);
    };
    // 打开信息面板弹窗
    Game.prototype.showDataModalFun = function () {
        this.dataPanel.visible = true;
        this.openBtn.visible = false;
        this.headBg.visible = false;
    };
    // 关闭信息面板弹窗
    Game.prototype.closeDataModalFun = function () {
        this.dataPanel.visible = false;
        $Guide.guideHome.visible = false;
        this.openBtn.visible = true;
        this.headBg.visible = true;
    };
    Game.prototype.getCanWithdraw = function () {
        var _this = this;
        $myAddress && $gameContractInstance.allowMoney($myAddress, function (err, coin) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.canWithDraw = $toFixedDecimal(coin);
            }
        });
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
