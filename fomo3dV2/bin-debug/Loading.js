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
        var logo = this.createBitmapByName(url);
        logo.x = 44;
        logo.y = 300;
        this.addChild(logo);
        var content = new egret.Sprite();
        content.x = 90;
        content.y = 1450;
        content.width = 960;
        content.height = 90;
        var progressBg = this.createBitmapByName("load_pb_png");
        content.addChild(progressBg);
        this.progress = this.createBitmapByName("load_ditu_png");
        this.progress.y = 10;
        this.progress.width = 920;
        this.progress.x = 40;
        content.addChild(this.progress);
        this.textField = new egret.TextField();
        content.addChild(this.textField);
        this.textField.text = '1%';
        this.textField.width = 960;
        this.textField.height = 90;
        this.textField.textAlign = "center";
        this.textField.verticalAlign = "middle";
        this.textField.size = 46;
        this.textField.textColor = 0xffffff;
        this.addChild(content);
    };
    Loading.prototype.onProgress = function (current, total) {
        var loadRate = current / total;
        if (this.progress.width > 50) {
            this.progress.x = loadRate * 960;
            this.progress.width = 960 - loadRate * 960;
            //if(this.progress.width > 920) {
            //this.progress.width = 920;
            //this.progress.x = 40;
            //}
        }
        else {
            this.progress.visible = false;
        }
        this.textField.text = Math.floor(loadRate * 100) + "%";
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
