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
        logo.x = 490;
        logo.y = 270;
        this.addChild(logo);

        let content = new egret.Sprite();
        content.x = 50;
        content.y = 1450;
        content.width = 960;
        content.height = 90;

        let progressBg = this.createBitmapByName("load_ditu_png");
        content.addChild(progressBg);

        this.progress = this.createBitmapByName("load_pb_png");
        this.progress.y = 23;
        this.progress.width = 0;
        this.progress.x = 30;
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
    }

    public onProgress(current: number, total: number): void {
        let loadRate = current / total;
        this.progress.width = loadRate * 900;
        this.progress.visible = true;
        this.textField.text = Math.floor(loadRate * 99) + "%";
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
