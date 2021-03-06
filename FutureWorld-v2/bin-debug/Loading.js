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
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    Loading.prototype.createView = function () {
        var lang = localStorage.getItem('language');
        var url = "load_text_title_en_png";
        if (lang) {
            url = lang == "zhtw" ? "load_text_title_zh_png" : url;
        }
        var loadBg = this.createBitmapByName("load_Interface_jpg");
        loadBg.x = 0;
        loadBg.y = 0;
        this.addChild(loadBg);
        var logo = this.createBitmapByName(url);
        logo.x = 0;
        logo.y = 100;
        this.addChild(logo);
        var content = new egret.Sprite();
        content.x = 50;
        content.y = 1450;
        content.width = 960;
        content.height = 90;
        var progressBg = this.createBitmapByName("load_ditu_png");
        progressBg.width = 970;
        progressBg.y = 140;
        content.addChild(progressBg);
        this.progress = this.createBitmapByName("load_pb_png");
        // var myGroup = new eui.Group();
        this.progress.y = 159;
        this.progress.width = 80;
        this.progress.x = 20;
        content.addChild(this.progress);
        this.addChild(content);
    };
    Loading.prototype.onProgress = function (current, total) {
        var loadRate = current / total;
        loadRate = loadRate < 0.1 ? 0.1 : loadRate;
        this.progress.width = loadRate * 930;
        this.progress.visible = true;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。
     */
    Loading.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Loading;
}(egret.Sprite));
__reflect(Loading.prototype, "Loading", ["RES.PromiseTaskReporter"]);
