class RefereeInfo extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/RefereeInfoUI.exml";
    }

    public modal: eui.Rect;
    public close: eui.Image;

    public langTitleImg: eui.Image;
    public langWalletAddr: eui.Image;
    public langCopyBtn1: eui.Image;
    public langIdAddr: eui.Image;
    public langCopyBtn2: eui.Image;
    public langNameAddr: eui.Image;
    public langCopyBtn3: eui.Image;

    public addressUrl: eui.Label;
    public copyAddrUrl: eui.Group;
    public idUrl: eui.Label;
    public copyIdUrl: eui.Group;

    /**获取用户数据 */
    private updateData: egret.Timer = new egret.Timer(2000, 0);
    private myAddress = $myAddress;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.copyAddrUrl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'address'), this);
        this.copyIdUrl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'id'), this);
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
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
                div.innerHTML = this.addressUrl.text;
                break;
            case "id":
                div.innerHTML = this.idUrl.text;
                break;
            default:
                break;
        }

        let clipboard = new ClipboardJS('#btnId', {
            target: function () {
                return document.querySelector('#copyElement');
            }
        });
        clipboard.on('success', function (e) {
            $alert($AlertMsg.copySuc);
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

    private getData() {
        if (this.myAddress !== $myAddress) {
            this.getUrl();
            this.myAddress = $myAddress;
        }
    }

    public getUrl() {
        if ($myAddress) {
            let url = location.href.split("?")[0];

            $gameContractInstance.pIDxAddr_($myAddress, (err, id) => {
                if (err) {
                    $alert(err);
                } else {
                    let urlId = id.toString();
                    if (urlId == "0") {
                        this.addressUrl.text = "Loading";
                        this.idUrl.text = "Loading";
                    } else {
                        this.addressUrl.text = url + "?" + $myAddress;
                        this.idUrl.text = url + "?" + urlId;
                    }
                }
            });
            this.myAddress = $myAddress;
        }
    }

    private clostFun() {
        this.updateData.stop();
        let group = $Modal.refereeInfo.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({y: 1716}, 200).call(function () {
            $Modal.refereeInfo.visible = false;
            tw = null;
        });
    }
}
