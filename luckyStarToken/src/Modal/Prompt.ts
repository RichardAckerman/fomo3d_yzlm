class PromptTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/alert/PromptUI.exml";
    }

    public modal: eui.Rect;
    public cancelBtn: eui.Group;
    public submitBtn: eui.Group;
    private code = "";

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitFun, this);
    }

    private closeFun() {
        this.visible = false;
    }

    private submitFun() {
        $testtttt();
    }
}
