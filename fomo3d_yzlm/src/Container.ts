class Container extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
    }

    private langData:Object = $ZHTW.container;

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

        $Modal.gameHelp = new GameHelp();  //游戏-攻略模态框
        $Modal.gameHelp.visible = false;
        this.addChild($Modal.gameHelp);

        $Modal.register = new Register();  //游戏-推荐人注册模态框
        $Modal.register.visible = false;
        this.addChild($Modal.register);

        $Modal.refereeInfo = new RefereeInfo();  //游戏-推荐人信息模态框
        $Modal.refereeInfo.visible = false;
        this.addChild($Modal.refereeInfo);

        $Modal.extract = new Extract();  //游戏-盈利提取模态框
        $Modal.extract.visible = false;
        this.addChild($Modal.extract);

        $Modal.language = new Language();  //语言切换模态框
        $Modal.language.visible = false;
        this.addChild($Modal.language);

        $Modal.buyKey = new BuyKey();  //代币-消息模态框
        $Modal.buyKey.visible = false;
        this.addChild($Modal.buyKey);

        $Modal.gameAlert = new GameAlert();  //游戏-消息模态框
        $Modal.gameAlert.visible = false;
        this.addChild($Modal.gameAlert);
    }
}
