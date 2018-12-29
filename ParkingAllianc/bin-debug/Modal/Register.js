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
        _this.data = {
            idUrl: "",
            addrUrl: ""
        };
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Modal/RegisterUI.exml";
        return _this;
    }
    Register.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
        this.copyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'id'), this);
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
                    err && console.log(err);
                    setTimeout(function () {
                        _this.closeFun();
                    }, 2000);
                }
            });
        }
        else {
            notSignInMetamask();
        }
    };
    Register.prototype.copyUrl = function (sign) {
        var _this = this;
        var div = document.getElementById("copyElement");
        if (!div) {
            div = document.createElement('textarea');
            div.id = "copyElement";
            document.body.appendChild(div);
        }
        var btn = document.createElement('button');
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
        var clipboard = new ClipboardJS('#btnId', {
            target: function () {
                return document.querySelector('#copyElement');
            }
        });
        clipboard.on('success', function (e) {
            $alert($AlertMsg.copySuc);
            setTimeout(_this.closeFun, 2000);
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
    };
    Register.prototype.getUrl = function () {
        var _this = this;
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, function (err, data) {
            if (err) {
                $alert(err);
            }
            else {
                var url = location.href.split("?")[0];
                _this.data.idUrl = url + "?" + data.toString();
            }
        });
    };
    Register.prototype.closeFun = function () {
        $closeModalFun($Modal.register, -1360);
    };
    return Register;
}(eui.Component));
__reflect(Register.prototype, "Register");
