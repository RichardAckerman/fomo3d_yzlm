class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        });

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        };

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        };

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        });
    }

    private async runGame() {
        await this.loadResource();
        getNetWork().then(() => {
            getJson().then((data) => {
                this.createGameScene();
                this.stage.removeChild(this.stage.$children[1]);
                getLanStatus();
                setTimeout(()=>{
                    this.startLoad(this.getRandomIndex());
                },1000)
            });
        });
    }

    private async loadResource() {
        try {
            /**load loading resource */
            let lang = localStorage.getItem('language');
            if (!lang) {
                localStorage.setItem('language', "zhtw");
            }
            await RES.loadConfig("resource/loading.res.json", "resource/");
            await RES.loadGroup("preload", 0);

            /**load default resource */
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        });
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        $Content.container = new Container();
        this.addChild($Content.container);
    }

    /**
     * music
     */
    private misicList = [
        "mao.mp3",
        "niao.mp3",
        "hu.mp3",
        "gou.mp3",
        "guoge.mp3",
        "bgm.mp3",
    ];

    private startLoad(i): void {
        //创建 Sound 对象
        let sound = new egret.Sound();
        // let url: string = "./contract/" + this.misicList[i];
        let url: string = "./contract/bgm.mp3";
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(url);
    }

    private onLoadComplete(event: egret.Event): void {
        //获取加载到的 Sound 对象
        let sound: egret.Sound = <egret.Sound>event.target;
        //播放音乐
        let channel: egret.SoundChannel = sound.play(0, 0);
        // channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }

    private onSoundComplete(event: egret.Event): void {
        // egret.log("onSoundComplete");
        setTimeout(()=>{
            this.startLoad(this.getRandomIndex());
        },100)
    }

    private lastMusic = 0;

    private getRandomIndex() {
        let len = this.misicList.length;
        let ron = Math.floor(Math.random() * len);
        while (ron == this.lastMusic) {
            ron = Math.floor(Math.random() * len);
        }
        this.lastMusic = ron;
        return ron;
    }
}
