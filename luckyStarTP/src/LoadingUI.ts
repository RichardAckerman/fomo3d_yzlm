class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

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
        logo.x = 53;
        logo.y = 0;
        this.addChild(logo);

        let content = new egret.Sprite();
        content.x = 50;
        content.y = 1550;
        content.width = 960;
        content.height = 90;

        let progressBg = this.createBitmapByName("load_ditu_png");
        progressBg.width = 960;
        content.addChild(progressBg);

        this.progress = this.createBitmapByName("load_pb_png");
        this.progress.y = 15;
        this.progress.width = 90;
        this.progress.x = 26;
        content.addChild(this.progress);

        this.textField = new egret.TextField();
        content.addChild(this.textField);
        this.textField.text = '1%';
        this.textField.width = 960;
        this.textField.height = 70;
        this.textField.y = -3;
        this.textField.textAlign = "center";
        this.textField.verticalAlign = "middle";
        this.textField.size = 30;
        this.textField.textColor = 0xFFFFFF;

        this.addChild(content);
    }

    public onProgress(current: number, total: number): void {
        let loadRate = current / total;
        loadRate = loadRate < 0.1 ? 0.1 : loadRate;
        this.progress.width = loadRate * 910;
        this.progress.visible = true;
        let load = loadRate * 100 <= 99 ? loadRate * 100 : 99;
        this.textField.text = Math.floor(load) + "%";
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
