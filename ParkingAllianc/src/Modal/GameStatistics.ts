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
            activePot: '0',
            firstBonus: '0',
            secondBonus: '0'
        },
        stats: {
            currentNum: '0',
            rewards: '0',
            totalBuyTimes: "0",
            myReinvest: "0"
        },
    };

    private status: number = 0;

    public closeBg: eui.Rect;
    public title: eui.Image;
    public close: eui.Image;
    public roundTab: eui.Group;
    public overtimeImg: eui.Image;
    public potImg: eui.Image;
    public statsTab: eui.Group;
    public listNum: eui.Image;
    public totalInvestment: eui.Image;
    public totalBuyTimes: eui.Image;
    public myBuyTimes: eui.Image;
    public teamsTab: eui.Group;
    public teamTabScr: eui.Group;
    public lucky: eui.Group;
    public luckyInfo: eui.Group;
    public luckyTitle: eui.Image;
    public tab1: eui.Group;
    public tabAct1: eui.Image;
    public tabActEn1: eui.Image;
    public tabBitmap1: eui.BitmapLabel;
    public tab2: eui.Group;
    public tabAct2: eui.Image;
    public tabActEn2: eui.Image;
    public tabBitmap2: eui.BitmapLabel;
    public tab3: eui.Group;
    public tabAct3: eui.Image;
    public tabActEn3: eui.Image;
    public tabBitmap3: eui.BitmapLabel;
    public tab4: eui.Group;
    public tabAct4: eui.Image;
    public tabActEn4: eui.Image;
    public tabBitmap4: eui.BitmapLabel;

    private unit;

    private updateData: egret.Timer = new egret.Timer(2000, 0);

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);

        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);
        this.tab4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 3), this);

        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.unit = new ExtractUnitTs();
        this.teamTabScr.addChild(this.unit);

        let luckyUnit = new LuckyPersonUnitTs();
        this.luckyInfo.addChild(luckyUnit);
    }

    private getExtractList(){
        this.unit.getData();
    }

    private getData() {
        this.getTeamTotalPot();
        this.getTotalKey();
    }

    /**
     * 获取奖池总金额
     */
    private getTeamTotalPot() {
        $gameContractInstance.teamPot((err, Coin) => {
            if (err) {
                console.log("++++++", err);
                this.updateData.stop();
            } else {
                this.data.stats.rewards = (parseFloat(web3js.fromWei(Coin[0]).toString()) * 0.92).toFixed(3) + "";
            }
        });
    }

    /**
     * 获取总论数
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

    private closeFun() {
        $closeModalFun($Modal.gameStatistics, -1360);
    }

    private selectTab(target) {
        if (target !== this.status) {
            if (target === 0) {
                this.tabAct1.source = 'statistics_text_round1_zh_png';
                this.tabActEn1.source = 'statistics_text_round1_en_png';
                this.tabBitmap1.font = "static_round_gold_fnt";

                this.tabAct2.source = 'statistics_text_stats_zh_png';
                this.tabActEn2.source = 'statistics_text_stats_en_png';
                this.tabBitmap2.font = "static_round_fnt";

                this.tabAct3.source = 'statistics_text_teams_zh_png';
                this.tabActEn3.source = 'statistics_text_teams_en_png';
                this.tabBitmap3.font = "static_round_fnt";

                this.tabAct4.source = 'statistics_text_rank_zh_png';
                this.tabActEn4.source = 'statistics_text_rank_en_png';
                this.tabBitmap4.font = "static_round_fnt";

                this.roundTab.visible = true;
                this.statsTab.visible = false;
                this.teamsTab.visible = false;
                this.lucky.visible = false;
                this.tab1.$children[3].visible = true;
                this.tab2.$children[3].visible = false;
                this.tab3.$children[3].visible = false;
                this.tab4.$children[3].visible = false;
            }
            if (target === 1) {
                this.tabAct1.source = 'statistics_text_round_zh_png';
                this.tabActEn1.source = 'statistics_text_round_en_png';
                this.tabBitmap1.font = "static_round_fnt";

                this.tabAct2.source = 'statistics_text_stats1_zh_png';
                this.tabActEn2.source = 'statistics_text_stats1_en_png';
                this.tabBitmap2.font = "static_round_gold_fnt";

                this.tabAct3.source = 'statistics_text_teams_zh_png';
                this.tabActEn3.source = 'statistics_text_teams_en_png';
                this.tabBitmap3.font = "static_round_fnt";

                this.tabAct4.source = 'statistics_text_rank_zh_png';
                this.tabActEn4.source = 'statistics_text_rank_en_png';
                this.tabBitmap4.font = "static_round_fnt";

                this.roundTab.visible = false;
                this.statsTab.visible = true;
                this.teamsTab.visible = false;
                this.lucky.visible = false;
                this.tab1.$children[3].visible = false;
                this.tab2.$children[3].visible = true;
                this.tab3.$children[3].visible = false;
                this.tab4.$children[3].visible = false;
            }
            if (target === 2) {
                this.tabAct1.source = 'statistics_text_round_zh_png';
                this.tabActEn1.source = 'statistics_text_round_en_png';
                this.tabBitmap1.font = "static_round_fnt";

                this.tabAct2.source = 'statistics_text_stats_zh_png';
                this.tabActEn2.source = 'statistics_text_stats_en_png';
                this.tabBitmap2.font = "static_round_fnt";

                this.tabAct3.source = 'statistics_text_teams1_zh_png';
                this.tabActEn3.source = 'statistics_text_teams1_en_png';
                this.tabBitmap3.font = "static_round_gold_fnt";

                this.tabAct4.source = 'statistics_text_rank_zh_png';
                this.tabActEn4.source = 'statistics_text_rank_en_png';
                this.tabBitmap4.font = "static_round_fnt";

                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = true;
                this.lucky.visible = false;
                this.tab1.$children[3].visible = false;
                this.tab2.$children[3].visible = false;
                this.tab3.$children[3].visible = true;
                this.tab4.$children[3].visible = false;
            }
            if (target === 3) {
                this.tabAct1.source = 'statistics_text_round_zh_png';
                this.tabActEn1.source = 'statistics_text_round_en_png';
                this.tabBitmap1.font = "static_round_fnt";

                this.tabAct2.source = 'statistics_text_stats_zh_png';
                this.tabActEn2.source = 'statistics_text_stats_en_png';
                this.tabBitmap2.font = "static_round_fnt";

                this.tabAct3.source = 'statistics_text_teams_zh_png';
                this.tabActEn3.source = 'statistics_text_teams_en_png';
                this.tabBitmap3.font = "static_round_fnt";

                this.tabAct4.source = 'statistics_text_rank1_zh_png';
                this.tabActEn4.source = 'statistics_text_rank1_en_png';
                this.tabBitmap4.font = "static_round_gold_fnt";

                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = false;
                this.lucky.visible = true;
                this.tab1.$children[3].visible = false;
                this.tab2.$children[3].visible = false;
                this.tab3.$children[3].visible = false;
                this.tab4.$children[3].visible = true;
            }
            this.status = target;
        }
    }
}
