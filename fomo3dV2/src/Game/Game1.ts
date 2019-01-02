/**
 * Game module
 */
class Game1 extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameUI.exml";
    }

    /**
     * game data
     */
    public data = {
        totalInvest: "e0",
        totalInvestUsd: "0 USDT",
        roundNum: "1",
        jackpot: "e0",
        jackpotUs: "0 USDT",
        timeRemaining: '00:00:00',
        choosedTeam: 2,  // 0=鲸whales , 1=熊bears , 2=蛇sneks , 3=牛bulls
        input: '1',  //输入框 代币数量
        exchangeRate: 0,   //汇率
        conversionNum: '',
        totalKeys: '234234234',
        marqueeText: "", // 跑马灯滚动的内容
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
    public bearTeam: eui.Group;
    public cowTeam: eui.Group;
    public snakeTeam: eui.Group;
    public whaleTeam: eui.Group;
    public leftBtn: eui.Image;
    public rightBtn: eui.Image;
    public promptUser: eui.Group;
    public statisticsBtn: eui.Image;
    public registerBtn: eui.Image;
    public languageBtn: eui.Image;
    public helpBtn: eui.Image;
    public showBuyModal: eui.Group;
    public myAsset: eui.Image;
    public predictBonus: eui.Image;
    public firstImg: eui.Image;
    public secondImg: eui.Image;
    public profidImg: eui.Image;
    public keyImg: eui.Image;
    public extractBtn: eui.Group;
    public marqueeBg: eui.Image;
    public marquee: eui.Group;
    public marqueeLabel: eui.Label;
    public roundZh: eui.Group;
    public roundNum: eui.BitmapLabel;
    public roundEn: eui.Group;
    public roundNum0: eui.BitmapLabel;

    private updateData: egret.Timer = new egret.Timer(1000, 0);
    private marqueeArr = [];
    private MarqueeTimer;
    private intervalIsStart = false;
    private myRound = "0"; // 我当前属于第几轮
    private roundError = false;
    private tempKeyNum = "0";

    protected childrenCreated(): void {
        super.childrenCreated();

        this.conversionFun();    //执行一次汇率换算
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
        this.showBuyModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.testat, this);
        // this.showBuyModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBuyModalFun, this);

        setOverTime().then((time) => {
            time = time < 0 ? 0 : time;
            this.overTime = parseInt(time + "");
        }); // 设置游戏结束倒计时
        getTotalPot().then((keys) => {
            this.data.jackpot = "e" + Number(Number(keys).toFixed(3));
            this.conversionFun();
        });
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.getKeyPrice();
        this.MarqueeTimer = setInterval(() => {
            this.isMarquee(); // 跑马灯
        }, 3000);
        this.storeMarquee();
        /**modals event */
        this.openModalsEvent();
    }


    private storeMarquee() {
        localStorage.removeItem("marqueeText1");
        localStorage.removeItem("marqueeText2");
        localStorage.removeItem("marqueeText3");
        localStorage.marqueeText1 && this.marqueeArr.push(localStorage.marqueeText1);
        localStorage.marqueeText2 && this.marqueeArr.push(localStorage.marqueeText2);
        localStorage.marqueeText3 && this.marqueeArr.push(localStorage.marqueeText3);
    }

    /**
     * 跑马灯
     */
    private isMarquee() {
        if (this.marqueeArr.length > 0) {
            clearInterval(this.MarqueeTimer);
            this.marqueeBg.visible = true;
            this.marquee.visible = true;
            this.data.marqueeText = this.marqueeArr[0];
            let xBegin = this.marquee.width;
            let labelW = this.marqueeLabel.width;
            this.marqueeLabel.x = xBegin;
            let twL = egret.Tween.get(this.marqueeLabel, {loop: true});//开始动画
            twL.to({x: xBegin}, 3000);
            twL.to({x: 0 - labelW - 10}, 10000).call(() => {
                if (this.marqueeArr.length > 2) {
                    this.marqueeArr[0] = this.marqueeArr[1];
                    this.marqueeArr[1] = this.marqueeArr[2];
                    this.marqueeArr[2] = this.marqueeArr[0];
                } else if (this.marqueeArr.length > 1) {
                    this.marqueeArr[0] = this.marqueeArr[1];
                    this.marqueeArr[1] = this.marqueeArr[0];
                }
            });
        }
    }

    private showBuyModalFun() {
        $Modal.buyKey.data.choosedTeam = this.data.choosedTeam;
        $Modal.buyKey.getInitKeyPrice();
        this.modalShowEvent($Modal.buyKey);
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
                    this.overTime = 21600;
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
                if (this.overTime > 21600) {
                    this.jackPotLabel.visible = false;
                    this.readyTimeLabel.visible = true;
                    this.overTime -= 21600;
                } else {
                    this.jackPotLabel.visible = true;
                    this.readyTimeLabel.visible = false;
                }
            });
            getTotalPot().then((keys) => {
                this.data.jackpot = "e" + Number(Number(keys).toFixed(2));
                this.data.moduleData.firstBonus = Number((Number(keys) * 0.3).toFixed(5)) + "";
                this.data.moduleData.secondBonus = Number((Number(keys) * 0.078).toFixed(5)) + "";
                this.conversionFun();
                let myRate = parseFloat(this.rateUSD + "");
                this.data.jackpotUs = parseFloat(Number(keys) * myRate + "").toFixed(4) + " USDT";
                this.data.moduleData.firstBonusUs = (parseFloat(Number(keys) * myRate + "") * 0.3).toFixed(4) + " USDT";
                this.data.moduleData.secondBonusUs = (parseFloat(Number(keys) * myRate + "") * 0.078).toFixed(4) + " USDT";
                //更新统计界面奖池金额
                if ($Modal.gameStatistics.visible) {
                    $Modal.gameStatistics.data.round.activePot = parseFloat(keys + "").toFixed(6) + "";
                    $Modal.gameStatistics.data.round.usdt = (parseFloat(this.rateUSD + "") * parseFloat(keys + "")).toFixed(4) + " USDT";
                }
            });

            this.getKeyPrice();

            /**更新我的数据信息 */
            $myAddress && getMyKeyProp().then((data) => {
                this.tempKeyNum = data[1].toString();
                this.data.moduleData.myKeyNum = this.roundError ? "0" : data[1].toString();
                getKeyDividend().then((coin) => {
                    let price = parseFloat(web3js.fromWei((parseFloat(coin + ""))));
                    getKeyMapping().then((mapping) => {
                        this.myRound = mapping.toString();
                        this.roundError = this.myRound != this.data.roundNum;

                        let withDrawNum = parseFloat(web3js.fromWei(data[2], "ether").toString());
                        let costNum = parseFloat(web3js.fromWei(data[3], "ether").toString());

                        let myAllBuy = parseFloat(web3js.fromWei(data[4], "ether").toString());
                        let keyBonus = parseFloat(parseFloat(this.tempKeyNum) + "") * price - withDrawNum;

                        // console.log(parseFloat(parseFloat(this.tempKeyNum) + "") * price);
                        // console.log("data:", keyBonus, myAllBuy, withDrawNum, costNum, price, this.tempKeyNum);

                        if (keyBonus > myAllBuy * 2) {
                            keyBonus = myAllBuy * 2;
                        }

                        keyBonus -= costNum;

                        keyBonus = keyBonus <= 0 ? 0 : keyBonus;

                        getMyEtraProp().then((EtraData) => {
                            let refereesBonus = parseFloat(web3js.fromWei(EtraData[1], "ether").toString());
                            this.data.moduleData.myBonus = parseFloat(keyBonus + refereesBonus + "").toFixed(5);
                            this.data.moduleData.myBonusUs = (parseFloat(this.rateUSD + "") * parseFloat(this.data.moduleData.myBonus + "")).toFixed(4) + " USDT";
                            if ($Modal.extract.visible) {
                                $Modal.extract.data.scam = keyBonus.toFixed(5);
                                $Modal.extract.data.advice = refereesBonus.toFixed(5);
                                $Modal.extract.data.total = this.data.moduleData.myBonus;
                                $Modal.extract.data.tatalUSD = this.data.moduleData.myBonusUs;
                            }

                            if ($Modal.gameStatistics.visible) {
                                $Modal.gameStatistics.data.round.myKeys = this.data.moduleData.myKeyNum;
                            }
                            this.data.totalKeys = data[2].toString();
                            $Modal.buyKey.data.totalKeys = this.roundError ? "0" : data[1].toString();

                            if ($Modal.refereeInfo.visible) {
                                let url = location.href.split("?")[0];
                                // $Modal.refereeInfo.nameUrl.text = url + "?" + (web3js.toAscii(data[1]));
                            }
                        });
                    });
                });
            }, (err) => {
                console.log(err)
            })
        }

        this.data.timeRemaining = timestampToMoment(this.overTime);
        //更新统计界面倒计时
        if ($Modal.gameStatistics.visible) {
            $Modal.gameStatistics.data.round.drainTime = this.data.timeRemaining;
        }
    }

    /**
     * 获取钥匙价格
     */
    private getKeyPrice() {
        $gameContractInstance.keyPriceCurrent((err, price) => {
            if (err) {
                console.log(err)
            } else {
                this.data.exchangeRate = parseFloat(web3js.fromWei(price));
            }
        });
    }


    /**
     * tweens
     */
    private startTweens() {
        let twL = egret.Tween.get(this.leftBtn, {loop: true});//开始动画
        twL.to({x: 53}, 250);
        twL.to({x: 103}, 500);

        let twR = egret.Tween.get(this.rightBtn, {loop: true});//开始动画
        twR.to({x: 905}, 250);
        twR.to({x: 865}, 500);
    }

    /**
     * choose team , direction:['left', 'right']
     */
    private touchBegin(event) {
        this.eventData.begin = event.stageX;
    }

    private touchEnd(event) {
        this.eventData.end = event.stageX;
        let extent = this.eventData.end - this.eventData.begin;
        if (extent > 100) {
            this.selectLeft();
        }
        if (extent < -100) {
            this.selectRight();
        }
    }

    private chooseTeam(direction) {
        if (direction === 'left') {
            this.selectLeft();
        }
        if (direction === 'right') {
            this.selectRight();
        }
    }

    private selectLeft() {
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
    }

    // 0 = 鲸whales  1 = 熊bears 2 = 蛇sneks 3 = 牛bulls
    private selectRight() {
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
    }

    /**
     * 汇率换算
     */
    private conversionFun() {
        let val = Number(this.data.input);
        let newVal;
        newVal = this.data.exchangeRate * val + 0.00000001 * val * (val - 1) / 2;

        newVal = Math.round(newVal * 1100000000) / 1000000000;
        newVal = String(newVal);
        newVal = `= ${newVal} ETH`;
        this.data.conversionNum = newVal;
    }

    /**
     * open modal events
     */
    private openModalsEvent() {
        this.statisticsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.gameStatistics);
            $Modal.gameStatistics.getData();
            $Modal.gameStatistics.updateData.start();
        }, this);

        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.gameHelp);
        }, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if ($myAddress) {
                getMyEtraProp().then((data) => {
                    if (data[0] == "0x0000000000000000000000000000000000000000000000000000000000000000") {
                        this.modalShowEvent($Modal.register);
                    } else {
                        this.modalShowEvent($Modal.refereeInfo);
                        $Modal.refereeInfo.getUrl();
                        $Modal.refereeInfo.updateData.start();
                    }
                }, (err) => {
                    console.log(err)
                })
            } else {
                this.modalShowEvent($Modal.register);
            }
        }, this);

        this.extractBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, id) => {
                if (err) {
                    console.log(err)
                } else {
                    let uid = id.toString();
                    $gameContractInstance.playerEtraxID_($myAddress, (err, data) => {
                        console.log("我的key业绩 ：", web3js.fromWei(data[2].toString()));
                    });
                }
            });
            this.modalShowEvent($Modal.extract);
        }, this);

        this.languageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.modalShowEvent($Modal.language);
        }, this);
    }

    private modalShowEvent(modal) {
        modal.visible = true;
        let group = modal.$children[1];
        let tw = egret.Tween.get(group);
        tw.to({y: 662}, 200);
        tw = null;
    }


    private pid = 1;
    private obj = {
        // {
        //     uint : [id,keyNum,withDrawNum,costNum, allBuy,refereesBonus, performance, level,currentRound],
        //     _addr: _addr,
        //     referees: referees,
        //     agents: []
        //     userName: userName,
        // }
    }

    private testat() {
        this.updateUser();
    }


    private updateUser() {
        $gameContractInstance.playerxID_(this.pid, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data);
                $gameContractInstance.playerEtraxID_(data[0], (err, other) => {
                    if (err) {
                        console.log(err)
                    } else {
                        // console.log("222", other);
                        this.obj[data[0]] = {};
                        this.obj[data[0]]._addr = data[0];
                        this.obj[data[0]].referees = data[5];
                        let arr = [pid,
                            parseInt(data[1].toString()),
                            parseInt(data[2].toString()),
                            parseInt((parseInt(data[3]) / 100000).toString()),
                            parseInt((parseInt(data[4]) / 100000).toString()),
                            parseInt(other[1].toString()),
                            parseInt(other[2].toString()),
                            parseInt(other[3].toString()),
                            parseInt(other[4].toString()),
                        ]
                        this.obj[data[0]].userName = other[0]
                        this.obj[data[0]].uint = arr;
                        console.log("++++++++++++", arr);
                        this.pid++;
                        if (this.pid < 10) {
                            this.updateUser()
                        } else {
                            this.getAgents()
                        }
                        // console.log(obj);
                    }
                })
            }
        })
    }

    private getAgents() {
        // console.log("++++++++++++", obj)
        // console.log(3)
        for (let addr in this.obj) {

            let target = addr;
            this.obj[addr].agents = [0, 0, 0, 0, 0]

            for (let i = 4; i >= 0; i--) {
                if (this.obj[target].referees === "0x0000000000000000000000000000000000000000") {
                    break
                }
                this.obj[addr].agents[i] = this.obj[this.obj[target].referees].uint[0]
                target = this.obj[target].referees
            }

        }
        // console.log("++++++++++++", this.obj)
        this.setData()
    }

    public newCon = "0x2eb5f63323ff31cb28cac7c1b2305c250ba33bde";

// [1,1,2,3,4,5,6,7,8],"0xf0d8b2dbA1FA00C39012e82c563bd28a621Ac7F9","0x2074f898c3B39A9621d9A5808a8a5Da087CE96f6",[0,1,2,4,5],"0x32412341"
    private setData() {
        $gameContractInstance = $gameContract.at(this.newCon);
        let uin = [];
        for (let addr in this.obj) {
            uin = this.obj[addr].uint;
            console.log(obj[addr]);
            console.log(obj[addr].uint, obj[addr]._addr.toString(), obj[addr].referees.toString(), obj[addr].agents, obj[addr].userName.toString())
            $gameContractInstance.fixedData(obj[addr].uint, obj[addr]._addr.toString(),
                obj[addr].referees.toString(), obj[addr].agents, obj[addr].userName.toString(), (err, data) => {
                    console.log(err, data);
                });
            break
        }
    }

}