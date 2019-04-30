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
var PromptTs = (function (_super) {
    __extends(PromptTs, _super);
    function PromptTs() {
        var _this = _super.call(this) || this;
        _this.code = "";
        /**load Container skin */
        _this.skinName = "resource/eui_skins/alert/PromptUI.exml";
        return _this;
    }
    PromptTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitFun, this);
    };
    PromptTs.prototype.closeFun = function () {
        this.visible = false;
    };
    PromptTs.prototype.submitFun = function () {
        $testtttt();
    };
    return PromptTs;
}(eui.Component));
__reflect(PromptTs.prototype, "PromptTs");
