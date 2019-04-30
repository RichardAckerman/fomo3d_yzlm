var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StatisticsTs = (function (_super) {
    __extends(StatisticsTs, _super);
    function StatisticsTs() {
        var _this = _super.call(this) || this;
        _this.data = {
            currentRound: '1',
            round: {
                drainTime: '24:00:00',
                activePot: '0',
            },
            stats: {
                currentNum: '1',
                rewards: '0',
                totalBuyTimes: "0",
                myReinvest: "0",
                myOutTimes: "0" // 我的出局数
            },
        };
        _this.status = 0;
        /**load Container skin */
        _this.skinName = "resource/eui_skins/modal/StatisticsPanel.exml";
        return _this;
    }
    StatisticsTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);
        this.unit = new StatisticsUnit();
        this.teamTabScr.addChild(this.unit);
    };
    StatisticsTs.prototype.getExtractList = function () {
        this.unit.getData();
        this.getData();
    };
    StatisticsTs.prototype.getData = function () {
        this.getTeamTotalPot();
        this.getRound();
    };
    /**
     * 获取奖池总金额
     */
    StatisticsTs.prototype.getTeamTotalPot = function () {
        var _this = this;
        $gameContractInstance.teamPot(function (err, Coin) {
            if (err) {
                console.log("++++++", err);
            }
            else {
                _this.data.round.activePot = $toFixedDecimal(Coin[1]);
                _this.data.stats.rewards = parseFloat($toFixedDecimal(Coin[0])) * 0.92 + "";
            }
        });
        $gameContractInstance.nRollIn(function (err, id) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.stats.totalBuyTimes = id.toString();
            }
        });
    };
    /**
     * 获取总论数
     */
    StatisticsTs.prototype.getRound = function () {
        var _this = this;
        $gameContractInstance.round(function (err, round) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.currentRound = '' + round.toNumber();
            }
        });
    };
    StatisticsTs.prototype.closeFun = function () {
        $closeModalFun($Modal.gameStatistics, -1360);
    };
    StatisticsTs.prototype.selectTab = function (target) {
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
    };
    return StatisticsTs;
}(eui.Component));
__reflect(StatisticsTs.prototype, "StatisticsTs");
