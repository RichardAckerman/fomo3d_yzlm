class BuyKey extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/Game/BuyKeyModal.exml";
    }

    public closeModal: eui.Rect;
    public totalTitle: eui.Image;
    public percentChance: eui.Group;
    public minusBtn: eui.Image;
    public addBtn: eui.Image;
    public inputText: eui.EditableText;
    public buyModalBtn: eui.Group;

    private data = {
        percentChance: '0 ETH',
        input: '500',  //输入框 代币数量
        conversionNum: '0',
        exchangeRate: 0,   //汇率
        choosedTeam: 2,
        totalKeys: '0', // 我的钥匙
        tips: "Key prices will increase slowly, subject to transaction price."
    };
    private langData: Object = $ZHTW.game;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.getKeyPrice();
        this.percentChance.layout = this.layoutCenter();
        this.closeModal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeModalFun, this);
        /**buy key event */
        this.inputText.addEventListener(egret.FocusEvent.CHANGE, this.onChange, this);
        this.inputText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOut, this);
        this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusFun, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFun, this);
        this.buyModalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyKeyFun, this);
    }

    /**
     * 买钥匙函数
     */
    private buyKeyFun(): void {
        this.getKeyPrice();
        getIsBegin().then((bool) => {
            if (!bool) {
                this.directBuy();
            } else {
                setOverTime().then((time) => {
                    if (time > 21600) {
                        $alert($AlertMsg.readyTime);
                        return;
                    }
                    this.directBuy();
                });
            }
        });
    }

    private directBuy() {
        if (!$myAddress) {
            notSignInMetamask();
            return;
        }
        let href = location.href;
        let addr = href.split("?")[1];
        let _referrer = "0x0000000000000000000000000000000000000000";
        if (addr) {
            if (web3js.isAddress(addr)) { // 是地址
                _referrer = addr;
                this.rollIn(_referrer);
            } else if (isNaN(Number(addr))) { // 是名称
                console.log(web3js.fromAscii(addr));
                console.log("請保持瀏覽器地址後綴為正確的賬戶地址或id");
                $alert("請保持瀏覽器地址後綴為正確的賬戶地址或id");
            } else {// 是id
                $gameContractInstance.playerxID_(addr, (err, data) => {
                    if (err) {
                        $alert(err);
                    }
                    else {
                        _referrer = data[0];
                        this.rollIn(_referrer);
                    }
                });
            }
        } else {
            this.rollIn(_referrer);
        }
    }

    private rollIn(_referrer) {
        console.log(_referrer);
        if ($myAddress == _referrer) {
            $alert($AlertMsg.selfReferrer);
            return;
        }
        $gameContractInstance.getCurrentBalance((err, price) => {
            if (err) {
                $alert(err);
            } else {
                let p = web3js.fromWei(price, 'ether');
                let coin = parseFloat(this.data.conversionNum.slice(1).split("E")[0].trim());
                // if (coin > 20) {
                //     $alert($AlertMsg.exceedBalance);
                //     return;
                // }
                if (coin <= 0) {
                    $alert($AlertMsg.errorKey)
                } else {
                    coin = parseInt(web3js.toWei(coin + "", 'ether'));
                    $myAddress && $myAddress && $gameContractInstance.keyRollIn($myAddress, this.data.choosedTeam, _referrer, {
                        from: $myAddress,
                        value: coin
                    }, (err, hash) => {
                        err && console.log(err);
                        hash && this.watchBuyKey();
                        console.log(hash);
                        setTimeout(() => {
                            this.closeModalFun();
                        }, 2000);
                    });
                }
            }
        });
    }


    /**
     * 监听买入钥匙
     */
    private watchBuyKey() {
        let myEvent = $gameContractInstance.onBuyKey();
        // 监听事件，监听到事件后会执行回调函数
        myEvent.watch((err, result) => {
            if (!err) {
                console.log(result.args._msg);
                this.getKeyPrice();
                let time = timestampToTime(Date.parse(new Date() + ""));
                !localStorage.marqueeText1 && (localStorage.marqueeText1 = `${result.args._addr}在${time}买了${result.args._num.toString()}把钥匙！`);
                !localStorage.marqueeText2 && (localStorage.marqueeText2 = `${result.args._addr}在${time}买了${result.args._num.toString()}把钥匙！`);
                !localStorage.marqueeText3 && (localStorage.marqueeText3 = `${result.args._addr}在${time}买了${result.args._num.toString()}把钥匙！`);
                if (localStorage.marqueeText1 && localStorage.marqueeText2 && localStorage.marqueeText3) {
                    localStorage.marqueeText1 = `${result.args._addr}在${time}买了${result.args._num.toString()}把钥匙！`
                }
            } else {
                console.log(err);
            }
            myEvent.stopWatching()
        })
    }

    /**buy key events fun */
    private onChange(e: egret.TouchEvent) {
        this.data.input = e.target.text.replace(/[^\d]/g, "");
    }

    private focusOut(e: egret.TouchEvent) {
        let num = e.target.text.replace(/[^\d]/g, "");
        e.target.text = num;
        this.data.input = num;
        if (!this.data.input) this.data.input = '1';
        // if (num > 10000) {
        //     e.target.text = 10000 + "";
        //     this.data.input = 10000 + "";
        // }
        this.conversionFun();
        this.getPercentChance();
    }

    private minusFun() {
        let val = Number(this.data.input);
        if (val > 1) {
            val--;
            this.data.input = String(val);
            this.conversionFun();
            this.getPercentChance();
        }
    }

    private addFun() {
        let val = Number(this.data.input);
        // if (val >= 10000) {
        //     return;
        // }
        val++;
        this.data.input = String(val);
        this.conversionFun();
        this.getPercentChance();
    }

    private closeModalFun() {
        let group = this.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({y: 1716}, 200).call(() => {
            this.visible = false;
            tw = null;
        });
    }

    private layoutCenter() {
        let hLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        return hLayout;
    }

    /**
     * 汇率换算
     */
    private conversionFun() {
        let val = Number(this.data.input);
        let newVal;
        newVal = this.data.exchangeRate * val;
        newVal = Math.round(newVal * 100000000) / 100000000;
        newVal = String(newVal);
        newVal = `@ ${newVal} ETH`;
        this.data.conversionNum = newVal;
    }

    /**
     * 获取钥匙价格
     */
    private getInitKeyPrice() {
        $gameContractInstance.keyPriceCurrent((err, price) => {
            if (err) {
                console.log(err)
            } else {
                price = parseFloat(web3js.fromWei(price));
                $gameContractInstance.getTotalInvest((getErr, balance) => {
                    if (getErr) {
                        console.log(getErr)
                    } else {
                        // keyPriceCurrent = getTotalInvest() / (2 ether) * keyPriceInitial_ / 100 + keyPriceInitial_;
                        // keyPriceCurrent = getTotalInvest() / (1 ether) * keyPriceInitial_ / 1 + keyPriceInitial_;
                        let totalTotalInvest = parseFloat(web3js.fromWei("1601701210000000000000"));
                        let initData = totalTotalInvest / (1) * 0.0001 / 100 + 0.0001;
                        balance = parseFloat(web3js.fromWei(balance));
                        // price = Math.floor((balance) / 1) * 0.0001 / 100 + 0.0001;
                        price = Math.floor((balance - totalTotalInvest) / 5) * 0.0001 / 100 + initData;
                        price = Math.round(price * 100000000) / 100000000;
                        console.log(totalTotalInvest, price, initData);
                        this.data.exchangeRate = price;
                        this.data.input = "" + parseInt(2 / price + "");
                        this.conversionFun();
                    }
                });
            }
        });
    }

    private getKeyPrice() {
        $gameContractInstance.keyPriceCurrent((err, price) => {
            if (err) {
                console.log(err)
            } else {
                // this.data.exchangeRate = parseFloat(web3js.fromWei(price));
                console.log(web3js.fromWei(price).toString());
                this.conversionFun();
            }
        });
    }

    /**
     * 空投奖励计算
     */
    private getPercentChance() {
        $gameContractInstance.teamPot(4, (err, coin) => {
            if (err) {
                console.log(err);
            } else {
                let percentVal: any = 0;
                let pour = coin[1].toNumber();
                let val: any = Number(this.data.input);
                val = val * this.data.exchangeRate;
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
                percentVal = `${percentVal} ETH`;
                this.data.percentChance = percentVal;
            }
        });
    }
}
