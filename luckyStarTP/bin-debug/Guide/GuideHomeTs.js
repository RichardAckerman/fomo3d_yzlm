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
var GuideHomeTs = (function (_super) {
    __extends(GuideHomeTs, _super);
    function GuideHomeTs() {
        var _this = _super.call(this) || this;
        /**load Container skin */
        _this.skinName = "resource/eui_skins/guide/GuideHome.exml";
        return _this;
    }
    GuideHomeTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.welcome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInvite, this);
        this.invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInviteModal, this);
        this.register.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBuy, this);
        this.buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showWithdraw, this);
        this.withdraw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfo, this);
        this.info.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    GuideHomeTs.prototype.closeFun = function () {
        this.info.visible = false;
        this.modal.visible = false;
        this.last.visible = true;
        $Content.game.showDataModalFun();
    };
    GuideHomeTs.prototype.showInvite = function () {
        this.welcome.visible = false;
        this.invite.visible = true;
    };
    GuideHomeTs.prototype.showInviteModal = function () {
        this.invite.visible = false;
        this.register.visible = true;
        $Modal.register.visible = true;
        $Modal.register.registerGroup.visible = true;
        $Modal.register.linkGroup.visible = false;
    };
    GuideHomeTs.prototype.showBuy = function () {
        $Modal.register.visible = false;
        this.buy.visible = true;
        this.register.visible = false;
    };
    GuideHomeTs.prototype.showWithdraw = function () {
        this.buy.visible = false;
        this.withdraw.visible = true;
    };
    GuideHomeTs.prototype.showInfo = function () {
        this.withdraw.visible = false;
        this.info.visible = true;
    };
    return GuideHomeTs;
}(eui.Component));
__reflect(GuideHomeTs.prototype, "GuideHomeTs");
