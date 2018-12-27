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
var ExtractUnitTs = (function (_super) {
    __extends(ExtractUnitTs, _super);
    function ExtractUnitTs() {
        var _this = _super.call(this) || this;
        _this.allLen = 0;
        _this.sourceArr = [];
        return _this;
    }
    ExtractUnitTs.prototype.createChildren = function () {
        /**当前分红序列 */
    };
    ExtractUnitTs.prototype.getData = function () {
        var _this = this;
        // 剩余炼丹次数
        this.allLen = 0;
        this.sourceArr.length = 0;
        this.$children.length = 0;
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, roll) {
            if (err3) {
                console.log(err3);
            }
            else {
                roll = roll.map(function (item, i) {
                    return parseInt(item.toNumber());
                });
                var len = roll.length;
                _this.allLen = len;
                _this.sourceArr.length = 0;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        if (roll[i] >= $Modal.gameStatistics.data.stats.currentNum) {
                            var obj = {
                                num: roll[i],
                                extractCoin1: "0"
                            };
                            _this.sourceArr.push(obj);
                        }
                    }
                    _this.getList();
                }
            }
        });
    };
    ExtractUnitTs.prototype.getList = function () {
        var _this = this;
        $myAddress && getMyKeyProp().then(function (data) {
            if (_this.sourceArr.length < 1) {
                _this.$children.length = 0;
                return;
            }
            _this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[4].toString())).toFixed(0) + "e";
            _this.sourceArr.length = _this.allLen <= _this.sourceArr.length ? _this.allLen : _this.sourceArr.length;
            var myCollection = new eui.ArrayCollection(_this.sourceArr);
            var dataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            var lang = localStorage.getItem('language');
            var img = lang === "zhtw" ? "statistics_text_wdxh" : "statistics_text_wdxh_en";
            dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<e:Skin class=\"ExtractUnit\" width=\"900\" height=\"225.55\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image verticalCenter=\"0\" source=\"list_item_bg\" horizontalCenter=\"0\"/>\n\t<e:Image source=\"" + img + "\" verticalCenter=\"-40.775000000000006\" horizontalCenter=\"0\"/>\n\t<e:BitmapLabel scaleX=\"1\" scaleY=\"1\" anchorOffsetX=\"0\" width=\"299.33\" textAlign=\"center\" anchorOffsetY=\"0\" height=\"89.09\" verticalCenter=\"34.724999999999994\" verticalAlign=\"middle\" text=\"{data.num}\" horizontalCenter=\"-15.5\" font=\"static_round_fnt\"/>\n</e:Skin>";
            _this.$children.length = 0;
            _this.addChild(dataGroup);
        });
    };
    return ExtractUnitTs;
}(eui.Scroller));
__reflect(ExtractUnitTs.prototype, "ExtractUnitTs");
