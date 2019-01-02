/**
 * Game module
 */
class Game extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameUI.exml";
    }

    /**
     * game data
     */
    public data = {
        totalInvest: "0",
        totalInvestUsd: "0",
        roundNum: "1",
        jackpot: "e0",
        jackpotUs: "0",
        timeRemaining: '00:00:00',
        choosedTeam: 2,  // 0=鲸whales , 1=熊bears , 2=蛇sneks , 3=牛bulls
        input: '1',  //输入框 代币数量
        exchangeRate: 0,   //汇率
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
    private langData: any = $ZHTW.game;

    private eventData = {
        begin: 0,
        end: 0,
    };
    private overTime = 0;//剩余时间秒数

    public jackPotLabel: eui.BitmapLabel;
    public readyTimeLabel: eui.Label;
    public langJackPot: eui.Image;
    public totalInvestLabel: eui.BitmapLabel;
    public totalAsset: eui.Image;
    public buyTip: eui.Label;
    public myEarningsPanal: eui.Group;
    public roundBonus: eui.Image;
    public roundBuy: eui.Image;
    public queueNum: eui.Image;
    public myAsset: eui.Image;
    public extractNum: eui.Image;
    public currentProf: eui.Image;
    public predictBonus: eui.Image;
    public profidImg: eui.Image;
    public keyImg: eui.Image;
    public marqueeBg: eui.Image;
    public marquee: eui.Group;
    public marqueeLabel: eui.Label;
    public roundZh: eui.Group;
    public roundNum: eui.BitmapLabel;
    public roundEn: eui.Group;
    public roundNum0: eui.BitmapLabel;
    public tips1: eui.Label;
    public alertModal: eui.Group;
    public alertBg: eui.Image;
    public statisticsBtn: eui.Image;
    public registerBtn: eui.Image;
    public languageBtn: eui.Image;
    public helpBtn: eui.Image;
    public extractBtn: eui.Group;
    public extractText: eui.Image;
    public showBuyModal: eui.Group;

    private alertBgBling: egret.tween.TweenGroup;
    private updateData: egret.Timer = new egret.Timer(1000, 0);
    private intervalIsStart = false;
    private myRound = "0"; // 我当前属于第几轮
    private roundError = false;
    private tempKeyNum = "0";

    protected childrenCreated(): void {
        super.childrenCreated();
        this.canBegin();
        /**buy key event */
        this.showBuyModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBuyModalFun, this);
        /**提取函数 */
        this.extractBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.extractFun, this);
        setOverTime().then((time) => {
            // time = time < 0 ? 0 : time;
            if (time < 5875) {
                time = 72000 + parseInt(time + "");
            }
            this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then((keys) => {
            this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
            this.totalPot = Number(Number(keys).toFixed(2)) + "";
        });
        $gameContractInstance.nCurrentGainId((err, id) => {
            if (err) {
                console.log(err)
            } else {
                this.data.totalInvest = id.toString();
                this.gainId = id.toString();
            }
        });
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        /**modals event */
        this.openModalsEvent();
    }

    private showBuyModalFun() {
        $Modal.buyKey.buyKeyFun();
        //*******************************************************************************************************************************
        // this.setUserData();
        // this.setRollInArray();
    }

    private extractFun() {
        // $Modal.extract.drawFun();
        //*******************************************************************************************************************************
        // this.getUserData();
        this.getOneData();
    }

    private rateUSD = 0;

    private canBegin() {
        return new Promise((resolve, reject) => {
            $gameContractInstance.isBegin((err, bool) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(bool);
                }
            });
        });
    }

    private getData() {
        if (!this.intervalIsStart) {
            getIsBegin().then((bool) => {
                if (bool) {
                    this.intervalStart();
                    this.intervalIsStart = true;
                } else {
                    this.overTime = 86400;
                    this.data.timeRemaining = timestampToMoment(this.overTime);
                }
            });
        } else {
            this.intervalStart();
        }
    }

    private gainId = "0";
    private totalPot = "0";

    private intervalStart() {
        this.overTime--;
        if (this.overTime % 3 == 0) {
            $Modal.gameStatistics.getTeamTotalPot();
            getEthXUSDrate().then((rate) => {
                this.rateUSD = parseFloat(rate + "");
            });
            $gameContractInstance.round((err, round) => {
                if (err) {
                    console.log("4545" + err);
                    this.updateData.stop();
                } else {
                    this.data.roundNum = round.toNumber();
                }
            });
            setOverTime().then((time) => {
                // time = time < 0 ? 0 : time;
                if (time < 5875) {
                    time = 72000 + parseInt(time + "");
                }
                this.overTime = parseInt(time + "");
                if (this.overTime > 86400) {
                    this.jackPotLabel.visible = false;
                    this.readyTimeLabel.visible = true;
                    this.overTime -= 86400;
                } else {
                    this.jackPotLabel.visible = true;
                    this.readyTimeLabel.visible = false;
                }
            });
            getTotalPot().then((keys) => {
                if (Number(keys) < Number(this.totalPot)) {
                    this.data.jackpot = "e" + this.totalPot;
                    //更新统计界面奖池金额
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(this.totalPot).toFixed(6) + "";
                    }
                } else {
                    this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
                    //更新统计界面奖池金额
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(keys + "").toFixed(6) + "";
                    }
                    this.totalPot = Number(Number(keys).toFixed(2)) + "";
                }
                // console.log("+++++++++++++",this.totalPot);
                let myRate = parseFloat(this.rateUSD + "");
                this.data.jackpotUs = parseFloat(Number(keys) * myRate + "").toFixed(4) + "";
            });

            /**当前分红序列 */
            $gameContractInstance.nCurrentGainId((err, id) => {
                if (err) {
                    console.log(err)
                } else {
                    if (parseInt(id.toString()) < parseInt(this.gainId)) {
                        this.data.totalInvest = this.gainId;
                        $Modal.gameStatistics.data.stats.totalInvested = this.gainId;
                    } else {
                        this.data.totalInvest = id.toString();
                        $Modal.gameStatistics.data.stats.totalInvested = id.toString();
                        this.gainId = id.toString();
                    }
                    // console.log("-------------",this.gainId);
                    $gameContractInstance.getRollInArrayLen((err2, len) => {
                        if (err2) {
                            console.log(err2);
                        } else {
                            if (len > 0) {
                                $gameContractInstance.getRollInArray(0, (err1, n) => {
                                    if (err1) {
                                        console.log(err1);
                                    } else {
                                        // $Modal.gameStatistics.data.stats.extractNum = n[0].toString();
                                        this.data.remainingBet = 30 - parseInt(n[1].toString()) + "";
                                        // this.data.moduleData.extractNum = parseFloat(n[0].toString()) + "";
                                    }
                                })
                            } else {
                                this.data.remainingBet = '30';
                                // this.data.moduleData.extractNum = "0";
                            }
                        }
                    });
                }
            });

            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then((data) => {
                if (!data[0]) {
                    return
                }
                this.data.moduleData.unionBonus = parseFloat(web3js.fromWei(data[6].toString())).toFixed(2);
                this.data.moduleData.allTime = data[5].toString();
                this.data.moduleData.allBuy = parseFloat(web3js.fromWei(data[1].toString())).toFixed(2);
                $Modal.gameStatistics.data.stats.extractCoin1 = this.data.moduleData.unionBonus;
                this.data.moduleData.myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 100) / 100 + "";
                if (parseFloat(this.data.moduleData.myBonus) + parseFloat(this.data.moduleData.unionBonus) >= 3) {
                    $Modal.buyKey.data.input = "0";
                } else {
                    $Modal.buyKey.data.input = "3";
                }
                if (data[2] > 0) {
                    $gameContractInstance.getRollInArrayLen((err2, len) => {
                        if (err2) {
                            console.log(err2);
                        } else {
                            if (len == 0) {
                                setTimeout(() => {
                                    this.alertModal.visible = true;
                                    this.playAnimation(this.alertBgBling, true);
                                }, 4000)
                            } else {
                                this.alertBgBling.stop();
                                this.alertModal.visible = false;
                            }
                        }
                    });
                } else {
                    this.alertBgBling.stop();
                    this.alertModal.visible = false;
                }

                getMyEtraProp().then((etra) => {
                    this.data.moduleData.teamProf = parseFloat(web3js.fromWei(etra[5].toString())).toFixed(2);
                    $Modal.gameStatistics.data.stats.rcmdid = etra[1].toString();
                    this.data.moduleData.rcmdid = etra[1].toString();
                })
            }, (err) => {
                console.log(err)
            });
        }

        this.data.timeRemaining = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.timeRemaining;
        }
    }

    /**
     * open modal events
     */
    private openModalsEvent() {
        this.statisticsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.gameStatistics, 545);
            $Modal.gameStatistics.getData();
            $Modal.gameStatistics.updateData.start();
        }, this);

        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.gameHelp, 662);
        }, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if ($myAddress) {
                $gameContractInstance.playerIsRegi($myAddress, (err, bool) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (bool) {
                            this.modalShowEvent($Modal.refereeInfo, 662);
                            $Modal.refereeInfo.getUrl();
                            $Modal.refereeInfo.updateData.start();
                        } else {
                            this.modalShowEvent($Modal.register, 662);
                        }
                    }
                });
            } else {
                this.modalShowEvent($Modal.register, 662);
            }
        }, this);

        this.languageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.language, 662);
        }, this);
    }

    private modalShowEvent(modal, y) {
        modal.visible = true;
        let group = modal.$children[1];
        let tw = egret.Tween.get(group);
        tw.to({y: y}, 200);
        tw = null;
    }

    /*
        动画循环播放函数
   */
    private playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
        if (isLoop) {
            for (let key in target.items) {
                target.items[key].props = {loop: true};
            }
        }
        target.play();
    }

    /*******************************************/
    private pid = 701;
    private obj = {};
    private dayu10 = [];

    private getUserData() {
        $gameContractInstance.playerxID_(this.pid, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let addr = data[0];
                let allBuy = parseInt(data[2].toString());
                let turnBuy = parseInt(data[3].toString());
                let turnBonus = parseInt(data[4].toString());
                let currentBonus = parseInt(data[5].toString());
                let reinvest = parseInt(data[6].toString());
                let unionBonus = parseInt(data[7].toString());
                let currentInterest = parseInt(data[8].toString());
                console.log(this.pid, data);
                $gameContractInstance.playerEtraxAddr_(addr, (err1, etra) => {
                    if (err1) {
                        console.log(err1);
                    } else {
                        let performance = parseInt(etra[0].toString());
                        let level = parseInt(etra[1].toString());
                        let currentRound = parseInt(etra[2].toString());
                        let allEarning = parseInt(etra[3].toString());
                        let lostTimes = parseInt(etra[4].toString());
                        let currentPerformance = parseInt(etra[5].toString());
                        let earningPrincipal = parseInt(etra[6].toString());
                        $gameContractInstance.returnAgent(addr, (err2, agent) => {
                            if (err2) {
                                console.log(err2);
                            } else {
                                let agents = agent.map((item, i) => {
                                    return parseInt(item.toString())
                                });
                                $gameContractInstance.getRollInArrayDetail(addr, (err3, array) => {
                                    if (err2) {
                                        console.log(err2);
                                    } else {
                                        let arr = array.map((item, i) => {
                                            return parseInt(item.toString())
                                        });
                                        this.obj[addr] = {};
                                        this.obj[addr]._addr = addr;
                                        this.obj[addr].allBuy = allBuy;
                                        this.obj[addr].turnBuy = turnBuy;
                                        this.obj[addr].turnBonus = turnBonus;
                                        this.obj[addr].currentBonus = currentBonus;
                                        this.obj[addr].reinvest = reinvest;
                                        this.obj[addr].unionBonus = unionBonus;
                                        this.obj[addr].currentInterest = currentInterest;
                                        this.obj[addr].performance = performance;
                                        this.obj[addr].level = level;
                                        this.obj[addr].currentRound = currentRound;
                                        this.obj[addr].allEarning = allEarning;
                                        this.obj[addr].lostTimes = lostTimes;
                                        this.obj[addr].currentPerformance = currentPerformance;
                                        this.obj[addr].earningPrincipal = earningPrincipal;
                                        let leader = 0;
                                        for (let i = 0; i < agents.length; i++) {
                                            if (leader != 0) {
                                                break;
                                            }
                                            switch (agents[i]) {
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
                                        this.obj[addr].leader = leader;
                                        this.obj[addr].agents = agents;
                                        if (arr.length > 10) {
                                            this.dayu10.push(this.pid);
                                            this.obj[addr].arr = [];
                                        } else {
                                            this.obj[addr].arr = arr;
                                        }
                                        this.pid++;
                                        if (this.pid <= 753) {
                                            this.getUserData()
                                        } else {
                                            console.log("大于10", this.dayu10);
                                            console.log("over");
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    }


    public oldCon = "0x4848ba19a70dfab56c8b5471f83349cbf5f7219a";
    public newCon = "0x75608E66eA465aDD636e1A86150aFa6DaAdC52eD"; //正式
    public timeNum = 0;

    private setUserData() {
        let emptyAddr = "0x0000000000000000000000000000000000000000";
        $gameContractInstance = $gameContract.at(this.newCon);
        let time = 0;
        let person = 10;
        let thisTime = this.timeNum + person;
        let addrArr = [], agents = [], _other = [], rollInArray = [];
        let i = time;
        for (let addr in this.obj) {
            if (i < thisTime && thisTime - i <= person && addr != emptyAddr) {
                addrArr.push(addr);
                agents = agents.concat(this.obj[addr].agents);
                let otherData = [this.obj[addr].allBuy, this.obj[addr].turnBuy, this.obj[addr].turnBonus, this.obj[addr].currentBonus, this.obj[addr].reinvest,
                    this.obj[addr].unionBonus, this.obj[addr].currentInterest,
                    this.obj[addr].performance, this.obj[addr].level, this.obj[addr].currentRound, this.obj[addr].allEarning,
                    this.obj[addr].lostTimes, this.obj[addr].currentPerformance, this.obj[addr].earningPrincipal, this.obj[addr].leader];
                _other = _other.concat(otherData);
                for (let j = 0; j < 10; j++) {
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
            for (let j = time + this.timeNum; j < thisTime; j++) {
                addrArr.push(emptyAddr);
                agents = agents.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                _other = _other.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                rollInArray = rollInArray.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            }
        }
        console.log(addrArr, agents, _other, rollInArray);
        $gameContractInstance.fixedData(addrArr, agents, _other, rollInArray, {gasPrice: 10000000000}, (err, data) => {
            console.log(err, data);
        });
        this.timeNum += person;
    }

    private setRollInArray() {
        let id = 749
        ;
        let arr = [8208, 8209, 8210, 8211, 8212, 8213, 8214, 8215, 8216, 8217, 8218, 8219, 8220, 8222, 8223];
        console.log("arr.length:", arr.length);
        let len = arr.length;
        if (len < 30) {
            for (let i = 0; i < 30 - len; i++) {
                arr.unshift(0);
            }
        }
        console.log(id, arr);
        $gameContractInstance.setRollInArray(id, arr, {gasPrice: 10000000000}, (err, data) => {
            console.log(err, data);
        });
    }

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
    private thisId = 444;

    private getOneData() {
        $gameContractInstance.playerxID_(this.thisId, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let jia = parseInt(web3js.toWei("0.31", "ether"));
                let addr = data[0];
                let allBuy = parseInt(data[1].toString()) + jia;   // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                let turnBuy = parseInt(data[2].toString());
                let turnBonus = parseInt(data[3].toString()) + jia;// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                let currentBonus = parseInt(data[4].toString());
                let reinvest = parseInt(data[5].toString());
                let unionBonus = parseInt(data[6].toString());
                let currentInterest = parseInt(data[7].toString());
                console.log(this.thisId);
                $gameContractInstance.playerEtraxAddr_(this.thisId, (err1, etra) => {
                    if (err1) {
                        console.log(err1);
                    } else {
                        let performance = parseInt(etra[0].toString());
                        let level = parseInt(etra[1].toString());
                        let allEarning = parseInt(etra[3].toString());
                        let lostTimes = parseInt(etra[4].toString());
                        let currentPerformance = parseInt(etra[5].toString());
                        let earningPrincipal = parseInt(etra[6].toString());
                        $gameContractInstance.returnAgent(addr, (err2, agent) => {
                            if (err2) {
                                console.log(err2);
                            } else {
                                let agents = agent.map((item, i) => {
                                    return parseInt(item.toString())
                                });
                                let addrArr = addr;
                                let agentArr = agents;
                                let _other = [allBuy, turnBuy, turnBonus, currentBonus, reinvest, unionBonus,
                                    currentInterest, performance, level, 1, allEarning, lostTimes,
                                    currentPerformance, earningPrincipal];
                                console.log(addrArr, agentArr, _other);
                                $gameContractInstance.updatePlayer(addrArr, agentArr, _other, {gasPrice: 9000000000}, (err, data) => {
                                    console.log(err, data);
                                });
                            }
                        })
                    }
                })
            }
        });
    }
}