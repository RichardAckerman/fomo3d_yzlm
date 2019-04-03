class GuideHomeTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/guide/GuideHome.exml";
    }

    public modal: eui.Rect;
    public welcome: eui.Group;
    public continue: eui.Label;
    public invite: eui.Group;
    public inviteBtn: eui.Image;
    public register: eui.Group;
    public registerBtn: eui.Image;
    public buy: eui.Group;
    public withdraw: eui.Group;
    public info: eui.Group;
    public last: eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.welcome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInvite, this);
        this.invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInviteModal, this);
        this.register.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBuy, this);
        this.buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showWithdraw, this);
        this.withdraw.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfo, this);
        this.info.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    }

    private closeFun() {
        this.info.visible = false;
        this.modal.visible = false;
        this.last.visible = true;
        $Content.game.showDataModalFun();
    }

    private showInvite() {
        this.welcome.visible = false;
        this.invite.visible = true;
    }

    private showInviteModal() {
        this.invite.visible = false;
        this.register.visible = true;
        $Modal.register.visible = true;
        $Modal.register.registerGroup.visible = true;
        $Modal.register.linkGroup.visible = false;
    }

    private showBuy() {
        $Modal.register.visible = false;
        this.buy.visible = true;
        this.register.visible = false;
    }

    private showWithdraw() {
        this.buy.visible = false;
        this.withdraw.visible = true;
    }

    private showInfo() {
        this.withdraw.visible = false;
        this.info.visible = true;
    }
}
