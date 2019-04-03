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
/**
 * Game module
 */
var HelpTs = (function (_super) {
    __extends(HelpTs, _super);
    function HelpTs() {
        var _this = _super.call(this) || this;
        _this.langData = $ZHTW.game;
        /**
         * game data
         */
        _this.data = {};
        /**load Container skin */
        _this.skinName = "resource/eui_skins/modal/HelpPanel.exml";
        return _this;
    }
    HelpTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.layout();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    HelpTs.prototype.closeFun = function () {
        $closeModalFun(this, -1360);
    };
    HelpTs.prototype.layout = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = 50;
        vLayout.paddingTop = 30;
        vLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        this.layoutGroup.layout = vLayout;
    };
    return HelpTs;
}(eui.Component));
__reflect(HelpTs.prototype, "HelpTs");
