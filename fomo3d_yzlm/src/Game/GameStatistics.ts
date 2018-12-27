class GameStatistics extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameStatisticsUI.exml";
    }

    private data = {
        currentRound: '1',
        round: {
            drainTime: '00:00:00',
            activePot: 'e0',
            usdt: '0.00000',
            firstBonus: 'e0',
            secondBonus: 'e0'
        },
        stats: {
            totalInvested: '0',
            totalUSTD: '0.00000',
            rewards: '0',
            rewardsUSTD: '0.00000',
            purchased: '0',
            purchasedSecond: '0 Seconds',
            extractNum: "0",
            extractCoin1: "0"
        },
        teams: {
            snakes: '0 ETH',
            whales: '0 ETH',
            bulls: '0 ETH',
            bears: '0 ETH',
        }
    };

    private status: number = 0;

    public modal: eui.Rect;
    public close: eui.Image;
    public roundTab: eui.Group;
    public langRoundTime: eui.Image;
    public langJackPot: eui.Image;
    public langMyKeys0: eui.Image;
    public statsTab: eui.Group;
    public totalInvestment: eui.Image;
    public totalInvestment0: eui.Image;
    public totalTime: eui.Image;
    public teamsTab: eui.Group;
    public teamTabScr: eui.Group;
    public tab1: eui.Group;
    public tabBg1: eui.Image;
    public tabAct1: eui.Image;
    public tabActEn1: eui.Image;
    public tab2: eui.Group;
    public tabBg2: eui.Image;
    public tabAct2: eui.Image;
    public tabActEn2: eui.Image;
    public tab3: eui.Group;
    public tabBg3: eui.Image;
    public tabAct3: eui.Image;
    public tabActEn3: eui.Image;
    public langTitleImg: eui.Image;


    private updateData: egret.Timer = new egret.Timer(2000, 0);


    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);

        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);

        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);

        let unit = new ExtractUnitTs();
        this.teamTabScr.addChild(unit);
    }

    private getData() {
        this.getTeamTotalPot();
        this.getTotalKey();
    }

    /**
     * 获取四个队的奖池总金额
     */
    private getTeamTotalPot() {
        $gameContractInstance.teamPot((err, Coin) => {
            if (err) {
                console.log("++++++", err);
                this.updateData.stop();
            } else {
                // $Content.game.data.totalInvest = "e" + parseFloat(web3js.fromWei(Coin[0]).toString()).toFixed(2);
                // this.data.stats.totalInvested = (parseFloat(web3js.fromWei(Coin[0]).toString())).toFixed(4) + "";
                this.data.stats.rewards = (parseFloat(web3js.fromWei(Coin[0]).toString()) * 0.9).toFixed(4) + "";
                this.data.round.firstBonus = "e" + (parseFloat(web3js.fromWei(Coin[1]).toString()) * 0.4).toFixed(4);
                this.data.round.secondBonus = "e" + (parseFloat(web3js.fromWei(Coin[1]).toString()) * 0.2).toFixed(4);
            }
        });

        getEthXUSDrate().then((rate) => {
            this.data.stats.totalUSTD = (parseFloat(rate + "") * parseFloat(this.data.stats.totalInvested + "")).toFixed(4) + "";
            $Content.game.data.totalInvestUsd = this.data.stats.totalUSTD;
        });
    }

    /**
     * 获取总钥匙
     */
    private getTotalKey() {
        $gameContractInstance.round((err, round) => {
            if (err) {
                console.log(err);
            } else {
                this.data.currentRound = '' + round.toNumber();
            }
        });
    }

    private clostFun() {
        this.updateData.stop();
        let group = $Modal.gameStatistics.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({y: 1716}, 200).call(function () {
            $Modal.gameStatistics.visible = false;
            tw = null;
        });
    }

    private selectTab(target) {
        if (target !== this.status) {
            if (target === 0) {
                this.tabBg1.visible = true;
                this.tabAct1.source = 'statistics_text_round1_zh_png';
                this.tabActEn1.source = 'statistics_text_round1_en_png';

                this.tabBg2.visible = false;
                this.tabAct2.source = 'statistics_text_stats1_zh_png';
                this.tabActEn2.source = 'statistics_text_stats1_en_png';

                this.tabBg3.visible = false;
                this.tabAct3.source = 'statistics_text_teams1_zh_png';
                this.tabActEn3.source = 'statistics_text_teams1_en_png';

                this.roundTab.visible = true;
                this.statsTab.visible = false;
                this.teamsTab.visible = false;
            }
            if (target === 1) {
                this.tabBg1.visible = false;
                this.tabAct1.source = 'statistics_text_round1_zh_png';
                this.tabActEn1.source = 'statistics_text_round1_en_png';

                this.tabBg2.visible = true;
                this.tabAct2.source = 'statistics_text_stats1_zh_png';
                this.tabActEn2.source = 'statistics_text_stats1_en_png';

                this.tabBg3.visible = false;
                this.tabAct3.source = 'statistics_text_teams1_zh_png';
                this.tabActEn3.source = 'statistics_text_teams1_en_png';

                this.roundTab.visible = false;
                this.statsTab.visible = true;
                this.teamsTab.visible = false;
            }
            if (target === 2) {
                this.tabBg1.visible = false;
                this.tabAct1.source = 'statistics_text_round1_zh_png';
                this.tabActEn1.source = 'statistics_text_round1_en_png';

                this.tabBg2.visible = false;
                this.tabAct2.source = 'statistics_text_stats1_zh_png';
                this.tabActEn2.source = 'statistics_text_stats1_en_png';

                this.tabBg3.visible = true;
                this.tabAct3.source = 'statistics_text_teams1_zh_png';
                this.tabActEn3.source = 'statistics_text_teams1_en_png';

                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = true;
            }
            this.status = target;
        }
    }
}
