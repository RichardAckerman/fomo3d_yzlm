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
var WeatherBandCodeTs = (function (_super) {
    __extends(WeatherBandCodeTs, _super);
    function WeatherBandCodeTs() {
        var _this = _super.call(this) || this;
        /**load Container skin */
        _this.skinName = "resource/eui_skins/alert/WeatherBandCode.exml";
        return _this;
    }
    WeatherBandCodeTs.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        $loadingDisplay(false);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inputFun, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelFun, this);
    };
    WeatherBandCodeTs.prototype.inputFun = function () {
        this.inviteCode().then(function (ref) {
            // $alertFun("即将雇佣，雇佣成功后推荐码自动绑定",()=>{
            //     $Content.game.rollIn(ref);
            // });
            alert("即将雇佣，雇佣成功后推荐码自动绑定");
            $Content.game.rollIn(ref);
        });
    };
    WeatherBandCodeTs.prototype.inviteCode = function () {
        this.visible = false;
        return new Promise(function (resolve, reject) {
            $gameContractInstance.nPlayerNum(function (err, num) {
                if (err) {
                    $alert("nPlayerNum===" + err);
                }
                else {
                    var codeS = prompt("\u8BF7\u8F93\u5165\u4F60\u7684\u63A8\u8350\u7801(\u63A8\u8350\u7801\u4E00\u65E6\u7ED1\u5B9A\u4E0D\u53EF\u66F4\u6539\uFF0C\u8BF7\u4ED4\u7EC6\u6838\u5BF9\u5E76\u4E25\u683C\u533A\u5206\u5927\u5C0F\u5199):");
                    if (codeS == null) {
                        return;
                    }
                    var code = 0;
                    try {
                        var atobC = window.atob(codeS);
                        code = parseInt(atobC);
                    }
                    catch (e) {
                        $alert("您输入的推荐码不合法");
                        return;
                    }
                    if (isNaN(code)) {
                        $alert("您输入的推荐码不合法");
                        return;
                    }
                    if (code < 1 || code > parseInt(num.toString())) {
                        $alert("您输入的推荐码超出范围");
                        return;
                    }
                    $gameContractInstance.playerxID_(code, function (err, data) {
                        if (err) {
                            $alert(err);
                        }
                        else {
                            $gameContractInstance.playerIsRegi(data[0], function (err, bool) {
                                if (err) {
                                    $alert(err);
                                }
                                else {
                                    if (bool) {
                                        resolve(data[0]);
                                    }
                                    else {
                                        $alert("您输入的推荐码未注册");
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
    };
    WeatherBandCodeTs.prototype.cancelFun = function () {
        this.visible = false;
        var _referrer = "0x0000000000000000000000000000000000000000";
        $Content.game.rollIn(_referrer);
    };
    return WeatherBandCodeTs;
}(eui.Component));
__reflect(WeatherBandCodeTs.prototype, "WeatherBandCodeTs");
