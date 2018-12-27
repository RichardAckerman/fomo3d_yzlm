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
var ApproveTs = (function (_super) {
    __extends(ApproveTs, _super);
    function ApproveTs() {
        var _this = _super.call(this) || this;
        _this.msg = '进行炼丹需要ODF\n现在将为你授权10000 ODF！\n';
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Modal/GameApprove.exml";
        return _this;
    }
    ApproveTs.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var approve = web3js.toWei("10000");
            $tokenContractInstance.approve($gameContractInstance.address, approve, {
                from: $myAddress,
            }, function (err, hash) {
                err && console.log(err);
                console.log(hash);
                setTimeout(function () {
                    $Modal.approve.visible = false;
                    if (hash) {
                        $alert($AlertMsg.alreadyBuy);
                        setTimeout(function () {
                            $Modal.gameAlert.visible = false;
                        }, 3000);
                    }
                    var timer = setInterval(function () {
                        if ($Content.game.data.approveNum == "0") {
                            $Content.game.getMyApprove();
                        }
                        else {
                            clearInterval(timer);
                        }
                    }, 1500);
                }, 1500);
            });
            setTimeout(function () {
                _this.closeFun();
            }, 5000);
        }, this);
    };
    ApproveTs.prototype.closeFun = function () {
        $Modal.approve.visible = false;
    };
    return ApproveTs;
}(eui.Component));
__reflect(ApproveTs.prototype, "ApproveTs");
