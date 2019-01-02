class GameHelp extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/GameHelpUI.exml";
    }

     /**lang data */
    private langData:Object = $ZHTW.game;
    
    public modal:eui.Rect;
    public close:eui.Image;
    public layoutGroup:eui.Group;
    
    public clolangTitleImgse:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.layout();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
    }

    private clostFun() {
        let group = $Modal.gameHelp.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({ y: 1716 }, 200).call(function(){
            $Modal.gameHelp.visible = false;
            tw = null;
        });
    }

    private layout() {
        let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.gap = 50;
        vLayout.paddingTop = 30;
        vLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        this.layoutGroup.layout = vLayout; 
    }
}
