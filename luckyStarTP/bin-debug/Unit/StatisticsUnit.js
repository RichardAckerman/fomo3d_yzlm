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
var StatisticsUnit = (function (_super) {
    __extends(StatisticsUnit, _super);
    function StatisticsUnit() {
        var _this = _super.call(this) || this;
        _this.allLen = 0;
        _this.sourceArr = [];
        return _this;
    }
    StatisticsUnit.prototype.createChildren = function () {
        /**当前分红序列 */
    };
    StatisticsUnit.prototype.getData = function () {
        var _this = this;
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err3, roll) {
            if (err3) {
                console.log("getRollInArrayDetail++++++:", err3);
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
    StatisticsUnit.prototype.getList = function () {
        if (this.sourceArr.length < 1) {
            this.$children.length = 0;
            return;
        }
        var myCollection = new eui.ArrayCollection(this.sourceArr);
        var dataGroup = new eui.DataGroup();
        dataGroup.dataProvider = myCollection;
        dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<e:Skin class=\"ListUnit\" width=\"930\" height=\"150\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image source=\"list_item_bg_png\" scale9Grid=\"36,31,13,15\" left=\"0\" right=\"0\" height=\"114\" verticalCenter=\"0\"/>\n\t<e:Image source=\"bg_mysort_png\" x=\"56\" verticalCenter=\"0\"/>\n\t<e:Image source=\"statistics_text_wdxh_png\" x=\"68.33\" verticalCenter=\"0.5\"/>\n\t<e:BitmapLabel width=\"392\" height=\"101.33\" x=\"489\" anchorOffsetX=\"0\" anchorOffsetY=\"0\" font=\"green_big_fnt\" text=\"{data.num}\" textAlign=\"center\" verticalAlign=\"middle\" verticalCenter=\"0\"/>\n</e:Skin>";
        this.$children.length = 0;
        this.addChild(dataGroup);
    };
    return StatisticsUnit;
}(eui.Scroller));
__reflect(StatisticsUnit.prototype, "StatisticsUnit");
