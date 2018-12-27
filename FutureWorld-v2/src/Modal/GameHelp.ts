class GameHelp extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Modal/GameHelpUI.exml";
    }

     /**lang data */
    private langData:Object = $ZHTW.game;
    
    public modal:eui.Rect;
    public langTitleImg:eui.Image;
    public layoutGroup:eui.Group;

    public clolangTitleImgse:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.layout();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    }

    private closeFun() {
        $closeModalFun($Modal.gameHelp);
    }

    private layout() {
        let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.gap = 50;
        vLayout.paddingTop = 30;
        vLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        this.layoutGroup.layout = vLayout; 
    }
}
