class GameStatistics extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameStatisticsUI.exml";
    }

    private data = {
        currentRound: '#1',
        round: {
            drainTime: '00:00:00',
            activePot: '0',
            usdt: '0.00000 USDT',
            myKeys: '0',
            totalKeys: 'Total 0 Keys',
        },
        stats: {
            totalInvested: '0',
            totalUSTD: '0.00000 USDT',
            rewards: '0',
            rewardsUSTD: '0.00000 USDT',
            purchased: '0',
            purchasedSecond: '0 Seconds',
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
    public langTitleImg: eui.Image;
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
    public roundTab: eui.Group;
    public langRoundTime: eui.Image;
    public langJackPot: eui.Image;
    public langMyKeys: eui.Image;
    public statsTab: eui.Group;
    public totalInvestment: eui.Image;
    public totalDividend: eui.Image;
    public totalTime: eui.Image;
    public teamsTab: eui.Group;
    public snakeTeam: eui.Image;
    public whaleTeam: eui.Image;
    public cowTeam: eui.Image;
    public bearTeam: eui.Image;

    private updateData: egret.Timer = new egret.Timer(2000, 0);


    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);

        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);

        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
    }

    private getData() {
        this.getTeamTotalPot();
        this.getTotalKey();
    }

    /**
     * 获取四个队的奖池总金额
     */
    private getTeamTotalPot() {
        $gameContractInstance.teamPot(0, (err, Coin) => {
            if (err) {
                console.log("++++++", err);
                this.updateData.stop();
            } else {
                this.data.teams.whales = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        $gameContractInstance.teamPot(1, (err, Coin) => {
            if (err) {
                console.log(err);
            } else {
                this.data.teams.bears = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        $gameContractInstance.teamPot(2, (err, Coin) => {
            if (err) {
                console.log(err);
            } else {
                this.data.teams.snakes = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        $gameContractInstance.teamPot(3, (err, Coin) => {
            if (err) {
                console.log(err);
            } else {
                this.data.teams.bulls = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        this.data.stats.totalInvested = (parseFloat(this.data.teams.snakes.split("E")[0]) + parseFloat(this.data.teams.whales.split("E")[0])
            + parseFloat(this.data.teams.bulls.split("E")[0]) + parseFloat(this.data.teams.bears.split("E")[0])).toFixed(6) + "";
        $Content.game.data.totalInvest = "e" + parseFloat(this.data.stats.totalInvested).toFixed(2);
        getEthXUSDrate().then((rate) => {
            this.data.stats.totalUSTD = (parseFloat(rate + "") * parseFloat(this.data.stats.totalInvested + "")).toFixed(4) + " USDT";
            $Content.game.data.totalInvestUsd = this.data.stats.totalUSTD;
        });
        $gameContractInstance.totalKeyBonus((err, Coin) => {
            if (err) {
                console.log(err);
            } else {
                this.data.stats.rewards = parseFloat(web3js.fromWei(Coin, 'ether') + "").toFixed(6) + "";
                getEthXUSDrate().then((rate) => {
                    this.data.stats.rewardsUSTD = (parseFloat(rate + "") * parseFloat(this.data.stats.rewards + "")).toFixed(4) + " USDT";
                });
            }
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
                this.data.currentRound = '#' + round.toNumber();
            }
        });
        $gameContractInstance.totalKey((err, keys) => {
            if (err) {
                console.log(err);
            } else {
                this.data.round.totalKeys = `Total ${keys.toString()} Keys`;
                this.data.stats.purchasedSecond = keys * 30 + " S";
                this.data.stats.purchased = (keys * 30 / 60 / 60 / 24 / 365).toFixed(4) + "";
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
                this.tabAct1.source = 'statistics_text_round_zh_png';
                this.tabActEn1.source = 'statistics_text_round_en_png';

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
                this.tabAct2.source = 'statistics_text_stats_zh_png';
                this.tabActEn2.source = 'statistics_text_stats_en_png';

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
                this.tabAct3.source = 'statistics_text_teams_zh_png';
                this.tabActEn3.source = 'statistics_text_teams_en_png';

                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = true;
            }
            this.status = target;
        }
    }
}
