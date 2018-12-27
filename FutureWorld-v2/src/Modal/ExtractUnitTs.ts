class ExtractUnitTs extends eui.Scroller {
    public constructor() {
        super();
    }

    private allLen = 0;
    private sourceArr = [];

    protected createChildren(): void {
        /**当前分红序列 */
    }

    private getData() {
        // 剩余炼丹次数
        this.allLen = 0;
        this.sourceArr.length = 0;
        this.$children.length = 0;
        
        $myAddress && $gameContractInstance.getRollInArrayDetail($myAddress, (err3, roll) => {
            if (err3) {
                console.log(err3);
            } else {
                roll = roll.map((item, i) => {
                    return parseInt(item.toNumber())
                });
                let len = roll.length;
                this.allLen = len;
                this.sourceArr.length = 0;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        if(roll[i] >= $Modal.gameStatistics.data.stats.currentNum) {
                            let obj = {
                                num: roll[i],
                                extractCoin1: "0"
                            };
                            this.sourceArr.push(obj);
                        }
                    }
                    this.getList();
                }
            }
        });
    }

    private getList() {
        $myAddress && getMyKeyProp().then((data) => {
            if (this.sourceArr.length < 1) {
                this.$children.length = 0;
                return
            }
            this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[4].toString())).toFixed(0) + "e";
            this.sourceArr.length = this.allLen <= this.sourceArr.length ? this.allLen : this.sourceArr.length;
            let myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);
            let dataGroup: eui.DataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            let lang = localStorage.getItem('language');
            let img = lang === "zhtw" ? "statistics_text_wdxh" : "statistics_text_wdxh_en";
            dataGroup.itemRendererSkinName = `<?xml version="1.0" encoding="utf-8"?>
<e:Skin class="ExtractUnit" width="900" height="225.55" xmlns:e="http://ns.egret.com/eui">
	<e:Image verticalCenter="0" source="list_item_bg" horizontalCenter="0"/>
	<e:Image source="${img}" verticalCenter="-40.775000000000006" horizontalCenter="0"/>
	<e:BitmapLabel scaleX="1" scaleY="1" anchorOffsetX="0" width="299.33" textAlign="center" anchorOffsetY="0" height="89.09" verticalCenter="34.724999999999994" verticalAlign="middle" text="{data.num}" horizontalCenter="-15.5" font="static_round_fnt"/>
</e:Skin>`;
            this.$children.length = 0;
            this.addChild(dataGroup);
        });
    }
}