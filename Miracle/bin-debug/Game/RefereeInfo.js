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
var RefereeInfo = (function (_super) {
    __extends(RefereeInfo, _super);
    function RefereeInfo() {
        var _this = _super.call(this) || this;
        /**获取用户数据 */
        _this.updateData = new egret.Timer(2000, 0);
        _this.myAddress = $myAddress;
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/RefereeInfoUI.exml";
        return _this;
    }
    RefereeInfo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.copyAddrUrl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'address'), this);
        this.copyIdUrl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyUrl.bind(this, 'id'), this);
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
    };
    RefereeInfo.prototype.copyUrl = function (sign) {
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
                div.innerHTML = this.addressUrl.text;
                break;
            case "id":
                div.innerHTML = this.idUrl.text;
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
    RefereeInfo.prototype.getData = function () {
        if (this.myAddress !== $myAddress) {
            this.getUrl();
            this.myAddress = $myAddress;
        }
    };
    RefereeInfo.prototype.getUrl = function () {
        var _this = this;
        if ($myAddress) {
            var url_1 = location.href.split("?")[0];
            $gameContractInstance.pIDxAddr_($myAddress, function (err, id) {
                if (err) {
                    $alert(err);
                }
                else {
                    var urlId = id.toString();
                    if (urlId == "0") {
                        _this.addressUrl.text = "Loading";
                        _this.idUrl.text = "Loading";
                    }
                    else {
                        _this.addressUrl.text = url_1 + "?" + $myAddress;
                        _this.idUrl.text = url_1 + "?" + urlId;
                    }
                }
            });
            this.myAddress = $myAddress;
        }
    };
    RefereeInfo.prototype.clostFun = function () {
        this.updateData.stop();
        var group = $Modal.refereeInfo.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            $Modal.refereeInfo.visible = false;
            tw = null;
        });
    };
    return RefereeInfo;
}(eui.Component));
__reflect(RefereeInfo.prototype, "RefereeInfo");
