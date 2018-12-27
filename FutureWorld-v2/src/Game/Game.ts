/**
 * Game module
 */
class Game extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameUI.exml";
    }

    public stela: eui.Group;
    public stelaTitle: eui.Image;
    public roundEn: eui.Group;
    public roundZh: eui.Group;
    public stelaTitle2: eui.Image;
    public potLabel: eui.BitmapLabel;
    public currentNum: eui.BitmapLabel;
    public readyTime: eui.Image;
    public middle: eui.Group;
    public buyBtnG: eui.Group;
    public footContent: eui.Group;
    public ownGroup1: eui.Group;
    public myNumImg: eui.Image;
    public ownGroup2: eui.Group;
    public timesImg: eui.Image;
    public ownGroup3: eui.Group;
    public allBuyImg: eui.Image;
    public ownGroup4: eui.Group;
    public inviteImg: eui.Image;
    public ownGroup5: eui.Group;
    public bonusImg: eui.Image;
    public ownGroup6: eui.Group;
    public winImg: eui.Image;
    public alertModal: eui.Group;
    public alertBg: eui.Image;
    public headContent: eui.Group;
    public statistics: eui.Image;
    public invite: eui.Image;
    public faq: eui.Image;
    public lang: eui.Image;
    public withdrawG: eui.Group;
    public withdrawBtn: eui.Rect;
    public goBg: eui.Rect;
    public gourd1: eui.Image;
    public gourd2: eui.Image;
    public kjBg: eui.Image;
    public withdrawTxt: eui.Image;
    public rainImg: eui.Image;
    public withLight: eui.Image;
    public buyBtn: eui.Rect;

    private alertBgBling: egret.tween.TweenGroup;
    private goTextBling: egret.tween.TweenGroup;
    private menuShow: egret.tween.TweenGroup;
    private buyBling: egret.tween.TweenGroup;
    private eyeBling: egret.tween.TweenGroup;

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
        round: "2", // 轮数
        pot: "0", // 奖池余额
        leftTime: "24:00:00", // 剩余时间
        residueTimes: "20", // 剩余下注次数
        totalBuyTimes: "20", // 总共买入次数
        allowAddTimes: "0",  // 允许增加的投入次数

        myNum: "0", // 我的序号
        buyTimes: "0", // 炼丹次数
        totalBuy: "0", // 累计炼丹
        inviteBonus: "0", // 邀请奖励
        linkBonus: "0", // 炼丹收益
        turnBonus: "0", // 可提收益
        canWithdraw: "0", // 实际能提取
        bonusWithdraw: "0", // 分红权益
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
        $gameContractInstance.round((err, round) => {
            if (err) {
                console.log("round" + err);
            } else {
                this.data.round = round.toNumber();
                if($Modal.gameStatistics) {
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
        this.alertBg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.closeOutAnimal();
        }, this);
        setOverTime().then((time) => {
            time = time < 0 ? 0 : time;
            this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then((coin) => {
            coin = Number(coin);
            if(coin > 0) {
                this.data.pot = coin.toString();
                //更新统计界面奖池金额
                $Modal.gameStatistics.data.round.activePot = this.data.pot;
            } 
        });
        $gameContractInstance.nCurrentGainId((err, id) => {
            if (err) {
                console.log(err)
            } else {
                this.data.currentNum = id.toString();
            }
        });
        this.getMyApprove();
        this.mainAnimation();
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
                console.log("===========", err);
            });
        } else {
            this.intervalStart();
        }
    }

    private gainId = 0;

    private updatePlayerData() {
        
        if(!$myAddress) {
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
                    this.data.residueTimes = totalTimes - len + "";
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
        getMyKeyProp().then((data) => {
            if (!data[0]) {
                return
            }
            this.data.allowAddTimes = data[2].toString();
            this.data.totalBuyTimes = 20 + parseInt(data[2].toString()) + "";
            // 复投次数
            this.data.buyTimes = data[5].toString();
            this.data.totalBuy = Math.floor(parseFloat(web3js.fromWei(data[1].toString())) * 100) / 100 + "";
            $Modal.gameStatistics.data.stats.rewards = this.data.totalBuy;
            $gameContractInstance.allowMoney($myAddress, (err, money) => {
                if (err) {
                    $alert($AlertMsg.errorNet);
                }
                else {
                    this.data.canWithdraw = Math.floor(parseFloat(web3js.fromWei(money)) * 100) / 100 + "";
                }
            });
            $gameContractInstance.pIDxAddr_($myAddress, (err, pid) => {
                if (err) {
                    $alert($AlertMsg.errorNet);
                } else {
                    $gameContractInstance.getCurrentBonusMoney(pid, (err, money) => {
                        if (err) {
                            $alert($AlertMsg.errorNet);
                        }
                        else {
                            this.data.bonusWithdraw = Math.floor(parseFloat(web3js.fromWei(money)) * 100) / 100 + "";
                        }
                    });
                }
            });
            let myBonus = Math.floor(parseFloat(web3js.fromWei(data[3].toString())) * 100) / 100;
            this.data.turnBonus = myBonus + "";
            // allEarnings = 邀请奖 + 可以提的利润 + 可提本金
            getMyEtraProp().then((etra) => {
                // 邀请奖
                let invite1 = Math.floor(parseFloat(web3js.fromWei(etra[6].toString())) * 100) / 100;
                let invite2 = Math.floor(parseFloat(web3js.fromWei(etra[7].toString())) * 100) / 100;
                this.data.inviteBonus = invite1 + "";
                this.data.linkBonus = invite2 + "";
            });
            // 下注控制
            if (myBonus >= 200) {
                this.data.input = "0";
            } else {
                this.data.input = "200";
            }
            if (data[1] > 0) {
                $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
                    if (err3) {
                        console.log(err3);
                    } else {
                        roll = roll.map((item, i) => {
                            return parseInt(item.toString())
                        });
                        let len = roll.length;
                        if (len == 0) {
                            setTimeout(() => {
                                if (!this.isPlay) {
                                    this.alertModal.visible = true;
                                    this.outMusic();
                                    this.isPlay = true;
                                    $Modal.mainIntro.visible = false;
                                    this.playAnimation(this.alertBgBling, true);
                                    setTimeout(()=>{
                                        this.closeOutAnimal();
                                    },10000)
                                }
                            }, 4000)
                        } else {
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
        if(this.overTime % 300 == 0) {
            $gameContractInstance.round((err, round) => {
                if (err) {
                    //$alert(err);
                    console.log("round" + err);
                } else {
                    if (round > 2 && !this.isGameOver) {
                        $dragonBonesAnime(2);
                        this.isGameOver = true;
                    }
                    this.data.round = round.toNumber();
                    if($Modal.gameStatistics) {
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
                    // console.log("rollIN=",id.toString());
                    if(oldRollId != id.toString() )
                    {
                        setOverTime().then((time) => {
                            if(time > 0)
                            {
                                // console.log("time：",time);
                                // time = time < 0 ? 0 : time;
                                this.overTime = parseInt(time + "");
                                if (this.overTime > 86430) {
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
                            if(coin > 0) {
                                this.data.pot = coin.toString();
                                //更新统计界面奖池金额
                                $Modal.gameStatistics.data.round.activePot = this.data.pot;
                            } 
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
    private gameOverAnimation() {
        setTimeout(() => {
            this.playAnimation(this.goTextBling, true);
            this.updateData.stop();
        }, 1500);

    }

    /**
     * 买入函数
     */
    private buyKeyFun(): void {
        this.closeOutAnimal();
        $showLoading(true);
        this.toMiniToBig(this.middle, 1, 1, 0.98, 0.98, 200);
        this.chargeLimit().then((has) => {
            if (Number(has) > 0 && parseInt(web3js.fromWei(has, "ether")) >= parseInt(this.data.input)) {
                this.chargeBalance().then((coin) => {
                    coin = web3js.fromWei(coin);
                    $showLoading(false);
                    if (Number(coin) < parseInt(this.data.input)) {
                        $alert(`您的Token余額為${coin},不足以支付本次购买`);
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
                let lang = localStorage.getItem('language');
                if (lang) {
                    $Modal.approve.msg = lang == "zhtw" ? '進行探探需要CKC\n現在將為你授權10000 CKC！' : "Send needs CKC\nAuthorize 10000 CKC !";
                }
                $Modal.approve.visible = true;
            }
        }, (err) => {
            $showLoading(false);
            $alert(err);
        });
    }

    private chargeBalance() {
        return new Promise((resolve, reject) => {
            if (!$myAddress) {
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
                return;
            }
            let from = $myAddress;
            let to = $gameContractInstance.address;
            $tokenContractInstance.allowance(from, to, (err, data) => {
                if (err) {
                    $showLoading(false);
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
        if (addr) {
            addr = window.atob(addr);
            if (web3js.isAddress(addr)) { // 是地址
                _referrer = addr;
                this.rollIn(_referrer);
            } else if (isNaN(Number(addr))) { // 是名称
                // console.log(web3js.fromAscii(addr));
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            } else {// 是id
                $gameContractInstance.playerxID_(addr, (err, data) => {
                    if (err) {
                        $alert($AlertMsg.errorNet);
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
            let val = web3js.toWei(this.data.input, "ether");
            // let val = this.data.input;
            console.log(_referrer, val);
            $gameContractInstance.coinRollIn(_referrer, val, {
                from: $myAddress,
                gasPrice: 9000000000
            }, (err, hash) => {
                err && console.log(err);
                console.log(hash);
                if((err && err.hash) || hash){
                    $dragonBonesAnime(1);
                    setTimeout(() => {
                        $alert($AlertMsg.alreadyBuy);
                        setTimeout(() => {
                            $Modal.gameAlert.visible = false;
                        }, 3000)
                    }, 4000)
                }
            });
        }, (err) => {
            console.log(err);
        });
    }

    private withdrawFun() {
        if (this.data.canWithdraw == "0") {
            $alert($AlertMsg.zeroBalance);
            return
        }
        $showLoading(true);
        this.toMiniToBig(this.withdrawG, 1, 1, 0.98, 0.98, 200);
        if ($myAddress) {
            $gameContractInstance.withDraw({
                from: $myAddress,
                gasPrice: 9000000000
            }, (err, hash) => {
                err && console.log(err);
                console.log(hash);
                if((err && err.hash) || hash){
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
            if (Number(has) > 0) {

                if ($myAddress) {
                    $gameContractInstance.playerIsRegi($myAddress, (err, bool) => {
                        $showLoading(false);
                        if (err) {
                            console.log(err);
                            $alert($AlertMsg.errorNet);
                        } else {
                            if (bool) {
                                $Modal.register.registerGroup.visible = false;
                                $Modal.register.linkGroup.visible = true;
                                $Modal.register.getUrl();
                            } else {
                                $Modal.register.registerGroup.visible = true;
                                $Modal.register.linkGroup.visible = false;
                            }
                            $modalShowEvent($Modal.register);
                        }
                    });
                } else {
                    $showLoading(false);
                    $Modal.register.registerGroup.visible = true;
                    $Modal.register.linkGroup.visible = false;
                    $modalShowEvent($Modal.register);
                }
            } else {
                console.log("没授权");
                $showLoading(false);
                let lang = localStorage.getItem('language');
                if (lang) {
                    $Modal.approve.msg = lang == "zhtw" ? '升級為探長需要CKC\n現在將為妳授權10000 CKC' : "Upgrading to detective requires 10000 CKC !";
                }
                $Modal.approve.visible = true;
            }
        });
    }

    // 语言弹窗
    private showLanguageModalFun() {
        $modalShowEvent($Modal.language);
    }

    // 攻略弹窗
    private showFaqModalFun() {
        if($Modal.gameHelp == null) {
            $Modal.gameHelp = new GameHelp();  //游戏-攻略模态框
            $Modal.gameHelp.visible = false;
            this.addChild($Modal.gameHelp);
        }

        $modalShowEvent($Modal.gameHelp);
    }

    // 统计弹窗
    private showStatModalFun() {
        $Modal.gameStatistics.getExtractList();
        $modalShowEvent($Modal.gameStatistics);
    }

    // 主页开始动画
    private mainAnimation() {
        this.ownDataAnimation();
        this.trembling(this.withdrawTxt);
        this.menuShow.play();
        this.bigToMini(this.potLabel, 3, 3, 1, 1, 300);
        this.bigToMini(this.currentNum, 3, 3, 1, 1, 300);
        this.playAnimation(this.buyBling, true);
        this.playAnimation(this.eyeBling, true);
        this.rainLoop();
        this.withdrawLoop();
    }

    private ownDataAnimation() {
        let w = 341;
        let h = 210;
        let x = 85;
        let y = 50;
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
    }

    // 变宽
    private toWid(target): void {
        let time = 500;
        egret.Tween.get(target)
            .to({width: 1}, 0)
            .to({width: 340}, time);
    }

    // 变大
    private toBig(target, bx, by, ex, ey): void {
        let time = 500;
        egret.Tween.get(target)
            .to({scaleX: 0.5, scaleY: 0.5, x: bx, y: by}, 0)
            .to({scaleX: 1, scaleY: 1, x: ex, y: ey}, time);
    }

    // 膨胀缩小
    private trembling(target): void {
        let time = 300;
        egret.Tween.get(target, {loop: true})
            .to({scaleX: 1, scaleY: 1}, 0)
            .to({scaleX: 1.06, scaleY: 1.06}, time)
            .to({scaleX: 1, scaleY: 1}, time * 2);

    }

    // 从大到小 砸下去  奖池金额
    private bigToMini(target, bsx, bsy, esx, esy, t) {
        egret.Tween.get(target)
            .to({scaleX: bsx, scaleY: bsy}, 0)
            .to({scaleX: esx, scaleY: esy}, t);
    }

    // 按钮点击缩小再回来
    private toMiniToBig(target, bsx, bsy, esx, esy, t) {
        egret.Tween.get(target)
            .to({scaleX: bsx, scaleY: bsy}, 0)
            .to({scaleX: esx, scaleY: esy}, t)
            .to({scaleX: bsx, scaleY: bsy}, t);
    }

    // 下雨特效
    private rainLoop() {
        egret.Tween.get(this.rainImg, {loop: true})
            .to({x: 0, y: -1100}, 0)
            .to({x: -438, y: -500}, 4000).call(() => {
            this.rainImg.x = 0;
            this.rainImg.y = -1100;
        })
    }

    // 提取按钮从左到右特效
    private withdrawLoop() {
        egret.Tween.get(this.withLight, {loop: true})
            .to({x: -492}, 0)
            .to({x: 997}, 1000).wait(10000).call(() => {
            this.withLight.x = -492;
        })
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

    private showIntro(i): void {
        let msg = "";
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
    }
}