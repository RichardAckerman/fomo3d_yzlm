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
var Register = (function (_super) {
    __extends(Register, _super);
    function Register() {
        var _this = _super.call(this) || this;
        /**lang data */
        _this.langData = $ZHTW.game;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/RegisterUI.exml";
        return _this;
    }
    Register.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
    };
    /**
     * 注册按钮
     */
    Register.prototype.registerReg = function () {
        var _this = this;
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        var href = location.href;
        var addr = href.split("?")[1];
        var _referrer = "0x0000000000000000000000000000000000000000";
        if (addr) {
            if (web3js.isAddress(addr)) {
                _referrer = addr;
                this.registerFun(_referrer);
            }
            else if (isNaN(Number(addr))) {
                console.log(web3js.fromAscii(addr));
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            }
            else {
                $gameContractInstance.playerxID_(addr, function (err, data) {
                    if (err) {
                        $alert(err);
                    }
                    else {
                        _referrer = data[0];
                        _this.registerFun(_referrer);
                    }
                });
            }
        }
        else {
            this.registerFun(_referrer);
        }
    };
    Register.prototype.registerFun = function (_referrer) {
        var _this = this;
        console.log(_referrer);
        if ($myAddress) {
            var commission = web3js.toWei("0.02");
            $gameContractInstance.registerName(_referrer, {
                from: $myAddress,
                value: commission
            }, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                else {
                    hash && console.log(hash);
                }
                setTimeout(function () {
                    _this.closeModalFun();
                }, 2000);
            });
        }
        else {
            notSignInMetamask();
        }
    };
    Register.prototype.clostFun = function () {
        var group = $Modal.register.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            $Modal.register.visible = false;
            tw = null;
        });
    };
    Register.prototype.closeModalFun = function () {
        var _this = this;
        var group = this.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            _this.visible = false;
            tw = null;
        });
    };
    return Register;
}(eui.Component));
__reflect(Register.prototype, "Register");
