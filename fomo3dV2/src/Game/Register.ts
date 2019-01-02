class Register extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/RegisterUI.exml";
    }

    public modal: eui.Rect;
    public close: eui.Image;

    public langTitleImg: eui.Image;
    public langRandomBtn: eui.Image;
    public langRegisterBtn: eui.Image;

    public input: eui.EditableText;
    public randomBtn: eui.Group;
    public registerBtn: eui.Group;

    private data = {
        input: ""
    };

    /**lang data */
    private langData: any = $ZHTW.game;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.randomName, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
        this.input.addEventListener(egret.TouchEvent.FOCUS_OUT, this.focusOut, this);
    }

    private watchRegister() {
        let myEvent = $gameContractInstance.onRegisterName();
        // 监听事件，监听到事件后会执行回调函数
        myEvent.watch((err, result) => {
            if (!err) {
                $Modal.register.visible = false;
            } else {
                console.log(err);
            }
            myEvent.stopWatching();
        });
    }

    /**
     * 随机生成名字
     */
    private randomName() {
        this.data.input = Math.random().toString(36).substr(2);
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
            let reg = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{1,16}$/g;
            if (reg.test(this.data.input)) {
                let commission = web3js.toWei("0.02");
                $gameContractInstance.registerName(this.data.input, _referrer, {
                    from: $myAddress,
                    value: commission
                }, (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        err && console.log(err);
                        hash && this.watchRegister();
                        console.log(hash);
                    }
                });
            } else {
                $alert($AlertMsg.errorReg);
            }
        } else {
            notSignInMetamask();
        }
    }

    private focusOut(e: egret.TouchEvent) {
        this.data.input = e.target.text;
    }

    private clostFun() {
        let group = $Modal.register.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({y: 1716}, 200).call(function () {
            $Modal.register.visible = false;
            tw = null;
        });
    }
}
