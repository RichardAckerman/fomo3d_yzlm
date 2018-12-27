class BuyKey extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/BuyKeyModal.exml";
    }

    public closeModal: eui.Rect;
    public totalTitle: eui.Image;
    public inputText: eui.EditableText;
    public minuInput: eui.Image;
    public addInput: eui.Image;
    public buyBtn: eui.Group;

    private data = {
        input: '3',  //输入框 代币数量
        exchangeRate: 0,   //汇率
        choosedTeam: 2,
        tips: "Key prices will increase slowly, subject to transaction price.",
        myAllBuy: "0"
    };
    private langData: Object = $ZHTW.game;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModalFun, this);
        /**buy key event */
        this.inputText.addEventListener(egret.FocusEvent.CHANGE, this.onChange, this);
        this.inputText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOut, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
        this.addInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFun, this);
        this.minuInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusFun, this);
    }

    /**
     * 买钥匙函数
     */
    private buyKeyFun(): void {
        getIsBegin().then((bool) => {
            if (!bool) {
                this.directBuy();
            } else {
                setOverTime().then((time) => {
                    if (time > 28800) {
                        $alert($AlertMsg.readyTime);
                        return;
                    }
                    this.directBuy();
                });
            }
        });
    }

    private directBuy() {
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
                this.rollIn(_referrer);
            } else if (isNaN(Number(addr))) { // 是名称
                console.log(web3js.fromAscii(addr));
                console.log("請保持瀏覽器地址後綴為正確的賬戶地址或id");
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            } else {// 是id
                $gameContractInstance.playerxID_(addr, (err, data) => {
                    if (err) {
                        $alert(err);
                    }
                    else {
                        _referrer = data[0];
                        this.rollIn(_referrer);
                    }
                });
            }
        } else {
            this.rollIn(_referrer);
        }
    }

    private rollIn(_referrer) {
        if ($myAddress == _referrer) {
            // $alert($AlertMsg.selfReferrer);
            // return;
            _referrer = "0x0000000000000000000000000000000000000000"
        }
        $myAddress && getMyKeyProp().then((data) => {
            if (data[2].c.length >=10) {
                $alert($AlertMsg.isQueue);
                return
            }
            console.log(web3js.toWei(this.data.input, "ether"));
            $gameContractInstance.coinRollIn(_referrer, {
                from: $myAddress,
                value: web3js.toWei(this.data.input, "ether")
            }, (err, hash) => {
                err && console.log(err);
                console.log(hash);
                setTimeout(() => {
                    this.closeModalFun();
                }, 2000);
            });
        }, (err) => {
            console.log(err);
        });
    }


    /**buy key events fun */
    private onChange(e: egret.TouchEvent) {
        this.data.input = e.target.text.replace(/[^\d]/g, "");
    }

    private focusOut(e: egret.TouchEvent) {
        let num = e.target.text.replace(/[^\d]/g, "");
        num = num > 10 ? 10 : num;
        num = num < 2 ? 2 : num;
        e.target.text = num;
        this.data.input = num;
        if (!this.data.input) this.data.input = '1';
    }

    private minusFun() {
        let val = Number(this.data.input);
        if (val > 2) {
            val--;
            this.data.input = String(val);
        }
    }

    private addFun() {
        let val = Number(this.data.input);
        if (val >= 10) {
            return;
        }
        val++;
        this.data.input = String(val);
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
