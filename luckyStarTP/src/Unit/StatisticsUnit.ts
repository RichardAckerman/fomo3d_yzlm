class StatisticsUnit extends eui.Scroller {

    public constructor() {
        super();
    }

    private allLen = 0;
    private sourceArr = [];

    protected createChildren(): void {
        /**当前分红序列 */
    }

    private getData() {
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
            if (err3) {
                console.log("getRollInArrayDetail++++++:", err3);
            } else {
                roll = roll.map((item, i) => {
                    return parseInt(item.toString())
                });
                let len = roll.length;
                this.allLen = len;
                this.sourceArr.length = 0;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let obj = {
                            index: i + 1,
                            num: roll[i],
                            extractCoin1: "0"
                        };
                        this.sourceArr.push(obj);
                    }
                    this.getList();
                }
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
<e:Skin class="ListUnit" width="930" height="150" xmlns:e="http://ns.egret.com/eui">
	<e:Image source="list_item_bg_png" scale9Grid="36,31,13,15" left="0" right="0" height="114" verticalCenter="0"/>
	<e:Image source="bg_mysort_png" x="56" verticalCenter="0"/>
	<e:Image source="statistics_text_wdxh_png" x="68.33" verticalCenter="0.5"/>
	<e:BitmapLabel width="392" height="101.33" x="489" anchorOffsetX="0" anchorOffsetY="0" font="green_big_fnt" text="{data.num}" textAlign="center" verticalAlign="middle" verticalCenter="0"/>
</e:Skin>`;
        this.$children.length = 0;
        this.addChild(dataGroup);
    }
}