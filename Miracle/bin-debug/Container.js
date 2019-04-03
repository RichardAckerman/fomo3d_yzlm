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
    };
    /**
     * stack content
     */
    Container.prototype.content = function () {
        $Content.game = new Game();
        this.addChild($Content.game);
        $Modal.gameStatistics = new GameStatistics(); //游戏-统计模态框
        $Modal.gameStatistics.visible = false;
        this.addChild($Modal.gameStatistics);
        $Modal.gameHelp = new GameHelp(); //游戏-攻略模态框
        $Modal.gameHelp.visible = false;
        this.addChild($Modal.gameHelp);
        $Modal.register = new Register(); //游戏-推荐人注册模态框
        $Modal.register.visible = false;
        this.addChild($Modal.register);
        $Modal.refereeInfo = new RefereeInfo(); //游戏-推荐人信息模态框
        $Modal.refereeInfo.visible = false;
        this.addChild($Modal.refereeInfo);
        $Modal.extract = new ExtractTs(); //游戏-盈利提取模态框
        $Modal.extract.visible = false;
        this.addChild($Modal.extract);
        $Modal.language = new Language(); //语言切换模态框
        $Modal.language.visible = false;
        this.addChild($Modal.language);
        $Modal.buyKey = new BuyKey(); //代币-消息模态框
        $Modal.buyKey.visible = false;
        this.addChild($Modal.buyKey);
        $Modal.gameAlert = new GameAlert(); //游戏-消息模态框
        $Modal.gameAlert.visible = false;
        this.addChild($Modal.gameAlert);
        $Modal.betLoad = new BetLoading(); //游戏-下注转动
        $Modal.betLoad.visible = false;
        this.addChild($Modal.betLoad);
    };
    return Container;
}(eui.Component));
__reflect(Container.prototype, "Container");
