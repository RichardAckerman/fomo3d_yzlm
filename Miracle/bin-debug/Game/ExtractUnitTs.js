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
        _this.updateData = new egret.Timer(30000, 0);
        _this.nRollIn = 2; // 总序列
        _this.nGainId = 1; // 当前分红序列
        return _this;
    }
    ExtractUnitTs.prototype.createChildren = function () {
        /**当前分红序列 */
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.getData();
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
                    $gameContractInstance.nRollIn(function (err1, n) {
                        if (err1) {
                            console.log(err1);
                        }
                        else {
                            _this.nRollIn = parseInt(n.toString());
                            $gameContractInstance.nCurrentGainId(function (err3, GainId) {
                                if (err3) {
                                    console.log(err3);
                                }
                                else {
                                    _this.getQueueId(0);
                                    _this.nGainId = parseInt(GainId.toString());
                                }
                            });
                        }
                    });
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
                    extractCoin1: "0",
                    per: 0
                };
                if (_this.nGainId != 1) {
                    var down = _this.nRollIn - _this.nGainId;
                    down = down <= 0 ? 1 : down;
                    var up = _this.nRollIn - parseInt(obj.extractNum);
                    up = up <= 0 ? 1 : up;
                    up = up > down ? down : up;
                    obj.per = up / down * 904;
                    obj.per = obj.per > 185 ? obj.per - 185 : obj.per;
                }
                // if (this.sourceArr.length >= 1) {
                obj.extractNum = "***";
                // }
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
            if (_this.sourceArr.length == 0) {
                return;
            }
            _this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
            var myCollection = new eui.ArrayCollection(_this.sourceArr);
            var dataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n                <e:Skin class=\"ExtractUnit\" width=\"970\" height=\"280\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\" xmlns:tween=\"egret.tween.*\">\n                    <w:Declarations>\n                    </w:Declarations>\n                    <e:Image scaleX=\"1\" scaleY=\"1\" verticalCenter=\"0\" source=\"car_bg_png\" horizontalCenter=\"0\"/>\n                    <e:BitmapLabel scaleX=\"1\" scaleY=\"1\" verticalCenter=\"-47\" anchorOffsetX=\"0\" width=\"223.57\" textAlign=\"left\" horizontalCenter=\"-126\" anchorOffsetY=\"0\" height=\"86.06\" font=\"game_modal_num_100_fnt\" text=\"{data.extractNum}\"/>\n                    <e:Image source=\"statistics_text_syxh_png\" x=\"50.78\" y=\"57.81\"/>\n                    <e:Image x=\"532.92\" y=\"57.81\" source=\"statistics_text_syje_png\"/>\n                    <e:BitmapLabel scaleX=\"1\" scaleY=\"1\" anchorOffsetX=\"0\" width=\"249.33\" textAlign=\"left\" anchorOffsetY=\"0\" height=\"89.09\" x=\"691.54\" y=\"49.71\" font=\"game_modal_num_100_fnt\" text=\"{data.extractCoin1}\"/>\n                    <e:Group width=\"903.99\" height=\"56\" y=\"190.32\" anchorOffsetX=\"0\" anchorOffsetY=\"0\" horizontalCenter=\"0\" maxWidth=\"903.99\" scrollEnabled=\"true\">\n                        <e:Image id=\"carLine\" source=\"car_line_png\" verticalCenter=\"0\" left=\"0\"/>\n                        <e:Group id=\"carGroup\" width=\"185.33\" height=\"53.34\" x=\"126\" y=\"1.33\" anchorOffsetY=\"0\" anchorOffsetX=\"0\">\n                            <e:Image source=\"car_png\" verticalCenter=\"-7.5\" y=\"-10.330000000000013\" scaleX=\"1\" scaleY=\"1\" horizontalCenter=\"0\"/>\n                            <e:Image id=\"wheelL\" source=\"car_front_wheel_png\" x=\"147.55\" y=\"20.2\" anchorOffsetX=\"14\" anchorOffsetY=\"14\"/>\n                            <e:Image id=\"wheelR\" source=\"car_rear_wheel_png\" x=\"32.72\" y=\"19.28\" anchorOffsetX=\"16\" anchorOffsetY=\"16\"/>\n                        </e:Group>\n                    </e:Group>\n                </e:Skin>";
            // dataGroup.itemRendererSkinName = "resource/eui_modules/Game/ExtractUnit.exml";
            _this.$children.length = 0;
            _this.addChild(dataGroup);
            setTimeout(function () {
                var len = dataGroup.$children.length;
                if (len > 0) {
                    var _loop_1 = function (i) {
                        var wheelL = dataGroup.$children[i].wheelL;
                        var wheelR = dataGroup.$children[i].wheelR;
                        var line = dataGroup.$children[i].carLine;
                        egret.Tween.get(wheelL, { loop: true })
                            .to({ rotation: 0 }, 0)
                            .to({ rotation: 360 }, 1000);
                        egret.Tween.get(wheelR, { loop: true })
                            .to({ rotation: 0 }, 0)
                            .to({ rotation: 360 }, 1000);
                        egret.Tween.get(line, { loop: true })
                            .to({ left: 0 }, 0)
                            .to({ left: -904 }, 6000).call(function () {
                            line.x = 0;
                        });
                    };
                    for (var i = 0; i < len; i++) {
                        _loop_1(i);
                    }
                }
            }, 1000);
        });
    };
    return ExtractUnitTs;
}(eui.Scroller));
__reflect(ExtractUnitTs.prototype, "ExtractUnitTs");
