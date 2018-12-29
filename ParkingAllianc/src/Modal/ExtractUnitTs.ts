class ExtractUnitTs extends eui.Scroller {

    public constructor() {
        super();
    }

    private allLen = 0;
    private sourceArr = [];

    protected createChildren(): void {
    }

    private getData() {
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
            if (err3) {
                console.log(err3);
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
        $myAddress && getMyKeyProp().then((data) => {
            this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[4].toString())).toFixed(2);
            let myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);
            let dataGroup: eui.DataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            let lang = localStorage.getItem('language');
            let img = lang === "zhtw" ? "statistics_text_wdxh_png" : "statistics_text_wdxh_en_png";
            dataGroup.itemRendererSkinName = `<?xml version="1.0" encoding="utf-8"?>
<e:Skin class="ExtractUnit" width="850" height="184.55" xmlns:e="http://ns.egret.com/eui">
	<e:Image source="list_item_bg_png" horizontalCenter="0" verticalCenter="0"/>
	<e:Image x="80.34" source="${img}" verticalCenter="0.22499999999999432"/>
	<e:Label text="{data.num}" horizontalCenter="64" textColor="0xbafffe" size="58" verticalCenter="0"/>
	<e:Label text="{data.extractCoin1}" x="650.29" textColor="0xbafffe" size="58" verticalCenter="0"/>
	<e:Label x="281.86" y="47.5" textColor="0xfdffdc" size="34" anchorOffsetX="0" width="73.5" anchorOffsetY="0" height="43.5" verticalAlign="middle" textAlign="center" text="{data.index}"/>
	<e:Image source="num_13_png" x="607" anchorOffsetX="0" width="43.5" anchorOffsetY="0" height="64.5" verticalCenter="1.2249999999999943"/>
</e:Skin>`;
            // dataGroup.itemRendererSkinName = "resource/eui_modules/Game/ExtractUnit.exml";
            this.$children.length = 0;
            this.addChild(dataGroup);
        });
    }
}