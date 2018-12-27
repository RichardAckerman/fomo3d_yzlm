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
            currentRound: '2',
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
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);
        this.tab4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 3), this);
        this.unit = new ExtractUnitTs();
        this.teamTabScr.addChild(this.unit);
        this.LuckyUnit = new LuckyUnitTs();
        this.luckyTabScr.addChild(this.LuckyUnit);
    };
    GameStatistics.prototype.getExtractList = function () {
        this.unit.getData();
        this.LuckyUnit.getData();
    };
    GameStatistics.prototype.closeFun = function () {
        $closeModalFun($Modal.gameStatistics);
    };
    GameStatistics.prototype.selectTab = function (target) {
        if (target !== this.status) {
            if (target === 0) {
                this.tabBg1.source = 'btn_statistics_xz';
                this.tabAct1.source = 'statistics_text_round_zh';
                this.tabActEn1.source = 'statistics_text_round_en';
                this.tabBitmap1.font = "static_round_gold_fnt";
                this.tabBg2.source = 'btn_statistics';
                this.tabAct2.source = 'statistics_text_stats1_zh';
                this.tabActEn2.source = 'statistics_text_stats1_en';
                this.tabBitmap2.font = "static_round_fnt";
                this.tabBg3.source = 'btn_statistics';
                this.tabAct3.source = 'statistics_text_teams1_zh';
                this.tabActEn3.source = 'statistics_text_teams1_en';
                this.tabBitmap3.font = "static_round_fnt";
                this.tabBg4.source = 'btn_statistics';
                this.tabAct4.source = 'statistics_text_rank1_zh';
                this.tabActEn4.source = 'statistics_text_rank1_en';
                this.tabBitmap4.font = "static_round_fnt";
                // this.roundTab.visible = true;
                // this.statsTab.visible = false;
                // this.teamsTab.visible = false;
                // this.luckyTab.visible = false;
                this.tabAnimation(this.statsTab, this.teamsTab, this.luckyTab, this.roundTab);
            }
            if (target === 1) {
                this.tabBg1.source = 'btn_statistics';
                this.tabAct1.source = 'statistics_text_round1_zh';
                this.tabActEn1.source = 'statistics_text_round1_en';
                this.tabBitmap1.font = "static_round_fnt";
                this.tabBg2.source = 'btn_statistics_xz';
                this.tabAct2.source = 'statistics_text_stats_zh';
                this.tabActEn2.source = 'statistics_text_stats_en';
                this.tabBitmap2.font = "static_round_gold_fnt";
                this.tabBg3.source = 'btn_statistics';
                this.tabAct3.source = 'statistics_text_teams1_zh';
                this.tabActEn3.source = 'statistics_text_teams1_en';
                this.tabBitmap3.font = "static_round_fnt";
                this.tabBg4.source = 'btn_statistics';
                this.tabAct4.source = 'statistics_text_rank1_zh';
                this.tabActEn4.source = 'statistics_text_rank1_en';
                this.tabBitmap4.font = "static_round_fnt";
                // this.roundTab.visible = false;
                // this.statsTab.visible = true;
                // this.teamsTab.visible = false;
                // this.luckyTab.visible = false;
                this.tabAnimation(this.roundTab, this.teamsTab, this.luckyTab, this.statsTab);
            }
            if (target === 2) {
                this.tabBg1.source = 'btn_statistics';
                this.tabAct1.source = 'statistics_text_round1_zh';
                this.tabActEn1.source = 'statistics_text_round1_en';
                this.tabBitmap1.font = "static_round_fnt";
                this.tabBg2.source = 'btn_statistics';
                this.tabAct2.source = 'statistics_text_stats1_zh';
                this.tabActEn2.source = 'statistics_text_stats1_en';
                this.tabBitmap2.font = "static_round_fnt";
                this.tabBg3.source = 'btn_statistics_xz';
                this.tabAct3.source = 'statistics_text_teams_zh';
                this.tabActEn3.source = 'statistics_text_teams_en';
                this.tabBitmap3.font = "static_round_gold_fnt";
                this.tabBg4.source = 'btn_statistics';
                this.tabAct4.source = 'statistics_text_rank1_zh';
                this.tabActEn4.source = 'statistics_text_rank1_en';
                this.tabBitmap4.font = "static_round_fnt";
                // this.roundTab.visible = false;
                // this.statsTab.visible = false;
                // this.teamsTab.visible = true;
                this.luckyTab.visible = false;
                this.tabAnimation(this.roundTab, this.statsTab, this.luckyTab, this.teamsTab);
            }
            if (target === 3) {
                this.tabBg1.source = 'btn_statistics';
                this.tabAct1.source = 'statistics_text_round1_zh';
                this.tabActEn1.source = 'statistics_text_round1_en';
                this.tabBitmap1.font = "static_round_fnt";
                this.tabBg2.source = 'btn_statistics';
                this.tabAct2.source = 'statistics_text_stats1_zh';
                this.tabActEn2.source = 'statistics_text_stats1_en';
                this.tabBitmap2.font = "static_round_fnt";
                this.tabBg3.source = 'btn_statistics';
                this.tabAct3.source = 'statistics_text_teams1_zh';
                this.tabActEn3.source = 'statistics_text_teams1_en';
                this.tabBitmap3.font = "static_round_fnt";
                this.tabBg4.source = 'btn_statistics_xz';
                this.tabAct4.source = 'statistics_text_rank_zh';
                this.tabActEn4.source = 'statistics_text_rank_en';
                this.tabBitmap4.font = "static_round_gold_fnt";
                // this.roundTab.visible = false;
                // this.statsTab.visible = false;
                // this.teamsTab.visible = false;
                this.luckyTab.visible = true;
                this.tabAnimation(this.roundTab, this.statsTab, this.teamsTab, this.luckyTab);
            }
            this.status = target;
        }
    };
    GameStatistics.prototype.tabAnimation = function (target1, target2, target3, target4) {
        target4.alpha = 0;
        target1.alpha > 0 && egret.Tween.get(target1)
            .to({ alpha: 1 }, 0)
            .to({ alpha: 0 }, 100)
            .call(function () {
            egret.Tween.get(target4)
                .to({ alpha: 0 }, 0)
                .to({ alpha: 1 }, 200);
        });
        target2.alpha > 0 && egret.Tween.get(target2)
            .to({ alpha: 1 }, 0)
            .to({ alpha: 0 }, 100)
            .call(function () {
            egret.Tween.get(target4)
                .to({ alpha: 0 }, 0)
                .to({ alpha: 1 }, 200);
        });
        target3.alpha > 0 && egret.Tween.get(target3)
            .to({ alpha: 1 }, 0)
            .to({ alpha: 0 }, 100)
            .call(function () {
            egret.Tween.get(target4)
                .to({ alpha: 0 }, 0)
                .to({ alpha: 1 }, 200);
        });
    };
    return GameStatistics;
}(eui.Component));
__reflect(GameStatistics.prototype, "GameStatistics");
