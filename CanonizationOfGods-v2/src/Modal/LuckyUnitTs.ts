class LuckyUnitTs extends eui.Scroller {

    public constructor() {
        super();
    }

    private sourceArr = [];
    private luckMoney;

    protected createChildren(): void {
        /**当前分红序列 */
    }

    private getData() {
        this.sourceArr.length = 0;
        this.$children.length = 0;
        $gameContractInstance.luckyPlayerMoney((err, lucky) => {
            if (err) {
                console.log("playerxID_:", err);
            } else {
                this.luckMoney = web3js.fromWei(lucky, "ether").toNumber();
                this.getLuckyAddress(0);
            }
        });
    }

    private getLuckyAddress(index) {
        $gameContractInstance.luckyer(index, (err, id) => {
            if (err) {
                //console.log("luckyer:", err);
                //this.getList();
            } else {
                if(id.toNumber() == 0)
                {
                    return;
                }

                $gameContractInstance.playerxID_(id, (err1, data) => {
                    if (err) {
                        console.log("playerxID_:", err);
                    } else {
                        let obj = {
                            extractCoin1: this.luckMoney,
                            address: data[0]
                        };
                        this.sourceArr.push(obj);
                        index++;
                        this.getLuckyAddress(index);
                        this.getList();
                    }
                });
            }
        });
    }

    private getList() {
        if (this.sourceArr.length < 1) {
            this.$children.length = 0;
            return
        }
        let myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);
        let dataGroup: eui.DataGroup = new eui.DataGroup();
        dataGroup.dataProvider = myCollection;
        dataGroup.itemRendererSkinName = `<?xml version="1.0" encoding="utf-8"?>
<e:Skin class="ExtractUnit" width="900" height="266" xmlns:e="http://ns.egret.com/eui">
	<e:Image verticalCenter="31" horizontalCenter="0" source="statistics_bg" anchorOffsetY="0" height="246"/>
	<e:BitmapLabel scaleX="1" scaleY="1" anchorOffsetX="0" textAlign="right" anchorOffsetY="0" height="89.09" verticalAlign="middle" text="{data.extractCoin1}" horizontalCenter="0.5" font="statistics_bold_fnt" verticalCenter="31.5"/>
	<e:Label text="{data.address}" y="31.35" anchorOffsetX="0" horizontalCenter="1.5" textColor="0x4b281f" bold="true"/>
</e:Skin>`;
        this.$children.length = 0;
        this.addChild(dataGroup);
    }
}