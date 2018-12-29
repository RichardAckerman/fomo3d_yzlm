class Register extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Modal/RegisterUI.exml";
    }

    public closeBg: eui.Rect;
    public title: eui.Image;
    public close: eui.Image;
    public registerGroup: eui.Group;
    public registerBtn: eui.Group;
    public linkGroup: eui.Group;
    public copyBtn: eui.Group;

    /**lang data */
    private langData: any = $ZHTW.game;

    private data = {
        idUrl: "",
        addrUrl: ""
    };

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
        this.copyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'id'), this);
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
                    err && console.log(err);
                    setTimeout(() => {
                        this.closeFun();
                    }, 2000);
                }
            });
        } else {
            notSignInMetamask();
        }
    }

    private copyUrl(sign) {
        let div = document.getElementById("copyElement");
        if (!div) {
            div = document.createElement('textarea');
            div.id = "copyElement";
            document.body.appendChild(div);
        }

        let btn = document.createElement('button');
        btn.setAttribute("id", "btnId");
        btn.setAttribute("data-clipboard-action", "copy");
        btn.setAttribute("data-clipboard-target", "#copyElement");
        document.body.appendChild(btn);

        switch (sign) {
            case "address":
                div.innerHTML = this.data.addrUrl;
                break;
            case "id":
                div.innerHTML = this.data.idUrl;
                break;
            default:
                break;
        }

        let clipboard = new ClipboardJS('#btnId', {
            target: function () {
                return document.querySelector('#copyElement');
            }
        });
        clipboard.on('success', (e)=> {
            $alert($AlertMsg.copySuc);
            setTimeout(this.closeFun, 2000)
        });

        clipboard.on('error', function (e) {
            $alert("Copy error");
        });
        btn.click();
        div.setAttribute("readonly", "true");
        div.style.width = "0";
        div.style.height = "0";
        div.style.opacity = "0";
        btn.style.width = "0";
        btn.style.height = "0";
        btn.style.opacity = "0";
    }

    private getUrl() {
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, data) => {
            if (err) {
                $alert(err);
            } else {
                let url = location.href.split("?")[0];
                this.data.idUrl = `${url}?${data.toString()}`;
            }
        });
    }

    private closeFun() {
        $closeModalFun($Modal.register, -1360);
    }
}
