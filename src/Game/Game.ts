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
            time = time < 0 ? 0 : time;
            this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then((keys) => {
            this.data.jackpot = "e" + Number(Number(keys).toFixed(3));
        });
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        /**modals event */
        this.openModalsEvent();
    }

    private showBuyModalFun() {
        // $Modal.buyKey.data.choosedTeam = this.data.choosedTeam;
        // this.modalShowEvent($Modal.buyKey,662);
        $Modal.buyKey.buyKeyFun();
    }

    private extractFun() {
        $Modal.extract.drawFun();
        // this.modalShowEvent($Modal.extract, 662);
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
                    this.overTime = 28800;
                    this.data.timeRemaining = timestampToMoment(this.overTime);
                }
            });
        } else {
            this.intervalStart();
        }
    }

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
                time = time < 0 ? 0 : time;
                this.overTime = parseInt(time + "");
                if (this.overTime > 28800) {
                    this.jackPotLabel.visible = false;
                    this.readyTimeLabel.visible = true;
                    this.overTime -= 28800;
                } else {
                    this.jackPotLabel.visible = true;
                    this.readyTimeLabel.visible = false;
                }
            });
            getTotalPot().then((keys) => {
                this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
                let myRate = parseFloat(this.rateUSD + "");
                this.data.jackpotUs = parseFloat(Number(keys) * myRate + "").toFixed(4) + "";
                //更新统计界面奖池金额
                if ($Modal.gameStatistics.visible) {
                    $Modal.gameStatistics.data.round.activePot = "e" + parseFloat(keys + "").toFixed(6) + "";
                    $Modal.gameStatistics.data.round.usdt = (parseFloat(this.rateUSD + "") * parseFloat(keys + "")).toFixed(4) + "";
                }
            });

            /**当前分红序列 */
            $gameContractInstance.nCurrentGainId((err, id) => {
                if (err) {
                    console.log(err)
                } else {
                    this.data.totalInvest = id.toString();
                    $Modal.gameStatistics.data.stats.totalInvested = id.toString();
                    $gameContractInstance.getRollInArrayLen((err2, len) => {
                        if (err2) {
                            console.log(err2);
                        } else {
                            if (len > 0) {
                                $gameContractInstance.getRollInArray(0, (err1, n) => {
                                    if (err1) {
                                        console.log(err1);
                                    } else {
                                        $Modal.gameStatistics.data.stats.extractNum = n[0].toString();
                                        this.data.remainingBet = 10 - parseInt(n[1].toString()) + "";
                                        // this.data.moduleData.extractNum = parseFloat(n[0].toString()) - parseFloat(id.toString()) + "";
                                        this.data.moduleData.extractNum = parseFloat(n[0].toString()) + "";
                                        if (this.data.moduleData.extractNum == "0") {
                                            this.data.moduleData.extractNum = "正在收益"
                                        }
                                    }
                                })
                            } else {
                                this.data.remainingBet = '10';
                                this.data.moduleData.extractNum = "0";
                            }
                        }
                    });
                }
            });

            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then((data) => {
                this.data.moduleData.myAllBuy = parseFloat(web3js.fromWei(data[3].toString())).toFixed(2);
                this.data.moduleData.roundBuy = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
                this.data.moduleData.roundBonus = parseFloat(web3js.fromWei(data[5].toString())).toFixed(2);
                this.data.moduleData.currentBon = parseFloat(web3js.fromWei(data[7].toString())).toFixed(2);
                $Modal.gameStatistics.data.stats.extractCoin1 = this.data.moduleData.currentBon;

                // this.data.moduleData.myBonus = (parseFloat(web3js.fromWei(data[4].toString())) + parseFloat(web3js.fromWei(data[5].toString()))).toFixed(2);
                this.data.moduleData.myBonus = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
                if (parseFloat(this.data.moduleData.myBonus) + parseFloat(this.data.moduleData.currentBon) >= 3) {
                    $Modal.buyKey.data.input = "0";
                }
                let myRate = parseFloat(this.rateUSD + "");
                this.data.moduleData.allBuyUs = parseFloat(Number(this.data.moduleData.myAllBuy) * myRate + "").toFixed(4) + "";
                this.data.moduleData.secondBonusUs = (parseFloat(Number(this.data.moduleData.currentBon) * myRate + "")).toFixed(4) + "";
                this.data.moduleData.myBonusUs = parseFloat(Number(this.data.moduleData.myBonus) * myRate + "").toFixed(4) + "";
                this.data.moduleData.roundBonusUs = `(${parseFloat(Number(this.data.moduleData.roundBonus) * myRate + "").toFixed(4)})`;
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
}