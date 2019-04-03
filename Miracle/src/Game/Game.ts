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
        roundNum: "",
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
    public alertText: eui.Image;
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
        // this.canBegin();
        this.updateRound();
        /**buy key event */
        this.alertModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopAlertBgBling, this);
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
                console.log(err);
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

    private stopAlertBgBling() {  
        if(this.alertModal.visible) {
            this.alertBgBling.stop();
            this.alertModal.visible = false;
        }
    }

    private showBuyModalFun() {
        $Modal.buyKey.buyKeyFun();
    }

    private extractFun() {
        $Modal.extract.drawFun();
    }

    private rateUSD = 0;

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
            }, err => {
                // console.log(err);
            });
        } else {
            this.intervalStart();
        }
    }

    private gainId = "0";
    private totalPot = "0";
    private oldRollId = "0";
    private oldAddr = $myAddress;

    private intervalStart() {

        this.overTime--;
        if (this.overTime % 1800 == 0) {
            this.updateRound();
            this.updateOverTime();
        }

        if (this.oldAddr !== $myAddress) {
            this.updateCurrentGainId();
            this.updatePlayerData();
            this.oldAddr = $myAddress;

        } else if (this.overTime % 60 == 0) {
            this.updateCurrentGainId();
            this.updatePlayerData();
        }

        if (this.overTime % 3 == 0) {

            $gameContractInstance.nRollIn((err, id) => {
                if (err) {
                    console.log(err);
                } else {
                    if (this.oldRollId != id.toString()) {
                        this.updateOverTime();
                        this.updateTotalPot();
                        this.updateCurrentGainId();
                        this.updatePlayerData();

                        setTimeout(() => {
                            if (!this.isUpdatePlayerData) {
                                this.updatePlayerData();
                            }
                        }, 3000);

                        this.oldRollId = id.toString();
                    }
                }
            });

            getEthXUSDrate().then((rate) => {
                this.rateUSD = parseFloat(rate + "");
            });
        }

        this.data.timeRemaining = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        // if ($Modal.gameStatistics.visible) {
        //     $Modal.gameStatistics.data.round.drainTime = this.data.timeRemaining;
        // }
    }

    /**
     * 更新轮次
     */
    private updateRound() {
        $gameContractInstance.round((err, round) => {
            if (err) {
                console.log("4545" + err);
            } else {
                this.data.roundNum = round.toNumber();
            }
        });
    }

    /**
     * 更新倒计时
     */
    private updateOverTime() {
        setOverTime().then((time) => {
            // time = time < 0 ? 0 : time;
            if (time < 5875) {
                time = 72000 + parseInt(time + "");
            }
            this.overTime = parseInt(time + "");
            if (this.overTime > 86400) {
                // this.jackPotLabel.visible = false;
                // this.readyTimeLabel.visible = true;
                // this.overTime -= 86400;
            } else {
                this.jackPotLabel.visible = true;
                this.readyTimeLabel.visible = false;
            }
        });
    }

    /**
     * 更新奖池
     */
    private updateTotalPot() {
        getTotalPot().then((keys) => {
            if (Number(keys) < Number(this.totalPot)) {
                this.data.jackpot = "e" + this.totalPot;
                //更新统计界面奖池金额
                // if ($Modal.gameStatistics.visible) {
                //     $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(this.totalPot).toFixed(6) + "";
                // }
            } else {
                this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
                //更新统计界面奖池金额
                // if ($Modal.gameStatistics.visible) {
                //     $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(keys + "").toFixed(6) + "";
                // }
                this.totalPot = Number(Number(keys).toFixed(2)) + "";
            }
            // console.log("+++++++++++++",this.totalPot);
            let myRate = parseFloat(this.rateUSD + "");
            this.data.jackpotUs = parseFloat(Number(keys) * myRate + "").toFixed(4) + "";
        }, err => {

        });
    }

    /**
     * 更新当前分红序列
     */
    private updateCurrentGainId() {
        $gameContractInstance.nCurrentGainId((err, id) => {
            if (err) {
                console.log(err);
            } else {
                if (parseInt(id.toString()) < parseInt(this.gainId)) {
                    this.data.totalInvest = this.gainId;

                    // $Modal.gameStatistics.data.stats.totalInvested = this.gainId;
                } else {
                    this.data.totalInvest = id.toString();
                    // $Modal.gameStatistics.data.stats.totalInvested = id.toString();
                    this.gainId = id.toString();
                }
                // console.log("-------------",this.gainId);
                $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err2, arr) => {
                    if (err2) {
                        console.log(err2);
                    } else {
                        let len = arr.length;
                        if (len > 0) {
                            $gameContractInstance.getRollInArray(0, (err1, n) => {
                                if (err1) {
                                    console.log(err1);
                                } else {
                                    // $Modal.gameStatistics.data.stats.extractNum = n[0].toString();
                                    this.data.remainingBet = 30 - parseInt(n[1].toString()) + "";
                                    // this.data.moduleData.extractNum = parseFloat(n[0].toString()) + "";
                                }
                            });
                        } else {
                            this.data.remainingBet = '30';
                            // this.data.moduleData.extractNum = "0";
                        }
                    }
                });
            }
        });
    }

    /**
     * 更新玩家数据
     */
    private isUpdatePlayerData = false;

    private updatePlayerData() {

        if (!$myAddress) {
            return;
        }

        return new Promise(resolve => {
            getMyKeyProp().then((data) => {
                if (!data[0]) {
                    return;
                }

                this.data.moduleData.unionBonus = parseFloat(web3js.fromWei(data[6].toString())).toFixed(2);
                this.data.moduleData.allTime = data[5].toString();
                this.data.moduleData.allBuy = parseFloat(web3js.fromWei(data[1].toString())).toFixed(2);
                $Modal.gameStatistics.data.stats.extractCoin1 = this.data.moduleData.unionBonus;
                this.data.moduleData.myBonus = parseFloat(web3js.fromWei(data[3].toString())).toFixed(2);
                
                
                if (parseFloat(this.data.moduleData.myBonus) + parseFloat(this.data.moduleData.unionBonus) >= 1) {
                    $Modal.buyKey.data.input = "0";
                } else {
                    $Modal.buyKey.data.input = "1";
                }

                let flag = Number(this.data.moduleData.myBonus) >= 1;

                if (data[2] > 0) {
                    $gameContractInstance.getRollInArrayDetail($myAddress, (err2, arr) => {
                        if (err2) {
                            console.log(err2);
                        } else {
                            let len = arr.length;

                            if (len == 0 || flag) {
                                // setTimeout(() => {
                                    this.alertModal.visible = true;
                                    this.playAnimation(this.alertBgBling, true);
                                // }, 1000);
                            } else {
                                this.alertBgBling.stop();
                                this.alertModal.visible = false;
                            }
                            this.isUpdatePlayerData = true;

                            getMyEtraProp().then((etra) => {
                                this.data.moduleData.teamProf = parseFloat(web3js.fromWei(etra[5].toString())).toFixed(2);
                                $Modal.gameStatistics.data.stats.rcmdid = etra[1].toString();
                                this.data.moduleData.rcmdid = etra[1].toString();
                                resolve();
                            });
                        }
                    });
                } else {
                    
                    if (flag) {
                        // setTimeout(() => {
                            this.alertModal.visible = true;
                            this.playAnimation(this.alertBgBling, true);
                        // }, 1000);
                    } else {
                        this.alertBgBling.stop();
                        this.alertModal.visible = false;
                    }
                    this.isUpdatePlayerData = true;

                    getMyEtraProp().then((etra) => {
                        this.data.moduleData.teamProf = parseFloat(web3js.fromWei(etra[5].toString())).toFixed(2);
                        $Modal.gameStatistics.data.stats.rcmdid = etra[1].toString();
                        this.data.moduleData.rcmdid = etra[1].toString();
                        resolve();
                    });
                }
            }, (err) => {
                console.log(err);
            });
        });
    }

    /**
     * open modal events
     */
    private openModalsEvent() {
        this.statisticsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.gameStatistics, 116);
            $Modal.gameStatistics.getData();
        }, this);

        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.gameHelp, 662);
        }, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if ($myAddress) {
                $Modal.betLoad.visible = true;
                $gameContractInstance.playerIsRegi($myAddress, (err, bool) => {
                    if (err) {
                        // console.log(err)
                        $alert('网络错误');
                    } else {
                        $Modal.betLoad.visible = false;
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
}
