class LuckyTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/modal/LuckyPanel.exml";
    }

    private status: number = 0;

    public closeBg: eui.Rect;
    public title: eui.Image;
    public tab1: eui.Group;
    public tabBg1: eui.Image;
    public tabAct1: eui.Image;
    public tab2: eui.Group;
    public tabBg2: eui.Image;
    public tabAct2: eui.Image;
    public luckyTab: eui.Group;
    public overtimeImg: eui.Image;
    public potImg: eui.Image;
    public lastLucky: eui.Group;
    public lastLuckyInfo: eui.Group;

    private data = {
        drainTime: "24:00:00",
        pot: "0",
    };
    private luckyUnit;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);

        this.luckyUnit = new LuckyUnitTs();
        this.lastLuckyInfo.addChild(this.luckyUnit);
    }

    private getLuckyList() {
        this.luckyUnit.getData();
    }

    private closeFun() {
        $closeModalFun(this, -1360);
    }

    private selectTab(target) {
        if (target !== this.status) {
            if (target === 1) {
                this.tabBg1.source = 'statistics_stats_bg_xz2_png';
                this.tabAct1.source = 'title_text_xykc1_png';

                this.tabBg2.source = 'statistics_stats_bg2_png';
                this.tabAct2.source = 'title_text_xyph_png';

                this.luckyTab.visible = true;
                this.lastLucky.visible = false;
            }
            if (target === 2) {
                this.tabBg1.source = 'statistics_stats_bg2_png';
                this.tabAct1.source = 'title_text_xykc_png';

                this.tabBg2.source = 'statistics_stats_bg_xz2_png';
                this.tabAct2.source = 'title_text_xyph1_png';

                this.luckyTab.visible = false;
                this.lastLucky.visible = true;
            }
            this.status = target;
        }
    }
}
