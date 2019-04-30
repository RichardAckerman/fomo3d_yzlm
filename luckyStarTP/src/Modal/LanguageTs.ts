class LanguageTs extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_skins/modal/LanguagePanel.exml";
    }

    public closeBg:eui.Rect;
    public langZHTW:eui.Group;
    public langZHTW_choosed:eui.Image;
    public langEN:eui.Group;
    public langEN_choosed:eui.Image;
    public title:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.closeBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.langZHTW.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'zhtw'), this);
        this.langEN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'en'), this);
    }

    private closeFun() {
        $closeModalFun(this,-1360);
    }

    private chooseLang(lang) {
        if(langStatus !== lang) {  
            setLanguageModalState(lang);
            langStatus = lang;
            changeLang(lang);
            localStorage.setItem('language', lang);
        }
    }
}
