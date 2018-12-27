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
var GameStatistics = (function (_super) {
    __extends(GameStatistics, _super);
    function GameStatistics() {
        var _this = _super.call(this) || this;
        _this.data = {
            currentRound: '1',
            round: {
                drainTime: '24:00:00',
                activePot: '0e',
            },
            stats: {
                currentNum: '0',
                rewards: '0e',
            },
        };
        _this.status = 0;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/GameStatisticsUI.exml";
        return _this;
    }
    GameStatistics.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);
        this.tab4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 3), this);
        this.unit = new ExtractUnitTs();
        this.teamTabScr.addChild(this.unit);
        this.luckyUnit = new LuckyUnitTs();
        this.luckyTabScr.addChild(this.luckyUnit);
    };
    GameStatistics.prototype.getExtractList = function () {
        this.unit.getData();
        this.luckyUnit.getData();
    };
    /**
     * 获取奖池总金额
     */
    GameStatistics.prototype.getTeamTotalPot = function () {
        var _this = this;
        $gameContractInstance.teamPot(function (err, Coin) {
            if (err) {
                console.log("++++++", err);
            }
            else {
                _this.data.stats.rewards = (parseFloat(web3js.fromWei(Coin[0]).toString()) * 0.9).toFixed(0) + "e";
            }
        });
    };
    GameStatistics.prototype.closeFun = function () {
        $closeModalFun($Modal.gameStatistics, -1360);
    };
    GameStatistics.prototype.selectTab = function (target) {
        if (target !== this.status) {
            if (target === 0) {
                this.tabBg1.source = 'btn_statistics';
                this.tabAct1.source = 'statistics_text_round_zh';
                this.tabActEn1.source = 'statistics_text_round_en';
                this.tabBitmap1.font = "static_round_gold_fnt";
                this.tabBg2.source = 'btn_statistics_teams';
                this.tabAct2.source = 'statistics_text_stats1_zh';
                this.tabActEn2.source = 'statistics_text_stats1_en';
                this.tabBitmap2.font = "static_round_fnt";
                this.tabBg3.source = 'btn_statistics_teams';
                this.tabAct3.source = 'statistics_text_teams1_zh';
                this.tabActEn3.source = 'statistics_text_teams1_en';
                this.tabBitmap3.font = "static_round_fnt";
                this.tabBg4.source = 'btn_statistics_teams';
                this.tabAct4.source = 'statistics_text_rank1_zh';
                this.tabActEn4.source = 'statistics_text_rank1_en';
                this.roundTab.visible = true;
                this.statsTab.visible = false;
                this.teamsTab.visible = false;
                this.luckyTab.visible = false;
            }
            if (target === 1) {
                this.tabBg1.source = 'btn_statistics_teams';
                this.tabAct1.source = 'statistics_text_round1_zh';
                this.tabActEn1.source = 'statistics_text_round1_en';
                this.tabBitmap1.font = "static_round_fnt";
                this.tabBg2.source = 'btn_statistics';
                this.tabAct2.source = 'statistics_text_stats_zh';
                this.tabActEn2.source = 'statistics_text_stats_en';
                this.tabBitmap2.font = "static_round_gold_fnt";
                this.tabBg3.source = 'btn_statistics_teams';
                this.tabAct3.source = 'statistics_text_teams1_zh';
                this.tabActEn3.source = 'statistics_text_teams1_en';
                this.tabBitmap3.font = "static_round_fnt";
                this.tabBg4.source = 'btn_statistics_teams';
                this.tabAct4.source = 'statistics_text_rank1_zh';
                this.tabActEn4.source = 'statistics_text_rank1_en';
                this.roundTab.visible = false;
                this.statsTab.visible = true;
                this.teamsTab.visible = false;
                this.luckyTab.visible = false;
            }
            if (target === 2) {
                this.tabBg1.source = 'btn_statistics_teams';
                this.tabAct1.source = 'statistics_text_round1_zh';
                this.tabActEn1.source = 'statistics_text_round1_en';
                this.tabBitmap1.font = "static_round_fnt";
                this.tabBg2.source = 'btn_statistics_teams';
                this.tabAct2.source = 'statistics_text_stats1_zh';
                this.tabActEn2.source = 'statistics_text_stats1_en';
                this.tabBitmap2.font = "static_round_fnt";
                this.tabBg3.source = 'btn_statistics';
                this.tabAct3.source = 'statistics_text_teams_zh';
                this.tabActEn3.source = 'statistics_text_teams_en';
                this.tabBitmap3.font = "static_round_gold_fnt";
                this.tabBg4.source = 'btn_statistics_teams';
                this.tabAct4.source = 'statistics_text_rank1_zh';
                this.tabActEn4.source = 'statistics_text_rank1_en';
                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = true;
                this.luckyTab.visible = false;
            }
            if (target === 3) {
                this.tabBg1.source = 'btn_statistics_teams';
                this.tabAct1.source = 'statistics_text_round1_zh';
                this.tabActEn1.source = 'statistics_text_round1_en';
                this.tabBitmap1.font = "static_round_fnt";
                this.tabBg2.source = 'btn_statistics_teams';
                this.tabAct2.source = 'statistics_text_stats1_zh';
                this.tabActEn2.source = 'statistics_text_stats1_en';
                this.tabBitmap2.font = "static_round_fnt";
                this.tabBg3.source = 'btn_statistics_teams';
                this.tabAct3.source = 'statistics_text_teams1_zh';
                this.tabActEn3.source = 'statistics_text_teams1_en';
                this.tabBitmap3.font = "static_round_fnt";
                this.tabBg4.source = 'btn_statistics';
                this.tabAct4.source = 'statistics_text_rank_zh';
                this.tabActEn4.source = 'statistics_text_rank_en';
                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = false;
                this.luckyTab.visible = true;
            }
            this.status = target;
        }
    };
    return GameStatistics;
}(eui.Component));
__reflect(GameStatistics.prototype, "GameStatistics");
