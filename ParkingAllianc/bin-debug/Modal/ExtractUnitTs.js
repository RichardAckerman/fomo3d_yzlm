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
    };
    ExtractUnitTs.prototype.getData = function () {
        var _this = this;
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, roll) {
            if (err3) {
                console.log(err3);
            }
            else {
                roll = roll.map(function (item, i) {
                    return parseInt(item.toString());
                });
                var len = roll.length;
                _this.allLen = len;
                _this.sourceArr.length = 0;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var obj = {
                            index: i + 1,
                            num: roll[i],
                            extractCoin1: "0"
                        };
                        _this.sourceArr.push(obj);
                    }
                    _this.getList();
                }
            }
        });
    };
    ExtractUnitTs.prototype.getList = function () {
        var _this = this;
        $myAddress && getMyKeyProp().then(function (data) {
            _this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
            var myCollection = new eui.ArrayCollection(_this.sourceArr);
            var dataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            var lang = localStorage.getItem('language');
            var img = lang === "zhtw" ? "statistics_text_wdxh_png" : "statistics_text_wdxh_en_png";
            dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<e:Skin class=\"ExtractUnit\" width=\"850\" height=\"184.55\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image source=\"list_item_bg_png\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t<e:Image x=\"80.34\" source=\"" + img + "\" verticalCenter=\"0.22499999999999432\"/>\n\t<e:Label text=\"{data.num}\" horizontalCenter=\"64\" textColor=\"0xbafffe\" size=\"58\" verticalCenter=\"0\"/>\n\t<e:Label text=\"{data.extractCoin1}\" x=\"650.29\" textColor=\"0xbafffe\" size=\"58\" verticalCenter=\"0\"/>\n\t<e:Label x=\"281.86\" y=\"47.5\" textColor=\"0xfdffdc\" size=\"34\" anchorOffsetX=\"0\" width=\"73.5\" anchorOffsetY=\"0\" height=\"43.5\" verticalAlign=\"middle\" textAlign=\"center\" text=\"{data.index}\"/>\n\t<e:Image source=\"num_13_png\" x=\"607\" anchorOffsetX=\"0\" width=\"43.5\" anchorOffsetY=\"0\" height=\"64.5\" verticalCenter=\"1.2249999999999943\"/>\n</e:Skin>";
            // dataGroup.itemRendererSkinName = "resource/eui_modules/Game/ExtractUnit.exml";
            _this.$children.length = 0;
            _this.addChild(dataGroup);
        });
    };
    return ExtractUnitTs;
}(eui.Scroller));
__reflect(ExtractUnitTs.prototype, "ExtractUnitTs");
