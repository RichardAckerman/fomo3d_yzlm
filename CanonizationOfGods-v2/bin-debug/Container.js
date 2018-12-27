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
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super.call(this) || this;
        _this.langData = $ZHTW.container;
        return _this;
        /**load Container skin */
    }
    Container.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        $Content.game = new Game();
        this.addChild($Content.game);
    };
    /**
     * stack content
     */
    Container.prototype.content = function () {
        $Modal.gameStatistics = new GameStatistics(); //游戏-统计模态框
        $Modal.gameStatistics.visible = false;
        this.addChild($Modal.gameStatistics);
        $Modal.register = new Register(); //游戏-推荐人注册模态框
        $Modal.register.visible = false;
        this.addChild($Modal.register);
        $Modal.gameHelp = new GameHelp(); //游戏-攻略模态框
        $Modal.gameHelp.visible = false;
        this.addChild($Modal.gameHelp);
        $Modal.language = new LanguageTs(); //语言切换模态框
        $Modal.language.visible = false;
        this.addChild($Modal.language);
        $Modal.gameAlert = new GameAlert(); //游戏-消息模态框
        $Modal.gameAlert.visible = false;
        this.addChild($Modal.gameAlert);
        $Modal.approve = new ApproveTs(); //游戏-授权模态框
        $Modal.approve.visible = false;
        this.addChild($Modal.approve);
        $Modal.buyLoading = new BuyingTs(); //游戏-授权模态框
        $Modal.buyLoading.visible = false;
        this.addChild($Modal.buyLoading);
        $Modal.ainimeBg = new AinimeBgTs();
        $Modal.ainimeBg.visible = false;
        this.addChild($Modal.ainimeBg);
        // 加载龙骨动画
        var dragonbonesData = RES.getRes("godEffect_ske_json");
        var textureData1 = RES.getRes("godEffect_tex_json");
        var texture1 = RES.getRes("godEffect_tex_png");
        // 创建一个骨骼动画工厂的程序
        var egretFactory = dragonBones.EgretFactory.factory;
        egretFactory.parseDragonBonesData(dragonbonesData);
        egretFactory.parseTextureAtlasData(textureData1, texture1);
        //骨架 骨架名
        var armature = egretFactory.buildArmature("armatureName");
        var armatureDisplay = armature.getDisplay();
        armatureDisplay.x = 540;
        armatureDisplay.y = 750;
        $Content.armature = armature;
        $Content.armatureDisplay = armatureDisplay;
        $Content.container.addEventListener(egret.Event.ENTER_FRAME, function () {
            dragonBones.WorldClock.clock.advanceTime(0.01);
        }, $Content.container);
        $Content.armature.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, function () {
            $Content.container.removeChild($Content.armatureDisplay);
            dragonBones.WorldClock.clock.timeScale = 0;
            $Modal.ainimeBg.visible = false;
        }, $Content.container);
        dragonBones.WorldClock.clock.timeScale = 3;
    };
    return Container;
}(eui.Component));
__reflect(Container.prototype, "Container");
