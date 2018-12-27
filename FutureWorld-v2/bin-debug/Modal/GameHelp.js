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
var GameHelp = (function (_super) {
    __extends(GameHelp, _super);
    function GameHelp() {
        var _this = _super.call(this) || this;
        /**lang data */
        _this.langData = $ZHTW.game;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Modal/GameHelpUI.exml";
        return _this;
    }
    GameHelp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.layout();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    GameHelp.prototype.closeFun = function () {
        $closeModalFun($Modal.gameHelp);
    };
    GameHelp.prototype.layout = function () {
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = 50;
        vLayout.paddingTop = 30;
        vLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        this.layoutGroup.layout = vLayout;
    };
    return GameHelp;
}(eui.Component));
__reflect(GameHelp.prototype, "GameHelp");
