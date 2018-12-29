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
        _this.status = 0;
        _this.updateData = new egret.Timer(2000, 0);
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
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.unit = new ExtractUnitTs();
        this.teamTabScr.addChild(this.unit);
        var luckyUnit = new LuckyPersonUnitTs();
        this.luckyInfo.addChild(luckyUnit);
    };
    GameStatistics.prototype.getExtractList = function () {
        this.unit.getData();
    };
    GameStatistics.prototype.getData = function () {
        this.getTeamTotalPot();
        this.getTotalKey();
    };
    /**
     * 获取奖池总金额
     */
    GameStatistics.prototype.getTeamTotalPot = function () {
        var _this = this;
        $gameContractInstance.teamPot(function (err, Coin) {
            if (err) {
                console.log("++++++", err);
                _this.updateData.stop();
            }
            else {
                _this.data.stats.rewards = (parseFloat(web3js.fromWei(Coin[0]).toString()) * 0.92).toFixed(3) + "";
            }
        });
    };
    /**
     * 获取总论数
     */
    GameStatistics.prototype.getTotalKey = function () {
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
    GameStatistics.prototype.closeFun = function () {
        $closeModalFun($Modal.gameStatistics, -1360);
    };
    GameStatistics.prototype.selectTab = function (target) {
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
    };
    return GameStatistics;
}(eui.Component));
__reflect(GameStatistics.prototype, "GameStatistics");
