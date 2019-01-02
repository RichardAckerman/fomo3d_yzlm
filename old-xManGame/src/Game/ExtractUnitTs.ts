class ExtractUnitTs extends eui.Scroller {

    public constructor() {
        super();
    }

    private allLen = 0;
    private sourceArr = [];
    private updateData: egret.Timer = new egret.Timer(30000, 0);

    private nRollIn = 2; // 总序列
    private nGainId = 1; // 当前分红序列

    protected createChildren(): void {
        /**当前分红序列 */
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start();
        this.getData();
    }

    private getData() {
        this.sourceArr.length = 0;
        $gameContractInstance.getRollInArrayLen((err2, len) => {
            if (err2) {
                console.log(err2);
                this.updateData.stop()
            } else {
                this.allLen = parseInt(len.toString());
                if (this.allLen > 0) {
                    $gameContractInstance.nRollIn((err1, n) => {
                        if (err1) {
                            console.log(err1);
                        } else {
                            this.nRollIn = parseInt(n.toString());
                            $gameContractInstance.nCurrentGainId((err3, GainId) => {
                                if (err3) {
                                    console.log(err3);
                                } else {
                                    this.getQueueId(0);
                                    this.nGainId = parseInt(GainId.toString());
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
        $gameContractInstance.getRollInArray(i, (err1, n) => {
            if (err1) {
                console.log(err1);
            } else {
                let obj = {
                    extractNum: n[0].toString(),
                    extractCoin1: "0",
                    per: 0
                };
                if (this.nGainId != 1) {
                    let down = this.nRollIn - this.nGainId;
                    down = down <= 0 ? 1 : down;
                    let up = this.nRollIn - parseInt(obj.extractNum);
                    up = up <= 0 ? 1 : up;
                    up = up > down ? down : up;
                    obj.per = up / down * 904;
                    obj.per = obj.per > 185 ? obj.per - 185 : obj.per;
                }

                // if (this.sourceArr.length >= 1) {
                obj.extractNum = "***";
                // }
                this.sourceArr.push(obj);
                if (i < this.allLen - 1) {
                    i++;
                    this.getQueueId(i)
                } else {
                    this.getList();
                }
            }
        });
    }

    private getList() {
        $myAddress && getMyKeyProp().then((data) => {
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
                <e:Image source="statistics_text_syxh_png" x="50.78" y="57.81"/>
                <e:Image source="statistics_text_syje_png" x="491.97" y="57.81"/>
                <e:BitmapLabel scaleX="1" scaleY="1" anchorOffsetX="0" width="249.33" textAlign="left" anchorOffsetY="0" height="89.09" x="688.51" y="49.71" font="game_modal_num_100_fnt" text="{data.extractCoin1}"/>
                <e:Group width="903.99" height="56" y="190.32" anchorOffsetX="0" anchorOffsetY="0" horizontalCenter="0" maxWidth="903.99" scrollEnabled="true">
                <e:Image id="carLine" source="car_line_png" verticalCenter="0" left="0"/>
                <e:Group id="carGroup" width="185.33" height="53.34" x="{data.per}" y="1.33" anchorOffsetY="0" anchorOffsetX="0">
                <e:Image source="car_png" verticalCenter="-7.5" y="-10.330000000000013" scaleX="1" scaleY="1" horizontalCenter="0"/>
                <e:Image id="wheelL" source="car_front_wheel_png" x="147.55" y="20.2" anchorOffsetX="14" anchorOffsetY="14"/>
                <e:Image id="wheelR" source="car_rear_wheel_png" x="32.72" y="19.28" anchorOffsetX="16" anchorOffsetY="16"/>
                </e:Group>
                </e:Group>
                </e:Skin>`;
            // dataGroup.itemRendererSkinName = "resource/eui_modules/Game/ExtractUnit.exml";
            this.$children.length = 0;
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
            }, 1000)
        });
    }
}