class LuckyUnitTs extends eui.Scroller {

    public constructor() {
        super();
    }

    private luckyMoney = "0";
    private sourceArr = [];

    protected createChildren(): void {
        /**当前分红序列 */
    }

    private getData() {
        this.sourceArr.length = 0;
        this.$children.length = 0;
        $gameContractInstance.luckyPotMoney((err3, coin) => {
            if (err3) {
                console.log("luckyPotMoney", err3);
            } else {
                this.luckyMoney = $toFixedDecimal(coin);
                this.getQueueId(0);
            }
        });
    }

    private getQueueId(i) {
        // 查幸运玩家的id列表
        $gameContractInstance.luckyPotPerson(i, (err1, id) => {
            if (err1) {
                console.log("nPlayerArraySize", err1);
            } else {
                // 查幸运玩家的地址
                $gameContractInstance.playerxID_(id.toString(), (err2, info) => {
                    if (err2) {
                        console.log("playerxID_", err2);
                    } else {
                        let addr = info[0];
                        // 查幸运玩家的奖励
                        if (id.toString() != "0") {
                            let obj = {
                                index: i + 1,
                                address: addr,
                                extractCoin1: this.luckyMoney
                            };
                            this.sourceArr.push(obj);
                            this.getList();
                        }
                        if (i < 100 && id.toString() != "0") {
                            i++;
                            this.getQueueId(i);
                        }
                    }
                });
            }
        });
    }

    private getList() {
        if (this.sourceArr.length < 1) {
            this.$children.length = 0;
            return;
        }
        let myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);
        let dataGroup: eui.DataGroup = new eui.DataGroup();
        dataGroup.dataProvider = myCollection;
        dataGroup.itemRendererSkinName = `<?xml version="1.0" encoding="utf-8"?>
        <e:Skin class="LuckyUnit" width="930" height="220.67" xmlns:e="http://ns.egret.com/eui">
            <e:Image source="title2_bg_png" left="0" right="0" height="180" verticalCenter="0"/>
            <e:Image source="bg_rank_png" x="33" verticalCenter="0"/>
            <e:BitmapLabel width="117.88" height="56.36" x="13.34" anchorOffsetX="0" anchorOffsetY="0" textAlign="center" verticalAlign="middle" text="{data.index}" font="white_fnt" verticalCenter="0"/>
            <e:Label size="30" textAlign="left" horizontalCenter="-89" width="400" text="{data.address}" verticalCenter="0" textColor="0xffffff"/>
            <e:Image x="725.28" verticalCenter="48.5" source="icon_coin_png" width="74" height="19"/>
            <e:BitmapLabel width="324.54" height="56.36" x="600.01" anchorOffsetX="0" anchorOffsetY="0" textAlign="center" verticalAlign="middle" text="{data.extractCoin1}" font="orange_fnt" verticalCenter="0"/>
        </e:Skin>`;
        this.$children.length = 0;
        this.addChild(dataGroup);
    }
}