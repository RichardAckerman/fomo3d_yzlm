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
var AinimeBgTs = (function (_super) {
    __extends(AinimeBgTs, _super);
    function AinimeBgTs() {
        var _this = _super.call(this) || this;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Modal/AinimeBg.exml";
        return _this;
    }
    AinimeBgTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return AinimeBgTs;
}(eui.Component));
__reflect(AinimeBgTs.prototype, "AinimeBgTs");
