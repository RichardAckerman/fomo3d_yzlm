/**
 * Game module
 */
import tr = egret.sys.tr;

class Game extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/GameUI.exml";
    }

    public animationG: eui.Group;
    public foot: eui.Group;
    public house: eui.Rect;
    public dataPanel: eui.Group;
    public dataPanelBg: eui.Rect;
    public closeBtn: eui.Image;
    public dataPanelTop: eui.Group;
    public dataPanelMiddle: eui.Group;
    public dataPanelBottom: eui.Group;
    public dataPanelClose: eui.Rect;
    public head: eui.Group;
    public headBg: eui.Rect;
    public withdrawBtn: eui.Group;
    public buyBtn: eui.Group;
    public openBtn: eui.Image;


    public statisticsBtn: eui.Group;
    public inviteBtn: eui.Group;
    public luckyBtn: eui.Group;
    public strategyBtn: eui.Group;
    public langBtn: eui.Group;

    private jitter: egret.tween.TweenGroup;

    /**
     * game data
     */
    public data = {
        input: "3",
        round: "1", // 轮数
        weekPot: "0", // 本周幸运奖奖池余额
        totalFinalPot: "0", // 总奖池余额

        leftTime: "24:00:00", // 游戏结束剩余时间
        weekLeftTime: "168:00:00", // 本周大奖剩余时间

        canWithDraw: "0", // 能提取的钱
        residueTimes: "1", // 剩余下注次数
        canBetTimes: "1", // 总共能下注的次数
        pageShowTime: "1/1",

        totalBuy: "0", // 累计投入 1: uint256: allBuy 0
        buyTimes: "0", // 累计次数 5: uint256: reinvest 0
        outTimes: "0", // 出局次数
        notoutTimes: "0", // 未出局次数
        earnings: "0", // 分红收益 3: uint256: turnBonus 0
        levelupBonus: "0", // 晋级收益 5:uint256: currentPerformanceOne 0
        leaderBonus: "0", // 领袖收益 6:uint256: currentPerformanceTwo 0
        roundBonus: "0", // 轮推收益  // 联盟奖 6:uint256: unionBonus 0

        myNum: "0", // 我的序列
        currentNum: "1", // 当前序列
        approveNum: '0',
        price: "0 CBE"
    };

    private intervalIsStart = false;
    private updateData: egret.Timer = new egret.Timer(1000, 0);

    private overTime = 86400;//剩余时间秒数

    protected childrenCreated(): void {
        super.childrenCreated();
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
        this.getWeekTime();
    }

    private gainId = "0";
    private totalPot = "0";
    private totalWeekPot = "0";

    private intervalStart() {
        this.overTime--;
        if (this.overTime % 3 == 0) {
            $gameContractInstance.round((err, round) => {
                if (err) {
                    console.log("4545" + err);
                } else {
                    this.data.round = round.toNumber();
                }
            });
            setOverTime().then((time) => {
                time = time < 0 ? 0 : time;
                this.overTime = parseInt(time + "");
                if (this.overTime > 86400) {
                    this.gainId = "0";
                    if (this.overTime > 87000) {
                        this.overTime = 86400;
                    }
                } else {

                }
            });
            $getTotalPot().then((coin) => {
                if (Number(coin[1]) < Number(this.totalPot)) {
                    this.data.totalFinalPot = this.totalPot;
                    this.data.weekPot = this.totalWeekPot;
                    $Modal.gameLucky.data.pot = this.data.weekPot;
                    //更新统计界面奖池金额
                } else {
                    this.data.totalFinalPot = $toFixedDecimal(coin[1]);
                    this.data.weekPot = $toFixedDecimal(coin[2]);
                    //更新统计界面奖池金额
                    this.totalPot = this.data.totalFinalPot;
                    this.totalWeekPot = this.data.weekPot;
                    $Modal.gameLucky.data.pot = this.data.weekPot;
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
                    } else {
                        this.data.currentNum = id.toString();
                        this.gainId = id.toString();
                    }
                    $Modal.gameStatistics.data.stats.currentNum = this.data.currentNum;
                }
            });
            /**剩余投入次数 */
            $gameContractInstance.nPlayerArraySize((err, size) => {
                if (err) {
                    console.log("nPlayerArraySize++++++:", err);
                } else {
                    this.data.canBetTimes = size.toString();
                    let numSize = parseInt(size.toString());
                    $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err3, n) => {
                        if (err3) {
                            console.log("getRollInArrayDetail++++++:", err3);
                            this.data.residueTimes = size.toString();
                        } else {
                            let len = n.length;
                            if (len > 0) {
                                let num = numSize - len < 0 ? 0 : numSize - len;
                                this.data.residueTimes = num + "";
                                this.data.myNum = parseInt(n[0].toString()) + "";
                            } else {
                                this.data.residueTimes = size.toString();
                                this.data.myNum = "0";
                            }
                        }
                        this.data.pageShowTime = `${this.data.residueTimes}/${this.data.canBetTimes}`;
                    });
                }
            });
            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then((data) => {
                if (data[1] == 0) {
                    return;
                }
                this.data.totalBuy = $toFixedDecimal(data[1]);
                this.data.buyTimes = data[5].toString();
                // 联盟奖
                this.data.roundBonus = $toFixedDecimal(data[6]);
                if ($Modal.gameStatistics.visible) {
                    $Modal.gameStatistics.data.stats.myReinvest = data[5].toString();
                }
                getMyEtraProp().then((etra) => {
                    // 晋级收益   领袖收益
                    this.data.levelupBonus = $toFixedDecimal(etra[5]);
                    this.data.leaderBonus = $toFixedDecimal(etra[6]);
                });
                let myBonus = data[3];
                this.data.earnings = $toFixedDecimal(myBonus) + "";
                if (data[1] > 0) {
                    $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
                        if (err3) {
                            console.log(err3);
                        } else {
                            roll = roll.map((item, i) => {
                                return parseInt(item.toString());
                            });
                            if (this.myLastNum != 0) {
                                if (this.myLastNum < roll[0]) { //出局 获取收益 车儿开起来
                                    this.myLastNum = roll[0];
                                    $Content.container.trainRun();
                                }
                                if (!roll[0]) {
                                    $Content.container.trainRun();
                                    this.myLastNum = 0;
                                }
                            } else if (roll[0]) {
                                this.myLastNum = roll[0].toString();
                            }
                            let len = roll.length;
                            if (this.currentMen > len) {
                                let difference = this.currentMen - len;
                                for (let i = 0; i < difference; i++) {
                                    $Content.container.removeOneMiner();
                                }
                            } else {
                                let difference = len - this.currentMen;
                                for (let i = 0; i < difference; i++) {
                                    $Content.container.addOneMiner();
                                }
                            }
                            this.currentMen = len;
                            let num = data[5].toString() - len.toString();
                            num = num < 0 ? 0 : num;
                            this.data.outTimes = num + "";
                            this.data.notoutTimes = len.toString();
                            if ($Modal.gameStatistics.visible) {
                                $Modal.gameStatistics.data.stats.myOutTimes = num + "";
                            }
                        }
                    });
                } else {
                    this.data.outTimes = "0";
                    this.data.notoutTimes = "0";
                    if ($Modal.gameStatistics.visible) {
                        $Modal.gameStatistics.data.stats.myOutTimes = "0";
                    }
                }
            }, (err) => {
                console.log(err);
            });
            $myAddress && this.getCanWithdraw();
        }
        this.data.leftTime = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.leftTime;
        }
    }

    // 获取本周日中午12点倒计时
    private getWeekTime() {
        getBjTime().then((now) => {
            let d = new Date();
            d.setHours(12, 0, 0, 0);
            let day = 0;
            switch (d.getDay()) {
                case 0:
                    day = 7;
                    break;
                default:
                    day = d.getDay();
            }
            let week = 7 - day;
            let thisHour = new Date().getHours();
            week = (week == 0 && thisHour >= 12) ? 7 : week;
            let result = d.getTime() + week * 86400000;
            let final = result - (now as any);
            this.data.weekLeftTime = timestampToMoment(final / 1000);
            $Modal.gameLucky.data.drainTime = this.data.weekLeftTime;
        });
    }

    //获取初始化数据
    private initData() {
        $getTotalPot().then((coin) => {
            this.data.totalFinalPot = $toFixedDecimal(coin[1]);
            this.data.weekPot = $toFixedDecimal(coin[2]);
            $Modal.gameLucky.data.pot = this.data.weekPot;
        });
        this.getWeekTime();
        /**剩余投入次数 */
        $gameContractInstance.nPlayerArraySize((err, size) => {
            if (err) {
                console.log("nPlayerArraySize++++++:", err);
            } else {
                this.data.canBetTimes = size.toString();
                this.data.residueTimes = size.toString();
                let numSize = parseInt(size.toString());
                $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err3, n) => {
                    if (err3) {
                        console.log("getRollInArrayDetail++++++:", err3);
                    } else {
                        let len = n.length;
                        if (len > 0) {
                            let num = numSize - len < 0 ? 0 : numSize - len;
                            this.data.residueTimes = num + "";
                            this.data.myNum = parseInt(n[0].toString()) + "";
                        } else {
                            this.data.residueTimes = size.toString();
                            this.data.myNum = "0";
                        }
                    }
                    this.data.pageShowTime = `${this.data.residueTimes}/${this.data.canBetTimes}`;
                });
            }
        });
        $gameContractInstance.nCurrentGainId((err, id) => {
            if (err) {
                console.log("nCurrentGainId++", err);
            } else {
                this.data.currentNum = id.toString();
            }
        });
        $gameContractInstance.nBugBonus((err, coin) => {
            if (err) {
                console.log(err);
            } else {
                this.data.input = coin.toString();
                this.data.price = parseInt(coin.toString()) / 10000 + " CBE";
            }
        });
        // 获取CanWithdraw
        $myAddress && this.getCanWithdraw();
        //生成小人
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
            if (err3) {
                console.log(err3);
            } else {
                let len = roll.length;
                this.currentMen = len;
                if (roll[0]) {
                    this.myLastNum = roll[0].toString();
                }
                for (let i = 0; i < len; i++) {
                    setTimeout(() => {
                        $Content.container.addOneMiner();
                    }, i * 400);
                }
            }
        });

        Game.playAnimation(this.jitter, true);
        /**
         * show引导框
         */
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, id) => {
            if (err) {
                console.log(err);
            } else {
                let hasGuide = localStorage.getItem("hasGuide");
                $Guide.guideHome.visible = id.toString() == "0" && hasGuide != "hadGuide";
                localStorage.setItem("hasGuide", "hadGuide");
            }
        });
    }

    private currentMen = 0; //当前人的个数
    private myLastNum = 0;  //我的最新出局序号，这个值一增加 车儿就开着走

    /**
     * 提取
     */
    private withdrawFun() {
        if ($myAddress) {
            if (this.data.canWithDraw == "0") {
                $alert('可提金额为0');
                return;
            }
            let data = $gameContractInstance.withDraw.getData();
            let parameters = {
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
            $tp.pushMoacTransaction(parameters).then((response) => {
                if (!response.result) {
                    alert('交易发送失败！' + JSON.stringify(response));
                } else {
                    $alert('提取交易发送成功，请等待交易完成！'); // 链上的失败消息也会弹出来
                }
            });
        } else {
            notSignInMetamask();
        }
    }

    // house click
    private trainGo() {
        $Content.container.trainRun();
        // $Content.container.removeOneMiner();
        // $Content.container.clearAllMiner();
    }

    // 判断额度
    private chargeLimit() {
        return new Promise((resolve, reject) => {
            if (!$myAddress) {
                notSignInMetamask();
                reject("请在tp钱包中打开游戏");
                return;
            }
            let from = $myAddress;
            let to = $gameContractInstance.address;
            $tokenContractInstance.allowance(from, to, (err, data) => {
                if (err) {
                    $loadingDisplay(false);
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
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
                    $loadingDisplay(false);
                } else {
                    resolve(token.toString());
                }
            });
        });
    }

    private getMyApprove() {
        let from = $myAddress;
        let to = $gameContractInstance.address;
        $myAddress && $tokenContractInstance.allowance(from, to, (err, data) => {
            if (err) {
                console.log("4545" + err);
            } else {
                this.data.approveNum = data.toString();
            }
        });
    }

    /**
     * 买入
     */
    private buyKeyFun() {
        if (parseInt(this.data.residueTimes) < 1) {
            $alert("购买次数达到上限!请等待出局后再购买!");
            return;
        }
        $loadingDisplay(true);
        this.chargeLimit().then((has) => {
            // 下注控制
            getMyKeyProp().then((data) => {
                let input = parseInt(data[3]);
                $gameContractInstance.nBugBonus((err, coin) => {
                    if (err) {
                        $alert(err);
                    } else {
                        if (input >= coin) {
                            this.data.input = "0";
                        } else {
                            this.data.input = coin;
                        }
                        if (Number(has) > 0 && parseInt(has + "") >= parseInt(this.data.input)) {
                            this.chargeBalance().then((coin) => {
                                if (Number(coin) < parseInt(this.data.input)) {
                                    $alert(`您的CBE余額為${$toFixedDecimal(coin)},不足以支付本次投入`);
                                    return;
                                }
                                this.buyEntrance();
                            });
                        } else {
                            // 弹窗去充值额度
                            $loadingDisplay(false);
                            if (confirm("您的授权额度为" + $toFixedDecimal(has) + ",将为您进行授权")) {
                                this.approveFun(() => {
                                    $loadingDisplay(true);
                                    let timer = setInterval(() => {
                                        if ($Content.game.data.approveNum == "0") {
                                            $Content.game.getMyApprove();
                                        } else {
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
        }, (err) => {
            $alert(err);
        });
    }

    private approveFun(f) {
        let approve = "10000000000";
        let data = $tokenContractInstance.approve.getData($gameContractInstance.address, approve);
        let parameters = {
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
        $tp.pushMoacTransaction(parameters).then((response) => {
            if (!response.result) {
                $alert('交易发送失败！' + response.message);
            } else {
                if (f) {
                    f();
                }
            }
        });
    }

    // 下注入口
    private buyEntrance() {
        getIsBegin().then((bool) => {
            if (!bool) {
                this.chargeFirst();
            } else {
                setOverTime().then((time) => {
                    // if (time > 86400) {
                    //     $alert($AlertMsg.readyTime);
                    //     return;
                    // }
                    this.chargeFirst();
                });
            }
        });
    }

    /**
     * 判断是否是第一次购买
     */
    private chargeFirst() {
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        $gameContractInstance.pIDxAddr_($myAddress, (err, id) => {
            if (err) {
                $alert("pIDxAddr_===" + err);
            } else {
                let _referrer = "0x0000000000000000000000000000000000000000";
                if (id.toString() == "0" && !$chargeEquelAddr($beginAddr, $myAddress)) {
                    $loadingDisplay(false);
                    $Modal.bandCodeAlert.visible = true;
                } else {
                    this.rollIn(_referrer);
                }
            }
        });
    }

    private rollIn(_referrer) {
        if ($myAddress == _referrer) {
            _referrer = "0x0000000000000000000000000000000000000000";
        }
        this.moacBuyFun(_referrer);
    }

    private moacBuyFun(_referrer) {
        try {
            // alert('this.data.input：' + this.data.input);
            // alert('_referrer：' + _referrer);
            $loadingDisplay(false);
            let data = $gameContractInstance.coinRollIn.getData(this.data.input, _referrer);
            let parameters = {
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
            $tp.pushMoacTransaction(parameters).then((response) => {
                if (!response.result) {
                    alert('交易发送失败！' + response.message);
                } else {
                    $alert('交易发送成功，请等待交易完成！'); // 链上的失败消息也会弹出来
                    // alert('交易发送成功，请等待交易完成！' + JSON.stringify(response.data)); // 链上的失败消息也会弹出来
                }
            });
        } catch (e) {
            alert("catch+++:" + e);
        }
    }

    static playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
        if (isLoop) {
            for (let key in target.items) {
                target.items[key].props = {loop: true};
            }
        }
        target.play();
    }

    // 统计弹窗
    static showStatModalFun() {
        $Modal.gameStatistics.getExtractList();
        $modalShowEvent($Modal.gameStatistics, 205);
    }

    // 邀请人弹窗
    private showInviteModalFun() {
        $myAddress && $gameContractInstance.playerIsRegi($myAddress, (err, bool) => {
            if (err) {
                alert(err);
            } else {
                if (bool) {
                    $Modal.register.registerGroup.visible = false;
                    $Modal.register.linkGroup.visible = true;
                    $Modal.register.getUrl();
                } else {
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
    }

    // 幸运奖弹窗
    static showLuckyModalFun() {
        $Modal.gameLucky.getLuckyList();
        $modalShowEvent($Modal.gameLucky, 205);
    }

    // 最后大奖弹窗
    static showLastBigPrizeFun() {
        $Modal.finalBonus.getLastList();
        $modalShowEvent($Modal.finalBonus, 205);
    }

    // 语言弹窗
    static showLanguageModalFun() {
        $modalShowEvent($Modal.language, 205);
    }

    // 攻略弹窗
    static showFaqModalFun() {
        $modalShowEvent($Modal.gameHelp, 205);
    }

    // 打开信息面板弹窗
    private showDataModalFun() {
        this.dataPanel.visible = true;
        this.openBtn.visible = false;
        this.headBg.visible = false;
    }

    // 关闭信息面板弹窗
    private closeDataModalFun() {
        this.dataPanel.visible = false;
        $Guide.guideHome.visible = false;
        this.openBtn.visible = true;
        this.headBg.visible = true;
    }

    private getCanWithdraw() {
        $myAddress && $gameContractInstance.allowMoney($myAddress, (err, coin) => {
            if (err) {
                console.log(err);
            } else {
                this.data.canWithDraw = $toFixedDecimal(coin);
            }
        });
    }
}
