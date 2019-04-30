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
            addrUrl: "",
            myInviter: "无"
        };
        /**load Container skin */
        _this.skinName = "resource/eui_skins/modal/RegisterPanel.exml";
        return _this;
    }
    Register.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerReg, this);
        this.copyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'id'), this);
    };
    Register.prototype.getMyInviter = function () {
        var _this = this;
        getMyKeyProp().then(function (data) {
            if (data[8].toString() == "0") {
                _this.data.myInviter = "无";
            }
            else {
                $gameContractInstance.playerxID_(data[8].toString(), function (err, info) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        _this.data.myInviter = info[0];
                    }
                });
            }
        });
    };
    /**
     * 注册按钮
     */
    Register.prototype.registerReg = function () {
        var _this = this;
        if ($isNotAtApp()) {
            notSignInMetamask();
            return;
        }
        var _referrer = "0x0000000000000000000000000000000000000000";
        if ($chargeEquelAddr($beginAddr, $myAddress)) {
            this.registerFun(_referrer);
            return;
        }
        $myAddress && $gameContractInstance.pIDxAddr_($myAddress, function (err, id) {
            if (err) {
                alert("pIDxAddr_===" + err);
            }
            else {
                if (id.toString() == "0") {
                    $Modal.bandCodeAlert.inviteCode().then(function (ref) {
                        _this.registerFun(ref);
                    });
                }
                else {
                    getMyKeyProp().then(function (data) {
                        if (data[8].toString() == "0") {
                            $alert("您在投注时未输入推荐码，不能申请成为推荐人");
                            _this.visible = false;
                        }
                        else {
                            _this.registerFun(_referrer);
                        }
                    });
                }
            }
        });
    };
    Register.prototype.registerFun = function (_referrer) {
        var _this = this;
        if ($myAddress) {
            $Content.game.chargeLimit().then(function (has) {
                // alert("授权额度:" + has);
                $gameContractInstance.registrationFee_(function (err, fee) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // alert("registrationFee_:" + fee);
                        if (Number(has) > 0 && parseInt(has + "") >= parseInt(fee)) {
                            $Content.game.chargeBalance().then(function (coin) {
                                // alert("我的Token余額為:" + coin);
                                if (Number(coin) < parseInt(fee)) {
                                    $alert("\u60A8\u7684CBE\u4F59\u984D\u70BA" + $toFixedDecimal(coin) + ",\u4E0D\u8DB3\u4EE5\u652F\u4ED8\u672C\u6B21\u4EA4\u6613");
                                    return;
                                }
                                _this.moacBuyFun(fee.toString(), _referrer);
                            });
                        }
                        else {
                            // 弹窗去充值额度
                            if (confirm("您的授权额度为" + $toFixedDecimal(has) + ",将为您进行授权")) {
                                $Content.game.approveFun(function () {
                                    $loadingDisplay(true);
                                    var timer = setInterval(function () {
                                        if ($Content.game.data.approveNum == "0") {
                                            $Content.game.getMyApprove();
                                        }
                                        else {
                                            $loadingDisplay(false);
                                            clearInterval(timer);
                                            if (confirm("授权成功，将为您发起申请推荐码交易！")) {
                                                // $Modal.register.moacBuyFun(fee.toString(), _referrer);
                                                $Modal.register.registerFun(_referrer);
                                            }
                                        }
                                    }, 1500);
                                });
                            }
                        }
                    }
                });
            }, function (err) {
                $alert(err);
            });
        }
        else {
            notSignInMetamask();
        }
    };
    Register.prototype.moacBuyFun = function (input, _referrer) {
        try {
            $loadingDisplay(false);
            var data = $gameContractInstance.registerName.getData(input, _referrer);
            var parameters = {
                from: $myAddress,
                to: $contract,
                gasPrice: 30000000000,
                gasLimit: 2000000,
                data: data,
                value: '0',
                chainId: 99,
                via: '',
                shardingFlag: 0,
            };
            $tp.pushMoacTransaction(parameters).then(function (response) {
                if (!response.result) {
                    alert('交易发送失败！' + response.message);
                }
                else {
                    $alert('注册交易发送成功，请等待交易完成！'); // 链上的失败消息也会弹出来
                    // $alert('注册交易发送成功，请等待交易完成！' + JSON.stringify(response.data)); // 链上的失败消息也会弹出来
                }
                setTimeout(function () {
                    $closeModalFun($Modal.register, -1360);
                }, 1000);
            });
        }
        catch (e) {
            alert("try catch : " + e);
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
                // let url = location.href.split("?")[0];
                // this.data.idUrl = `${url}?${data.toString()}`;
                _this.data.idUrl = window.btoa(data.toString());
            }
        });
    };
    Register.prototype.closeFun = function () {
        $closeModalFun($Modal.register, -1360);
    };
    return Register;
}(eui.Component));
__reflect(Register.prototype, "Register");
