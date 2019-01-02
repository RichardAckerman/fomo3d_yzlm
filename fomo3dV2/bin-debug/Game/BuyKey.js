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
            percentChance: '0 ETH',
            input: '500',
            conversionNum: '0',
            exchangeRate: 0,
            choosedTeam: 2,
            totalKeys: '0',
            tips: "Key prices will increase slowly, subject to transaction price."
        };
        _this.langData = $ZHTW.game;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/BuyKeyModal.exml";
        return _this;
    }
    BuyKey.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.getKeyPrice();
        this.percentChance.layout = this.layoutCenter();
        this.closeModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModalFun, this);
        /**buy key event */
        this.inputText.addEventListener(egret.FocusEvent.CHANGE, this.onChange, this);
        this.inputText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOut, this);
        this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusFun, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFun, this);
        this.buyModalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
    };
    /**
     * 买钥匙函数
     */
    BuyKey.prototype.buyKeyFun = function () {
        var _this = this;
        this.getKeyPrice();
        getIsBegin().then(function (bool) {
            if (!bool) {
                _this.directBuy();
            }
            else {
                setOverTime().then(function (time) {
                    if (time > 21600) {
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
        console.log(_referrer);
        if ($myAddress == _referrer) {
            $alert($AlertMsg.selfReferrer);
            return;
        }
        $gameContractInstance.getCurrentBalance(function (err, price) {
            if (err) {
                $alert(err);
            }
            else {
                var p = web3js.fromWei(price, 'ether');
                var coin = parseFloat(_this.data.conversionNum.slice(1).split("E")[0].trim());
                // if (coin > 20) {
                //     $alert($AlertMsg.exceedBalance);
                //     return;
                // }
                if (coin <= 0) {
                    $alert($AlertMsg.errorKey);
                }
                else {
                    coin = parseInt(web3js.toWei(coin + "", 'ether'));
                    $myAddress && $myAddress && $gameContractInstance.keyRollIn($myAddress, _this.data.choosedTeam, _referrer, {
                        from: $myAddress,
                        value: coin
                    }, function (err, hash) {
                        err && console.log(err);
                        hash && _this.watchBuyKey();
                        console.log(hash);
                        setTimeout(function () {
                            _this.closeModalFun();
                        }, 2000);
                    });
                }
            }
        });
    };
    /**
     * 监听买入钥匙
     */
    BuyKey.prototype.watchBuyKey = function () {
        var _this = this;
        var myEvent = $gameContractInstance.onBuyKey();
        // 监听事件，监听到事件后会执行回调函数
        myEvent.watch(function (err, result) {
            if (!err) {
                console.log(result.args._msg);
                _this.getKeyPrice();
                var time = timestampToTime(Date.parse(new Date() + ""));
                !localStorage.marqueeText1 && (localStorage.marqueeText1 = result.args._addr + "\u5728" + time + "\u4E70\u4E86" + result.args._num.toString() + "\u628A\u94A5\u5319\uFF01");
                !localStorage.marqueeText2 && (localStorage.marqueeText2 = result.args._addr + "\u5728" + time + "\u4E70\u4E86" + result.args._num.toString() + "\u628A\u94A5\u5319\uFF01");
                !localStorage.marqueeText3 && (localStorage.marqueeText3 = result.args._addr + "\u5728" + time + "\u4E70\u4E86" + result.args._num.toString() + "\u628A\u94A5\u5319\uFF01");
                if (localStorage.marqueeText1 && localStorage.marqueeText2 && localStorage.marqueeText3) {
                    localStorage.marqueeText1 = result.args._addr + "\u5728" + time + "\u4E70\u4E86" + result.args._num.toString() + "\u628A\u94A5\u5319\uFF01";
                }
            }
            else {
                console.log(err);
            }
            myEvent.stopWatching();
        });
    };
    /**buy key events fun */
    BuyKey.prototype.onChange = function (e) {
        this.data.input = e.target.text.replace(/[^\d]/g, "");
    };
    BuyKey.prototype.focusOut = function (e) {
        var num = e.target.text.replace(/[^\d]/g, "");
        e.target.text = num;
        this.data.input = num;
        if (!this.data.input)
            this.data.input = '1';
        // if (num > 10000) {
        //     e.target.text = 10000 + "";
        //     this.data.input = 10000 + "";
        // }
        this.conversionFun();
        this.getPercentChance();
    };
    BuyKey.prototype.minusFun = function () {
        var val = Number(this.data.input);
        if (val > 1) {
            val--;
            this.data.input = String(val);
            this.conversionFun();
            this.getPercentChance();
        }
    };
    BuyKey.prototype.addFun = function () {
        var val = Number(this.data.input);
        // if (val >= 10000) {
        //     return;
        // }
        val++;
        this.data.input = String(val);
        this.conversionFun();
        this.getPercentChance();
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
    BuyKey.prototype.layoutCenter = function () {
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        return hLayout;
    };
    /**
     * 汇率换算
     */
    BuyKey.prototype.conversionFun = function () {
        var val = Number(this.data.input);
        var newVal;
        newVal = this.data.exchangeRate * val;
        newVal = Math.round(newVal * 100000000) / 100000000;
        newVal = String(newVal);
        newVal = "@ " + newVal + " ETH";
        this.data.conversionNum = newVal;
    };
    /**
     * 获取钥匙价格
     */
    BuyKey.prototype.getInitKeyPrice = function () {
        var _this = this;
        $gameContractInstance.keyPriceCurrent(function (err, price) {
            if (err) {
                console.log(err);
            }
            else {
                price = parseFloat(web3js.fromWei(price));
                $gameContractInstance.getTotalInvest(function (getErr, balance) {
                    if (getErr) {
                        console.log(getErr);
                    }
                    else {
                        // keyPriceCurrent = getTotalInvest() / (2 ether) * keyPriceInitial_ / 100 + keyPriceInitial_;
                        // keyPriceCurrent = getTotalInvest() / (1 ether) * keyPriceInitial_ / 1 + keyPriceInitial_;
                        var totalTotalInvest = parseFloat(web3js.fromWei("1601701210000000000000"));
                        var initData = totalTotalInvest / (1) * 0.0001 / 100 + 0.0001;
                        balance = parseFloat(web3js.fromWei(balance));
                        // price = Math.floor((balance) / 1) * 0.0001 / 100 + 0.0001;
                        price = Math.floor((balance - totalTotalInvest) / 5) * 0.0001 / 100 + initData;
                        price = Math.round(price * 100000000) / 100000000;
                        console.log(totalTotalInvest, price, initData);
                        _this.data.exchangeRate = price;
                        _this.data.input = "" + parseInt(2 / price + "");
                        _this.conversionFun();
                    }
                });
            }
        });
    };
    BuyKey.prototype.getKeyPrice = function () {
        var _this = this;
        $gameContractInstance.keyPriceCurrent(function (err, price) {
            if (err) {
                console.log(err);
            }
            else {
                // this.data.exchangeRate = parseFloat(web3js.fromWei(price));
                console.log(web3js.fromWei(price).toString());
                _this.conversionFun();
            }
        });
    };
    /**
     * 空投奖励计算
     */
    BuyKey.prototype.getPercentChance = function () {
        var _this = this;
        $gameContractInstance.teamPot(4, function (err, coin) {
            if (err) {
                console.log(err);
            }
            else {
                var percentVal = 0;
                var pour = coin[1].toNumber();
                var val = Number(_this.data.input);
                val = val * _this.data.exchangeRate;
                if (val <= 1) {
                    percentVal = pour * 0.25;
                }
                if (val > 1 && val <= 10) {
                    percentVal = pour * 0.5;
                }
                if (val > 10) {
                    percentVal = pour * 0.75;
                }
                percentVal = web3js.fromWei(percentVal);
                percentVal = Math.round(Number(percentVal) * 1000000) / 1000000;
                percentVal = String(percentVal);
                percentVal = percentVal + " ETH";
                _this.data.percentChance = percentVal;
            }
        });
    };
    return BuyKey;
}(eui.Component));
__reflect(BuyKey.prototype, "BuyKey");
