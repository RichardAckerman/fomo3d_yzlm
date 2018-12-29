class LuckyPersonUnitTs extends eui.Scroller {

    public constructor() {
        super();
    }

    private allLen = 9;
    private sourceArr = [];
    private updateDataLuckyer: egret.Timer = new egret.Timer(60000, 0);

    protected createChildren(): void {

        /**当前分红序列 */
        this.updateDataLuckyer.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateDataLuckyer.start();
        this.getData();
    }

    private getData() {
        this.sourceArr.length = 0;
        this.$children.length = 0;
        this.getQueueId(0);
    }

    private getQueueId(i) {
        // 查幸运玩家的id列表
        $gameContractInstance.luckyPotPerson(i, (err1, id) => {
            if (err1) {
                this.updateDataLuckyer.stop();
                console.log("233333", err1);
            } else {
                // 查幸运玩家的地址
                $gameContractInstance.playerxID_(id.toString(), (err2, info) => {
                    let addr = info[0];
                    // 查幸运玩家的奖励
                    $gameContractInstance.luckyPotMoney(id.toString(), (err3, coin) => {
                        if (id.toString() != "0") {
                            let obj = {
                                index: i + 1,
                                address: addr,
                                extractCoin1: Math.floor(parseFloat(web3js.fromWei(coin.toString())) * 1000) / 1000 + "",
                            };
                            this.sourceArr.push(obj);
                        } else {
                            this.getList();
                            return;
                        }
                        if (i == 8) {
                            this.getList();
                        }
                        if (i < 8 && id.toString() != "0") {
                            i++;
                            this.getQueueId(i)
                        }
                    });
                });
            }
        });
    }

    private getList() {
        $myAddress && getMyKeyProp().then((data) => {
            if (this.sourceArr.length < 1) {
                this.$children.length = 0;
                return
            }
            this.sourceArr.length = (9 <= this.sourceArr.length ? this.allLen : this.sourceArr.length);
            let myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);
            let dataGroup: eui.DataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            let lang = localStorage.getItem('language');
            let img = lang === "zhtw" ? "statistics_text_wdxh_png" : "statistics_text_wdxh_en_png";
            dataGroup.itemRendererSkinName = `<?xml version="1.0" encoding="utf-8"?>
<e:Skin class="ExtractUnit" width="836" height="150" xmlns:e="http://ns.egret.com/eui">
	<e:Image horizontalCenter="0" source="list_item_bg2_png" verticalCenter="0"/>
	<e:BitmapLabel width="126.97" height="56.36" x="4.25" anchorOffsetX="0" anchorOffsetY="0" verticalCenter="6" text="{data.index}" font="lucky_num_fnt" textAlign="center" verticalAlign="middle"/>
	<e:Label size="30" verticalCenter="16" textAlign="left" horizontalCenter="-25" textColor="0xd9786a" width="400" text="{data.address}"/>
	<e:Image source="icon_fof_png" x="637" verticalCenter="10.5"/>
	<e:Label text="{data.extractCoin1}" x="670.24" size="40" textColor="0xe9daff" anchorOffsetX="0" width="186.33" anchorOffsetY="0" height="54.67" verticalCenter="10.5" verticalAlign="middle"/>
</e:Skin>`;
//             dataGroup.itemRendererSkinName = "resource/eui_modules/Game/LuckyUnit.exml";
            this.$children.length = 0;
            this.addChild(dataGroup);
        });
    }
}