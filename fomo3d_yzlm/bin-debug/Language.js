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
var Language = (function (_super) {
    __extends(Language, _super);
    function Language() {
        var _this = _super.call(this) || this;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/LanguageUI.exml";
        return _this;
    }
    Language.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.langZHTW.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'zhtw'), this);
        this.langEN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'en'), this);
    };
    Language.prototype.clostFun = function () {
        var group = $Modal.language.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            $Modal.language.visible = false;
            tw = null;
        });
    };
    Language.prototype.chooseLang = function (lang) {
        if (langStatus !== lang) {
            setLanguageModalState(lang);
            langStatus = lang;
            changeLang(lang);
            localStorage.setItem('language', lang);
        }
    };
    return Language;
}(eui.Component));
__reflect(Language.prototype, "Language");
