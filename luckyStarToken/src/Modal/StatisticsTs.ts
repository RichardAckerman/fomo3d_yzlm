class StatisticsTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/modal/StatisticsPanel.exml";
    }

    private data = {
        currentRound: '1',
        round: { //轮数
            drainTime: '24:00:00',
            activePot: '0',
        },
        stats: { //统计
            currentNum: '1', // 当前出局序号
            rewards: '0',    // 总分红
            totalBuyTimes: "0", // 总投单数
            myReinvest: "0",  // 我的投单数
            myOutTimes: "0"  // 我的出局数
        },
    };

    private status: number = 0;

    public closeBg: eui.Rect;
    public title: eui.Image;
    public roundTab: eui.Group;
    public overtimeImg: eui.Image;
    public potImg: eui.Image;
    public statsTab: eui.Group;
    public listNum: eui.Image;
    public totalInvestment: eui.Image;
    public totalBuyTimes: eui.Image;
    public myBuyTimes: eui.Image;
    public myOutTimes: eui.Image;
    public teamsTab: eui.Group;
    public teamTabScr: eui.Group;
    public tab1: eui.Group;
    public tabBg1: eui.Image;
    public tabAct1: eui.Image;
    public tab2: eui.Group;
    public tabBg2: eui.Image;
    public tabAct2: eui.Image;
    public tab3: eui.Group;
    public tabBg3: eui.Image;
    public tabAct3: eui.Image;

    private unit;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);

        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);

        this.unit = new StatisticsUnit();
        this.teamTabScr.addChild(this.unit);
    }

    private getExtractList() {
        this.unit.getData();
        this.getData();
    }

    private getData() {
        this.getTeamTotalPot();
        this.getRound();
    }

    /**
     * 获取奖池总金额
     */
    private getTeamTotalPot() {
        $gameContractInstance.teamPot((err, Coin) => {
            if (err) {
                console.log("++++++", err);
            } else {
                this.data.round.activePot = $toFixedDecimal(Coin[1]);
                this.data.stats.rewards = parseFloat($toFixedDecimal(Coin[0])) * 0.815 + "";
            }
        });
        $gameContractInstance.nRollIn((err, id) => {
            if (err) {
                console.log(err);
            } else {
                this.data.stats.totalBuyTimes = id.toString();
            }
        });
    }

    /**
     * 获取总论数
     */
    private getRound() {
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
                this.tabBg1.source = 'statistics_stats_bg_xz_png';

                this.tabAct2.source = 'statistics_text_stats_zh_png';
                this.tabBg2.source = 'statistics_stats_bg_png';

                this.tabAct3.source = 'statistics_text_teams_zh_png';
                this.tabBg3.source = 'statistics_stats_bg_png';

                this.roundTab.visible = true;
                this.statsTab.visible = false;
                this.teamsTab.visible = false;
            }
            if (target === 1) {
                this.tabAct1.source = 'statistics_text_round_zh_png';
                this.tabBg1.source = 'statistics_stats_bg_png';

                this.tabAct2.source = 'statistics_text_stats1_zh_png';
                this.tabBg2.source = 'statistics_stats_bg_xz_png';

                this.tabAct3.source = 'statistics_text_teams_zh_png';
                this.tabBg3.source = 'statistics_stats_bg_png';

                this.roundTab.visible = false;
                this.statsTab.visible = true;
                this.teamsTab.visible = false;
            }
            if (target === 2) {
                this.tabAct1.source = 'statistics_text_round_zh_png';
                this.tabBg1.source = 'statistics_stats_bg_png';

                this.tabAct2.source = 'statistics_text_stats_zh_png';
                this.tabBg2.source = 'statistics_stats_bg_png';

                this.tabAct3.source = 'statistics_text_teams1_zh_png';
                this.tabBg3.source = 'statistics_stats_bg_xz_png';

                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = true;
            }
            this.status = target;
        }
    }
}
