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
                Main.addMusic();
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

    static addMusic(): void {
        let body = document.getElementsByTagName("body")[0];
        let audio = document.createElement("audio");
        let source = document.createElement("source");
        audio.setAttribute("autoplay", "autoplay");
        audio.setAttribute("loop", "loop");
        source.setAttribute("src", "./contract/bgm.mp3");
        audio.appendChild(source);
        body.appendChild(audio);
    }
}
