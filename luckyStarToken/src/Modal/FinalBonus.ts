class FinalBonus extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/modal/FinalBonusUI.exml";
    }

    public closeBg: eui.Rect;
    public lastLucky: eui.Group;
    public title: eui.Image;

    private luckyUnit;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);

        this.luckyUnit = new FinalBonusUnit();
        this.lastLucky.addChild(this.luckyUnit);
    }

    private getLastList() {
        this.luckyUnit.getData();
    }

    private closeFun() {
        $closeModalFun(this, -1360);
    }
}
