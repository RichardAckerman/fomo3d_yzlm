class Extract extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/ExtractUI.exml";
    }
    
    private data = {
        lockdown: "0",
        scam: "0",
        advice: '0',
        total: "0",
        tatalUSD: "0 USDT"
    };



    public modal: eui.Rect;
    public close: eui.Image;
    public drawBtn: eui.Group;
    
    public langTitleImg:eui.Image;
    public langExtractBtn:eui.Image;
    public langFenHong:eui.Image;
    public langTuiJian:eui.Image;
    public langTotal:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.drawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawFun, this);
        
    }

    private clostFun() {
        let group = $Modal.extract.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({y: 1716}, 200).call(function () {
            $Modal.extract.visible = false;
            tw = null;
        });
    }

    private drawFun() {
        if($myAddress) {
            $gameContractInstance.withdrawKey($myAddress, {
                from: $myAddress,
            }, (err, hash) => {
                err && console.log(err);
                hash && this.watchDrawKey();
                console.log(hash);
            });
        } else {
            notSignInMetamask();
        }
    }

    private watchDrawKey() {
        let myEvent = $gameContractInstance.onWithdraw();
        // 监听事件，监听到事件后会执行回调函数
        myEvent.watch((err, result) => {
            if (!err) {
                console.log(result);
            } else {
                console.log(err);
            }
            myEvent.stopWatching();
        });
    }
}
