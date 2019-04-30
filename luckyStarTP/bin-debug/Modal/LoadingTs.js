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
var LoadingTs = (function (_super) {
    __extends(LoadingTs, _super);
    function LoadingTs() {
        var _this = _super.call(this) || this;
        _this.data = {
            msg: "请稍等..."
        };
        _this.skinName = "resource/eui_skins/modal/LoadingPanel.exml";
        return _this;
    }
    LoadingTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        LoadingTs.playAnimation(this.loop, true);
    };
    LoadingTs.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    LoadingTs.prototype.show = function () {
        this.visible = true;
        LoadingTs.playAnimation(this.loop, true);
    };
    LoadingTs.prototype.hide = function () {
        this.loop.stop();
        this.visible = false;
    };
    return LoadingTs;
}(eui.Component));
__reflect(LoadingTs.prototype, "LoadingTs");
