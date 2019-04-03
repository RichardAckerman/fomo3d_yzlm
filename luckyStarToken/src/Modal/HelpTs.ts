/**
 * Game module
 */
class HelpTs extends eui.Component {
    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/modal/HelpPanel.exml";
    }

    public closeBg: eui.Rect;
    public layoutGroup: eui.Group;

    private langData: Object = $ZHTW.game;
    /**
     * game data
     */
    public data = {};

    protected childrenCreated(): void {
        super.childrenCreated();
        this.layout();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    }

    private closeFun() {
        $closeModalFun(this, -1360);
    }

    private layout() {
        let vLayout: eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.gap = 50;
        vLayout.paddingTop = 30;
        vLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        this.layoutGroup.layout = vLayout;
    }

}