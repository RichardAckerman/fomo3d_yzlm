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
var Extract = (function (_super) {
    __extends(Extract, _super);
    function Extract() {
        var _this = _super.call(this) || this;
        _this.data = {
            lockdown: "0",
            scam: "0",
            advice: '0',
            total: "0",
            tatalUSD: "0 USDT"
        };
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/ExtractUI.exml";
        return _this;
    }
    Extract.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.drawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawFun, this);
    };
    Extract.prototype.clostFun = function () {
        var group = $Modal.extract.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            $Modal.extract.visible = false;
            tw = null;
        });
    };
    Extract.prototype.drawFun = function () {
        var _this = this;
        if ($myAddress) {
            $gameContractInstance.withdrawKey($myAddress, {
                from: $myAddress,
            }, function (err, hash) {
                err && console.log(err);
                hash && _this.watchDrawKey();
                console.log(hash);
            });
        }
        else {
            notSignInMetamask();
        }
    };
    Extract.prototype.watchDrawKey = function () {
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
    return Extract;
}(eui.Component));
__reflect(Extract.prototype, "Extract");
