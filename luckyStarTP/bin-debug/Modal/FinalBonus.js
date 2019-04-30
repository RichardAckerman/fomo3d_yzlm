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
var FinalBonus = (function (_super) {
    __extends(FinalBonus, _super);
    function FinalBonus() {
        var _this = _super.call(this) || this;
        /**load Container skin */
        _this.skinName = "resource/eui_skins/modal/FinalBonusUI.exml";
        return _this;
    }
    FinalBonus.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.luckyUnit = new FinalBonusUnit();
        this.lastLucky.addChild(this.luckyUnit);
    };
    FinalBonus.prototype.getLastList = function () {
        this.luckyUnit.getData();
    };
    FinalBonus.prototype.closeFun = function () {
        $closeModalFun(this, -1360);
    };
    return FinalBonus;
}(eui.Component));
__reflect(FinalBonus.prototype, "FinalBonus");
