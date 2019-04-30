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
var GameAlert = (function (_super) {
    __extends(GameAlert, _super);
    function GameAlert() {
        var _this = _super.call(this) || this;
        _this.msg = 'null';
        /**load Container skin */
        _this.skinName = "resource/eui_skins/alert/GameAlertUI.exml";
        return _this;
    }
    GameAlert.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, GameAlert.closeFun, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submit, this);
    };
    GameAlert.closeFun = function () {
        $Modal.gameAlert.visible = false;
    };
    GameAlert.prototype.submit = function () {
        GameAlert.closeFun();
    };
    return GameAlert;
}(eui.Component));
__reflect(GameAlert.prototype, "GameAlert");
