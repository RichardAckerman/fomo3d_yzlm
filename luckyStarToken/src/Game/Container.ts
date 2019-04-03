import is = egret.is;

class Container extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
    }

    private langData: Object = $ZHTW.container;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.content();
    }

    /**
     * stack content
     */
    private content() {
        $Content.game = new Game();
        this.addChild($Content.game);

        $Modal.gameHelp = new HelpTs();  //攻略模态框
        $Modal.gameHelp.visible = false;
        this.addChild($Modal.gameHelp);

        $Modal.finalBonus = new FinalBonus();  //最后大奖切换模态框
        $Modal.finalBonus.visible = false;
        this.addChild($Modal.finalBonus);

        // $Modal.language = new LanguageTs();  //语言切换模态框
        // $Modal.language.visible = false;
        // this.addChild($Modal.language);

        $Modal.register = new Register();  //注册模态框
        $Modal.register.visible = false;
        this.addChild($Modal.register);

        $Modal.gameLucky = new LuckyTs();  //幸运奖模态框
        $Modal.gameLucky.visible = false;
        this.addChild($Modal.gameLucky);

        $Modal.gameStatistics = new StatisticsTs();  //统计模态框
        $Modal.gameStatistics.visible = false;
        this.addChild($Modal.gameStatistics);

        $Modal.loading = new LoadingTs();  //Loading模态框
        $Modal.loading.visible = false;
        this.addChild($Modal.loading);

        $Modal.gameAlert = new GameAlert();  //Alert模态框
        $Modal.gameAlert.visible = false;
        this.addChild($Modal.gameAlert);

        /*********************************guide********************************/
        $Guide.guideHome = new GuideHomeTs();  //GuideHomeTs
        $Guide.guideHome.visible = false;
        this.addChild($Guide.guideHome);

        this.addTrain("trainEmpty", 380, 1020);
        this.addSmokeStatic();

        // this.firstMinerShow();
        // this.secondMinerShow();
        // this.thirdMinerShow();
        // this.fourthMinerShow();
        // this.fifthMinerShow();

        // this.addTrain("trainFull", 380, 165 + 858);
    }

    /**
     * 1 ==> 200, 240
     * 2 ==> 570, 140
     * 3 ==> 1030, 350
     * 4 ==> 935, 1355
     * 5 ==> 575, 1410
     */
    private addSpark(x, y) {
        return this.addMiner("spark", x, y);
    }

    private emptyTrain; // 空火车对象
    private staticSmoke; // 静止烟雾对象
    private minerOnline = {
        miner1: false,
        miner2: false,
        miner3: false,
        miner4: false,
        miner5: false,
    };

    // 加火车
    private addTrain(name, x, y) {
        let data = RES.getRes(name + "_mc_json");
        let txtr = RES.getRes(name + "_tex_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.emptyTrain = new egret.MovieClip(mcFactory.generateMovieClipData("luckyStar"));
        this.emptyTrain.x = x;
        this.emptyTrain.y = y;
        $Content.game.animationG.addChild(this.emptyTrain);
        this.emptyTrain.gotoAndPlay(1, -1);
    }

    // 火车开跑--消失
    private trainRun() {
        if (!this.emptyTrain) {
            return;
        }
        let data = RES.getRes("trainRun_mc_json");
        let txtr = RES.getRes("trainRun_tex_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        let train = new egret.MovieClip(mcFactory.generateMovieClipData("luckyStar"));
        train.x = 380;
        train.y = 1028;
        $Content.game.animationG.removeChild(this.emptyTrain);
        this.emptyTrain = null;
        $Content.game.animationG.addChild(train);
        train.gotoAndPlay(1, -1);
        setTimeout(() => {
            $Content.game.animationG.removeChild(this.staticSmoke);
            this.staticSmoke = null;
            let smoke = Container.addSmokeMove();
            egret.Tween.get(train)
                .to({x: 1880}, 1800, egret.Ease.backInOut)
                .call(() => {
                    $Content.game.animationG.removeChild(train);
                    this.addTrain("trainEmpty", 380, 1020);
                });
            egret.Tween.get(smoke)
                .to({x: 1880}, 1800, egret.Ease.backInOut)
                .call(() => {
                    $Content.game.animationG.removeChild(smoke);
                    this.addSmokeStatic();
                });
        }, 800);
    }

    // 加烟雾
    private addSmokeStatic() {
        let data = RES.getRes("smokesStatic_mc_json");
        let txtr = RES.getRes("smokesStatic_tex_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.staticSmoke = new egret.MovieClip(mcFactory.generateMovieClipData("luckyStar"));
        this.staticSmoke.x = 560;
        this.staticSmoke.y = 890;
        $Content.game.animationG.addChild(this.staticSmoke);
        this.staticSmoke.gotoAndPlay(1, -1);
    }

    static addSmokeMove() {
        let data = RES.getRes("smokesMove_mc_json");
        let txtr = RES.getRes("smokesMove_tex_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        let smoke = new egret.MovieClip(mcFactory.generateMovieClipData("luckyStar"));
        smoke.x = 425;
        smoke.y = 865;
        $Content.game.animationG.addChild(smoke);
        smoke.gotoAndPlay(1, -1);
        return smoke;
    }

    // 加矿工
    private addMiner(name, x, y) {
        let data = RES.getRes(name + "_mc_json");
        let txtr = RES.getRes(name + "_tex_png");
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        let miner = new egret.MovieClip(mcFactory.generateMovieClipData("luckyStar"));
        miner.x = x;
        miner.y = y;
        $Content.game.animationG.addChild(miner);
        miner.gotoAndPlay(1, -1);
        return miner;
    }

    /**
     * 第一个矿工:  左上 180, 350
     * 第二个矿工:  正上 540, 250
     * 第三个矿工:  右上 940, 330
     * 第四个矿工:  右下 950, 1250
     * 第五个矿工:  正下 600, 1300
     */
    private firstMinerShow() {
        this.minerOnline.miner1 = true;
        let miner = this.addMiner("manPoor", 480, 650);
        miner.name = "miner1";
        egret.Tween.get(miner)
            .to({x: 480}, 0)
            .to({x: 180}, 1000)
            .to({rotation: 90, y: 640}, 200)
            .to({y: 350}, 1000).wait(200)
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                this.laborManShow(180, 350, 90, 1);
            });
    }

    private firstManRepeat(x, y, r) {
        if (!this.minerOnline.miner1) return;
        let miner = this.addMiner("manRich", x, y);
        miner.rotation = r;
        miner.name = "miner1";
        egret.Tween.get(miner).wait(400)
            .to({rotation: -90, x: x + 30}, 200)
            .to({y: 940}, 2000).wait(500)
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                if (!this.minerOnline.miner1) return;
                let poorMiner = this.addMiner("manPoor", x + 30, 940);
                poorMiner.rotation = r;
                poorMiner.name = "miner1";
                egret.Tween.get(poorMiner)
                    .to({rotation: 90, x: x}, 200)
                    .to({y: y}, 2000)
                    .call(() => {
                        $Content.game.animationG.$children.forEach((item) => {
                            if (item.name === poorMiner.name) {
                                $Content.game.animationG.removeChild(poorMiner);
                            }
                        });
                        this.laborManShow(180, 350, 90, 1);
                    });
            });
    }

    private secondMinerShow() {
        this.minerOnline.miner2 = true;
        let miner = this.addMiner("manPoor", 180, 650);
        miner.name = "miner2";
        egret.Tween.get(miner)
            .to({x: 480}, 0)
            .to({x: 180}, 1000) // 向左
            .to({rotation: 90, y: 640}, 200)
            .to({y: 350}, 1000) // 向上
            .to({rotation: 180, y: 330}, 200)
            .to({x: 550}, 1000) // 向右
            .to({rotation: 90}, 200)
            .to({y: 250}, 600).wait(300) // 向上
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                this.laborManShow(550, 250, 90, 2);
            });
    }

    private secondManRepeat(x, y, r) { // x,y是起点
        if (!this.minerOnline.miner2) return;
        let miner = this.addMiner("manRich", x, y);
        miner.name = "miner2";
        miner.rotation = r;
        egret.Tween.get(miner).wait(400)
            .to({rotation: -90, x: x + 30}, 200)
            .to({y: 330}, 600)  // 向下
            .to({rotation: 0, y: 360}, 200)
            .to({x: 180}, 1300)  // 向左
            .to({rotation: -90, x: 210}, 200)
            .to({y: 940}, 2000).wait(500)  // 向下
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                if (!this.minerOnline.miner2) return;
                let poorMiner = this.addMiner("manPoor", 210, 940);
                poorMiner.rotation = r;
                poorMiner.name = "miner2";
                egret.Tween.get(poorMiner)
                    .to({rotation: 90, x: 180}, 200)
                    .to({y: 350}, 2000) // 向上
                    .to({rotation: 180, y: 330}, 200)
                    .to({x: 550}, 1300) // 向右
                    .to({rotation: 90}, 200)
                    .to({y: 250}, 600).wait(300) // 向上
                    .call(() => {
                        $Content.game.animationG.$children.forEach((item) => {
                            if (item.name === poorMiner.name) {
                                $Content.game.animationG.removeChild(poorMiner);
                            }
                        });
                        this.laborManShow(550, 250, 90, 2);
                    });
            });
    }

    private thirdMinerShow() {
        this.minerOnline.miner3 = true;
        let miner = this.addMiner("manPoor", 720, 610);
        miner.name = `miner3`;
        miner.rotation = 180;
        egret.Tween.get(miner)
            .to({x: 720}, 0)
            .to({x: 925}, 1000) // 向右
            .to({rotation: 90, y: 630}, 200)
            .to({y: 350}, 1000).wait(200) // 向上
            .to({rotation: 180, y: 330}, 200).wait(400)
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                this.laborManShow(925, 330, 180, 3);
            });
    }

    private thirdManRepeat(x, y, r) {
        if (!this.minerOnline.miner3) return;
        let miner = this.addMiner("manRich", x, y);
        miner.name = `miner3`;
        miner.rotation = r;
        egret.Tween.get(miner).wait(400)
            .to({rotation: 270, x: 950}, 200)
            .to({y: 1250}, 2600)  // 向下
            .to({rotation: 360, y: 1275}, 200)
            .to({x: 180}, 2600)  // 向左
            .to({rotation: 450, x: 175}, 200)
            .to({y: 1110}, 700).wait(500)  // 向上
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                if (!this.minerOnline.miner3) return;
                let poorMiner = this.addMiner("manPoor", 210, 1110);
                poorMiner.rotation = 90;
                poorMiner.name = "miner3";
                egret.Tween.get(poorMiner)
                    .to({rotation: 270, x: 200}, 200)
                    .to({y: 1270}, 700) // 向下
                    .to({rotation: 180, y: 1240}, 200)
                    .to({x: 930}, 2600) // 向右
                    .to({rotation: 90, x: 930}, 200)
                    .to({y: 350}, 2600) // 向上
                    .to({rotation: 180, y: 330}, 200).wait(400)
                    .call(() => {
                        $Content.game.animationG.$children.forEach((item) => {
                            if (item.name === poorMiner.name) {
                                $Content.game.animationG.removeChild(poorMiner);
                            }
                        });
                        this.laborManShow(925, 330, 180, 3);
                    });
            });
    }

    private fourthMinerShow() {
        this.minerOnline.miner4 = true;
        let miner = this.addMiner("manPoor", 720, 610);
        miner.name = `miner4`;
        miner.rotation = 180;
        egret.Tween.get(miner)
            .to({x: 720}, 0)
            .to({x: 950}, 1000) // 向右
            .to({rotation: 270, y: 630}, 200)
            .to({y: 1250}, 2200).wait(400) // 向下
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                this.laborManShow(950, 1250, -90, 4);
            });
    }

    private fourthManRepeat(x, y, r) {
        if (!this.minerOnline.miner4) return;
        let miner = this.addMiner("manRich", x, y);
        miner.name = `miner4`;
        miner.rotation = r;
        egret.Tween.get(miner).wait(400)
            .to({rotation: 0, y: y + 20}, 200)
            .to({x: 180}, 2600)  // 向左
            .to({rotation: 90, x: 175}, 200)
            .to({y: 1110}, 700).wait(500)  // 向上
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                if (!this.minerOnline.miner4) return;
                let poorMiner = this.addMiner("manPoor", 175, 1110);
                poorMiner.rotation = 90;
                poorMiner.name = "miner4";
                egret.Tween.get(poorMiner)
                    .to({rotation: 270, x: 200}, 200)
                    .to({y: 1235}, 700) // 向下
                    .to({rotation: 180, x: 175}, 200)
                    .to({x: 950}, 2600) // 向右
                    .to({rotation: 270, y: 1250}, 200).wait(400)
                    .call(() => {
                        $Content.game.animationG.$children.forEach((item) => {
                            if (item.name === poorMiner.name) {
                                $Content.game.animationG.removeChild(poorMiner);
                            }
                        });
                        this.laborManShow(950, 1250, -90, 4);
                    });
            });
    }

    private fifthMinerShow() {
        this.minerOnline.miner5 = true;
        let miner = this.addMiner("manPoor", 720, 610);
        miner.name = `miner5`;
        miner.rotation = 180;
        egret.Tween.get(miner)
            .to({x: 720}, 0)
            .to({x: 950}, 1000) // 向右
            .to({rotation: 270, y: 630}, 200)
            .to({y: 1250}, 2200)
            .to({rotation: 360, y: 1275}, 200)
            .to({x: 560}, 1300)  // 向左
            .to({rotation: 270, x: 590}, 200)
            .to({y: 1300}, 300).wait(400) // 向下
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                this.laborManShow(590, 1300, -90, 5);
            });
    }

    private fifthManRepeat(x, y, r) {
        if (!this.minerOnline.miner5) return;
        let miner = this.addMiner("manRich", x, y);
        miner.name = `miner5`;
        miner.rotation = r;
        egret.Tween.get(miner).wait(400)
            .to({rotation: 90, x: x - 30}, 200)
            .to({y: 1275}, 300)  // 向上
            .to({rotation: 0, x: 560}, 200)
            .to({x: 180}, 1300)  // 向左
            .to({rotation: 90, x: 175}, 200)
            .to({y: 1110}, 700).wait(500)  // 向上
            .call(() => {
                $Content.game.animationG.$children.forEach((item) => {
                    if (item.name === miner.name) {
                        $Content.game.animationG.removeChild(miner);
                    }
                });
                if (!this.minerOnline.miner5) return;
                let poorMiner = this.addMiner("manPoor", 175, 1110);
                poorMiner.rotation = 90;
                poorMiner.name = "miner5";
                egret.Tween.get(poorMiner)
                    .to({rotation: 270, x: 200}, 200)
                    .to({y: 1235}, 700) // 向下
                    .to({rotation: 180, x: 175}, 200)
                    .to({x: 560}, 1300) // 向右
                    .to({rotation: 270, x: 590}, 200)
                    .to({y: 1300}, 300).wait(400) // 向下
                    .call(() => {
                        $Content.game.animationG.$children.forEach((item) => {
                            if (item.name === poorMiner.name) {
                                $Content.game.animationG.removeChild(poorMiner);
                            }
                        });
                        this.laborManShow(590, 1300, -90, 5);
                    });
            });
    }

    /**
     * 正在挖矿的人
     * @param x
     * @param y
     * @param r 旋转角度
     * @param num 矿工编号
     */
    private laborManShow(x, y, r, num) {
        if (num === 1 && !this.minerOnline.miner1)
            return;
        if (num === 2 && !this.minerOnline.miner2)
            return;
        if (num === 3 && !this.minerOnline.miner3)
            return;
        if (num === 4 && !this.minerOnline.miner4)
            return;
        if (num === 5 && !this.minerOnline.miner5)
            return;
        let miner = this.addMiner("manLabor", x, y);
        miner.name = `miner${num}`;
        miner.rotation = r;
        let spark = this.addSpark(Container.returnPosition(num)[0], Container.returnPosition(num)[1]);
        clearTimeout(this.minerTimer[`labor${num}Timer`]);
        this.minerTimer[`labor${num}Timer`] = setTimeout(() => {
            $Content.game.animationG.removeChild(spark);
            $Content.game.animationG.$children.forEach((item) => {
                if (item.name === miner.name) {
                    $Content.game.animationG.removeChild(miner);
                }
            });
            switch (num) {
                case 1:
                    this.firstManRepeat(x, y, r);
                    break;
                case 2:
                    this.secondManRepeat(x, y, r);
                    break;
                case 3:
                    this.thirdManRepeat(x, y, r);
                    break;
                case 4:
                    this.fourthManRepeat(x, y, r);
                    break;
                case 5:
                    this.fifthManRepeat(x, y, r);
                    break;
            }
        }, 4000);
    }

    static returnPosition(num) {
        if (num === 1)
            return [200, 240];
        if (num === 2)
            return [570, 140];
        if (num === 3)
            return [1030, 350];
        if (num === 4)
            return [935, 1355];
        if (num === 5)
            return [575, 1410];
    }

    /**
     ****************************************************************************************************
     */
    private minerTimer = {
        addCallbackTimer: null,
        add1Timer: null,
        add2Timer: null,
        add3Timer: null,
        add4Timer: null,
        add5Timer: null,
        labor1Timer: null,
        labor2Timer: null,
        labor3Timer: null,
        labor4Timer: null,
        labor5Timer: null,
    };

    /**
     * 清除所有矿工
     */
    private clearAllMiner(f) {
        for (let key in this.minerTimer) {
            clearTimeout(this.minerTimer[key]);
        }
        let len = $Content.game.animationG.$children.length;
        for (let i = 0; i < len; i++) {
            let item = $Content.game.animationG.$children[i];
            if (item && item.name.indexOf("miner") !== -1) {
                this.minerOnline[item.name] = false;
                egret.Tween.removeTweens(item);
                $Content.game.animationG.removeChild(item);
                i--;
            }
        }
        this.minerTimer.addCallbackTimer = setTimeout(() => {
            if (f)
                f();
        }, 1000);
    }

    /**
     * 添加所有矿工
     */
    private addAllMiner() {
        this.clearAllMiner(() => {
            this.minerTimer.add1Timer = setTimeout(() => {
                this.firstMinerShow();
            }, 200);
            this.minerTimer.add2Timer = setTimeout(() => {
                this.secondMinerShow();
            }, 400);
            this.minerTimer.add3Timer = setTimeout(() => {
                this.thirdMinerShow();
            }, 600);
            this.minerTimer.add4Timer = setTimeout(() => {
                this.fourthMinerShow();
            }, 800);
            this.minerTimer.add5Timer = setTimeout(() => {
                this.fifthMinerShow();
            }, 1000);
        });
    }

    /**
     * 添加一个矿工
     */
    private addOneMiner() {
        let exist = 0;
        for (let key in this.minerOnline) {
            if (this.minerOnline[key]) {
                exist++;
            }
        }
        if (exist === 5)
            return;
        let isAdd = false;
        while (!isAdd) {
            let random = parseInt(Math.random() * 5 + "") + 1;
            if (this.minerOnline["miner" + random]) {
                continue;
            }
            switch (random) {
                case 1:
                    this.firstMinerShow();
                    break;
                case 2:
                    this.secondMinerShow();
                    break;
                case 3:
                    this.thirdMinerShow();
                    break;
                case 4:
                    this.fourthMinerShow();
                    break;
                case 5:
                    this.fifthMinerShow();
                    break;
            }
            isAdd = true;
        }
    }

    /**
     * 移除一个矿工
     */
    private removeOneMiner() {
        let exist = 0;
        for (let key in this.minerOnline) {
            if (this.minerOnline[key]) {
                exist++;
            }
        }
        if (exist === 0)
            return;
        let isRemove = false;
        while (!isRemove) {
            let random = parseInt(Math.random() * 5 + "") + 1;
            if (!this.minerOnline["miner" + random]) {
                continue;
            }
            this.removeItem("miner" + random);
            isRemove = true;
        }
    }

    private removeItem(name) {
        $Content.game.animationG.$children.forEach((item) => {
            if (item.name === name) {
                egret.Tween.removeTweens(item);
                $Content.game.animationG.removeChild(item);
                this.minerOnline[item.name] = false;
            }
        });
    }
}
