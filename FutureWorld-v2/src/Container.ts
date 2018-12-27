class Container extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
    }

    private langData: Object = $ZHTW.container;

    protected childrenCreated(): void {
        super.childrenCreated();

        $Content.game = new Game();
        this.addChild($Content.game);
    }

    /**
     * stack content
     */
    private content() {
        
        $Modal.gameStatistics = new GameStatistics();  //游戏-统计模态框
        $Modal.gameStatistics.visible = false;
        this.addChild($Modal.gameStatistics);
        
        $Modal.register = new Register();  //游戏-推荐人注册模态框
        $Modal.register.visible = false;
        this.addChild($Modal.register);

        $Modal.language = new LanguageTs();  //语言切换模态框
        $Modal.language.visible = false;
        this.addChild($Modal.language);

        $Modal.buyLoading = new BuyingTs();  //游戏-授权模态框
        $Modal.buyLoading.visible = false;
        this.addChild($Modal.buyLoading);

        $Modal.gameAlert = new GameAlert();  //游戏-消息模态框
        $Modal.gameAlert.visible = false;
        this.addChild($Modal.gameAlert);

        $Modal.mainIntro = new MainIntroTs();  //游戏-介绍模态框
        $Modal.mainIntro.visible = false;
        this.addChild($Modal.mainIntro);

        $Modal.approve = new ApproveTs();  //游戏-授权模态框
        $Modal.approve.visible = false;
        this.addChild($Modal.approve);

        $Modal.ainimeBg = new AinimeBgTs();
        $Modal.ainimeBg.visible = false;
        this.addChild($Modal.ainimeBg);

        // 加载龙骨动画
        let dragonbonesData = RES.getRes("fw_ske_json");
        let textureData1 = RES.getRes("fw_tex_json");
        let texture1 = RES.getRes("fw_tex_png");

        // 创建一个骨骼动画工厂的程序
        let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
        egretFactory.parseDragonBonesData(dragonbonesData);
        egretFactory.parseTextureAtlasData(textureData1, texture1);

        //骨架 骨架名
        let armature: dragonBones.Armature = egretFactory.buildArmature("armatureName");
        let armatureDisplay = armature.getDisplay();
        armatureDisplay.x = 540;
        armatureDisplay.y = 750;
        $Content.armature = armature;
        $Content.armatureDisplay = armatureDisplay;

        $Content.container.addEventListener(egret.Event.ENTER_FRAME, function (): void {
            dragonBones.WorldClock.clock.advanceTime(0.01);
        }, $Content.container);

        $Content.armature.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, () => {
            $Content.container.removeChild($Content.armatureDisplay);
            dragonBones.WorldClock.clock.timeScale = 0;
            $Modal.ainimeBg.visible = false;
        }, $Content.container);

        dragonBones.WorldClock.clock.timeScale = 3
    }
}
