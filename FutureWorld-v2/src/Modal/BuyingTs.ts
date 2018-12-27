class BuyingTs extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Modal/BuyingUI.exml";
    }

    public msg = '';
    public modal: eui.Rect;
    public icon: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.playAnimation()
    }

    private playAnimation() {
        egret.Tween.get(this.icon, {loop: true})
            .to({rotation: 0}, 0)
            .to({rotation: 360}, 1000).call(() => {
        });
    }
}