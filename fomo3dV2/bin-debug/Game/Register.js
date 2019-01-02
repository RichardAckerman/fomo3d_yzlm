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
        _this.data = {
            input: ""
        };
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
        this.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.randomName, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
        this.input.addEventListener(egret.TouchEvent.FOCUS_OUT, this.focusOut, this);
    };
    Register.prototype.watchRegister = function () {
        var myEvent = $gameContractInstance.onRegisterName();
        // 监听事件，监听到事件后会执行回调函数
        myEvent.watch(function (err, result) {
            if (!err) {
                $Modal.register.visible = false;
            }
            else {
                console.log(err);
            }
            myEvent.stopWatching();
        });
    };
    /**
     * 随机生成名字
     */
    Register.prototype.randomName = function () {
        this.data.input = Math.random().toString(36).substr(2);
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
            var reg = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{1,16}$/g;
            if (reg.test(this.data.input)) {
                var commission = web3js.toWei("0.02");
                $gameContractInstance.registerName(this.data.input, _referrer, {
                    from: $myAddress,
                    value: commission
                }, function (err, hash) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        err && console.log(err);
                        hash && _this.watchRegister();
                        console.log(hash);
                    }
                });
            }
            else {
                $alert($AlertMsg.errorReg);
            }
        }
        else {
            notSignInMetamask();
        }
    };
    Register.prototype.focusOut = function (e) {
        this.data.input = e.target.text;
    };
    Register.prototype.clostFun = function () {
        var group = $Modal.register.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            $Modal.register.visible = false;
            tw = null;
        });
    };
    return Register;
}(eui.Component));
__reflect(Register.prototype, "Register");
