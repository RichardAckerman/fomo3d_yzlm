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
var FinalBonusUnit = (function (_super) {
    __extends(FinalBonusUnit, _super);
    function FinalBonusUnit() {
        var _this = _super.call(this) || this;
        _this.grandPrize = "0";
        _this.smallPrize = "0";
        _this.sourceArr = [];
        return _this;
    }
    FinalBonusUnit.prototype.createChildren = function () {
        /**当前分红序列 */
    };
    FinalBonusUnit.prototype.getData = function () {
        var _this = this;
        this.sourceArr.length = 0;
        this.$children.length = 0;
        $gameContractInstance.grandPrize(function (err3, coin) {
            if (err3) {
                console.log("grandPrize", err3);
            }
            else {
                _this.grandPrize = $toFixedDecimal(coin);
            }
        });
        $gameContractInstance.smallPrize(function (err3, coin) {
            if (err3) {
                console.log("smallPrize", err3);
            }
            else {
                _this.smallPrize = $toFixedDecimal(coin);
                _this.getQueueId(9);
            }
        });
    };
    FinalBonusUnit.prototype.getQueueId = function (i) {
        var _this = this;
        // 查幸运玩家的id列表
        $gameContractInstance.Prizer(i, function (err1, id) {
            if (err1) {
                console.log("nPlayerArraySize", err1);
            }
            else {
                // 查幸运玩家的地址
                $gameContractInstance.playerxID_(id.toString(), function (err2, info) {
                    if (err2) {
                        console.log("playerxID_", err2);
                    }
                    else {
                        var addr = info[0];
                        // 查幸运玩家的奖励
                        if (id.toString() != "0") {
                            var obj = {
                                index: i + 1,
                                address: addr,
                                extractCoin1: i == 9 ? _this.grandPrize : _this.smallPrize
                            };
                            _this.sourceArr.push(obj);
                            _this.getList();
                        }
                        if (i > 0 && id.toString() != "0") {
                            i--;
                            _this.getQueueId(i);
                        }
                    }
                });
            }
        });
    };
    FinalBonusUnit.prototype.getList = function () {
        if (this.sourceArr.length < 1) {
            this.$children.length = 0;
            return;
        }
        var myCollection = new eui.ArrayCollection(this.sourceArr);
        var dataGroup = new eui.DataGroup();
        dataGroup.dataProvider = myCollection;
        dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n        <e:Skin class=\"LuckyUnit\" width=\"930\" height=\"220.67\" xmlns:e=\"http://ns.egret.com/eui\">\n            <e:Image source=\"title2_bg_png\" left=\"0\" right=\"0\" height=\"180\" verticalCenter=\"0\"/>\n            <e:Image source=\"bg_rank_png\" x=\"33\" verticalCenter=\"0\"/>\n            <e:BitmapLabel width=\"117.88\" height=\"56.36\" x=\"13.34\" anchorOffsetX=\"0\" anchorOffsetY=\"0\" textAlign=\"center\" verticalAlign=\"middle\" text=\"{data.index}\" font=\"white_fnt\" verticalCenter=\"0\"/>\n            <e:Label size=\"30\" textAlign=\"left\" horizontalCenter=\"-89\" width=\"400\" text=\"{data.address}\" verticalCenter=\"0\" textColor=\"0xffffff\"/>\n            <e:Image x=\"725.28\" verticalCenter=\"48.5\" source=\"icon_coin_png\" width=\"74\" height=\"19\"/>\n            <e:BitmapLabel width=\"324.54\" height=\"56.36\" x=\"600.01\" anchorOffsetX=\"0\" anchorOffsetY=\"0\" textAlign=\"center\" verticalAlign=\"middle\" text=\"{data.extractCoin1}\" font=\"orange_fnt\" verticalCenter=\"0\"/>\n        </e:Skin>";
        this.$children.length = 0;
        this.addChild(dataGroup);
    };
    return FinalBonusUnit;
}(eui.Scroller));
__reflect(FinalBonusUnit.prototype, "FinalBonusUnit");
