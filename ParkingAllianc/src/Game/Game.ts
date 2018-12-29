/**
 * Game module
 */
class Game extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameUI.exml";
    }

    public tips: eui.Group;
    public stela: eui.Group;
    public stelaTitle: eui.Image;
    public finalLuck: eui.Image;
    public stelaTitle2: eui.Image;
    public potLabel: eui.BitmapLabel;
    public totalOutImg: eui.Image;
    public roundZh: eui.Group;
    public roundEn: eui.Group;
    public readyTime: eui.Image;
    public headContent: eui.Group;
    public myBuyTitle1: eui.Image;
    public myBounsTitle2: eui.Image;
    public allBuyImg: eui.Image;
    public timesImg: eui.Image;
    public outTimeImg: eui.Image;
    public notOutImg: eui.Image;
    public bonusImg: eui.Image;
    public levelUpImg: eui.Image;
    public leaderImg: eui.Image;
    public roundTImg: eui.Image;
    public footContent: eui.Group;
    public lang: eui.Image;
    public faq: eui.Image;
    public invite: eui.Image;
    public statistics: eui.Image;
    public alertModal: eui.Group;
    public alertBg: eui.Image;
    public buyBtn: eui.Group;
    public registerBtn: eui.Group;
    public withdrawBtn: eui.Group;
    public gameoverModel: eui.Group;
    public goBg: eui.Rect;
    public gourd1: eui.Image;
    public gourd2: eui.Image;
    public kjBg: eui.Image;

    private alertBgBling: egret.tween.TweenGroup;
    private gameoverBling: egret.tween.TweenGroup;
    private goTextBling: egret.tween.TweenGroup;

    /**
     * game data
     */
    public data = {
        input: "3",
        round: "1", // 轮数
        weekPot: "e0", // 本周奖池余额
        totalFinalPot: "e0", // 总奖池余额
        leftTime: "00:00:00", // 剩余时间
        weekLeftTime: "00:00:00", // 剩余时间
        residueTimes: "30", // 剩余下注次数

        totalBuy: "0", // 累计投入
        buyTimes: "0", // 累计次数
        outTimes: "0", // 出局次数
        notoutTimes: "0", // 未出局次数
        earnings: "0", // 分红收益
        levelupBonus: "0", // 晋级收益
        leaderBonus: "0", // 领袖收益
        roundBonus: "0", // 轮推收益  // 联盟奖

        myNum: "0", // 我的序列
        currentNum: "1", // 当前序列
        inviteBonus: "0", // 邀请奖励   晋级收益和领袖收益之和
    };

    private eventData = {
        begin: 0,
        end: 0,
    };
    /**lang data */
    private langData: any = $ZHTW.game;

    private intervalIsStart = false;
    private updateData: egret.Timer = new egret.Timer(1000, 0);

    private overTime = 0;//剩余时间秒数
    private overWeekTime = 0;//剩余周时间秒数

    protected childrenCreated(): void {
        super.childrenCreated();
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
        setOverTime().then((time) => {
            time = time < 0 ? 0 : time;
            this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        $getTotalPot().then((coin) => {
            this.data.totalFinalPot = "e" + Number(Number(web3js.fromWei(coin[1])).toFixed(3));
            this.data.weekPot = "e" + Number(Number(web3js.fromWei(coin[2])).toFixed(2));
        });
        $gameContractInstance.nCurrentGainId((err, id) => {
            if (err) {
                console.log(err)
            } else {
                this.data.currentNum = id.toString();
                $Modal.gameStatistics.data.stats.currentNum = id.toString();
            }
        });
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
    }

    private getData() {
        if (!this.intervalIsStart) {
            getIsBegin().then((bool) => {
                if (bool) {
                    this.intervalStart();
                    this.intervalIsStart = true;
                } else {
                    this.overTime = 86400;
                    this.data.leftTime = timestampToMoment(this.overTime);
                }
            }, (err) => {
                this.updateData.stop();
                console.log("===========", err);
            });
        } else {
            this.intervalStart();
        }
        // 每周倒计时
        getBjTime().then((now) => {
            let d = new Date();
            d.setHours(12, 0, 0, 0);
            let day = 0;
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
            let week = 5 - day;
            let thisHour = new Date().getHours();
            week = (week == 0 && thisHour >= 12) ? 7 : week;
            let result = d.getTime() + week * 86400000;
            let final = result - (now as any);
            this.data.weekLeftTime = timestampToMoment(final / 1000);
        });
    }

    private gainId = "0";
    private totalPot = "0";
    private totalWeekPot = "0";

    private intervalStart() {
        this.overTime--;
        if (this.overTime % 3 == 0) {
            $Modal.gameStatistics.getTeamTotalPot();
            $gameContractInstance.round((err, round) => {
                if (err) {
                    console.log("4545" + err);
                    this.updateData.stop();
                } else {
                    this.data.round = round.toNumber();
                }
            });
            setOverTime().then((time) => {
                time = time < 0 ? 0 : time;
                this.overTime = parseInt(time + "");
                // console.log(this.overTime);
                if (this.overTime > 86400) {
                    this.potLabel.visible = false;
                    this.readyTime.visible = true;
                    this.overTime -= 86400;
                    this.gainId = "0";
                } else {
                    this.potLabel.visible = true;
                    this.readyTime.visible = false;
                }
            });
            $getTotalPot().then((coin) => {
                if (Number(coin) < Number(this.totalPot)) {
                    this.data.totalFinalPot = "e" + this.totalPot;
                    this.data.weekPot = "e" + this.totalWeekPot;
                    //更新统计界面奖池金额
                } else {
                    this.data.totalFinalPot = "e" + Number(Number(web3js.fromWei(coin[1])).toFixed(3));
                    this.data.weekPot = "e" + Number(Number(web3js.fromWei(coin[2])).toFixed(2));
                    //更新统计界面奖池金额
                    this.totalPot = Number(Number(web3js.fromWei(coin[1])).toFixed(3)) + "";
                    this.totalWeekPot = Number(Number(web3js.fromWei(coin[2])).toFixed(2)) + "";
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.stats.totalBuyTimes = coin[3].toString();
                        $Modal.gameStatistics.data.round.activePot = this.totalPot;
                    }
                }
            });
            /**当前分红序列 */
            $gameContractInstance.nCurrentGainId((err, id) => {
                if (err) {
                    console.log(err);
                    this.updateData.stop();
                } else {
                    if (parseInt(id.toString()) < parseInt(this.gainId)) {
                        this.data.currentNum = this.gainId;
                        $Modal.gameStatistics.data.stats.currentNum = this.gainId;
                    } else {
                        this.data.currentNum = id.toString();
                        $Modal.gameStatistics.data.stats.currentNum = id.toString();
                        this.gainId = id.toString();
                    }
                    // 剩余炼丹次数
                    $gameContractInstance.getRollInArrayLen((err2, len) => {
                        if (err2) {
                            console.log(err2);
                        } else {
                            if (len > 0) {
                                $gameContractInstance.getRollInArray(0, (err1, n) => {
                                    if (err1) {
                                        console.log(err1);
                                    } else {
                                        this.data.residueTimes = 30 - parseInt(n[1].toString()) + "";
                                        this.data.myNum = parseInt(n[0].toString()) + "";
                                    }
                                })
                            } else {
                                this.data.residueTimes = '30';
                                this.data.myNum = "0";
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
                this.data.totalBuy = Math.floor(parseFloat(web3js.fromWei(data[1].toString())) * 1000) / 1000 + "";
                this.data.buyTimes = data[5].toString();
                // 联盟奖
                this.data.roundBonus = Math.floor(parseFloat(web3js.fromWei(data[6].toString())) * 1000) / 1000 + "";
                if ($Modal.gameStatistics.visible) {
                    $Modal.gameStatistics.data.stats.myReinvest = data[5].toString();
                }
                getMyEtraProp().then((etra) => {
                    this.data.outTimes = etra[4].toString();
                    // 晋级收益   领袖收益
                    this.data.levelupBonus = Math.floor(parseFloat(web3js.fromWei(etra[5].toString())) * 1000) / 1000 + "";
                    this.data.leaderBonus = Math.floor(parseFloat(web3js.fromWei(etra[6].toString())) * 1000) / 1000 + "";
                });
                let myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 1000) / 1000;
                this.data.earnings = myBonus + "";
                // 下注控制
                if (myBonus >= 3) {
                    this.data.input = "0";
                } else {
                    this.data.input = "3";
                }
                $gameContractInstance.getRollInArrayLen((errLen, len) => {
                    if (errLen) {
                        console.log(errLen);
                    } else {
                        this.data.notoutTimes = len;
                    }
                });
                if (data[1] > 0) {
                    $gameContractInstance.getRollInArrayDetail($myAddress,(err3, roll) => {
                        if (err3) {
                            console.log(err3);
                        } else {
                            roll = roll.map((item, i) => {
                                return parseInt(item.toString())
                            });
                            let len = roll.length;
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

        this.data.leftTime = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.leftTime;
        }
        if (this.overTime <= 0) {
            this.alertBgBling.stop();
            this.alertModal.visible = false;
            $gameContractInstance.round((err, round) => {
                if (err) {
                    $alert(err);
                }
                else {
                    if (round > 1) {
                        // this.gameoverAnimation();
                    }
                }
            });
            setTimeout(() => {
                this.gameoverModel.visible = false;
                this.gameoverBling.stop();
            }, 15000)
        }
    }

    /*
     * 动画循环播放函数
     */
    private playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
        if (isLoop) {
            for (let key in target.items) {
                target.items[key].props = {loop: true};
            }
        }
        target.play();
    }

    /*
     * 游戏结束 丹成封神
     */
    private gameoverAnimation() {
        this.gameoverModel.visible = true;
        this.gameoverBling.play();
        setTimeout(() => {
            this.playAnimation(this.goTextBling, true);
            this.updateData.stop();
        }, 1500);

    }

    /**
     * 买入函数
     */
    private buyKeyFun(): void {
        getIsBegin().then((bool) => {
            if (!bool) {
                this.directBuy();
            } else {
                setOverTime().then((time) => {
                    if (time > 86400) {
                        $alert($AlertMsg.readyTime);
                        return;
                    }
                    this.directBuy();
                });
            }
        });
    }

    private directBuy() {
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        let href = location.href;
        let addr = href.split("?")[1];
        let _referrer = "0x0000000000000000000000000000000000000000";
        if (addr) {
            if (web3js.isAddress(addr)) { // 是地址
                _referrer = addr;
                this.rollIn(_referrer);
            } else if (isNaN(Number(addr))) { // 是名称
                console.log(web3js.fromAscii(addr));
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            } else {// 是id
                $gameContractInstance.playerxID_(addr, (err, data) => {
                    if (err) {
                        $alert(err);
                    } else {
                        _referrer = data[0];
                        this.rollIn(_referrer);
                    }
                });
            }
        } else {
            this.rollIn(_referrer);
        }
    }

    private rollIn(_referrer) {
        if ($myAddress == _referrer) {
            _referrer = "0x0000000000000000000000000000000000000000"
        }
        console.log(_referrer);
        $myAddress && getMyKeyProp().then((data) => {
            if (data[2].c.length >= 10) {
                $alert($AlertMsg.isQueue);
                return
            }
            console.log(web3js.toWei(this.data.input, "ether"));
            $gameContractInstance.coinRollIn(_referrer, {gasPrice: 10000000000}, {
                from: $myAddress,
                value: web3js.toWei(this.data.input, "ether")
            }, (err, hash) => {
                err && console.log(err);
                console.log(hash);
            });
        }, (err) => {
            console.log(err);
        });
    }

    // 注册
    private registerFun() {
        $myAddress && $gameContractInstance.playerIsRegi($myAddress, (err, bool) => {
            if (err) {
                console.log(err)
            } else {
                if (bool) {
                    $Modal.register.registerGroup.visible = false;
                    $Modal.register.linkGroup.visible = true;
                    $Modal.register.getUrl();
                    $modalShowEvent($Modal.register, 205);
                } else {
                    $Modal.register.registerReg();
                }
            }
        });
        if (!$myAddress) {
            notSignInMetamask();
        }
    }

    private withdrawFun() {
        if ($myAddress) {
            $gameContractInstance.withDraw({
                from: $myAddress,
            }, (err, hash) => {
                err && console.log(err);
                console.log(hash);
            });
        } else {
            notSignInMetamask();
        }
    }

    // 邀请人弹窗
    private showInviteModalFun() {
        if ($myAddress) {
            $gameContractInstance.playerIsRegi($myAddress, (err, bool) => {
                if (err) {
                    console.log(err)
                } else {
                    if (bool) {
                        $Modal.register.registerGroup.visible = false;
                        $Modal.register.linkGroup.visible = true;
                        $Modal.register.getUrl();
                    } else {
                        $Modal.register.registerGroup.visible = true;
                        $Modal.register.linkGroup.visible = false;
                    }
                }
            });
        } else {
            $Modal.register.registerGroup.visible = true;
            $Modal.register.linkGroup.visible = false;
        }
        $modalShowEvent($Modal.register, 205);
    }

    // 语言弹窗
    private showLanguageModalFun() {
        $modalShowEvent($Modal.language, 205);
    }

    // 攻略弹窗
    private showFaqModalFun() {
        $modalShowEvent($Modal.gameHelp, 205);
    }

    // 统计弹窗
    private showStatModalFun() {
        $Modal.gameStatistics.getExtractList();
        $modalShowEvent($Modal.gameStatistics, 205);
    }
}