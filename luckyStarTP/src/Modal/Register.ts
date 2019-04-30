class Register extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/modal/RegisterPanel.exml";
    }

    public closeBg: eui.Rect;
    public title: eui.Image;
    public registerGroup: eui.Group;
    public registerBtn: eui.Group;
    public linkGroup: eui.Group;
    public copyBtn: eui.Group;

    /**lang data */
    private langData: any = $ZHTW.game;

    private data = {
        idUrl: "",
        addrUrl: "",
        myInviter: "无"
    };

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
        this.copyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'id'), this);
    }

    private getMyInviter() {
        getMyKeyProp().then((data) => {
            if (data[8].toString() == "0") {
                this.data.myInviter = "无";
            } else {
                $gameContractInstance.playerxID_(data[8].toString(), (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.data.myInviter = info[0];
                    }
                });
            }
        });
    }

    /**
     * 注册按钮
     */
    private registerReg() {
        if ($isNotAtApp()) {
            notSignInMetamask();
            return;
        }
        let _referrer = "0x0000000000000000000000000000000000000000";
        if ($chargeEquelAddr($beginAddr, $myAddress)) {
            this.registerFun(_referrer);
            return;
        }
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, (err, id) => {
            if (err) {
                alert("pIDxAddr_===" + err);
            } else {
                if (id.toString() == "0") {
                    $Modal.bandCodeAlert.inviteCode().then((ref) => {
                        this.registerFun(ref);
                    });
                } else {
                    getMyKeyProp().then((data) => {
                        if (data[8].toString() == "0") {
                            $alert("您在投注时未输入推荐码，不能申请成为推荐人");
                            this.visible = false;
                        } else {
                            this.registerFun(_referrer);
                        }
                    });
                }
            }
        });
    }

    private registerFun(_referrer) {
        if ($myAddress) {
            $Content.game.chargeLimit().then((has) => {
                // alert("授权额度:" + has);
                $gameContractInstance.registrationFee_((err, fee) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // alert("registrationFee_:" + fee);
                        if (Number(has) > 0 && parseInt(has + "") >= parseInt(fee)) {
                            $Content.game.chargeBalance().then((coin) => {
                                // alert("我的Token余額為:" + coin);
                                if (Number(coin) < parseInt(fee)) {
                                    $alert(`您的CBE余額為${$toFixedDecimal(coin)},不足以支付本次交易`);
                                    return;
                                }
                                this.moacBuyFun(fee.toString(), _referrer);
                            });
                        } else {
                            // 弹窗去充值额度
                            if (confirm("您的授权额度为" + $toFixedDecimal(has) + ",将为您进行授权")) {
                                $Content.game.approveFun(() => {
                                    $loadingDisplay(true);
                                    let timer = setInterval(() => {
                                        if ($Content.game.data.approveNum == "0") {
                                            $Content.game.getMyApprove();
                                        } else {
                                            $loadingDisplay(false);
                                            clearInterval(timer);
                                            if (confirm("授权成功，将为您发起申请推荐码交易！")) {
                                                // $Modal.register.moacBuyFun(fee.toString(), _referrer);
                                                $Modal.register.registerFun(_referrer);
                                            }
                                        }
                                    }, 1500);
                                });
                            }
                        }
                    }
                });
            }, (err) => {
                $alert(err);
            });
        } else {
            notSignInMetamask();
        }
    }

    private moacBuyFun(input, _referrer) {
        try {
            $loadingDisplay(false);
            let data = $gameContractInstance.registerName.getData(input, _referrer);
            let parameters = {
                from: $myAddress,
                to: $contract,
                gasPrice: 30000000000,
                gasLimit: 2000000,
                data: data,
                value: '0',
                chainId: 99,
                via: '',
                shardingFlag: 0,
            };
            $tp.pushMoacTransaction(parameters).then((response) => {
                if (!response.result) {
                    alert('交易发送失败！' + response.message);
                } else {
                    $alert('注册交易发送成功，请等待交易完成！'); // 链上的失败消息也会弹出来
                    // $alert('注册交易发送成功，请等待交易完成！' + JSON.stringify(response.data)); // 链上的失败消息也会弹出来
                }
                setTimeout(() => {
                    $closeModalFun($Modal.register, -1360);
                }, 1000);
            });
        } catch (e) {
            alert("try catch : " + e);
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
            setTimeout(this.closeFun, 2000);
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
                // let url = location.href.split("?")[0];
                // this.data.idUrl = `${url}?${data.toString()}`;
                this.data.idUrl = window.btoa(data.toString());
            }
        });
    }

    private closeFun() {
        $closeModalFun($Modal.register, -1360);
    }
}
