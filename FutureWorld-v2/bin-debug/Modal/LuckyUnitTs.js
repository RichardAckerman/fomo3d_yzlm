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
                _this.luckMoney = web3js.fromWei(lucky, "ether");
                _this.getLuckyAddress(0);
            }
        });
    };
    LuckyUnitTs.prototype.getLuckyAddress = function (index) {
        var _this = this;
        $gameContractInstance.luckyer(index, function (err, id) {
            if (err) {
                console.log("luckyer:", err);
            }
            else {
                if (id.toNumber() == 0) {
                    return;
                }
                $gameContractInstance.playerxID_(id, function (err1, data) {
                    if (err) {
                        console.log("playerxID_:", err1);
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
        dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<e:Skin class=\"ExtractUnit\" width=\"900\" height=\"225.55\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image verticalCenter=\"0\" source=\"list_item_bg\" horizontalCenter=\"0\"/>\n\t<e:BitmapLabel scaleX=\"1\" scaleY=\"1\" anchorOffsetX=\"0\" textAlign=\"right\" anchorOffsetY=\"0\" height=\"89.09\" verticalCenter=\"36.724999999999994\" verticalAlign=\"middle\" font=\"static_round_fnt\" text=\"{data.extractCoin1}\" horizontalCenter=\"0\"/>\n\t<e:Label text=\"{data.address}\" y=\"58.35\" anchorOffsetX=\"0\" horizontalCenter=\"0.5\" textColor=\"0xf8db48\"/>\n</e:Skin>";
        this.$children.length = 0;
        this.addChild(dataGroup);
    };
    return LuckyUnitTs;
}(eui.Scroller));
__reflect(LuckyUnitTs.prototype, "LuckyUnitTs");
