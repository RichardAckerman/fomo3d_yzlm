class ExtractUnitTs extends eui.Scroller {

    public constructor() {
        super();
    }

    private allLen = 0;
    private sourceArr = [];
    private sourceArrObj = [];
    public myNumber:any = 'yx_text_wdxh_en_png';
    public fenfang:any = 'yx_text_fhsy_zh_png';
    // private updateData: egret.Timer = new egret.Timer(30000, 0);

    private nRollIn = 2; // 总序列
    private nGainId = 1; // 当前分红序列

    protected createChildren(): void {
        /**当前分红序列 */
        // this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        // this.updateData.start();
        // this.getData();
    }

    private getData() {
        this.sourceArr.length = 0;
        this.$children.length = 0;
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err2, arr) => {
            if (err2) {
                this.ifError();
            } else {
                this.allLen = arr.length;
                this.sourceArrObj = arr;
                this.sourceArrObj.forEach((item) => {
                    return item.toString();
                });
                if (this.allLen > 0) {
                    $gameContractInstance.nRollIn((err1, n) => {
                        if (err1) {
                            this.ifError();
                            // console.log(err1);
                        } else {
                            this.nRollIn = n.toNumber();
                            $gameContractInstance.nCurrentGainId((err3, GainId) => {
                                if (err3) {
                                    this.ifError();
                                    // console.log(err3);
                                } else {
                                    this.nGainId = GainId.toNumber();
                                    this.getQueueId(0);
                                }
                            });
                        }
                    });
                } else {

                }
            }
        });
    }

    private getQueueId(i) {
        let obj:any = {
            extractNum: this.sourceArrObj[i].toNumber() - this.nGainId,
            extractCoin1: "0",
            per: 0,
            car: `car${this.sourceArr.length + 1}_png`,            
            myNumber: this.myNumber,
            fenfang: this.fenfang
        };
        if (this.sourceArr.length > 5) { //总数减一
            let rom = parseInt(Math.random() * 6 + "") + 1;
            obj.car = `car${rom}_png`;
        }
        if (this.nGainId != 1) {
            //3795  ---   2244   ----  2721
            let down = this.nRollIn - this.nGainId;
            down = down <= 0 ? 1 : down;
            let up = down - (this.sourceArrObj[i].toNumber() - this.nGainId);
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
        } else {
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
    }

    private getList() {
        getMyKeyProp().then((data:any) => {
            if (this.sourceArr.length == 0) {
                return;
            }
            
            this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
            let myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);
            let dataGroup: eui.DataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRendererSkinName = `<?xml version="1.0" encoding="utf-8"?>
                <e:Skin class="ExtractUnit" width="970" height="280" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:tween="egret.tween.*">
                    <w:Declarations>
                    </w:Declarations>
                    <e:Image scaleX="1" scaleY="1" verticalCenter="0" source="car_bg_png" horizontalCenter="0"/>
                    <e:BitmapLabel scaleX="1" scaleY="1" verticalCenter="-47" anchorOffsetX="0" width="223.57" textAlign="left" horizontalCenter="-126" anchorOffsetY="0" height="86.06" font="game_modal_num_100_fnt" text="{data.extractNum}"/>
                    <e:Image source="{data.myNumber}" x="50.78" y="57.81"/>
                    <e:Image x="532.92" y="57.81" source="{data.fenfang}"/>
                    <e:BitmapLabel scaleX="1" scaleY="1" anchorOffsetX="0" width="249.33" textAlign="left" anchorOffsetY="0" height="89.09" x="691.54" y="49.71" font="game_modal_num_100_fnt" text="{data.extractCoin1}"/>
                    <e:Group width="903.99" height="90.85" y="161.54" anchorOffsetX="0" anchorOffsetY="0" horizontalCenter="0" maxWidth="903.99" scrollEnabled="true">
                        <e:Image id="carLine" source="car_line_png" verticalCenter="12.575000000000003" left="0"/>
                        <e:Group id="carGroup" width="185.33" height="53.34" x="{data.per}" y="1.33" anchorOffsetY="0" anchorOffsetX="0">
                            <e:Image verticalCenter="17.33" y="-10.330000000000013" scaleX="1" scaleY="1" horizontalCenter="0.33499999999999375" source="{data.car}"/>
                            <e:Image id="wheelL" source="car_front_wheel_png" x="147.55" y="20.2" anchorOffsetX="14" anchorOffsetY="14" visible="false"/>
                            <e:Image id="wheelR" source="car_rear_wheel_png" x="32.72" y="19.28" anchorOffsetX="16" anchorOffsetY="16" visible="false"/>
                        </e:Group>
                    </e:Group>
                </e:Skin>`;
            // dataGroup.itemRendererSkinName = "resource/eui_modules/Game/ExtractUnit.exml";
            this.addChild(dataGroup);
            setTimeout(() => {
                let len = dataGroup.$children.length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let wheelL = (dataGroup.$children[i] as any).wheelL;
                        let wheelR = (dataGroup.$children[i] as any).wheelR;
                        let line = (dataGroup.$children[i] as any).carLine;
                        egret.Tween.get(wheelL, {loop: true})
                            .to({rotation: 0}, 0)
                            .to({rotation: 360}, 1000);
                        egret.Tween.get(wheelR, {loop: true})
                            .to({rotation: 0}, 0)
                            .to({rotation: 360}, 1000);

                        egret.Tween.get(line, {loop: true})
                            .to({left: 0}, 0)
                            .to({left: -904}, 6000).call(() => {
                            line.x = 0;
                        });
                    }
                }
            }, 100);
        }, err => {
            this.ifError();
        });
    }

    private ifError() {
        $alert('网络异常，请尝试重新打开统计界面');
    }
}
