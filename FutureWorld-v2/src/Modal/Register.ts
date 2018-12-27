class Register extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Modal/RegisterUI.exml";
    }

    public closeBg: eui.Rect;
    public aniBg: eui.Image;
    public panel: eui.Group;
    public title: eui.Image;
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
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerBefore, this);
        this.copyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'id'), this);
    }

    /**
     * 注册按钮
     */
    private registerBefore() {
        $Content.game.chargeLimit().then((has) => {
            if (Number(has) > 0) {
                this.registerReg();
            } else {
                // 弹窗去充值额度
                console.log("没授权");
                let lang = localStorage.getItem('language');
                if (lang) {
                    $Modal.approve.msg = lang == "zhtw" ? '升級為探長需要CKC\n現在將為妳授權10000 CKC' : "Upgrading to detective requires 10000 CKC !";
                }
                $Modal.approve.visible = true;
            }
        }, (err) => {
            $alert($AlertMsg.errorNet);
        })
    }

    private registerReg() {
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        let addr = $getQueryIdString(); // 获取id
        let _referrer = "0x0000000000000000000000000000000000000000";
        if (addr) {
            addr = window.atob(addr);
            if (web3js.isAddress(addr)) { // 是地址
                _referrer = addr;
                this.registerFun(_referrer);
            } else if (isNaN(Number(addr))) { // 是名称
                console.log(web3js.fromAscii(addr));
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            } else {// 是id
                $gameContractInstance.playerxID_(addr, (err, data) => {
                    if (err) {
                        $alert($AlertMsg.errorNet);
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
            let commission = web3js.toWei("2");
            $gameContractInstance.registerName(_referrer, commission, {
                from: $myAddress,
                gasPrice: 10000000000
            }, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    err && console.log(err);
                    setTimeout(() => {
                        this.closeFun();
                        if((err && err.hash) || hash){
                            $dragonBonesAnime(3);
                            // $alert($AlertMsg.alreadyBuy);
                            // setTimeout(()=>{
                            //     $Modal.gameAlert.visible = false;
                            // }, 3000)
                        }
                    }, 2000);
                }
            });
            setTimeout(() => {
                this.closeFun();
            }, 5000);
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
        clipboard.on('success', (e) => {
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
                $alert($AlertMsg.errorNet);
            } else {
                // let url = location.href.split("?")[0];
                let url = "http://futureofworlds.org/";
                let id = window.btoa(data.toString());
                this.data.idUrl = `${url}?id=${id}`;
                // this.data.idUrl = `${url}?id=${data.toString()}`;
            }
        });
    }

    private closeFun() {
        $closeModalFun($Modal.register);
    }
}
