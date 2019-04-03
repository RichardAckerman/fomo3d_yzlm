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
        _this.sourceArrObj = [];
        _this.myNumber = 'yx_text_wdxh_en_png';
        _this.fenfang = 'yx_text_fhsy_zh_png';
        // private updateData: egret.Timer = new egret.Timer(30000, 0);
        _this.nRollIn = 2; // 总序列
        _this.nGainId = 1; // 当前分红序列
        return _this;
    }
    ExtractUnitTs.prototype.createChildren = function () {
        /**当前分红序列 */
        // this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        // this.updateData.start();
        // this.getData();
    };
    ExtractUnitTs.prototype.getData = function () {
        var _this = this;
        this.sourceArr.length = 0;
        this.$children.length = 0;
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, function (err2, arr) {
            if (err2) {
                _this.ifError();
            }
            else {
                _this.allLen = arr.length;
                _this.sourceArrObj = arr;
                _this.sourceArrObj.forEach(function (item) {
                    return item.toString();
                });
                if (_this.allLen > 0) {
                    $gameContractInstance.nRollIn(function (err1, n) {
                        if (err1) {
                            _this.ifError();
                            // console.log(err1);
                        }
                        else {
                            _this.nRollIn = n.toNumber();
                            $gameContractInstance.nCurrentGainId(function (err3, GainId) {
                                if (err3) {
                                    _this.ifError();
                                    // console.log(err3);
                                }
                                else {
                                    _this.nGainId = GainId.toNumber();
                                    _this.getQueueId(0);
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
        var obj = {
            extractNum: this.sourceArrObj[i].toNumber() - this.nGainId,
            extractCoin1: "0",
            per: 0,
            car: "car" + (this.sourceArr.length + 1) + "_png",
            myNumber: this.myNumber,
            fenfang: this.fenfang
        };
        if (this.sourceArr.length > 5) {
            var rom = parseInt(Math.random() * 6 + "") + 1;
            obj.car = "car" + rom + "_png";
        }
        if (this.nGainId != 1) {
            //3795  ---   2244   ----  2721
            var down = this.nRollIn - this.nGainId;
            down = down <= 0 ? 1 : down;
            var up = down - (this.sourceArrObj[i].toNumber() - this.nGainId);
            up = up <= 0 ? 1 : up;
            up = up > down ? down : up;
            obj.per = up / down * 904;
            obj.per = obj.per > 850 ? 850 : obj.per;
        }
        if (obj.extractNum > 50) {
            obj.extractNum = "***";
        }
        this.sourceArr[i] = obj;
        if (i < this.allLen - 1) {
            i++;
            this.getQueueId(i);
        }
        else {
            this.getList();
        }
        // $gameContractInstance.getRollInArray(i, (err1, n) => {
        //     if (err1) {
        //         this.ifError();
        //         // console.log(err1);
        //     } else {
        //
        //     }
        // });
    };
    ExtractUnitTs.prototype.getList = function () {
        var _this = this;
        getMyKeyProp().then(function (data) {
            if (_this.sourceArr.length == 0) {
                return;
            }
            _this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
            var myCollection = new eui.ArrayCollection(_this.sourceArr);
            var dataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n                <e:Skin class=\"ExtractUnit\" width=\"970\" height=\"280\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\" xmlns:tween=\"egret.tween.*\">\n                    <w:Declarations>\n                    </w:Declarations>\n                    <e:Image scaleX=\"1\" scaleY=\"1\" verticalCenter=\"0\" source=\"car_bg_png\" horizontalCenter=\"0\"/>\n                    <e:BitmapLabel scaleX=\"1\" scaleY=\"1\" verticalCenter=\"-47\" anchorOffsetX=\"0\" width=\"223.57\" textAlign=\"left\" horizontalCenter=\"-126\" anchorOffsetY=\"0\" height=\"86.06\" font=\"game_modal_num_100_fnt\" text=\"{data.extractNum}\"/>\n                    <e:Image source=\"{data.myNumber}\" x=\"50.78\" y=\"57.81\"/>\n                    <e:Image x=\"532.92\" y=\"57.81\" source=\"{data.fenfang}\"/>\n                    <e:BitmapLabel scaleX=\"1\" scaleY=\"1\" anchorOffsetX=\"0\" width=\"249.33\" textAlign=\"left\" anchorOffsetY=\"0\" height=\"89.09\" x=\"691.54\" y=\"49.71\" font=\"game_modal_num_100_fnt\" text=\"{data.extractCoin1}\"/>\n                    <e:Group width=\"903.99\" height=\"90.85\" y=\"161.54\" anchorOffsetX=\"0\" anchorOffsetY=\"0\" horizontalCenter=\"0\" maxWidth=\"903.99\" scrollEnabled=\"true\">\n                        <e:Image id=\"carLine\" source=\"car_line_png\" verticalCenter=\"12.575000000000003\" left=\"0\"/>\n                        <e:Group id=\"carGroup\" width=\"185.33\" height=\"53.34\" x=\"{data.per}\" y=\"1.33\" anchorOffsetY=\"0\" anchorOffsetX=\"0\">\n                            <e:Image verticalCenter=\"17.33\" y=\"-10.330000000000013\" scaleX=\"1\" scaleY=\"1\" horizontalCenter=\"0.33499999999999375\" source=\"{data.car}\"/>\n                            <e:Image id=\"wheelL\" source=\"car_front_wheel_png\" x=\"147.55\" y=\"20.2\" anchorOffsetX=\"14\" anchorOffsetY=\"14\" visible=\"false\"/>\n                            <e:Image id=\"wheelR\" source=\"car_rear_wheel_png\" x=\"32.72\" y=\"19.28\" anchorOffsetX=\"16\" anchorOffsetY=\"16\" visible=\"false\"/>\n                        </e:Group>\n                    </e:Group>\n                </e:Skin>";
            // dataGroup.itemRendererSkinName = "resource/eui_modules/Game/ExtractUnit.exml";
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
            }, 100);
        }, function (err) {
            _this.ifError();
        });
    };
    ExtractUnitTs.prototype.ifError = function () {
        $alert('网络异常，请尝试重新打开统计界面');
    };
    return ExtractUnitTs;
}(eui.Scroller));
__reflect(ExtractUnitTs.prototype, "ExtractUnitTs");
