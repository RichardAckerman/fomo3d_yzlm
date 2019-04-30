
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {};generateEUI.paths['resource/eui_skins/alert/GameAlertUI.exml'] = window.GameAlertUI = (function (_super) {
	__extends(GameAlertUI, _super);
	function GameAlertUI() {
		_super.call(this);
		this.skinParts = ["modal","submitBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.msg"],[0],this._Label1,"text");
	}
	var _proto = GameAlertUI.prototype;

	_proto.modal_i = function () {
		var t = new eui.Rect();
		this.modal = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 754.64;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 894;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.submitBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 415;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		t.width = 700;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 150.67;
		t.horizontalCenter = 0;
		t.lineSpacing = 12;
		t.minHeight = 100;
		t.size = 48;
		t.textAlign = "center";
		t.textColor = 0xffe200;
		t.verticalCenter = -56.81999999999999;
		t.width = 579.67;
		return t;
	};
	_proto.submitBtn_i = function () {
		var t = new eui.Group();
		this.submitBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 421.69;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "btn_text_sure_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	return GameAlertUI;
})(eui.Skin);generateEUI.paths['resource/eui_skins/alert/PromptUI.exml'] = window.PromptUI = (function (_super) {
	__extends(PromptUI, _super);
	function PromptUI() {
		_super.call(this);
		this.skinParts = ["modal","cancelBtn","submitBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.code"],[0],this._EditableText1,"text");
	}
	var _proto = PromptUI.prototype;

	_proto.modal_i = function () {
		var t = new eui.Rect();
		this.modal = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 754.64;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 894;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this._Image2_i(),this._EditableText1_i(),this.cancelBtn_i(),this.submitBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 495;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 8.180000000000007;
		t.width = 861.93;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 52.67;
		t.horizontalCenter = 0;
		t.lineSpacing = 12;
		t.minHeight = 100;
		t.size = 48;
		t.text = "请输入你的推荐码";
		t.textAlign = "center";
		t.textColor = 0xffe200;
		t.verticalCenter = -123.82;
		t.width = 579.67;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 98;
		t.horizontalCenter = 0;
		t.source = "list_item_bg_png";
		t.verticalCenter = -17.319999999999993;
		t.width = 630;
		return t;
	};
	_proto._EditableText1_i = function () {
		var t = new eui.EditableText();
		this._EditableText1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 86;
		t.size = 40;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 514;
		t.x = 195;
		t.y = 315;
		return t;
	};
	_proto.cancelBtn_i = function () {
		var t = new eui.Group();
		this.cancelBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = -182;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 449.69;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_cancel1_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.submitBtn_i = function () {
		var t = new eui.Group();
		this.submitBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = 164;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 447.69;
		t.elementsContent = [this._Image5_i(),this._Image6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.source = "btn_red_png";
		t.verticalCenter = 8;
		t.width = 296;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "btn_text_sure1_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	return PromptUI;
})(eui.Skin);generateEUI.paths['resource/eui_skins/alert/WeatherBandCode.exml'] = window.WeatherBandCode = (function (_super) {
	__extends(WeatherBandCode, _super);
	function WeatherBandCode() {
		_super.call(this);
		this.skinParts = ["modal","cancelBtn","submitBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group1_i()];
	}
	var _proto = WeatherBandCode.prototype;

	_proto.modal_i = function () {
		var t = new eui.Rect();
		this.modal = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 754.64;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 894;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.cancelBtn_i(),this.submitBtn_i(),this._Label2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 511;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		t.width = 861.93;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 150.67;
		t.horizontalCenter = 0;
		t.lineSpacing = 12;
		t.minHeight = 100;
		t.size = 48;
		t.text = "你还没有绑定推荐人，是否需要绑定推荐人？";
		t.textAlign = "center";
		t.textColor = 0xffe200;
		t.verticalCenter = -56.81999999999999;
		t.width = 579.67;
		return t;
	};
	_proto.cancelBtn_i = function () {
		var t = new eui.Group();
		this.cancelBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = -226;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 437.69;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_bd_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.submitBtn_i = function () {
		var t = new eui.Group();
		this.submitBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = 186;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 435.69;
		t.elementsContent = [this._Image4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_red_png";
		t.verticalCenter = 8;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "btn_text_bbd_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0.5;
		t.size = 24;
		t.text = "(没有绑定推荐码将不能注册成为推荐人)";
		t.textAlign = "center";
		t.width = 601;
		t.y = 377;
		return t;
	};
	return WeatherBandCode;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameUI.exml'] = window.GameUI = (function (_super) {
	__extends(GameUI, _super);
	function GameUI() {
		_super.call(this);
		this.skinParts = ["jitter","animationG","statisticsBtn","inviteBtn","luckyBtn","langBtn","strategyBtn","foot","house","dataPanelBg","closeBtn","dataPanelTop","dataPanelMiddle","dataPanelBottom","dataPanelClose","dataPanel","headBg","withdrawBtn","price","buyBtn","openBtn","head"];
		
		this.height = 1716;
		this.width = 1080;
		this.jitter_i();
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.animationG_i(),this.foot_i(),this.house_i(),this.dataPanel_i(),this.head_i()];
		
		eui.Binding.$bindProperties(this, ["openBtn"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [1080],[],this._Object1,"x");
		eui.Binding.$bindProperties(this, [200],[],this._Object1,"y");
		eui.Binding.$bindProperties(this, [1080],[],this._Object2,"x");
		eui.Binding.$bindProperties(this, [210],[],this._Object2,"y");
		eui.Binding.$bindProperties(this, [1080],[],this._Object3,"x");
		eui.Binding.$bindProperties(this, [200],[],this._Object3,"y");
		eui.Binding.$bindProperties(this, ["closeBtn"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [1474],[],this._Object4,"y");
		eui.Binding.$bindProperties(this, [1484],[],this._Object5,"y");
		eui.Binding.$bindProperties(this, [1474],[],this._Object6,"y");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalFinalPot"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.leftTime"],[0],this._BitmapLabel2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.weekPot"],[0],this._BitmapLabel3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.weekLeftTime"],[0],this._BitmapLabel4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentNum"],[0],this._BitmapLabel5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.myNum"],[0],this._BitmapLabel6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalBuy"],[0],this._BitmapLabel7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.buyTimes"],[0],this._BitmapLabel8,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.outTimes"],[0],this._BitmapLabel9,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.notoutTimes"],[0],this._BitmapLabel10,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.earnings"],[0],this._BitmapLabel11,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.levelupBonus"],[0],this._BitmapLabel12,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.leaderBonus"],[0],this._BitmapLabel13,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.roundBonus"],[0],this._BitmapLabel14,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.canWithDraw"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.price"],[0],this.price,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.pageShowTime"],[0],this._Label2,"text");
	}
	var _proto = GameUI.prototype;

	_proto.jitter_i = function () {
		var t = new egret.tween.TweenGroup();
		this.jitter = t;
		t.items = [this._TweenItem1_i(),this._TweenItem2_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 350;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 300;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To3_i(),this._To4_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 350;
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 300;
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "game_bg_jpg";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 32;
		t.source = "house_png";
		t.verticalCenter = -242;
		return t;
	};
	_proto.animationG_i = function () {
		var t = new eui.Group();
		this.animationG = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.foot_i = function () {
		var t = new eui.Group();
		this.foot = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 233.33;
		t.left = 0;
		t.right = 0;
		t.elementsContent = [this.statisticsBtn_i(),this.inviteBtn_i(),this.luckyBtn_i(),this.langBtn_i(),this.strategyBtn_i()];
		return t;
	};
	_proto.statisticsBtn_i = function () {
		var t = new eui.Group();
		this.statisticsBtn = t;
		t.height = 200;
		t.left = 31;
		t.top = 0;
		t.width = 200;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_tj_logo_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "icon_tj_png";
		return t;
	};
	_proto.inviteBtn_i = function () {
		var t = new eui.Group();
		this.inviteBtn = t;
		t.height = 200;
		t.top = 0;
		t.width = 200;
		t.x = 236.03;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Image8_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_yq_logo_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "icon_yq_png";
		return t;
	};
	_proto.luckyBtn_i = function () {
		var t = new eui.Group();
		this.luckyBtn = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 200;
		t.elementsContent = [this._Image9_i(),this._Image10_i(),this._Image11_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_xyj_logo_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "icon_xyj_png";
		return t;
	};
	_proto.langBtn_i = function () {
		var t = new eui.Group();
		this.langBtn = t;
		t.height = 200;
		t.top = 0;
		t.width = 200;
		t.x = 645.31;
		t.elementsContent = [this._Image12_i(),this._Image13_i(),this._Image14_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_dj_logo_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "icon_dj_png";
		return t;
	};
	_proto.strategyBtn_i = function () {
		var t = new eui.Group();
		this.strategyBtn = t;
		t.height = 200;
		t.right = 30;
		t.top = 0;
		t.width = 200;
		t.elementsContent = [this._Image15_i(),this._Image16_i(),this._Image17_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "icon_gl_logo_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "icon_gl_png";
		return t;
	};
	_proto.house_i = function () {
		var t = new eui.Rect();
		this.house = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 167.33;
		t.horizontalCenter = 34;
		t.width = 146;
		t.y = 523.35;
		return t;
	};
	_proto.dataPanel_i = function () {
		var t = new eui.Group();
		this.dataPanel = t;
		t.anchorOffsetY = 0;
		t.bottom = 4;
		t.height = 1552.43;
		t.left = 0;
		t.right = 0;
		t.visible = false;
		t.elementsContent = [this.dataPanelBg_i(),this._Image18_i(),this.closeBtn_i(),this.dataPanelTop_i(),this.dataPanelMiddle_i(),this.dataPanelBottom_i(),this.dataPanelClose_i()];
		return t;
	};
	_proto.dataPanelBg_i = function () {
		var t = new eui.Rect();
		this.dataPanelBg = t;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.height = 1716;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.y = -159.91;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "data_bg_png";
		t.top = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.horizontalCenter = 0;
		t.source = "line_png";
		t.y = 1474;
		return t;
	};
	_proto.dataPanelTop_i = function () {
		var t = new eui.Group();
		this.dataPanelTop = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 537.34;
		t.horizontalCenter = -0.5;
		t.width = 1017.34;
		t.y = 15.01;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 69.33;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 428;
		t.x = 45.34;
		t.y = 40;
		t.elementsContent = [this._Image19_i(),this._Image20_i()];
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title1_week_pot_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 69.33;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 428;
		t.x = 542.01;
		t.y = 40;
		t.elementsContent = [this._Image21_i(),this._Image22_i()];
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title1_max_pot_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 360;
		t.width = 426.67;
		t.x = 45.33;
		t.y = 135;
		t.elementsContent = [this._Image23_i(),this._Image24_i(),this._BitmapLabel1_i(),this._Image25_i(),this._Image26_i(),this._BitmapLabel2_i()];
		return t;
	};
	_proto._Image23_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 390;
		t.horizontalCenter = -0.33500000000000796;
		t.scale9Grid = new egret.Rectangle(178,48,177,66);
		t.source = "title1_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image24_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.16499999999999204;
		t.source = "img_decoration_png";
		t.top = 13;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "orange_fnt";
		t.height = 74.67;
		t.horizontalCenter = -0.33500000000000796;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.y = 73.01;
		return t;
	};
	_proto._Image25_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.16499999999999204;
		t.source = "icon_coin_png";
		t.y = 164.63;
		return t;
	};
	_proto._Image26_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.16499999999999204;
		t.source = "line2_png";
		t.y = 222;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "gold_fnt";
		t.height = 74.67;
		t.horizontalCenter = -0.33500000000000796;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.y = 280;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 360;
		t.width = 426.67;
		t.x = 544.65;
		t.y = 135;
		t.elementsContent = [this._Image27_i(),this._Image28_i(),this._BitmapLabel3_i(),this._Image29_i(),this._Image30_i(),this._BitmapLabel4_i()];
		return t;
	};
	_proto._Image27_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 390;
		t.horizontalCenter = -0.33500000000000796;
		t.scale9Grid = new egret.Rectangle(178,48,177,66);
		t.source = "title1_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image28_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.16499999999999204;
		t.source = "img_decoration_png";
		t.top = 13;
		return t;
	};
	_proto._BitmapLabel3_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "orange_fnt";
		t.height = 74.67;
		t.horizontalCenter = -0.33500000000000796;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.y = 73.01;
		return t;
	};
	_proto._Image29_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.16499999999999204;
		t.source = "icon_coin_png";
		t.y = 164.63;
		return t;
	};
	_proto._Image30_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.16499999999999204;
		t.source = "line2_png";
		t.y = 222;
		return t;
	};
	_proto._BitmapLabel4_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "gold_fnt";
		t.height = 74.67;
		t.horizontalCenter = -0.33500000000000796;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 468;
		t.y = 280;
		return t;
	};
	_proto.dataPanelMiddle_i = function () {
		var t = new eui.Group();
		this.dataPanelMiddle = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 245.34;
		t.horizontalCenter = -0.5;
		t.verticalCenter = -62.71500000000003;
		t.width = 1017.34;
		t.elementsContent = [this._Group5_i(),this._Group6_i()];
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 230.66;
		t.top = 0;
		t.width = 428;
		t.x = 45.34;
		t.elementsContent = [this._Image31_i(),this._Image32_i(),this._Image33_i(),this._BitmapLabel5_i()];
		return t;
	};
	_proto._Image31_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image32_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title2_out_sort_png";
		t.y = 19.68;
		return t;
	};
	_proto._Image33_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 120;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(36,29,15,11);
		t.source = "title2_bg_png";
		t.width = 460;
		t.y = 100.33;
		return t;
	};
	_proto._BitmapLabel5_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_big_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.y = 132.64;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 230.66;
		t.width = 428;
		t.x = 542.01;
		t.y = 0;
		t.elementsContent = [this._Image34_i(),this._Image35_i(),this._Image36_i(),this._BitmapLabel6_i()];
		return t;
	};
	_proto._Image34_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image35_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title2_my_sort_png";
		t.y = 19.68;
		return t;
	};
	_proto._Image36_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 120;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(36,29,15,11);
		t.source = "title2_bg_png";
		t.width = 460;
		t.y = 100.33;
		return t;
	};
	_proto._BitmapLabel6_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_big_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.y = 132.64;
		return t;
	};
	_proto.dataPanelBottom_i = function () {
		var t = new eui.Group();
		this.dataPanelBottom = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 93.43000000000006;
		t.height = 621.34;
		t.horizontalCenter = -0.5;
		t.width = 1017.34;
		t.elementsContent = [this._Group12_i(),this._Group18_i()];
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 589.33;
		t.width = 500;
		t.x = 11.32;
		t.y = 10;
		t.elementsContent = [this._Group7_i(),this._Group8_i(),this._Group9_i(),this._Group10_i(),this._Group11_i()];
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66.67;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 23;
		t.elementsContent = [this._Image37_i(),this._Image38_i()];
		return t;
	};
	_proto._Image37_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image38_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title3_my_send_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 123;
		t.elementsContent = [this._Image39_i(),this._Image40_i(),this._Image41_i(),this._Image42_i(),this._BitmapLabel7_i()];
		return t;
	};
	_proto._Image39_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image40_i = function () {
		var t = new eui.Image();
		t.source = "icon_ljtr_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image41_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_ljtr_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._Image42_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 16;
		t.source = "icon_coin_png";
		t.width = 62;
		t.x = 305.98;
		t.y = 71.37;
		return t;
	};
	_proto._BitmapLabel7_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel7 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 225.33;
		t.x = 7.999999999999993;
		t.y = 8.7;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 240;
		t.elementsContent = [this._Image43_i(),this._Image44_i(),this._Image45_i(),this._BitmapLabel8_i()];
		return t;
	};
	_proto._Image43_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image44_i = function () {
		var t = new eui.Image();
		t.source = "icon_ljgy_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image45_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_ljcs_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._BitmapLabel8_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel8 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 225.33;
		t.x = 7.999999999999993;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 357;
		t.elementsContent = [this._Image46_i(),this._Image47_i(),this._Image48_i(),this._BitmapLabel9_i()];
		return t;
	};
	_proto._Image46_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image47_i = function () {
		var t = new eui.Image();
		t.source = "icon_cjcs_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image48_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_cjcs_zh_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._BitmapLabel9_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel9 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 225.33;
		t.x = 7.999999999999993;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 474;
		t.elementsContent = [this._Image49_i(),this._Image50_i(),this._Image51_i(),this._BitmapLabel10_i()];
		return t;
	};
	_proto._Image49_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image50_i = function () {
		var t = new eui.Image();
		t.source = "icon_wccs_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image51_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_wccs_zh_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._BitmapLabel10_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel10 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 225.33;
		t.x = 7.999999999999993;
		return t;
	};
	_proto._Group18_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 589.33;
		t.width = 500;
		t.x = 506.68;
		t.y = 10;
		t.elementsContent = [this._Group13_i(),this._Group14_i(),this._Group15_i(),this._Group16_i(),this._Group17_i()];
		return t;
	};
	_proto._Group13_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66.67;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 23;
		t.elementsContent = [this._Image52_i(),this._Image53_i()];
		return t;
	};
	_proto._Image52_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image53_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title3_my_profit_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group14_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 123;
		t.elementsContent = [this._Image54_i(),this._Image55_i(),this._Image56_i(),this._Image57_i(),this._BitmapLabel11_i()];
		return t;
	};
	_proto._Image54_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image55_i = function () {
		var t = new eui.Image();
		t.source = "icon_wksy_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image56_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_fhsy_en_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._Image57_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 16;
		t.source = "icon_coin_png";
		t.width = 62;
		t.x = 305.98;
		t.y = 71.37;
		return t;
	};
	_proto._BitmapLabel11_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel11 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 225.33;
		t.x = 7.999999999999993;
		t.y = 8.7;
		return t;
	};
	_proto._Group15_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 240;
		t.elementsContent = [this._Image58_i(),this._Image59_i(),this._Image60_i(),this._Image61_i(),this._BitmapLabel12_i()];
		return t;
	};
	_proto._Image58_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image59_i = function () {
		var t = new eui.Image();
		t.source = "icon_jjsy_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image60_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_jjsy_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._Image61_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 16;
		t.source = "icon_coin_png";
		t.width = 62;
		t.x = 305.98;
		t.y = 71.37;
		return t;
	};
	_proto._BitmapLabel12_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel12 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 225.33;
		t.x = 7.999999999999993;
		t.y = 8.7;
		return t;
	};
	_proto._Group16_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 357;
		t.elementsContent = [this._Image62_i(),this._Image63_i(),this._Image64_i(),this._Image65_i(),this._BitmapLabel13_i()];
		return t;
	};
	_proto._Image62_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image63_i = function () {
		var t = new eui.Image();
		t.source = "icon_lxsy_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image64_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_lxsy_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._Image65_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 16;
		t.source = "icon_coin_png";
		t.width = 62;
		t.x = 305.98;
		t.y = 71.37;
		return t;
	};
	_proto._BitmapLabel13_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel13 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 225.33;
		t.x = 7.999999999999993;
		t.y = 8.7;
		return t;
	};
	_proto._Group17_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 460;
		t.y = 474;
		t.elementsContent = [this._Image66_i(),this._Image67_i(),this._Image68_i(),this._Image69_i(),this._BitmapLabel14_i()];
		return t;
	};
	_proto._Image66_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,30,18,17);
		t.source = "title3_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image67_i = function () {
		var t = new eui.Image();
		t.source = "icon_ltsy_png";
		t.verticalCenter = 0.5;
		t.x = 7.33;
		return t;
	};
	_proto._Image68_i = function () {
		var t = new eui.Image();
		t.source = "yx_text_ltsy_png";
		t.verticalCenter = 0;
		t.x = 34.66;
		return t;
	};
	_proto._Image69_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 16;
		t.source = "icon_coin_png";
		t.width = 62;
		t.x = 305.98;
		t.y = 71.37;
		return t;
	};
	_proto._BitmapLabel14_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel14 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_small_fnt";
		t.height = 62.67;
		t.horizontalCenter = 109.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 225.33;
		t.x = 7.999999999999993;
		t.y = 8.7;
		return t;
	};
	_proto.dataPanelClose_i = function () {
		var t = new eui.Rect();
		this.dataPanelClose = t;
		t.anchorOffsetY = 0;
		t.bottom = 94.43000000000006;
		t.fillAlpha = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.head_i = function () {
		var t = new eui.Group();
		this.head = t;
		t.anchorOffsetY = 0;
		t.height = 210;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.headBg_i(),this._Image70_i(),this._Group19_i(),this._Group20_i(),this.openBtn_i()];
		return t;
	};
	_proto.headBg_i = function () {
		var t = new eui.Rect();
		this.headBg = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Image70_i = function () {
		var t = new eui.Image();
		t.source = "userface1_png";
		t.verticalCenter = -17.034999999999997;
		t.x = 23;
		return t;
	};
	_proto._Group19_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85;
		t.verticalCenter = -16.534999999999997;
		t.width = 386;
		t.x = 170;
		t.elementsContent = [this._Image71_i(),this._Image72_i(),this.withdrawBtn_i(),this._Label1_i()];
		return t;
	};
	_proto._Image71_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "miner_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image72_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_mining_png";
		t.verticalCenter = 0;
		t.x = -20.80000000000001;
		return t;
	};
	_proto.withdrawBtn_i = function () {
		var t = new eui.Group();
		this.withdrawBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 120.01;
		t.x = 261.66;
		t.elementsContent = [this._Image73_i(),this._Image74_i()];
		return t;
	};
	_proto._Image73_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 3.4949999999999974;
		t.source = "btn_blue_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image74_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 2.9949999999999974;
		t.source = "btn_text_tq_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 56.8;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 149.6;
		t.x = 102;
		return t;
	};
	_proto._Group20_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 82;
		t.verticalCenter = -17.034999999999997;
		t.width = 376;
		t.x = 681;
		t.elementsContent = [this._Image75_i(),this._Image76_i(),this.buyBtn_i(),this._Label2_i()];
		return t;
	};
	_proto._Image75_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "miner_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image76_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_miner_png";
		t.verticalCenter = 0;
		t.x = -29.799999999999955;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Group();
		this.buyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 120.01;
		t.x = 252.65999999999997;
		t.elementsContent = [this._Image77_i(),this._Image78_i(),this.price_i()];
		return t;
	};
	_proto._Image77_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 7.494999999999997;
		t.source = "btn_blue_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image78_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 6.994999999999997;
		t.source = "btn_text_gy_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.price_i = function () {
		var t = new eui.Label();
		this.price = t;
		t.anchorOffsetX = 0;
		t.size = 26;
		t.textAlign = "center";
		t.textColor = 0x60e2d4;
		t.width = 153;
		t.x = -7;
		t.y = 83;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 56.8;
		t.horizontalCenter = -26;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0.5;
		t.width = 166;
		return t;
	};
	_proto.openBtn_i = function () {
		var t = new eui.Image();
		this.openBtn = t;
		t.horizontalCenter = 0;
		t.rotation = 180;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line_png";
		t.x = 0;
		t.y = 210;
		return t;
	};
	return GameUI;
})(eui.Skin);generateEUI.paths['resource/eui_skins/guide/GuideHome.exml'] = window.GuideHome = (function (_super) {
	__extends(GuideHome, _super);
	function GuideHome() {
		_super.call(this);
		this.skinParts = ["modal","continue","welcome","inviteBtn","invite","registerBtn","register","buy","withdraw","info","last"];
		
		this.height = 1716;
		this.width = 1080;
		this._TweenGroup1_i();
		this.elementsContent = [this.modal_i(),this.welcome_i(),this.invite_i(),this.register_i(),this.buy_i(),this.withdraw_i(),this.info_i(),this.last_i()];
	}
	var _proto = GuideHome.prototype;

	_proto._TweenGroup1_i = function () {
		var t = new egret.tween.TweenGroup();
		return t;
	};
	_proto.modal_i = function () {
		var t = new eui.Rect();
		this.modal = t;
		t.bottom = 0;
		t.fillAlpha = 0.6;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.welcome_i = function () {
		var t = new eui.Group();
		this.welcome = t;
		t.anchorOffsetY = 0;
		t.height = 374.64;
		t.horizontalCenter = 0;
		t.verticalCenter = -10.5;
		t.width = 894;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.continue_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "bg-man_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 89.34;
		t.horizontalCenter = 166.5;
		t.lineSpacing = 15;
		t.minHeight = 100;
		t.size = 34;
		t.text = "欢迎来到幸运星，在游戏里，你可以通过雇佣矿工挖矿来获得收益。";
		t.textAlign = "left";
		t.textColor = 0xffffff;
		t.verticalCenter = 1.1800000000000068;
		t.width = 569.01;
		return t;
	};
	_proto.continue_i = function () {
		var t = new eui.Label();
		this.continue = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 33.33;
		t.size = 34;
		t.text = "点击继续";
		t.textAlign = "center";
		t.textColor = 0x66d3e5;
		t.width = 174.67;
		t.x = 519.17;
		t.y = 270.67;
		return t;
	};
	_proto.invite_i = function () {
		var t = new eui.Group();
		this.invite = t;
		t.anchorOffsetY = 0;
		t.height = 608.64;
		t.horizontalCenter = 0;
		t.verticalCenter = 542.5;
		t.visible = false;
		t.width = 894;
		t.elementsContent = [this._Image2_i(),this._Label2_i(),this.inviteBtn_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 12;
		t.source = "bg-left_png";
		t.y = 92;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 121.34;
		t.horizontalCenter = 5.5;
		t.lineSpacing = 15;
		t.minHeight = 100;
		t.size = 35;
		t.text = "首先，让我们看一下邀请人，点击这里进入“邀请界面”。";
		t.textAlign = "left";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = -84.82;
		t.width = 743.01;
		return t;
	};
	_proto.inviteBtn_i = function () {
		var t = new eui.Image();
		this.inviteBtn = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "circle_png";
		t.x = 128.7;
		t.y = 370.6099999999999;
		return t;
	};
	_proto.register_i = function () {
		var t = new eui.Group();
		this.register = t;
		t.anchorOffsetY = 0;
		t.height = 662.64;
		t.horizontalCenter = 0;
		t.verticalCenter = 67.5;
		t.visible = false;
		t.width = 894;
		t.elementsContent = [this._Image3_i(),this._Label3_i(),this.registerBtn_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "bg-left_png";
		t.verticalCenter = -50.31999999999999;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 121.34;
		t.horizontalCenter = 5.5;
		t.lineSpacing = 15;
		t.minHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 35;
		t.text = "点击“注册”，注册成功后你将会获得推荐码，将推荐码发给其他人即可。";
		t.textAlign = "left";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = -64.82;
		t.width = 743.01;
		t.x = 81;
		t.y = 201;
		return t;
	};
	_proto.registerBtn_i = function () {
		var t = new eui.Image();
		this.registerBtn = t;
		t.horizontalCenter = 0;
		t.source = "guide-register_png";
		t.y = 436;
		return t;
	};
	_proto.buy_i = function () {
		var t = new eui.Group();
		this.buy = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 662.64;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this._Image4_i(),this._Label4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.rotation = 180;
		t.source = "bg-left_png";
		t.verticalCenter = 70.68;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 69.82;
		t.horizontalCenter = 38.5;
		t.lineSpacing = 15;
		t.minHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "点击“雇佣”，即可雇佣矿工进行挖矿。";
		t.textAlign = "left";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 105.68;
		t.width = 743.01;
		t.x = 81;
		t.y = 201;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 305;
		t.source = "guide-buy_png";
		t.y = 10;
		return t;
	};
	_proto.withdraw_i = function () {
		var t = new eui.Group();
		this.withdraw = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 662.64;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this._Image6_i(),this._Label5_i(),this._Image7_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.rotation = 180;
		t.scaleX = -1;
		t.source = "bg-left_png";
		t.verticalCenter = 70.68;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 69.82;
		t.horizontalCenter = 15.5;
		t.lineSpacing = 15;
		t.minHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "点击“提取”可以将挖矿收益提取到你的账户。";
		t.textAlign = "left";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 101.68;
		t.width = 825.01;
		t.x = 81;
		t.y = 201;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "guide-withdraw_png";
		t.x = 142;
		t.y = 10.64;
		return t;
	};
	_proto.info_i = function () {
		var t = new eui.Group();
		this.info = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 662.64;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this._Image8_i(),this._Label6_i(),this._Image9_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.rotation = 180;
		t.source = "bg-left_png";
		t.verticalCenter = 70.68;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 69.82;
		t.horizontalCenter = 0;
		t.lineSpacing = 15;
		t.minHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "点击这里进入游戏详情界面。";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 101.68;
		t.width = 825.01;
		t.y = 201;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "guide-arrow_png";
		t.y = 130.64;
		return t;
	};
	_proto.last_i = function () {
		var t = new eui.Group();
		this.last = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 232.34;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.x = 20;
		t.elementsContent = [this._Image10_i(),this._Label7_i()];
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "bg-middle_png";
		t.verticalCenter = -19.17;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 69.82;
		t.horizontalCenter = 11.5;
		t.lineSpacing = 15;
		t.minHeight = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "这里可以查看挖矿的详细信息。";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = -21.17;
		t.width = 825.01;
		t.y = 201;
		return t;
	};
	return GuideHome;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/FinalBonusUI.exml'] = window.FinalBonusUI = (function (_super) {
	__extends(FinalBonusUI, _super);
	function FinalBonusUI() {
		_super.call(this);
		this.skinParts = ["closeBg","lastLucky","title"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group1_i()];
	}
	var _proto = FinalBonusUI.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1030;
		t.left = 0;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		t.elementsContent = [this._Image1_i(),this._Scroller1_i(),this.title_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "bg2_png";
		t.y = 30;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 762;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.top = 179;
		t.width = 930;
		t.viewport = this.lastLucky_i();
		return t;
	};
	_proto.lastLucky_i = function () {
		var t = new eui.Group();
		this.lastLucky = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 677.15;
		t.width = 930;
		t.x = 0;
		t.y = 36;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_zhdj_zh_png";
		t.y = 48.66;
		return t;
	};
	return FinalBonusUI;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/HelpPanel.exml'] = window.HelpPanel = (function (_super) {
	__extends(HelpPanel, _super);
	function HelpPanel() {
		_super.call(this);
		this.skinParts = ["closeBg","layoutGroup"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_1"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_2"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_3"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_4"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_5"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_6"],[0],this._Label6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_7"],[0],this._Label7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_8"],[0],this._Label8,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_9"],[0],this._Label9,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_10"],[0],this._Label10,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_11"],[0],this._Label11,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.help_text_12"],[0],this._Label12,"text");
	}
	var _proto = HelpPanel.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1030;
		t.left = 0;
		t.right = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 31;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_text_faq_zh_png";
		t.x = 310.00000000000006;
		t.y = 50.19999999999999;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 795.45;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(36,31,13,15);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "list_item_bg_png";
		t.width = 930;
		t.x = 75;
		t.y = 164.80000000000007;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 748.37;
		t.horizontalCenter = -0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.width = 900;
		t.x = 105;
		t.y = 185.29999999999995;
		t.viewport = this.layoutGroup_i();
		return t;
	};
	_proto.layoutGroup_i = function () {
		var t = new eui.Group();
		this.layoutGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 738.37;
		t.width = 849.22;
		t.x = 0;
		t.y = -152;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this._Label6_i(),this._Label7_i(),this._Label8_i(),this._Label9_i(),this._Label10_i(),this._Label11_i(),this._Label12_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.bottom = 696.37;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 394.22;
		t.size = 44;
		t.textColor = 0x6ee2f3;
		t.top = 8;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 616.37;
		t.left = 0;
		t.lineSpacing = 15;
		t.maxWidth = 900;
		t.right = 182.22000000000003;
		t.size = 40;
		t.textColor = 0xecfcff;
		t.top = 78;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.bold = true;
		t.left = 0;
		t.lineSpacing = 15;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0x6ee2f3;
		t.width = 760;
		t.y = 128;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 15;
		t.maxWidth = 900;
		t.size = 40;
		t.textColor = 0xecfcff;
		t.y = 198;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0x6ee2f3;
		t.width = 760;
		t.y = 260;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 15;
		t.maxWidth = 900;
		t.right = 0.22000000000002728;
		t.size = 40;
		t.textColor = 0xecfcff;
		t.y = 328;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0x6ee2f3;
		t.width = 760;
		t.y = 382;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		this._Label8 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 15;
		t.maxWidth = 900;
		t.right = 0.22000000000002728;
		t.size = 40;
		t.textColor = 0xecfcff;
		t.y = 460;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0x6ee2f3;
		t.width = 760;
		t.y = 508.66;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		this._Label10 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 15;
		t.maxWidth = 900;
		t.right = 0.22000000000002728;
		t.size = 40;
		t.textColor = 0xecfcff;
		t.y = 575.33;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		this._Label11 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0x6ee2f3;
		t.width = 760;
		t.y = 628.65;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		this._Label12 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 15;
		t.maxWidth = 900;
		t.right = 0.22000000000002728;
		t.size = 40;
		t.textColor = 0xecfcff;
		t.y = 695.33;
		return t;
	};
	return HelpPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/LanguagePanel.exml'] = window.LanguageUI = (function (_super) {
	__extends(LanguageUI, _super);
	function LanguageUI() {
		_super.call(this);
		this.skinParts = ["closeBg","langZHTW_choosed","langZHTW","langEN_choosed","langEN","title"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group1_i()];
	}
	var _proto = LanguageUI.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1030;
		t.left = 0;
		t.right = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		t.elementsContent = [this._Image1_i(),this.langZHTW_i(),this.langEN_i(),this.title_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "bg2_png";
		t.y = 30;
		return t;
	};
	_proto.langZHTW_i = function () {
		var t = new eui.Group();
		this.langZHTW = t;
		t.anchorOffsetX = 0;
		t.height = 150;
		t.horizontalCenter = 0;
		t.width = 930;
		t.y = 238.3;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.langZHTW_choosed_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 177;
		t.left = 0;
		t.right = 0;
		t.source = "list_item_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "yuyan_text_chin_png";
		t.verticalCenter = 0;
		t.x = 40.22;
		return t;
	};
	_proto.langZHTW_choosed_i = function () {
		var t = new eui.Image();
		this.langZHTW_choosed = t;
		t.right = 109;
		t.source = "icon_ok_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langEN_i = function () {
		var t = new eui.Group();
		this.langEN = t;
		t.anchorOffsetX = 0;
		t.height = 150;
		t.horizontalCenter = 2;
		t.visible = false;
		t.width = 930;
		t.y = 452.25;
		t.elementsContent = [this._Image4_i(),this.langEN_choosed_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "list_item_bg_png";
		t.top = 0;
		return t;
	};
	_proto.langEN_choosed_i = function () {
		var t = new eui.Image();
		this.langEN_choosed = t;
		t.source = "icon_ok_png";
		t.verticalCenter = 0;
		t.x = 725;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.source = "yuyan_text_zh_png";
		t.y = 48.66;
		return t;
	};
	return LanguageUI;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/LoadingPanel.exml'] = window.LoadingPanel = (function (_super) {
	__extends(LoadingPanel, _super);
	function LoadingPanel() {
		_super.call(this);
		this.skinParts = ["loop","modal","icon"];
		
		this.height = 1716;
		this.width = 1080;
		this.loop_i();
		this.elementsContent = [this.modal_i(),this.icon_i(),this._Label1_i()];
		
		eui.Binding.$bindProperties(this, ["icon"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"rotation");
		eui.Binding.$bindProperties(this, [360],[],this._Object2,"rotation");
		eui.Binding.$bindProperties(this, ["hostComponent.data.msg"],[0],this._Label1,"text");
	}
	var _proto = LoadingPanel.prototype;

	_proto.loop_i = function () {
		var t = new egret.tween.TweenGroup();
		this.loop = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.modal_i = function () {
		var t = new eui.Rect();
		this.modal = t;
		t.bottom = 0;
		t.fillAlpha = 0.7;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "loading_png";
		t.verticalCenter = -132;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = 0;
		t.textColor = 0x83f9d7;
		t.y = 817.33;
		return t;
	};
	return LoadingPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/LuckyPanel.exml'] = window.LuckyPanel = (function (_super) {
	__extends(LuckyPanel, _super);
	function LuckyPanel() {
		_super.call(this);
		this.skinParts = ["closeBg","title","tabBg1","tabAct1","tab1","tabBg2","tabAct2","tab2","overtimeImg","potImg","luckyTab","lastLuckyInfo","lastLucky"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group4_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.drainTime"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.pot"],[0],this._BitmapLabel2,"text");
	}
	var _proto = LuckyPanel.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.strokeAlpha = 0.5;
		t.top = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1030;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		t.elementsContent = [this._Image1_i(),this.title_i(),this._Group1_i(),this.luckyTab_i(),this.lastLucky_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_text_xyj_png";
		t.y = 46.79;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 108;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 816;
		t.y = 163.29;
		t.elementsContent = [this.tab1_i(),this.tab2_i()];
		return t;
	};
	_proto.tab1_i = function () {
		var t = new eui.Group();
		this.tab1 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.left = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 500;
		t.elementsContent = [this.tabBg1_i(),this.tabAct1_i()];
		return t;
	};
	_proto.tabBg1_i = function () {
		var t = new eui.Image();
		this.tabBg1 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_bg_xz2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct1_i = function () {
		var t = new eui.Image();
		this.tabAct1 = t;
		t.horizontalCenter = 0;
		t.source = "title_text_xykc1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tab2_i = function () {
		var t = new eui.Group();
		this.tab2 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.right = 1;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 500;
		t.elementsContent = [this.tabBg2_i(),this.tabAct2_i()];
		return t;
	};
	_proto.tabBg2_i = function () {
		var t = new eui.Image();
		this.tabBg2 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_bg2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct2_i = function () {
		var t = new eui.Image();
		this.tabAct2 = t;
		t.horizontalCenter = 0;
		t.source = "title_text_xyph_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.luckyTab_i = function () {
		var t = new eui.Group();
		this.luckyTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 674;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.x = 122;
		t.y = 305;
		t.elementsContent = [this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 25.2;
		t.elementsContent = [this._Image2_i(),this.overtimeImg_i(),this._BitmapLabel1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg3_png";
		t.top = 0;
		return t;
	};
	_proto.overtimeImg_i = function () {
		var t = new eui.Image();
		this.overtimeImg = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_djs_zh_png";
		t.y = 26.86;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "gold_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 636;
		t.y = 110.12;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 316.42;
		t.elementsContent = [this._Image3_i(),this.potImg_i(),this._BitmapLabel2_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg3_png";
		t.top = 0;
		return t;
	};
	_proto.potImg_i = function () {
		var t = new eui.Image();
		this.potImg = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_xykc_zh_png";
		t.y = 27.94;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "orange_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.y = 95.2;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 25;
		t.horizontalCenter = 0;
		t.source = "icon_coin_png";
		t.width = 92;
		t.y = 169.87;
		return t;
	};
	_proto.lastLucky_i = function () {
		var t = new eui.Group();
		this.lastLucky = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 674;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 930;
		t.y = 305;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 662;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.top = 0;
		t.x = 0;
		t.viewport = this.lastLuckyInfo_i();
		return t;
	};
	_proto.lastLuckyInfo_i = function () {
		var t = new eui.Group();
		this.lastLuckyInfo = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 642;
		t.width = 836;
		t.x = 0;
		t.y = 36;
		return t;
	};
	return LuckyPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/RegisterPanel.exml'] = window.RegisterPanel = (function (_super) {
	__extends(RegisterPanel, _super);
	function RegisterPanel() {
		_super.call(this);
		this.skinParts = ["closeBg","title","registerBtn","registerGroup","copyBtn","linkGroup"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_2"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_3"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_4"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_5"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.link"],[0],this._Label6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.idUrl"],[0],this._Label7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.myInviter"],[0],this._Label9,"text");
	}
	var _proto = RegisterPanel.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.55;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.strokeAlpha = 0.5;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1030;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		t.elementsContent = [this._Image1_i(),this.title_i(),this.registerGroup_i(),this.linkGroup_i(),this._Label8_i(),this._Label9_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_text_referee_zh_png";
		t.y = 48.79;
		return t;
	};
	_proto.registerGroup_i = function () {
		var t = new eui.Group();
		this.registerGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 794.91;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 882;
		t.x = 98.00000000000001;
		t.y = 161.53;
		t.elementsContent = [this._Image2_i(),this.registerBtn_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 794.24;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(36,31,13,15);
		t.source = "list_item_bg_png";
		t.width = 864.85;
		t.y = -1.06;
		return t;
	};
	_proto.registerBtn_i = function () {
		var t = new eui.Group();
		this.registerBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 546.06;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Label1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_red_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "btn_text_zc_zh_png";
		t.verticalCenter = -5.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35.33;
		t.horizontalCenter = 0.5;
		t.size = 26;
		t.text = "0.02 MOAC";
		t.textAlign = "center";
		t.textColor = 0xf9f48f;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 144.67;
		t.y = 120;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.textColor = 0xecfcff;
		t.top = 101;
		t.width = 780.37;
		t.x = 52;
		t.y = 141;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.textColor = 0xecfcff;
		t.top = 161;
		t.width = 780.37;
		t.x = 52;
		t.y = 201;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.textColor = 0xecfcff;
		t.top = 265;
		t.width = 780.37;
		t.x = 52;
		t.y = 305;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.textColor = 0xecfcff;
		t.top = 363;
		t.width = 780.37;
		t.x = 52;
		t.y = 403;
		return t;
	};
	_proto.linkGroup_i = function () {
		var t = new eui.Group();
		this.linkGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 762;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 882;
		t.x = 98.00000000000001;
		t.y = 169.83;
		t.elementsContent = [this._Image5_i(),this._Label6_i(),this._Label7_i(),this.copyBtn_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 150;
		t.horizontalCenter = 0;
		t.source = "list_item_bg_png";
		t.width = 930;
		t.y = 158.5;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.bold = true;
		t.fontFamily = "MicrosoftYaHei-Bold";
		t.size = 50;
		t.textColor = 0xecfcff;
		t.x = 71;
		t.y = 210;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 167.5;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 60;
		t.textColor = 0xecfcff;
		t.width = 449.37;
		t.x = 52;
		t.y = 206;
		return t;
	};
	_proto.copyBtn_i = function () {
		var t = new eui.Group();
		this.copyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 466;
		t.elementsContent = [this._Image6_i(),this._Image7_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_red_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "btn_text_copy_zh_png";
		t.verticalCenter = -3.5;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.text = "我的推荐人：";
		t.x = 136.62;
		t.y = 857;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.anchorOffsetX = 0;
		t.width = 598.33;
		t.x = 328.62;
		t.y = 856.33;
		return t;
	};
	return RegisterPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/StatisticsPanel.exml'] = window.StatisticsPanel = (function (_super) {
	__extends(StatisticsPanel, _super);
	function StatisticsPanel() {
		_super.call(this);
		this.skinParts = ["closeBg","title","overtimeImg","potImg","roundTab","listNum","totalInvestment","totalBuyTimes","myBuyTimes","myOutTimes","statsTab","teamTabScr","teamsTab","tabBg1","tabAct1","tab1","tabBg2","tabAct2","tab2","tabBg3","tabAct3","tab3"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group10_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.drainTime"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.activePot"],[0],this._BitmapLabel2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.currentNum"],[0],this._BitmapLabel3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.rewards"],[0],this._BitmapLabel4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.totalBuyTimes"],[0],this._BitmapLabel5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.myReinvest"],[0],this._BitmapLabel6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.myOutTimes"],[0],this._BitmapLabel7,"text");
	}
	var _proto = StatisticsPanel.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.85;
		t.fillColor = 0x050e21;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1030;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.title_i(),this.roundTab_i(),this.statsTab_i(),this.teamsTab_i(),this._Group9_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_strategy_zh_png";
		t.y = 46.88;
		return t;
	};
	_proto.roundTab_i = function () {
		var t = new eui.Group();
		this.roundTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 695;
		t.horizontalCenter = 0;
		t.width = 930;
		t.y = 263;
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = -0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 60;
		t.elementsContent = [this._Image2_i(),this.overtimeImg_i(),this._BitmapLabel1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.overtimeImg_i = function () {
		var t = new eui.Image();
		this.overtimeImg = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_djs_zh_png";
		t.y = 12.52;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "gold_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.x = 243.00000000000006;
		t.y = 119.57;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 360;
		t.elementsContent = [this._Image3_i(),this.potImg_i(),this._Image4_i(),this._BitmapLabel2_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.potImg_i = function () {
		var t = new eui.Image();
		this.potImg = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_text_zhdjjc_zh_png";
		t.y = 12.03;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 25;
		t.horizontalCenter = 0;
		t.source = "icon_coin_png";
		t.width = 92;
		t.y = 179.76;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "orange_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.x = 243.00000000000006;
		t.y = 90.88;
		return t;
	};
	_proto.statsTab_i = function () {
		var t = new eui.Group();
		this.statsTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 695;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 930;
		t.y = 263;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -28;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.top = 28;
		t.width = 960;
		t.viewport = this._Group8_i();
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 777.21;
		t.width = 230;
		t.y = 24;
		t.elementsContent = [this._Group3_i(),this._Group4_i(),this._Group5_i(),this._Group6_i(),this._Group7_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 32;
		t.elementsContent = [this._Image5_i(),this.listNum_i(),this._BitmapLabel3_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.listNum_i = function () {
		var t = new eui.Image();
		this.listNum = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_text_cjxh_png";
		t.y = 12.52;
		return t;
	};
	_proto._BitmapLabel3_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_big_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.x = 243.00000000000006;
		t.y = 119.57;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 332;
		t.elementsContent = [this._Image6_i(),this.totalInvestment_i(),this._BitmapLabel4_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.totalInvestment_i = function () {
		var t = new eui.Image();
		this.totalInvestment = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_ti_zh_png";
		t.y = 12.52;
		return t;
	};
	_proto._BitmapLabel4_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "orange_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.x = 243.00000000000006;
		t.y = 119.57;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 632;
		t.elementsContent = [this._Image7_i(),this.totalBuyTimes_i(),this._BitmapLabel5_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.totalBuyTimes_i = function () {
		var t = new eui.Image();
		this.totalBuyTimes = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_ztd_zh_png";
		t.y = 12.52;
		return t;
	};
	_proto._BitmapLabel5_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_big_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.x = 243.00000000000006;
		t.y = 119.57;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 932;
		t.elementsContent = [this._Image8_i(),this.myBuyTimes_i(),this._BitmapLabel6_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.myBuyTimes_i = function () {
		var t = new eui.Image();
		this.myBuyTimes = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_wdtds_zh_png";
		t.y = 12.52;
		return t;
	};
	_proto._BitmapLabel6_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_big_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.x = 243.00000000000006;
		t.y = 119.57;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 225;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 930;
		t.y = 1232;
		t.elementsContent = [this._Image9_i(),this.myOutTimes_i(),this._BitmapLabel7_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.myOutTimes_i = function () {
		var t = new eui.Image();
		this.myOutTimes = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_wdcjs_zh_png";
		t.y = 12.52;
		return t;
	};
	_proto._BitmapLabel7_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel7 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_big_fnt";
		t.height = 74.67;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 444;
		t.x = 243.00000000000006;
		t.y = 119.57;
		return t;
	};
	_proto.teamsTab_i = function () {
		var t = new eui.Group();
		this.teamsTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 695;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 930;
		t.y = 263;
		t.elementsContent = [this._Scroller2_i()];
		return t;
	};
	_proto._Scroller2_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -11;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.top = 34;
		t.viewport = this.teamTabScr_i();
		return t;
	};
	_proto.teamTabScr_i = function () {
		var t = new eui.Group();
		this.teamTabScr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 852;
		t.width = 850;
		t.x = 38;
		t.y = 0;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 108;
		t.horizontalCenter = 0;
		t.width = 930;
		t.y = 165.18;
		t.elementsContent = [this.tab1_i(),this.tab2_i(),this.tab3_i()];
		return t;
	};
	_proto.tab1_i = function () {
		var t = new eui.Group();
		this.tab1 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.left = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 314;
		t.elementsContent = [this.tabBg1_i(),this.tabAct1_i()];
		return t;
	};
	_proto.tabBg1_i = function () {
		var t = new eui.Image();
		this.tabBg1 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_stats_bg_xz_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct1_i = function () {
		var t = new eui.Image();
		this.tabAct1 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_text_round1_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tab2_i = function () {
		var t = new eui.Group();
		this.tab2 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.horizontalCenter = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 314;
		t.elementsContent = [this.tabBg2_i(),this.tabAct2_i()];
		return t;
	};
	_proto.tabBg2_i = function () {
		var t = new eui.Image();
		this.tabBg2 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct2_i = function () {
		var t = new eui.Image();
		this.tabAct2 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_text_stats_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tab3_i = function () {
		var t = new eui.Group();
		this.tab3 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.right = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 314;
		t.elementsContent = [this.tabBg3_i(),this.tabAct3_i()];
		return t;
	};
	_proto.tabBg3_i = function () {
		var t = new eui.Image();
		this.tabBg3 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct3_i = function () {
		var t = new eui.Image();
		this.tabAct3 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_text_teams_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	return StatisticsPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/unit/ListUnit.exml'] = window.ListUnit = (function (_super) {
	__extends(ListUnit, _super);
	function ListUnit() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 150;
		this.width = 930;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._BitmapLabel1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.num"],[0],this._BitmapLabel1,"text");
	}
	var _proto = ListUnit.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 114;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(36,31,13,15);
		t.source = "list_item_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "bg_mysort_png";
		t.verticalCenter = 0;
		t.x = 56;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "statistics_text_wdxh_png";
		t.verticalCenter = 0.5;
		t.x = 68.33;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "green_big_fnt";
		t.height = 101.33;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 392;
		t.x = 489;
		return t;
	};
	return ListUnit;
})(eui.Skin);generateEUI.paths['resource/eui_skins/unit/LuckyUnit.exml'] = window.LuckyUnit = (function (_super) {
	__extends(LuckyUnit, _super);
	function LuckyUnit() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 220.67;
		this.width = 930;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._BitmapLabel1_i(),this._Label1_i(),this._Image3_i(),this._BitmapLabel2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.index"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.address"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.extractCoin1"],[0],this._BitmapLabel2,"text");
	}
	var _proto = LuckyUnit.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 180;
		t.left = 0;
		t.right = 0;
		t.source = "title2_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "bg_rank_png";
		t.verticalCenter = 0;
		t.x = 33;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "white_fnt";
		t.height = 56.36;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 117.88;
		t.x = 13.34;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = -89;
		t.size = 30;
		t.textAlign = "left";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		t.width = 400;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 19;
		t.source = "icon_coin_png";
		t.verticalCenter = 48.5;
		t.width = 74;
		t.x = 725.28;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "orange_fnt";
		t.height = 56.36;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 324.54;
		t.x = 600.01;
		return t;
	};
	return LuckyUnit;
})(eui.Skin);