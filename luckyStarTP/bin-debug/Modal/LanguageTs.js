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
var LanguageTs = (function (_super) {
    __extends(LanguageTs, _super);
    function LanguageTs() {
        var _this = _super.call(this) || this;
        /**load Container skin */
        _this.skinName = "resource/eui_skins/modal/LanguagePanel.exml";
        return _this;
    }
    LanguageTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.langZHTW.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'zhtw'), this);
        this.langEN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'en'), this);
    };
    LanguageTs.prototype.closeFun = function () {
        $closeModalFun(this, -1360);
    };
    LanguageTs.prototype.chooseLang = function (lang) {
        if (langStatus !== lang) {
            setLanguageModalState(lang);
            langStatus = lang;
            changeLang(lang);
            localStorage.setItem('language', lang);
        }
    };
    return LanguageTs;
}(eui.Component));
__reflect(LanguageTs.prototype, "LanguageTs");
