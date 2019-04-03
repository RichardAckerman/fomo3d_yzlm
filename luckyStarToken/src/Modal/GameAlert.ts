class GameAlert extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/modal/GameAlertUI.exml";
    }

    public msg = 'null';

    public modal:eui.Rect;
    public submitBtn:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    }

    private closeFun() {
        $Modal.gameAlert.visible = false;
    }
}
