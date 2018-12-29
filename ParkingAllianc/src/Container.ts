class Container extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
    }

    private langData: Object = $ZHTW.container;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.content();
    }

    /**
     * stack content
     */
    private content() {
        $Content.game = new Game();
        this.addChild($Content.game);

        $Modal.gameStatistics = new GameStatistics();  //游戏-统计模态框
        $Modal.gameStatistics.visible = false;
        this.addChild($Modal.gameStatistics);

        $Modal.register = new Register();  //游戏-推荐人注册模态框
        $Modal.register.visible = false;
        this.addChild($Modal.register);

        $Modal.gameHelp = new GameHelp();  //游戏-攻略模态框
        $Modal.gameHelp.visible = false;
        this.addChild($Modal.gameHelp);

        $Modal.language = new LanguageTs();  //语言切换模态框
        $Modal.language.visible = false;
        this.addChild($Modal.language);

        $Modal.gameAlert = new GameAlert();  //游戏-消息模态框
        $Modal.gameAlert.visible = false;
        this.addChild($Modal.gameAlert);
    }
}
