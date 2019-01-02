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
var BuyKey = (function (_super) {
    __extends(BuyKey, _super);
    function BuyKey() {
        var _this = _super.call(this) || this;
        _this.data = {
            input: '1',
            exchangeRate: 0,
            choosedTeam: 2,
            tips: "Key prices will increase slowly, subject to transaction price.",
            myAllBuy: "0"
        };
        _this.langData = $ZHTW.game;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/BuyKeyModal.exml";
        return _this;
    }
    BuyKey.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.closeModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModalFun, this);
        /**buy key event */
        this.inputText.addEventListener(egret.FocusEvent.CHANGE, this.onChange, this);
        this.inputText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOut, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
        this.addInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFun, this);
        this.minuInput.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusFun, this);
    };
    /**
     * 买钥匙函数
     */
    BuyKey.prototype.buyKeyFun = function () {
        var _this = this;
        getIsBegin().then(function (bool) {
            if (!bool) {
                _this.directBuy();
            }
            else {
                setOverTime().then(function (time) {
                    if (time > 86400) {
                        $alert($AlertMsg.readyTime);
                        return;
                    }
                    _this.directBuy();
                });
            }
        });
    };
    BuyKey.prototype.directBuy = function () {
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
                this.rollIn(_referrer);
            }
            else if (isNaN(Number(addr))) {
                console.log(web3js.fromAscii(addr));
                console.log("請保持瀏覽器地址後綴為正確的賬戶地址或id");
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            }
            else {
                $gameContractInstance.playerxID_(addr, function (err, data) {
                    if (err) {
                        $alert(err);
                    }
                    else {
                        _referrer = data[0];
                        _this.rollIn(_referrer);
                    }
                });
            }
        }
        else {
            this.rollIn(_referrer);
        }
    };
    BuyKey.prototype.rollIn = function (_referrer) {
        var _this = this;
        if ($myAddress == _referrer) {
            // $alert($AlertMsg.selfReferrer);
            // return;
            _referrer = "0x0000000000000000000000000000000000000000";
        }
        $myAddress && getMyKeyProp().then(function (data) {
            if (data[2].c.length >= 10) {
                $alert($AlertMsg.isQueue);
                return;
            }
            console.log(web3js.toWei(_this.data.input, "ether"));
            web3js.eth.getBalance($myAddress, function (err, balance) {
                if (err) {
                    console.log(err);
                    return;
                }
                var my = parseFloat(web3js.fromWei(balance, "ether"));
                if (my < parseInt(_this.data.input)) {
                    $alert($AlertMsg.notSufficientFunds);
                    return;
                }
                $gameContractInstance.coinRollIn(_referrer, {
                    from: $myAddress,
                    value: web3js.toWei(_this.data.input, "ether")
                }, function (err, hash) {
                    err && console.log(err);
                    console.log(hash);
                    setTimeout(function () {
                        _this.closeModalFun();
                    }, 2000);
                });
            });
        }, function (err) {
            console.log(err);
        });
    };
    /**buy key events fun */
    BuyKey.prototype.onChange = function (e) {
        this.data.input = e.target.text.replace(/[^\d]/g, "");
    };
    BuyKey.prototype.focusOut = function (e) {
        var num = e.target.text.replace(/[^\d]/g, "");
        num = num > 10 ? 10 : num;
        num = num < 2 ? 2 : num;
        e.target.text = num;
        this.data.input = num;
        if (!this.data.input)
            this.data.input = '1';
    };
    BuyKey.prototype.minusFun = function () {
        var val = Number(this.data.input);
        if (val > 2) {
            val--;
            this.data.input = String(val);
        }
    };
    BuyKey.prototype.addFun = function () {
        var val = Number(this.data.input);
        if (val >= 10) {
            return;
        }
        val++;
        this.data.input = String(val);
    };
    BuyKey.prototype.closeModalFun = function () {
        var _this = this;
        var group = this.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            _this.visible = false;
            tw = null;
        });
    };
    return BuyKey;
}(eui.Component));
__reflect(BuyKey.prototype, "BuyKey");
