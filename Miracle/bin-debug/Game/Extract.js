var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ExtractTs = (function (_super) {
    __extends(ExtractTs, _super);
    function ExtractTs() {
        var _this = _super.call(this) || this;
        _this.data = {
            lockdown: "0",
            scam: "0",
            advice: '0',
            total: "0",
            tatalUSD: "0"
        };
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/ExtractUI.exml";
        return _this;
    }
    ExtractTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.drawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawFun, this);
    };
    ExtractTs.prototype.clostFun = function () {
        var group = $Modal.extract.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            $Modal.extract.visible = false;
            tw = null;
        });
    };
    ExtractTs.prototype.drawFun = function () {
        $Modal.betLoad.visible = true;
        if ($myAddress) {
            $gameContractInstance.withDraw({
                from: $myAddress,
            }, function (err, hash) {
                if (err) {
                    $alert(err);
                    console.log(err);
                }
                else {
                    $alert('请耐心等待交易完成');
                    var timer_1 = setInterval(function () {
                        $Content.game.updatePlayerData().then(function () {
                            clearInterval(timer_1);
                            timer_1 = null;
                        });
                    }, 3000);
                }
                // console.log(hash);
            });
        }
        else {
            notSignInMetamask();
        }
    };
    ExtractTs.prototype.watchDrawKey = function () {
        var myEvent = $gameContractInstance.onWithdraw();
        // 监听事件，监听到事件后会执行回调函数
        myEvent.watch(function (err, result) {
            if (!err) {
                console.log(result);
            }
            else {
                console.log(err);
            }
            myEvent.stopWatching();
        });
    };
    return ExtractTs;
}(eui.Component));
__reflect(ExtractTs.prototype, "ExtractTs");
