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
var MainIntroTs = (function (_super) {
    __extends(MainIntroTs, _super);
    function MainIntroTs() {
        var _this = _super.call(this) || this;
        _this.msg = '';
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Modal/MainIntro.exml";
        return _this;
    }
    MainIntroTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    MainIntroTs.prototype.closeFun = function () {
        this.visible = false;
    };
    return MainIntroTs;
}(eui.Component));
__reflect(MainIntroTs.prototype, "MainIntroTs");
