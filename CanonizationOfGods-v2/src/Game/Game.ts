/**
 * Game module
 */
import tr = egret.sys.tr;

class Game extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameUI.exml";
    }

    public tips: eui.Group;
    public earning: eui.Image;
    public pToearning: eui.Image;
    public stela: eui.Group;
    public stelaTitle: eui.Image;
    public stelaTitle2: eui.Image;
    public roundZh: eui.Group;
    public roundEn: eui.Group;
    public potLabel: eui.BitmapLabel;
    public readyTime: eui.Image;
    public footContent: eui.Group;
    public myNumImg: eui.Image;
    public timesImg: eui.Image;
    public allBuyImg: eui.Image;
    public inviteImg: eui.Image;
    public bonusImg: eui.Image;
    public winImg: eui.Image;
    public alertModal: eui.Group;
    public alertBg: eui.Image;
    public buyBtnG: eui.Group;
    public btnLight: eui.Image;
    public headContent: eui.Group;
    public statistics: eui.Image;
    public invite: eui.Image;
    public faq: eui.Image;
    public lang: eui.Image;
    public withdrawBtn: eui.Group;
    public gameoverModel: eui.Group;
    public goBg: eui.Rect;
    public gourd1: eui.Image;
    public gourd2: eui.Image;
    public kjBg: eui.Image;
    public buyBtn: eui.Rect;

    private alertBgBling: egret.tween.TweenGroup;
    private gameoverBling: egret.tween.TweenGroup;
    private goTextBling: egret.tween.TweenGroup;
    private btnBling: egret.tween.TweenGroup;

    // 音乐
    private sound: egret.Sound;
    private soundChannel: egret.SoundChannel;
    private isPlay: boolean = false;
    private isGameOver: boolean = false;

    /**
     * game data
     */
    public data = {
        approveNum: "0", // 授权额度
        input: "200",
        currentNum: "1", // 当前序列
        round: "1", // 轮数
        pot: "0", // 奖池余额
        leftTime: "00:00:00", // 剩余时间
        residueTimes: "30", // 剩余下注次数
        totalBuyTimes: "30", // 总共买入次数
        allowAddTimes: "0",  // 允许增加的投入次数

        myNum: "0", // 我的序号
        buyTimes: "0", // 炼丹次数
        totalBuy: "0 ODF", // 累计炼丹
        inviteBonus: "0 ODF", // 邀请奖励
        earnings: "0 ODF", // 炼丹收益
        allEarnings: "0 ODF", // 可提收益
        canBonus: "0 ODF", // 分红权益
    };

    private currentMyNum = "0";

    private eventData = {
        begin: 0,
        end: 0,
    };
    /**lang data */
    private langData: any = $ZHTW.game;

    private intervalIsStart = false;
    private updateData: egret.Timer = new egret.Timer(1000, 0);

    private overTime = 0;//剩余时间秒数

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    private layoutFuns() {
        this.invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInviteModalFun, this);
        this.lang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLanguageModalFun, this);
        this.faq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFaqModalFun, this);
        this.statistics.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showStatModalFun, this);
        // 买入
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
        // 提取
        this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.withdrawFun, this);
        this.alertBg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.closeOutAnimal();
        }, this);
        setOverTime().then((time) => {
            time = time < 0 ? 0 : time;
            this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then((coin) => {
            coin = Number(coin);
            if (coin > 0) {
                this.data.pot = coin.toString();
                //更新统计界面奖池金额
                $Modal.gameStatistics.data.round.activePot = this.data.pot;
            }
        });
        this.playAnimation(this.btnBling, true);
        $gameContractInstance.nCurrentGainId((err, id) => {
            if (err) {
                console.log(err)
            } else {
                this.data.currentNum = id.toString();
                // $Modal.gameStatistics.data.stats.currentNum = id.toString();
            }
        });
        this.getMyApprove();
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.updatePlayerData();
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
                // this.updateData.stop();
                console.log("===========", err);
            });
        } else {
            this.intervalStart();
        }
    }

    private gainId = 0;

    private updatePlayerData() {
        if (!$myAddress) {
            return;
        }

        //授权
        this.getMyApprove();

        // 剩余炼丹次数
        $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
            if (err3) {
                console.log(err3);
            } else {
                roll = roll.map((item, i) => {
                    return parseInt(item.toString())
                });
                let len = roll.length;
                if (len == 0) {
                    this.data.residueTimes = this.data.totalBuyTimes;
                    this.data.myNum = "0";
                } else {
                    let totalTimes = parseInt(this.data.totalBuyTimes);
                    this.data.residueTimes = (totalTimes - len > 0 ? totalTimes - len : 0) + "";
                    this.data.myNum = parseInt(roll[0].toString()) + "";
                    if (this.currentMyNum != "0") {
                        if (parseInt(this.data.myNum) > parseInt(this.currentMyNum)) {
                            this.playMusic();
                        }
                    }
                    this.currentMyNum = this.data.myNum;
                }
            }
        });


        /**更新我的数据信息 */
        $myAddress && getMyKeyProp().then((data) => {
            if (!data[0]) {
                return
            }
            this.data.allowAddTimes = data[2].toString();
            this.data.totalBuyTimes = 30 + parseInt(data[2].toString()) + "";
            // 复投次数
            this.data.buyTimes = data[5].toString();
            this.data.totalBuy = Math.floor(parseFloat(web3js.fromWei(data[1].toString())) * 100) / 100 + " ODF";
            let myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 100) / 100;
            this.data.earnings = myBonus + " ODF";
            // allEarnings = 邀请奖 + 可以提的利润 + 可提本金
            getMyEtraProp().then((etra) => {
                // 邀请奖
                let invite = Math.floor(parseFloat(web3js.fromWei(etra[5].toString())) * 100) / 100;
                this.data.inviteBonus = invite + " ODF";
                $gameContractInstance.allowMoney($myAddress, (err4, money) => {
                    if (err4) {
                        console.log(err4);
                    } else {
                        this.data.allEarnings = Math.floor(parseFloat(web3js.fromWei(money.toString())) * 100) / 100 + " ODF";
                    }
                });
                $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, pid) => {
                    if (err) {
                        console.log(err);
                    } else {
                        $gameContractInstance.getCurrentBonusMoney(pid, (err4, money) => {
                            if (err4) {
                                console.log(err4);
                            } else {
                                this.data.canBonus = Math.floor(parseFloat(web3js.fromWei(money.toString())) * 100) / 100 + " ODF";
                            }
                        });
                    }
                });
            });
            // 下注控制
            if (myBonus >= 200) {
                this.data.input = "0";
            } else {
                this.data.input = "200";
            }
            if (parseInt(web3js.fromWei(data[1].toString())) > 0) {
                $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
                    if (err3) {
                        console.log(err3);
                    } else {
                        roll = roll.map((item, i) => {
                            return parseInt(item.toString())
                        });
                        let len = roll.length;
                        if (len == 0) {
                            this.earning.visible = false;
                            this.pToearning.visible = true;
                            setTimeout(() => {
                                if (!this.isPlay) {
                                    this.alertModal.visible = true;
                                    this.outMusic();
                                    this.isPlay = true;
                                    this.playAnimation(this.alertBgBling, true);
                                    setTimeout(() => {
                                        this.closeOutAnimal();
                                    }, 10000)
                                }
                            }, 4000)
                        } else {
                            this.earning.visible = true;
                            this.pToearning.visible = false;
                            this.closeOutAnimal();
                        }
                    }
                });
            } else {
                this.closeOutAnimal();
            }
        }, (err) => {
            console.log(err)
        });

    }

    private intervalStart() {
        this.overTime--;

        //轮次
        if (this.overTime % 300 == 0) {
            $gameContractInstance.round((err, round) => {
                if (err) {
                    //$alert(err);
                    console.log("round" + err);
                } else {
                    if (round > 1 && !this.isGameOver) {
                        $dragonBonesAnime(2);
                        this.isGameOver = true;
                    }
                    this.data.round = round.toNumber();
                    if ($Modal.gameStatistics) {
                        $Modal.gameStatistics.data.currentRound = round.toString();
                    }
                }
            });
        }

        if (this.overTime % 5 == 0) {
            $gameContractInstance.nRollIn((err, id) => {
                if (err) {
                    console.log(err);
                } else {
                    if (oldRollId != id.toString()) {
                        setOverTime().then((time) => {
                            if (time > 0) {
                                // time = time < 0 ? 0 : time;
                                this.overTime = parseInt(time + "");
                                if (this.overTime > 86400) {
                                    this.potLabel.visible = false;
                                    this.readyTime.visible = true;
                                    this.overTime -= 86400;
                                } else {
                                    this.potLabel.visible = true;
                                    this.readyTime.visible = false;
                                }
                            }
                        });

                        //奖池
                        getTotalPot().then((coin) => {
                            coin = Number(coin);
                            if (coin > 0) {
                                this.data.pot = coin.toString();
                                //更新统计界面奖池金额
                                $Modal.gameStatistics.data.round.activePot = this.data.pot;
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
                        $gameContractInstance.nCurrentGainId((err, id) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (id.toNumber() > this.gainId) {
                                    this.data.currentNum = id.toString();
                                    $Modal.gameStatistics.data.stats.currentNum = id.toString();
                                    this.gainId = id.toNumber();
                                }
                            }
                        });


                        this.updatePlayerData();
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
    }

    private closeOutAnimal() {
        this.alertBgBling.stop();
        this.isPlay = true;
        this.alertModal.visible = false;
    }

    private getMyApprove() {
        let from = $myAddress;
        let to = $gameContractInstance.address;
        $myAddress && $tokenContractInstance.allowance(from, to, (err, data) => {
            if (err) {
                console.log("4545" + err);
            } else {
                this.data.approveNum = web3js.fromWei(data.toString(), "ether");
            }
        });
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
        $showLoading(true);
        this.chargeLimit().then((has) => {
            if (Number(has) > 0 && parseInt(web3js.fromWei(has, "ether")) >= parseInt(this.data.input)) {
                this.chargeBalance().then((coin) => {
                    coin = web3js.fromWei(coin);
                    $showLoading(false);
                    if (Number(coin) < parseInt(this.data.input)) {
                        $alert(`您的Token余額為${coin},不足以支付本次煉丹`);
                        return
                    }
                    getIsBegin().then((bool) => {
                        if (!bool) {
                            this.directBuy();
                        } else {
                            setOverTime().then((time) => {
                                // if (time > 86400) {
                                //     $alert($AlertMsg.readyTime);
                                //     return;
                                // }
                                this.directBuy();
                            });
                        }
                    });
                });
            } else {
                // 弹窗去充值额度
                console.log("没授权");
                $showLoading(false);
                $Modal.approve.visible = true;
                $Modal.approve.msg = $AlertMsg.buyApprove;
            }
        }, (err) => {
            $showLoading(false);
            $alert(err);
        });
    }

    private chargeBalance() {
        return new Promise((resolve, reject) => {
            if (!$myAddress) {
                $showLoading(false);
                notSignInMetamask();
                reject();
                return;
            }
            $tokenContractInstance.balanceOf($myAddress, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token.toString());
                }
            });
        })
    }

    // 判断额度
    private chargeLimit() {
        return new Promise((resolve, reject) => {
            if (!$myAddress) {
                $showLoading(false);
                notSignInMetamask();
                reject("You're not signed into metamask");
                return;
            }
            let from = $myAddress;
            let to = $gameContractInstance.address;
            $tokenContractInstance.allowance(from, to, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        })
    }

    private directBuy() {
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        let addr = $getQueryIdString(); // 获取id

        let _referrer = "0x0000000000000000000000000000000000000000";
        console.log("--------addr=----", addr);
        if (addr) {
            addr = window.atob(addr);

            console.log("--------addr-atob=----", addr);
            if (web3js.isAddress(addr)) { // 是地址
                _referrer = addr;
                this.rollIn(_referrer);
            } else if (isNaN(Number(addr))) { // 是名称
                console.log(web3js.fromAscii(addr));
                ("請保持瀏覽器地址中推薦人的id為正確id");
            } else {// 是id
                $gameContractInstance.playerxID_(addr, (err, data) => {
                    if (err) {
                        $alert(err);
                    }
                    else {
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
        $myAddress && getMyKeyProp().then((data) => {
            if (data[2].c.length >= 10) {
                $alert($AlertMsg.isQueue);
                return
            }
            let val = web3js.toWei(this.data.input, "ether");
            // let val = this.data.input;
            console.log(_referrer, val);
            setTimeout(() => {
                this.btnLight.visible = false;
                this.btnBling.stop();
            }, 1000);
            $gameContractInstance.coinRollIn(_referrer, val, {
                from: $myAddress,
                gasPrice: 9000000000
            }, (err, hash) => {
                err && console.log(err);
                console.log(hash);
                if ((err && err.hash) || hash) {
                    $dragonBonesAnime(1);
                    setTimeout(() => {
                        $alert($AlertMsg.alreadyBuy);
                        setTimeout(() => {
                            $Modal.gameAlert.visible = false;
                        }, 3000)
                    }, 6000)
                }
            });
        }, (err) => {
            console.log(err);
        });
    }

    private withdrawFun() {
        if ($myAddress) {
            $showLoading(true);
            if (this.data.allEarnings == "0 ODF") {
                $showLoading(false);
                $alert($AlertMsg.zeroBalance);
                return
            }
            $gameContractInstance.withDraw({
                from: $myAddress,
                gasPrice: 9000000000
            }, (err, hash) => {
                $showLoading(false);
                err && console.log(err);
                console.log(hash);
                if ((err && err.hash) || hash) {
                    $dragonBonesAnime(4);
                    setTimeout(() => {
                        $alert($AlertMsg.alreadyBuy);
                        setTimeout(() => {
                            $Modal.gameAlert.visible = false;
                        }, 3000)
                    }, 4000)
                }
            });
        } else {
            notSignInMetamask();
        }
    }

    // 邀请人弹窗
    private showInviteModalFun() {
        $showLoading(true);
        this.chargeLimit().then((has) => {
            if (Number(has) > 0 && parseInt(web3js.fromWei(has, "ether")) >= 2) {
                if ($myAddress) {
                    $gameContractInstance.playerIsRegi($myAddress, (err, bool) => {
                        if (err) {
                            console.log(err);
                            $alert(err);
                            $showLoading(false);
                        } else {
                            if (bool) {
                                $showLoading(false);
                                $Modal.register.registerGroup.visible = false;
                                $Modal.register.linkGroup.visible = true;
                                $Modal.register.getUrl();
                            } else {
                                this.chargeBalance().then((coin) => {
                                    coin = web3js.fromWei(coin);
                                    $showLoading(false);
                                    if (Number(coin) < 2) {
                                        $alert(`您的Token余額為${coin},不足以支付本次购买推荐人`);
                                        return
                                    } else {
                                        $Modal.register.registerGroup.visible = true;
                                        $Modal.register.linkGroup.visible = false;
                                    }
                                });
                            }
                            $modalShowEvent($Modal.register, 205);
                        }
                    });
                } else {
                    $Modal.register.registerGroup.visible = true;
                    $Modal.register.linkGroup.visible = false;
                    $modalShowEvent($Modal.register, 205);
                }

            } else {
                // 弹窗去充值额度
                console.log("没授权");
                $showLoading(false);
                $Modal.approve.visible = true;
                $Modal.approve.msg = $AlertMsg.inviteApprove;
            }
        }, err => {
            $showLoading(false);
            $alert(err);
        });
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
        $Modal.gameStatistics.getTeamTotalPot();
        $modalShowEvent($Modal.gameStatistics, 205);
    }

    private playMusic() {
        this.sound = new egret.Sound();
        this.sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let channel: egret.SoundChannel = this.soundChannel;
            if (channel) {
                channel.stop();
                this.soundChannel = null;
                return;
            }
            channel = this.sound.play(0, 1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, () => {
                console.log("onSoundComplete");
            }, this);
            this.soundChannel = channel;
        }, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            console.log("loaded error!");
        }, this);
        this.sound.load("resource/assets/music/Win.mp3");
    }

    private outChannel: egret.SoundChannel;

    private outMusic() {
        let sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let channel: egret.SoundChannel = this.outChannel;
            if (channel) {
                channel.stop();
                this.outChannel = null;
                return;
            }
            channel = sound.play(0, 1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, () => {
                console.log("out music onSoundComplete");
            }, this);
            this.outChannel = channel;
        }, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            console.log("out music loaded error!");
        }, this);
        sound.load("resource/assets/music/out.mp3");
    }
}