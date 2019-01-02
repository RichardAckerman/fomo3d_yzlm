class Register extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/RegisterUI.exml";
    }

    public modal: eui.Rect;
    public close: eui.Image;

    public langTitleImg: eui.Image;
    public langRegisterBtn: eui.Image;

    public registerBtn: eui.Group;


    /**lang data */
    private langData: any = $ZHTW.game;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
    }

    /**
     * 注册按钮
     */
    private registerReg() {
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        let href = location.href;
        let addr = href.split("?")[1];
        let _referrer = "0x0000000000000000000000000000000000000000";
        if (addr) {
            if (web3js.isAddress(addr)) { // 是地址
                _referrer = addr;
                this.registerFun(_referrer);
            } else if (isNaN(Number(addr))) { // 是名称
                console.log(web3js.fromAscii(addr));
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            } else {// 是id
                $gameContractInstance.playerxID_(addr, (err, data) => {
                    if (err) {
                        $alert(err);
                    }
                    else {
                        _referrer = data[0];
                        this.registerFun(_referrer);
                    }
                });
            }
        } else {
            this.registerFun(_referrer);
        }
    }


    private registerFun(_referrer) {
        console.log(_referrer);
        if ($myAddress) {
            let commission = web3js.toWei("0.02");
            $gameContractInstance.registerName(_referrer, {
                from: $myAddress,
                value: commission
            }, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    hash && console.log(hash);
                }
                setTimeout(() => {
                    this.closeModalFun();
                }, 2000);
            });
        } else {
            notSignInMetamask();
        }
    }

    private clostFun() {
        let group = $Modal.register.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({y: 1716}, 200).call(function () {
            $Modal.register.visible = false;
            tw = null;
        });
    }

    private closeModalFun() {
        let group = this.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({y: 1716}, 200).call(() => {
            this.visible = false;
            tw = null;
        });
    }
}
