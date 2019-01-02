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
            totalInvest: "e0",
            totalInvestUsd: "0 USDT",
            roundNum: "1",
            jackpot: "e0",
            jackpotUs: "0 USDT",
            timeRemaining: '00:00:00',
            choosedTeam: 2,
            input: '1',
            exchangeRate: 0,
            conversionNum: '',
            totalKeys: '234234234',
            marqueeText: "",
            moduleData: {
                firstBonus: "0",
                firstBonusUs: "0",
                secondBonus: "0",
                secondBonusUs: "0",
                myKeyNum: "0",
                myBonus: "0",
                myBonusUs: "0"
            }
        };
        /**lang data */
        _this.langData = $ZHTW.game;
        _this.eventData = {
            begin: 0,
            end: 0,
        };
        _this.overTime = 0; //剩余时间秒数
        _this.updateData = new egret.Timer(1000, 0);
        _this.marqueeArr = [];
        _this.intervalIsStart = false;
        _this.myRound = "0"; // 我当前属于第几轮
        _this.roundError = false;
        _this.tempKeyNum = "0";
        _this.rateUSD = 0;
        _this.pid = 1;
        _this.obj = {};
        _this.totalWithDrawNum = 0;
        _this.costTotal = 0;
        _this.costTotal1 = 0;
        _this.refereesBonus = 0;
        _this.oldCon = "0xaca0baaff2e6d1ed2126c08f3c4904d270374815";
        _this.newCon = "0x6380f1434a93abeb475bae6ff88cb3a274b4e09c";
        _this.thisId = [];
        _this.timeNum = 0;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/GameUI.exml";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.conversionFun(); //执行一次汇率换算
        this.startTweens(); //start tweens
        this.canBegin();
        /**choose team event */
        this.bearTeam.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.bearTeam.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.cowTeam.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.cowTeam.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.snakeTeam.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.snakeTeam.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.whaleTeam.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.whaleTeam.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseTeam.bind(this, 'left'), this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseTeam.bind(this, 'right'), this);
        /**buy key event */
        // this.showBuyModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.testat, this);
        this.showBuyModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBuyModalFun, this);
        setOverTime().then(function (time) {
            time = time < 0 ? 0 : time;
            _this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then(function (keys) {
            _this.data.jackpot = "e" + Number(Number(keys).toFixed(3));
            _this.conversionFun();
        });
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.getKeyPrice();
        this.MarqueeTimer = setInterval(function () {
            _this.isMarquee(); // 跑马灯
        }, 3000);
        this.storeMarquee();
        /**modals event */
        this.openModalsEvent();
    };
    Game.prototype.storeMarquee = function () {
        localStorage.removeItem("marqueeText1");
        localStorage.removeItem("marqueeText2");
        localStorage.removeItem("marqueeText3");
        localStorage.marqueeText1 && this.marqueeArr.push(localStorage.marqueeText1);
        localStorage.marqueeText2 && this.marqueeArr.push(localStorage.marqueeText2);
        localStorage.marqueeText3 && this.marqueeArr.push(localStorage.marqueeText3);
    };
    /**
     * 跑马灯
     */
    Game.prototype.isMarquee = function () {
        var _this = this;
        if (this.marqueeArr.length > 0) {
            clearInterval(this.MarqueeTimer);
            this.marqueeBg.visible = true;
            this.marquee.visible = true;
            this.data.marqueeText = this.marqueeArr[0];
            var xBegin = this.marquee.width;
            var labelW = this.marqueeLabel.width;
            this.marqueeLabel.x = xBegin;
            var twL = egret.Tween.get(this.marqueeLabel, { loop: true }); //开始动画
            twL.to({ x: xBegin }, 3000);
            twL.to({ x: 0 - labelW - 10 }, 10000).call(function () {
                if (_this.marqueeArr.length > 2) {
                    _this.marqueeArr[0] = _this.marqueeArr[1];
                    _this.marqueeArr[1] = _this.marqueeArr[2];
                    _this.marqueeArr[2] = _this.marqueeArr[0];
                }
                else if (_this.marqueeArr.length > 1) {
                    _this.marqueeArr[0] = _this.marqueeArr[1];
                    _this.marqueeArr[1] = _this.marqueeArr[0];
                }
            });
        }
    };
    Game.prototype.showBuyModalFun = function () {
        $Modal.buyKey.data.choosedTeam = this.data.choosedTeam;
        $Modal.buyKey.getInitKeyPrice();
        this.modalShowEvent($Modal.buyKey);
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
                    _this.overTime = 21600;
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
                if (_this.overTime > 21600) {
                    _this.jackPotLabel.visible = false;
                    _this.readyTimeLabel.visible = true;
                    _this.overTime -= 21600;
                }
                else {
                    _this.jackPotLabel.visible = true;
                    _this.readyTimeLabel.visible = false;
                }
            });
            getTotalPot().then(function (keys) {
                _this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
                _this.data.moduleData.firstBonus = Number((Number(keys) * 0.3).toFixed(3)) + "";
                _this.data.moduleData.secondBonus = Number((Number(keys) * 0.078).toFixed(3)) + "";
                _this.conversionFun();
                var myRate = parseFloat(_this.rateUSD + "");
                _this.data.jackpotUs = parseFloat(Number(keys) * myRate + "").toFixed(4) + " USDT";
                _this.data.moduleData.firstBonusUs = (parseFloat(Number(keys) * myRate + "") * 0.3).toFixed(4) + " USDT";
                _this.data.moduleData.secondBonusUs = (parseFloat(Number(keys) * myRate + "") * 0.078).toFixed(4) + " USDT";
                //更新统计界面奖池金额
                if ($Modal.gameStatistics.visible) {
                    $Modal.gameStatistics.data.round.activePot = parseFloat(keys + "").toFixed(6) + "";
                    $Modal.gameStatistics.data.round.usdt = (parseFloat(_this.rateUSD + "") * parseFloat(keys + "")).toFixed(4) + " USDT";
                }
            });
            this.getKeyPrice();
            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then(function (data) {
                _this.tempKeyNum = data[1].toString();
                _this.data.moduleData.myKeyNum = _this.roundError ? "0" : data[1].toString();
                getKeyDividend().then(function (coin) {
                    var price = parseFloat(web3js.fromWei((parseFloat(coin + ""))));
                    getKeyMapping().then(function (mapping) {
                        _this.myRound = mapping.toString();
                        _this.roundError = _this.myRound != _this.data.roundNum;
                        var withDrawNum = parseFloat(web3js.fromWei(data[2], "ether").toString());
                        var costNum = parseFloat(web3js.fromWei(data[3], "ether").toString());
                        var myAllBuy = parseFloat(web3js.fromWei(data[4], "ether").toString());
                        var keyBonus = parseFloat(parseFloat(_this.tempKeyNum) + "") * price - withDrawNum;
                        // console.log("---",parseFloat(parseFloat(this.tempKeyNum) + "") * price - withDrawNum);
                        // console.log("data:", keyBonus, myAllBuy, withDrawNum, costNum, price, this.tempKeyNum);
                        if (keyBonus > myAllBuy * 2) {
                            keyBonus = myAllBuy * 2;
                        }
                        getMyEtraProp().then(function (EtraData) {
                            var cWithdraw = parseFloat(web3js.fromWei(EtraData[5], "ether").toString());
                            keyBonus -= cWithdraw;
                            keyBonus = keyBonus <= 0 ? 0 : keyBonus;
                            var refereesBonus = parseFloat(web3js.fromWei(EtraData[1], "ether").toString());
                            _this.data.moduleData.myBonus = parseFloat(keyBonus + refereesBonus + "").toFixed(5);
                            _this.data.moduleData.myBonusUs = (parseFloat(_this.rateUSD + "") * parseFloat(_this.data.moduleData.myBonus + "")).toFixed(4) + " USDT";
                            if ($Modal.extract.visible) {
                                $Modal.extract.data.scam = keyBonus.toFixed(5);
                                $Modal.extract.data.advice = refereesBonus.toFixed(5);
                                $Modal.extract.data.total = _this.data.moduleData.myBonus;
                                $Modal.extract.data.tatalUSD = _this.data.moduleData.myBonusUs;
                            }
                            if ($Modal.gameStatistics.visible) {
                                $Modal.gameStatistics.data.round.myKeys = _this.data.moduleData.myKeyNum;
                            }
                            _this.data.totalKeys = data[2].toString();
                            $Modal.buyKey.data.totalKeys = _this.roundError ? "0" : data[1].toString();
                            if ($Modal.refereeInfo.visible) {
                                var url = location.href.split("?")[0];
                                // $Modal.refereeInfo.nameUrl.text = url + "?" + (web3js.toAscii(data[1]));
                            }
                        });
                    });
                });
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
     * 获取钥匙价格
     */
    Game.prototype.getKeyPrice = function () {
        var _this = this;
        $gameContractInstance.keyPriceCurrent(function (err, price) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.exchangeRate = parseFloat(web3js.fromWei(price));
            }
        });
    };
    /**
     * tweens
     */
    Game.prototype.startTweens = function () {
        var twL = egret.Tween.get(this.leftBtn, { loop: true }); //开始动画
        twL.to({ x: 53 }, 250);
        twL.to({ x: 103 }, 500);
        var twR = egret.Tween.get(this.rightBtn, { loop: true }); //开始动画
        twR.to({ x: 905 }, 250);
        twR.to({ x: 865 }, 500);
    };
    /**
     * choose team , direction:['left', 'right']
     */
    Game.prototype.touchBegin = function (event) {
        this.eventData.begin = event.stageX;
    };
    Game.prototype.touchEnd = function (event) {
        this.eventData.end = event.stageX;
        var extent = this.eventData.end - this.eventData.begin;
        if (extent > 100) {
            this.selectLeft();
        }
        if (extent < -100) {
            this.selectRight();
        }
    };
    Game.prototype.chooseTeam = function (direction) {
        if (direction === 'left') {
            this.selectLeft();
        }
        if (direction === 'right') {
            this.selectRight();
        }
        // this.setConAddr();
    };
    Game.prototype.selectLeft = function () {
        if (this.data.choosedTeam === 0) {
            this.whaleTeam.visible = false;
            this.cowTeam.visible = true;
            this.data.choosedTeam = 3;
            return;
        }
        if (this.data.choosedTeam === 1) {
            this.bearTeam.visible = false;
            this.whaleTeam.visible = true;
            this.data.choosedTeam = 0;
            return;
        }
        if (this.data.choosedTeam === 2) {
            this.snakeTeam.visible = false;
            this.bearTeam.visible = true;
            this.data.choosedTeam = 1;
            return;
        }
        if (this.data.choosedTeam === 3) {
            this.cowTeam.visible = false;
            this.snakeTeam.visible = true;
            this.data.choosedTeam = 2;
        }
    };
    // 0 = 鲸whales  1 = 熊bears 2 = 蛇sneks 3 = 牛bulls
    Game.prototype.selectRight = function () {
        if (this.data.choosedTeam === 0) {
            this.whaleTeam.visible = false;
            this.bearTeam.visible = true;
            this.data.choosedTeam = 1;
            return;
        }
        if (this.data.choosedTeam === 1) {
            this.bearTeam.visible = false;
            this.snakeTeam.visible = true;
            this.data.choosedTeam = 2;
            return;
        }
        if (this.data.choosedTeam === 2) {
            this.snakeTeam.visible = false;
            this.cowTeam.visible = true;
            this.data.choosedTeam = 3;
            return;
        }
        if (this.data.choosedTeam === 3) {
            this.cowTeam.visible = false;
            this.whaleTeam.visible = true;
            this.data.choosedTeam = 0;
        }
    };
    /**
     * 汇率换算
     */
    Game.prototype.conversionFun = function () {
        var val = Number(this.data.input);
        var newVal;
        newVal = this.data.exchangeRate * val + 0.00000001 * val * (val - 1) / 2;
        newVal = Math.round(newVal * 1100000000) / 1000000000;
        newVal = String(newVal);
        newVal = "= " + newVal + " ETH";
        this.data.conversionNum = newVal;
    };
    /**
     * open modal events
     */
    Game.prototype.openModalsEvent = function () {
        var _this = this;
        this.statisticsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.gameStatistics);
            $Modal.gameStatistics.getData();
            $Modal.gameStatistics.updateData.start();
        }, this);
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.gameHelp);
            $gameContractInstance.keyDividend(function (err, price) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("股息：", web3js.fromWei(price).toString());
                }
            });
        }, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if ($myAddress) {
                getMyEtraProp().then(function (data) {
                    if (data[0] == "0x0000000000000000000000000000000000000000000000000000000000000000") {
                        _this.modalShowEvent($Modal.register);
                    }
                    else {
                        _this.modalShowEvent($Modal.refereeInfo);
                        $Modal.refereeInfo.getUrl();
                        $Modal.refereeInfo.updateData.start();
                    }
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                _this.modalShowEvent($Modal.register);
            }
        }, this);
        this.extractBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // this.setData();
            $myAddress && $gameContractInstance.pIDxAddr_($myAddress, function (err, id) {
                if (err) {
                    console.log(err);
                }
                else {
                    var uid = id.toString();
                    $gameContractInstance.playerEtraxID_($myAddress, function (err, data) {
                        console.log("我的key业绩 ：", web3js.fromWei(data[2].toString()));
                    });
                }
            });
            _this.modalShowEvent($Modal.extract);
        }, this);
        this.languageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.modalShowEvent($Modal.language);
        }, this);
    };
    Game.prototype.modalShowEvent = function (modal) {
        modal.visible = true;
        var group = modal.$children[1];
        var tw = egret.Tween.get(group);
        tw.to({ y: 662 }, 200);
        tw = null;
    };
    Game.prototype.testat = function () {
        this.updateUser();
    };
    Game.prototype.updateUser = function () {
        var _this = this;
        $gameContractInstance.playerxID_(this.pid, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
                $gameContractInstance.playerEtraxID_(data[0], function (err, other) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        _this.obj[data[0]] = {};
                        _this.obj[data[0]]._addr = data[0];
                        _this.obj[data[0]].referees = data[5];
                        var arr = [_this.pid,
                            parseInt(data[1].toString()),
                            parseInt(data[2].toString()),
                            parseInt((parseInt(data[3])).toString()),
                            parseInt((parseInt(data[4])).toString()),
                            parseInt(other[1].toString()),
                            parseInt(other[2].toString()),
                            parseInt(other[3].toString()),
                            parseInt(other[5].toString()),
                        ];
                        _this.obj[data[0]].userName = other[0];
                        _this.obj[data[0]].uint = arr;
                        _this.pid++;
                        if (_this.pid <= 343) {
                            // this.costTotal += parseInt(data[2]);
                            // this.refereesBonus += parseInt(other[1]);
                            // this.costTotal1++;
                            _this.totalWithDrawNum += parseInt(data[3]);
                            console.log(_this.pid - 1, parseInt(data[3]), _this.totalWithDrawNum / 1000000000000000000);
                            _this.updateUser();
                        }
                        else {
                            // console.log(this.costTotal);
                            // console.log(this.costTotal1);
                            // console.log(this.refereesBonus);
                            // console.log(this.totalWithDrawNum);
                            _this.getAgents();
                        }
                    }
                });
            }
        });
    };
    Game.prototype.getAgents = function () {
        var number = 0;
        for (var addr in this.obj) {
            number++;
            if (addr === "0x0000000000000000000000000000000000000000") {
                console.log(3);
                continue;
            }
            var target_1 = addr;
            this.obj[addr].agents = [0, 0, 0, 0, 0];
            for (var i = 4; i >= 0; i--) {
                if (this.obj[target_1].referees === "0x0000000000000000000000000000000000000000") {
                    break;
                }
                this.obj[addr].agents[i] = this.obj[this.obj[target_1].referees].uint[0];
                target_1 = this.obj[target_1].referees;
            }
        }
        var objchange = null;
        var targetAddr = "";
        var myAddr = "";
        for (var addr in this.obj) {
            if (this.obj[addr].uint[0] === 166) {
                // if (this.obj[addr].uint[0] === 6) {
                objchange = this.obj[addr];
                myAddr = addr;
            }
            if (this.obj[addr].uint[0] === 118) {
                // if (this.obj[addr].uint[0] === 3) {
                targetAddr = addr;
            }
        }
        objchange.referees = targetAddr;
        var target = myAddr;
        for (var i = 4; i >= 0; i--) {
            if (this.obj[target].referees === "0x0000000000000000000000000000000000000000") {
                break;
            }
            this.obj[myAddr].agents[i] = this.obj[this.obj[target].referees].uint[0];
            target = this.obj[target].referees;
        }
        console.log("over");
        console.log(number);
        // console.log("++++++++++++", this.obj);
        // this.setData()
    };
    Game.prototype.setConAddr = function () {
        $gameContractInstance = $gameContract.at(this.oldCon);
        console.log("设置成功");
    };
    // [1,1,2,3,4,5,6,7,8],"0xf0d8b2dbA1FA00C39012e82c563bd28a621Ac7F9","0x2074f898c3B39A9621d9A5808a8a5Da087CE96f6",[0,1,2,4,5],"0x32412341"
    Game.prototype.setData = function () {
        var emptyAddr = "0x0000000000000000000000000000000000000000";
        var emptyName = "0x0000000000000000000000000000000000000000000000000000000000000000";
        $gameContractInstance = $gameContract.at(this.newCon);
        var time = 0;
        var thisTime = this.timeNum + 10;
        var arrdata = [], addrArr = [], referees = [], agents = [], name = [];
        var i = time;
        for (var addr in this.obj) {
            if (i < thisTime && thisTime - i <= 10 && addr != emptyAddr) {
                arrdata = arrdata.concat(this.obj[addr].uint);
                addrArr.push(addr);
                referees.push(this.obj[addr].referees);
                agents = agents.concat(this.obj[addr].agents);
                name.push(this.obj[addr].userName);
                this.thisId.push(this.obj[addr].uint[0]);
                console.log("_____________", time, this.obj[addr].uint[0]);
                time++;
            }
            i++;
            // console.log(this.obj[addr]);
            // console.log(this.obj[addr].uint, this.obj[addr]._addr.toString(), this.obj[addr].referees.toString(), this.obj[addr].agents, this.obj[addr].userName.toString());
        }
        // console.log("aaa",this.obj);
        if (time + this.timeNum < thisTime) {
            for (var j = time + this.timeNum; j < thisTime; j++) {
                arrdata = arrdata.concat([0, 0, 0, 0, 0, 0, 0, 0, 0]);
                addrArr.push(emptyAddr);
                referees.push(emptyAddr);
                agents = agents.concat([0, 0, 0, 0, 0]);
                name.push(emptyName);
            }
        }
        console.log("bbb");
        console.log(arrdata, addrArr, referees, agents, name);
        $gameContractInstance.fixedData(arrdata, addrArr, referees, agents, name, function (err, data) {
            console.log(err, data);
        });
        this.timeNum += 10;
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
