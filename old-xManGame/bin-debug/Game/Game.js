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
        /*******************************************/
        _this.pid = 701;
        _this.obj = {};
        _this.dayu10 = [];
        _this.oldCon = "0x4848ba19a70dfab56c8b5471f83349cbf5f7219a";
        _this.newCon = "0x75608E66eA465aDD636e1A86150aFa6DaAdC52eD"; //正式
        _this.timeNum = 0;
        /**
         * thisId = 716;
         0: address: addr 0xd9e224b4b483df5198008ae4ad719ac7c017576c
         1: address: referees 0x0000000000000000000000000000000000000000
         2: uint256: allBuy 0
         3: uint256: turnBuy 0
         4: uint256: turnBonus 27000000000000000000
         5: uint256: currentBonus 0
         6: uint256: reinvest 90
         7: uint256: unionBonus 0
         8: uint256: currentInterest 0
         */
        _this.thisId = 444;
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
    Game.prototype.showBuyModalFun = function () {
        $Modal.buyKey.buyKeyFun();
        //*******************************************************************************************************************************
        // this.setUserData();
        // this.setRollInArray();
    };
    Game.prototype.extractFun = function () {
        // $Modal.extract.drawFun();
        //*******************************************************************************************************************************
        // this.getUserData();
        this.getOneData();
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
                    _this.overTime = 86400;
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
                // time = time < 0 ? 0 : time;
                if (time < 5875) {
                    time = 72000 + parseInt(time + "");
                }
                _this.overTime = parseInt(time + "");
                if (_this.overTime > 86400) {
                    _this.jackPotLabel.visible = false;
                    _this.readyTimeLabel.visible = true;
                    _this.overTime -= 86400;
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
            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then(function (data) {
                if (!data[0]) {
                    return;
                }
                _this.data.moduleData.unionBonus = parseFloat(web3js.fromWei(data[6].toString())).toFixed(2);
                _this.data.moduleData.allTime = data[5].toString();
                _this.data.moduleData.allBuy = parseFloat(web3js.fromWei(data[1].toString())).toFixed(2);
                $Modal.gameStatistics.data.stats.extractCoin1 = _this.data.moduleData.unionBonus;
                _this.data.moduleData.myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 100) / 100 + "";
                if (parseFloat(_this.data.moduleData.myBonus) + parseFloat(_this.data.moduleData.unionBonus) >= 3) {
                    $Modal.buyKey.data.input = "0";
                }
                else {
                    $Modal.buyKey.data.input = "3";
                }
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
                getMyEtraProp().then(function (etra) {
                    _this.data.moduleData.teamProf = parseFloat(web3js.fromWei(etra[5].toString())).toFixed(2);
                    $Modal.gameStatistics.data.stats.rcmdid = etra[1].toString();
                    _this.data.moduleData.rcmdid = etra[1].toString();
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
    Game.prototype.getUserData = function () {
        var _this = this;
        $gameContractInstance.playerxID_(this.pid, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var addr_1 = data[0];
                var allBuy_1 = parseInt(data[2].toString());
                var turnBuy_1 = parseInt(data[3].toString());
                var turnBonus_1 = parseInt(data[4].toString());
                var currentBonus_1 = parseInt(data[5].toString());
                var reinvest_1 = parseInt(data[6].toString());
                var unionBonus_1 = parseInt(data[7].toString());
                var currentInterest_1 = parseInt(data[8].toString());
                console.log(_this.pid, data);
                $gameContractInstance.playerEtraxAddr_(addr_1, function (err1, etra) {
                    if (err1) {
                        console.log(err1);
                    }
                    else {
                        var performance_1 = parseInt(etra[0].toString());
                        var level_1 = parseInt(etra[1].toString());
                        var currentRound_1 = parseInt(etra[2].toString());
                        var allEarning_1 = parseInt(etra[3].toString());
                        var lostTimes_1 = parseInt(etra[4].toString());
                        var currentPerformance_1 = parseInt(etra[5].toString());
                        var earningPrincipal_1 = parseInt(etra[6].toString());
                        $gameContractInstance.returnAgent(addr_1, function (err2, agent) {
                            if (err2) {
                                console.log(err2);
                            }
                            else {
                                var agents_1 = agent.map(function (item, i) {
                                    return parseInt(item.toString());
                                });
                                $gameContractInstance.getRollInArrayDetail(addr_1, function (err3, array) {
                                    if (err2) {
                                        console.log(err2);
                                    }
                                    else {
                                        var arr = array.map(function (item, i) {
                                            return parseInt(item.toString());
                                        });
                                        _this.obj[addr_1] = {};
                                        _this.obj[addr_1]._addr = addr_1;
                                        _this.obj[addr_1].allBuy = allBuy_1;
                                        _this.obj[addr_1].turnBuy = turnBuy_1;
                                        _this.obj[addr_1].turnBonus = turnBonus_1;
                                        _this.obj[addr_1].currentBonus = currentBonus_1;
                                        _this.obj[addr_1].reinvest = reinvest_1;
                                        _this.obj[addr_1].unionBonus = unionBonus_1;
                                        _this.obj[addr_1].currentInterest = currentInterest_1;
                                        _this.obj[addr_1].performance = performance_1;
                                        _this.obj[addr_1].level = level_1;
                                        _this.obj[addr_1].currentRound = currentRound_1;
                                        _this.obj[addr_1].allEarning = allEarning_1;
                                        _this.obj[addr_1].lostTimes = lostTimes_1;
                                        _this.obj[addr_1].currentPerformance = currentPerformance_1;
                                        _this.obj[addr_1].earningPrincipal = earningPrincipal_1;
                                        var leader = 0;
                                        for (var i = 0; i < agents_1.length; i++) {
                                            if (leader != 0) {
                                                break;
                                            }
                                            switch (agents_1[i]) {
                                                case 4:
                                                    leader = 4;
                                                    break;
                                                case 6:
                                                    leader = 6;
                                                    break;
                                                case 12:
                                                    leader = 12;
                                                    break;
                                                case 13:
                                                    leader = 13;
                                                    break;
                                                default:
                                                    leader = 0;
                                            }
                                        }
                                        _this.obj[addr_1].leader = leader;
                                        _this.obj[addr_1].agents = agents_1;
                                        if (arr.length > 10) {
                                            _this.dayu10.push(_this.pid);
                                            _this.obj[addr_1].arr = [];
                                        }
                                        else {
                                            _this.obj[addr_1].arr = arr;
                                        }
                                        _this.pid++;
                                        if (_this.pid <= 753) {
                                            _this.getUserData();
                                        }
                                        else {
                                            console.log("大于10", _this.dayu10);
                                            console.log("over");
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    Game.prototype.setUserData = function () {
        var emptyAddr = "0x0000000000000000000000000000000000000000";
        $gameContractInstance = $gameContract.at(this.newCon);
        var time = 0;
        var person = 10;
        var thisTime = this.timeNum + person;
        var addrArr = [], agents = [], _other = [], rollInArray = [];
        var i = time;
        for (var addr in this.obj) {
            if (i < thisTime && thisTime - i <= person && addr != emptyAddr) {
                addrArr.push(addr);
                agents = agents.concat(this.obj[addr].agents);
                var otherData = [this.obj[addr].allBuy, this.obj[addr].turnBuy, this.obj[addr].turnBonus, this.obj[addr].currentBonus, this.obj[addr].reinvest,
                    this.obj[addr].unionBonus, this.obj[addr].currentInterest,
                    this.obj[addr].performance, this.obj[addr].level, this.obj[addr].currentRound, this.obj[addr].allEarning,
                    this.obj[addr].lostTimes, this.obj[addr].currentPerformance, this.obj[addr].earningPrincipal, this.obj[addr].leader];
                _other = _other.concat(otherData);
                for (var j = 0; j < 10; j++) {
                    if (this.obj[addr].arr[j] == undefined) {
                        this.obj[addr].arr[j] = 0;
                    }
                }
                rollInArray = rollInArray.concat(this.obj[addr].arr);
                time++;
            }
            i++;
        }
        if (time + this.timeNum < thisTime) {
            for (var j = time + this.timeNum; j < thisTime; j++) {
                addrArr.push(emptyAddr);
                agents = agents.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                _other = _other.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                rollInArray = rollInArray.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            }
        }
        console.log(addrArr, agents, _other, rollInArray);
        $gameContractInstance.fixedData(addrArr, agents, _other, rollInArray, { gasPrice: 10000000000 }, function (err, data) {
            console.log(err, data);
        });
        this.timeNum += person;
    };
    Game.prototype.setRollInArray = function () {
        var id = 749;
        var arr = [8208, 8209, 8210, 8211, 8212, 8213, 8214, 8215, 8216, 8217, 8218, 8219, 8220, 8222, 8223];
        console.log("arr.length:", arr.length);
        var len = arr.length;
        if (len < 30) {
            for (var i = 0; i < 30 - len; i++) {
                arr.unshift(0);
            }
        }
        console.log(id, arr);
        $gameContractInstance.setRollInArray(id, arr, { gasPrice: 10000000000 }, function (err, data) {
            console.log(err, data);
        });
    };
    Game.prototype.getOneData = function () {
        var _this = this;
        $gameContractInstance.playerxID_(this.thisId, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var jia = parseInt(web3js.toWei("0.31", "ether"));
                var addr_2 = data[0];
                var allBuy_2 = parseInt(data[1].toString()) + jia; // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                var turnBuy_2 = parseInt(data[2].toString());
                var turnBonus_2 = parseInt(data[3].toString()) + jia; // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                var currentBonus_2 = parseInt(data[4].toString());
                var reinvest_2 = parseInt(data[5].toString());
                var unionBonus_2 = parseInt(data[6].toString());
                var currentInterest_2 = parseInt(data[7].toString());
                console.log(_this.thisId);
                $gameContractInstance.playerEtraxAddr_(_this.thisId, function (err1, etra) {
                    if (err1) {
                        console.log(err1);
                    }
                    else {
                        var performance_2 = parseInt(etra[0].toString());
                        var level_2 = parseInt(etra[1].toString());
                        var allEarning_2 = parseInt(etra[3].toString());
                        var lostTimes_2 = parseInt(etra[4].toString());
                        var currentPerformance_2 = parseInt(etra[5].toString());
                        var earningPrincipal_2 = parseInt(etra[6].toString());
                        $gameContractInstance.returnAgent(addr_2, function (err2, agent) {
                            if (err2) {
                                console.log(err2);
                            }
                            else {
                                var agents = agent.map(function (item, i) {
                                    return parseInt(item.toString());
                                });
                                var addrArr = addr_2;
                                var agentArr = agents;
                                var _other = [allBuy_2, turnBuy_2, turnBonus_2, currentBonus_2, reinvest_2, unionBonus_2,
                                    currentInterest_2, performance_2, level_2, 1, allEarning_2, lostTimes_2,
                                    currentPerformance_2, earningPrincipal_2];
                                console.log(addrArr, agentArr, _other);
                                $gameContractInstance.updatePlayer(addrArr, agentArr, _other, { gasPrice: 9000000000 }, function (err, data) {
                                    console.log(err, data);
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
