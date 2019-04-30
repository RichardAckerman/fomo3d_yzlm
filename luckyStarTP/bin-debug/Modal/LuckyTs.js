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
var LuckyTs = (function (_super) {
    __extends(LuckyTs, _super);
    function LuckyTs() {
        var _this = _super.call(this) || this;
        _this.status = 0;
        _this.data = {
            drainTime: "24:00:00",
            pot: "0",
        };
        /**load Container skin */
        _this.skinName = "resource/eui_skins/modal/LuckyPanel.exml";
        return _this;
    }
    LuckyTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.luckyUnit = new LuckyUnitTs();
        this.lastLuckyInfo.addChild(this.luckyUnit);
    };
    LuckyTs.prototype.getLuckyList = function () {
        this.luckyUnit.getData();
    };
    LuckyTs.prototype.closeFun = function () {
        $closeModalFun(this, -1360);
    };
    LuckyTs.prototype.selectTab = function (target) {
        if (target !== this.status) {
            if (target === 1) {
                this.tabBg1.source = 'statistics_stats_bg_xz2_png';
                this.tabAct1.source = 'title_text_xykc1_png';
                this.tabBg2.source = 'statistics_stats_bg2_png';
                this.tabAct2.source = 'title_text_xyph_png';
                this.luckyTab.visible = true;
                this.lastLucky.visible = false;
            }
            if (target === 2) {
                this.tabBg1.source = 'statistics_stats_bg2_png';
                this.tabAct1.source = 'title_text_xykc_png';
                this.tabBg2.source = 'statistics_stats_bg_xz2_png';
                this.tabAct2.source = 'title_text_xyph1_png';
                this.luckyTab.visible = false;
                this.lastLucky.visible = true;
            }
            this.status = target;
        }
    };
    return LuckyTs;
}(eui.Component));
__reflect(LuckyTs.prototype, "LuckyTs");
