class ApproveTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Modal/GameApprove.exml";
    }

    public msg = '进行探探需要CKC\n现在将为你授权10000 CKC！\n';

    public modal: eui.Rect;
    public title: eui.Image;
    public submitBtn: eui.Group;
    public cancelBtn: eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            let approve = web3js.toWei("10000");
            $tokenContractInstance.approve($gameContractInstance.address, approve, {
                from: $myAddress,
                gasPrice: 10000000000
            }, (err, hash) => {
                err && console.log(err);
                console.log(hash);
                setTimeout(() => {
                    $Modal.approve.visible = false;
                    if(hash){
                        $alert($AlertMsg.alreadyBuy);
                        setTimeout(()=>{
                            $Modal.gameAlert.visible = false;
                        }, 3000)
                    }
                    let timer = setInterval(() => {
                        if ($Content.game.data.approveNum == "0") {
                            $Content.game.getMyApprove();
                        } else {
                            clearInterval(timer);
                        }
                    }, 1500)
                }, 1500)
            });
            setTimeout(() => {
                this.closeFun();
            }, 5000);
        }, this);
    }

    private closeFun() {
        $Modal.approve.visible = false;
    }
}
