class Loading extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;
    private progress: egret.Bitmap;

    private createView(): void {
        let lang = localStorage.getItem('language');
        let url = "load_text_title_en_png";
        if (lang) {
            url = lang == "zhtw" ? "load_text_title_zh_png" : url;
        }
        let loadBg = this.createBitmapByName("load_Interface_jpg");
        loadBg.x = 0;
        loadBg.y = 0;
        this.addChild(loadBg);

        let logo = this.createBitmapByName(url);
        logo.x = 0;
        logo.y = 100;
        this.addChild(logo);

        let content = new egret.Sprite();
        content.x = 50;
        content.y = 1450;
        content.width = 960;
        content.height = 90;

        let progressBg = this.createBitmapByName("load_ditu_png");
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
    }

    public onProgress(current: number, total: number): void {
        let loadRate = current / total;
        loadRate = loadRate < 0.1 ? 0.1 : loadRate;
        this.progress.width = loadRate * 930;
        this.progress.visible = true;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
