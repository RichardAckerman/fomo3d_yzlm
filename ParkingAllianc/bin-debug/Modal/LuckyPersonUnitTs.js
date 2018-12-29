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
var LuckyPersonUnitTs = (function (_super) {
    __extends(LuckyPersonUnitTs, _super);
    function LuckyPersonUnitTs() {
        var _this = _super.call(this) || this;
        _this.allLen = 9;
        _this.sourceArr = [];
        _this.updateDataLuckyer = new egret.Timer(60000, 0);
        return _this;
    }
    LuckyPersonUnitTs.prototype.createChildren = function () {
        /**当前分红序列 */
        this.updateDataLuckyer.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateDataLuckyer.start();
        this.getData();
    };
    LuckyPersonUnitTs.prototype.getData = function () {
        this.sourceArr.length = 0;
        this.$children.length = 0;
        this.getQueueId(0);
    };
    LuckyPersonUnitTs.prototype.getQueueId = function (i) {
        var _this = this;
        // 查幸运玩家的id列表
        $gameContractInstance.luckyPotPerson(i, function (err1, id) {
            if (err1) {
                _this.updateDataLuckyer.stop();
                console.log("233333", err1);
            }
            else {
                // 查幸运玩家的地址
                $gameContractInstance.playerxID_(id.toString(), function (err2, info) {
                    var addr = info[0];
                    // 查幸运玩家的奖励
                    $gameContractInstance.luckyPotMoney(id.toString(), function (err3, coin) {
                        if (id.toString() != "0") {
                            var obj = {
                                index: i + 1,
                                address: addr,
                                extractCoin1: Math.floor(parseFloat(web3js.fromWei(coin.toString())) * 1000) / 1000 + "",
                            };
                            _this.sourceArr.push(obj);
                        }
                        else {
                            _this.getList();
                            return;
                        }
                        if (i == 8) {
                            _this.getList();
                        }
                        if (i < 8 && id.toString() != "0") {
                            i++;
                            _this.getQueueId(i);
                        }
                    });
                });
            }
        });
    };
    LuckyPersonUnitTs.prototype.getList = function () {
        var _this = this;
        $myAddress && getMyKeyProp().then(function (data) {
            if (_this.sourceArr.length < 1) {
                _this.$children.length = 0;
                return;
            }
            _this.sourceArr.length = (9 <= _this.sourceArr.length ? _this.allLen : _this.sourceArr.length);
            var myCollection = new eui.ArrayCollection(_this.sourceArr);
            var dataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            var lang = localStorage.getItem('language');
            var img = lang === "zhtw" ? "statistics_text_wdxh_png" : "statistics_text_wdxh_en_png";
            dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<e:Skin class=\"ExtractUnit\" width=\"836\" height=\"150\" xmlns:e=\"http://ns.egret.com/eui\">\n\t<e:Image horizontalCenter=\"0\" source=\"list_item_bg2_png\" verticalCenter=\"0\"/>\n\t<e:BitmapLabel width=\"126.97\" height=\"56.36\" x=\"4.25\" anchorOffsetX=\"0\" anchorOffsetY=\"0\" verticalCenter=\"6\" text=\"{data.index}\" font=\"lucky_num_fnt\" textAlign=\"center\" verticalAlign=\"middle\"/>\n\t<e:Label size=\"30\" verticalCenter=\"16\" textAlign=\"left\" horizontalCenter=\"-25\" textColor=\"0xd9786a\" width=\"400\" text=\"{data.address}\"/>\n\t<e:Image source=\"icon_fof_png\" x=\"637\" verticalCenter=\"10.5\"/>\n\t<e:Label text=\"{data.extractCoin1}\" x=\"670.24\" size=\"40\" textColor=\"0xe9daff\" anchorOffsetX=\"0\" width=\"186.33\" anchorOffsetY=\"0\" height=\"54.67\" verticalCenter=\"10.5\" verticalAlign=\"middle\"/>\n</e:Skin>";
            //             dataGroup.itemRendererSkinName = "resource/eui_modules/Game/LuckyUnit.exml";
            _this.$children.length = 0;
            _this.addChild(dataGroup);
        });
    };
    return LuckyPersonUnitTs;
}(eui.Scroller));
__reflect(LuckyPersonUnitTs.prototype, "LuckyPersonUnitTs");
