class ExtractUnitTs extends eui.Scroller {

    public constructor() {
        super();
    }

    private allLen = 0;
    private sourceArr = [];
    private updateData: egret.Timer = new egret.Timer(4000, 0);

    protected createChildren(): void {

        /**当前分红序列 */
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
        this.updateData.start()
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
                    this.getQueueId(0);
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
                    extractCoin1: "0"
                };
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
            this.sourceArr[0].extractCoin1 = parseFloat(web3js.fromWei(data[5].toString())).toFixed(2);
            let myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);

            let dataGroup: eui.DataGroup = new eui.DataGroup();
            dataGroup.dataProvider = myCollection;
            dataGroup.itemRendererSkinName = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                "<e:Skin class=\"ExtractUnit\" width=\"970\" height=\"280\" xmlns:e=\"http://ns.egret.com/eui\">\n" +
                "\t<e:Image scaleX=\"1\" scaleY=\"1\" horizontalCenter=\"6\" verticalCenter=\"0\" source=\"statistics_ditu_green_png\"/>\n" +
                "\t<e:BitmapLabel scaleX=\"1\" scaleY=\"1\" verticalCenter=\"34\" anchorOffsetX=\"0\" width=\"223.57\" textAlign=\"left\" horizontalCenter=\"-126\" anchorOffsetY=\"0\" height=\"86.06\" font=\"game_modal_num_100_fnt\" text=\"{data.extractNum}\"/>\n" +
                "\t<e:Image source=\"statistics_text_syxh_png\" x=\"50.78\" y=\"140.53\"/>\n" +
                "\t<e:Image source=\"statistics_text_syje_png\" x=\"491.97\" y=\"145.6\"/>\n" +
                "\t<e:BitmapLabel scaleX=\"1\" scaleY=\"1\" anchorOffsetX=\"0\" width=\"249.33\" textAlign=\"left\" anchorOffsetY=\"0\" height=\"89.09\" x=\"688.51\" y=\"133.74\" font=\"game_modal_num_100_fnt\" text=\"{data.extractCoin1}\"/>\n" +
                "</e:Skin>";
            this.addChild(dataGroup);
        });
    }
}