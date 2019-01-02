class Language extends eui.Component {

    public constructor() {
        super();

        /**load Container skin */
        this.skinName = "resource/eui_modules/LanguageUI.exml";
    }

    public modal:eui.Rect;
    public close:eui.Image;
    public title:eui.Image;

    public langZHTW:eui.Group;
    public langZHTW_choosed:eui.Image;
    public langEN:eui.Group;
    public langEN_choosed:eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);

        this.langZHTW.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'zhtw'), this);
        this.langEN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseLang.bind(this, 'en'), this);
    }

    private clostFun() {
        let group = $Modal.language.$children[1];
        let tw = egret.Tween.get(group);//开始动画
        tw.to({ y: 1716 }, 200).call(function(){
            $Modal.language.visible = false;
            tw = null;
        });
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
