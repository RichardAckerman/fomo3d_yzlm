class WeatherBandCodeTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/alert/WeatherBandCode.exml";
    }

    public modal: eui.Rect;
    public cancelBtn: eui.Group;
    public submitBtn: eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
        $loadingDisplay(false);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inputFun, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelFun, this);
    }

    private inputFun() {
        this.inviteCode().then((ref) => {
            // $alertFun("即将雇佣，雇佣成功后推荐码自动绑定",()=>{
            //     $Content.game.rollIn(ref);
            // });
            alert("即将雇佣，雇佣成功后推荐码自动绑定");
            $Content.game.rollIn(ref);
        });
    }

    private inviteCode() {
        this.visible = false;
        return new Promise((resolve, reject) => {
            $gameContractInstance.nPlayerNum((err, num) => {
                if (err) {
                    $alert("nPlayerNum===" + err);
                } else {
                    let codeS = prompt(`请输入你的推荐码(推荐码一旦绑定不可更改，请仔细核对并严格区分大小写):`);
                    if (codeS == null) {
                        return;
                    }
                    let code = 0;
                    try {
                        let atobC = window.atob(codeS);
                        code = parseInt(atobC);
                    } catch (e) {
                        $alert("您输入的推荐码不合法");
                        return;
                    }
                    if (isNaN(code)) {
                        $alert("您输入的推荐码不合法");
                        return;
                    }
                    if (code < 1 || code > parseInt(num.toString())) {
                        $alert("您输入的推荐码超出范围");
                        return;
                    }
                    $gameContractInstance.playerxID_(code, (err, data) => {
                        if (err) {
                            $alert(err);
                        } else {
                            $gameContractInstance.playerIsRegi(data[0], (err, bool) => {
                                if (err) {
                                    $alert(err);
                                } else {
                                    if (bool) {
                                        resolve(data[0]);
                                    } else {
                                        $alert("您输入的推荐码未注册");
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    private cancelFun() {
        this.visible = false;
        let _referrer = "0x0000000000000000000000000000000000000000";
        $Content.game.rollIn(_referrer);
    }
}
