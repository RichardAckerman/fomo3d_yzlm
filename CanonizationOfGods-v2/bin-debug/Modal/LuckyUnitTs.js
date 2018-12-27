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
var LuckyUnitTs = (function (_super) {
    __extends(LuckyUnitTs, _super);
    function LuckyUnitTs() {
        var _this = _super.call(this) || this;
        _this.sourceArr = [];
        return _this;
    }
    LuckyUnitTs.prototype.createChildren = function () {
        /**当前分红序列 */
    };
    LuckyUnitTs.prototype.getData = function () {
        var _this = this;
        this.sourceArr.length = 0;
        this.$children.length = 0;
        $gameContractInstance.luckyPlayerMoney(function (err, lucky) {
            if (err) {
                console.log("playerxID_:", err);
            }
            else {
                _this.luckMoney = web3js.fromWei(lucky, "ether").toNumber();
                _this.getLuckyAddress(0);
            }
        });
    };
    LuckyUnitTs.prototype.getLuckyAddress = function (index) {
        var _this = this;
        $gameContractInstance.luckyer(index, function (err, id) {
            if (err) {
                //console.log("luckyer:", err);
                //this.getList();
            }
            else {
                if (id.toNumber() == 0) {
                    return;
                }
                $gameContractInstance.playerxID_(id, function (err1, data) {
                    if (err) {
                        console.log("playerxID_:", err);
                    }
                    else {
                        var obj = {
                            extractCoin1: _this.luckMoney,
                            address: data[0]
                        };
                        _this.sourceArr.push(obj);
                        index++;
                        _this.getLuckyAddress(index);
                        _this.getList();
                    }
                });
            }
        });
    };
    LuckyUnitTs.prototype.getList = function () {
        if (this.sourceArr.length < 1) {
            this.$children.length = 0;
            return;
        }
        var myCollection = new eui.ArrayCollection(this.sourceArr);
        var dataGroup = new eui.DataGroup();
        dataGroup.dataProvider = myCollection;
        dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<e:Skin class=\"ExtractUnit\" width=\"900\" height=\"266\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image verticalCenter=\"31\" horizontalCenter=\"0\" source=\"statistics_bg\" anchorOffsetY=\"0\" height=\"246\"/>\n\t<e:BitmapLabel scaleX=\"1\" scaleY=\"1\" anchorOffsetX=\"0\" textAlign=\"right\" anchorOffsetY=\"0\" height=\"89.09\" verticalAlign=\"middle\" text=\"{data.extractCoin1}\" horizontalCenter=\"0.5\" font=\"statistics_bold_fnt\" verticalCenter=\"31.5\"/>\n\t<e:Label text=\"{data.address}\" y=\"31.35\" anchorOffsetX=\"0\" horizontalCenter=\"1.5\" textColor=\"0x4b281f\" bold=\"true\"/>\n</e:Skin>";
        this.$children.length = 0;
        this.addChild(dataGroup);
    };
    return LuckyUnitTs;
}(eui.Scroller));
__reflect(LuckyUnitTs.prototype, "LuckyUnitTs");
