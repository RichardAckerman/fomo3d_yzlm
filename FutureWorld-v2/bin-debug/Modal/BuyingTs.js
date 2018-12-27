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
var BuyingTs = (function (_super) {
    __extends(BuyingTs, _super);
    function BuyingTs() {
        var _this = _super.call(this) || this;
        _this.msg = '';
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Modal/BuyingUI.exml";
        return _this;
    }
    BuyingTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.playAnimation();
    };
    BuyingTs.prototype.playAnimation = function () {
        egret.Tween.get(this.icon, { loop: true })
            .to({ rotation: 0 }, 0)
            .to({ rotation: 360 }, 1000).call(function () {
        });
    };
    return BuyingTs;
}(eui.Component));
__reflect(BuyingTs.prototype, "BuyingTs");
