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
        _this.updateData = new egret.Timer(4000, 0);
        return _this;
    }
    ExtractUnitTs.prototype.createChildren = function () {
        /**当前分红序列 */
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
    };
    ExtractUnitTs.prototype.getData = function () {
        var _this = this;
        this.sourceArr.length = 0;
        $gameContractInstance.getRollInArrayLen(function (err2, len) {
            if (err2) {
                console.log(err2);
                _this.updateData.stop();
            }
            else {
                _this.allLen = parseInt(len.toString());
                if (_this.allLen > 0) {
                    _this.getQueueId(0);
                }
                else {
                }
            }
        });
    };
    ExtractUnitTs.prototype.getQueueId = function (i) {
        var _this = this;
        $gameContractInstance.getRollInArray(i, function (err1, n) {
            if (err1) {
                console.log(err1);
            }
            else {
                var obj = {
                    extractNum: n[0].toString(),
                    extractCoin1: "0"
                };
                _this.sourceArr.push(obj);
                if (i < _this.allLen - 1) {
                    i++;
                    _this.getQueueId(i);
                }
                else {
                    _this.getList();
                }
            }
        });
    };
    ExtractUnitTs.prototype.getList = function () {
        var _this = this;
        $myAddress && getMyKeyProp().then(function (data) {
            _this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[5].toString())).toFixed(2);
            var myCollection = new eui.ArrayCollection(_this.sourceArr);
            var dataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                "<e:Skin class=\"ExtractUnit\" width=\"970\" height=\"280\" xmlns:e=\"http://ns.egret.com/eui\">\n" +
                "\t<e:Image scaleX=\"1\" scaleY=\"1\" horizontalCenter=\"6\" verticalCenter=\"0\" source=\"statistics_ditu_green_png\"/>\n" +
                "\t<e:BitmapLabel scaleX=\"1\" scaleY=\"1\" verticalCenter=\"34\" anchorOffsetX=\"0\" width=\"223.57\" textAlign=\"left\" horizontalCenter=\"-126\" anchorOffsetY=\"0\" height=\"86.06\" font=\"game_modal_num_100_fnt\" text=\"{data.extractNum}\"/>\n" +
                "\t<e:Image source=\"statistics_text_syxh_png\" x=\"50.78\" y=\"140.53\"/>\n" +
                "\t<e:Image source=\"statistics_text_syje_png\" x=\"491.97\" y=\"145.6\"/>\n" +
                "\t<e:BitmapLabel scaleX=\"1\" scaleY=\"1\" anchorOffsetX=\"0\" width=\"249.33\" textAlign=\"left\" anchorOffsetY=\"0\" height=\"89.09\" x=\"688.51\" y=\"133.74\" font=\"game_modal_num_100_fnt\" text=\"{data.extractCoin1}\"/>\n" +
                "</e:Skin>";
            _this.addChild(dataGroup);
        });
    };
    return ExtractUnitTs;
}(eui.Scroller));
__reflect(ExtractUnitTs.prototype, "ExtractUnitTs");
