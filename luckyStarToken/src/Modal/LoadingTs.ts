class LoadingTs extends eui.Component {

    public constructor() {
        super();
        this.skinName = "resource/eui_skins/modal/LoadingPanel.exml";
    }

    public modal: eui.Rect;
    public icon: eui.Image;
    public loop: egret.tween.TweenGroup;

    private data = {
        msg: "交易中，请稍等..."
    };

    protected childrenCreated(): void {
        super.childrenCreated();
        LoadingTs.playAnimation(this.loop, true);
    }

    private static playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
        if (isLoop) {
            for (let key in target.items) {
                target.items[key].props = {loop: true};
            }
        }
        target.play();
    }

    public show() {
        this.visible = true;
        LoadingTs.playAnimation(this.loop, true);
    }

    public hide() {
        this.loop.stop();
        this.visible = false;
    }
}
