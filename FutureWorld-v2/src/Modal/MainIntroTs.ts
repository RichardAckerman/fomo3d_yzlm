class MainIntroTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Modal/MainIntro.exml";
    }

    public msg = '';

    public modal:eui.Rect;
    public title:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    }

    private closeFun() {
        this.visible = false;
    }
}
