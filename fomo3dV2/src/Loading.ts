class Loading extends egret.Sprite  implements RES.PromiseTaskReporter {

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
        let logo = this.createBitmapByName(url);
        logo.x = 44;
        logo.y = 300;
        this.addChild(logo);

        let content = new egret.Sprite();
        content.x = 90;
        content.y = 1450;
        content.width = 960;
        content.height = 90;

        let progressBg = this.createBitmapByName("load_pb_png");
        content.addChild(progressBg);

        this.progress = this.createBitmapByName("load_ditu_png");
        this.progress.y = 10;
        this.progress.width = 920;
        this.progress.x = 40;
        content.addChild(this.progress);

        this.textField = new egret.TextField();
        content.addChild(this.textField);
        this.textField.text = '1%';
        this.textField.width = 960;
        this.textField.height = 90;
        this.textField.textAlign = "center";
        this.textField.verticalAlign = "middle";
        this.textField.size=46;
        this.textField.textColor=0xffffff;

        this.addChild(content);
    }

    public onProgress(current: number, total: number): void {
        let loadRate = current/total;
        if(this.progress.width > 50) {
            this.progress.x = loadRate * 960;
            this.progress.width = 960 - loadRate * 960;
            //if(this.progress.width > 920) {
                //this.progress.width = 920;
                //this.progress.x = 40;
            //}
        } else {
            this.progress.visible = false;
        }
        this.textField.text = Math.floor(loadRate*100) + "%";
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
