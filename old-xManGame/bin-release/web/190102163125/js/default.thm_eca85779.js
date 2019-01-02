
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
                generateEUI.skins = {};generateEUI.paths['resource/eui_modules/Game/BuyKeyModal.exml'] = window.BuyKeyModal = (function (_super) {
	__extends(BuyKeyModal, _super);
	function BuyKeyModal() {
		_super.call(this);
		this.skinParts = ["closeModal","totalTitle","inputText","minuInput","addInput","buyBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeModal_i(),this._Group2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.myAllBuy"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.input"],[0],this.inputText,"text");
	}
	var _proto = BuyKeyModal.prototype;

	_proto.closeModal_i = function () {
		var t = new eui.Rect();
		this.closeModal = t;
		t.bottom = 0;
		t.fillAlpha = 0.7;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 1054;
		t.horizontalCenter = 0;
		t.width = 1040;
		t.y = 662;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.totalTitle_i(),this._BitmapLabel1_i(),this._Group1_i(),this.buyBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yltq_ditu_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "yltq_title_png";
		t.x = 258;
		t.y = -77.27;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gmys_text_zh_png";
		t.y = -71.23;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 8;
		t.source = "statistics_ditu_green_png";
		t.visible = false;
		t.y = 40.01;
		return t;
	};
	_proto.totalTitle_i = function () {
		var t = new eui.Image();
		this.totalTitle = t;
		t.horizontalCenter = 0;
		t.source = "gmys_text_yys_zh_png";
		t.visible = false;
		t.y = 63.48;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 810;
		t.font = "game_modal_num_100_fnt";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.top = 149;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 548.73;
		t.y = -164.41999999999996;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 236;
		t.horizontalCenter = 0;
		t.width = 988;
		t.y = 362;
		t.elementsContent = [this._Image5_i(),this.inputText_i(),this.minuInput_i(),this.addInput_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 142;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "input_png";
		t.verticalCenter = 6;
		t.width = 528.48;
		return t;
	};
	_proto.inputText_i = function () {
		var t = new eui.EditableText();
		this.inputText = t;
		t.anchorOffsetX = 0;
		t.bottom = "0";
		t.horizontalCenter = "0";
		t.size = 64;
		t.textAlign = "center";
		t.textColor = 0xFFFD68;
		t.top = "0";
		t.verticalAlign = "middle";
		t.width = 590.92;
		return t;
	};
	_proto.minuInput_i = function () {
		var t = new eui.Image();
		this.minuInput = t;
		t.source = "btn_sub_png";
		t.verticalCenter = 0;
		t.x = 92.3;
		return t;
	};
	_proto.addInput_i = function () {
		var t = new eui.Image();
		this.addInput = t;
		t.source = "btn_add_png";
		t.verticalCenter = 0;
		t.x = 776.66;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Group();
		this.buyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 126;
		t.horizontalCenter = 0;
		t.width = 438;
		t.y = 703.33;
		t.elementsContent = [this._Image6_i(),this._Image7_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_gmys_png";
		t.y = -1;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "btn_text_gmyc_zh_png";
		t.y = 29;
		return t;
	};
	return BuyKeyModal;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/ExtractUI.exml'] = window.ExtractUI = (function (_super) {
	__extends(ExtractUI, _super);
	function ExtractUI() {
		_super.call(this);
		this.skinParts = ["modal","langTitleImg","close","langFenHong","langTuiJian","langTotal","langExtractBtn","drawBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group7_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.scam"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.advice"],[0],this._BitmapLabel2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.total"],[0],this._BitmapLabel3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.tatalUSD"],[0],this._Label1,"text");
	}
	var _proto = ExtractUI.prototype;

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
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.height = 1054;
		t.left = 0;
		t.right = 0;
		t.width = 1080;
		t.y = 1716;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.langTitleImg_i(),this.close_i(),this._Group2_i(),this._Group4_i(),this._Group6_i(),this.drawBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "yltq_ditu_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yltq_title_png";
		t.y = -82.57;
		return t;
	};
	_proto.langTitleImg_i = function () {
		var t = new eui.Image();
		this.langTitleImg = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_yltq_zh_png";
		t.y = -74.65;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_close_png";
		t.visible = false;
		t.x = 900;
		t.y = -25;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 177;
		t.horizontalCenter = 0;
		t.width = 1030;
		t.y = 63;
		t.elementsContent = [this._Image3_i(),this.langFenHong_i(),this._Group1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langFenHong_i = function () {
		var t = new eui.Image();
		this.langFenHong = t;
		t.horizontalCenter = 0.5;
		t.source = "yltq_text_zh_bb_png";
		t.y = -9;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 6;
		t.top = 69;
		t.width = 728;
		t.x = 152;
		t.elementsContent = [this._BitmapLabel1_i()];
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.font = "game_modal_num_100_fnt";
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.top = 0;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 177;
		t.horizontalCenter = 0;
		t.width = 1030;
		t.y = 327;
		t.elementsContent = [this._Image4_i(),this.langTuiJian_i(),this._Group3_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langTuiJian_i = function () {
		var t = new eui.Image();
		this.langTuiJian = t;
		t.horizontalCenter = 0.5;
		t.source = "yltq_text_zh_ra_png";
		t.y = -7;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 4;
		t.horizontalCenter = 0;
		t.top = 73;
		t.width = 698;
		t.elementsContent = [this._BitmapLabel2_i()];
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.font = "game_modal_num_100_fnt";
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.top = 0;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.width = 1030;
		t.y = 609;
		t.elementsContent = [this._Image5_i(),this.langTotal_i(),this._Group5_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_blue2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langTotal_i = function () {
		var t = new eui.Image();
		this.langTotal = t;
		t.horizontalCenter = 0.5;
		t.source = "yltq_text_zh_tg_png";
		t.y = -27;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 97;
		t.top = 41;
		t.width = 704;
		t.x = 176;
		t.elementsContent = [this._BitmapLabel3_i(),this._Label1_i()];
		return t;
	};
	_proto._BitmapLabel3_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.font = "game_modal_num_100_fnt";
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.top = 0;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = 0;
		t.size = 38;
		t.textAlign = "right";
		t.y = 96;
		return t;
	};
	_proto.drawBtn_i = function () {
		var t = new eui.Group();
		this.drawBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 122.13;
		t.horizontalCenter = 0;
		t.width = 484.85;
		t.y = 870.72;
		t.elementsContent = [this._Image6_i(),this.langExtractBtn_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -0.42500000000001137;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_tjrzc_register_png";
		t.x = 31.999999999999943;
		t.y = 0;
		return t;
	};
	_proto.langExtractBtn_i = function () {
		var t = new eui.Image();
		this.langExtractBtn = t;
		t.horizontalCenter = -0.42500000000001137;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_text_tq_zh_png";
		t.x = 200.99999999999994;
		t.y = 16.07;
		return t;
	};
	return ExtractUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/ExtractUnit.exml'] = window.ExtractUnit = (function (_super) {
	__extends(ExtractUnit, _super);
	function ExtractUnit() {
		_super.call(this);
		this.skinParts = ["carLine","wheelL","wheelR","carGroup"];
		
		this.height = 280;
		this.width = 970;
		this.elementsContent = [this._Image1_i(),this._BitmapLabel1_i(),this._Image2_i(),this._Image3_i(),this._BitmapLabel2_i(),this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.extractNum"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.extractCoin1"],[0],this._BitmapLabel2,"text");
	}
	var _proto = ExtractUnit.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "car_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "game_modal_num_100_fnt";
		t.height = 86.06;
		t.horizontalCenter = -126;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "left";
		t.verticalCenter = -47;
		t.width = 223.57;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "statistics_text_syxh_png";
		t.x = 50.78;
		t.y = 57.81;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "statistics_text_syje_png";
		t.x = 491.97;
		t.y = 57.81;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "game_modal_num_100_fnt";
		t.height = 89.09;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "left";
		t.width = 249.33;
		t.x = 688.51;
		t.y = 49.71;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 56;
		t.horizontalCenter = 0;
		t.maxWidth = 903.99;
		t.scrollEnabled = true;
		t.width = 903.99;
		t.y = 190.32;
		t.elementsContent = [this.carLine_i(),this.carGroup_i()];
		return t;
	};
	_proto.carLine_i = function () {
		var t = new eui.Image();
		this.carLine = t;
		t.left = 0;
		t.source = "car_line_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.carGroup_i = function () {
		var t = new eui.Group();
		this.carGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 53.34;
		t.width = 185.33;
		t.x = 126;
		t.y = 1.33;
		t.elementsContent = [this._Image4_i(),this.wheelL_i(),this.wheelR_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "car_png";
		t.verticalCenter = -7.5;
		t.y = -10.330000000000013;
		return t;
	};
	_proto.wheelL_i = function () {
		var t = new eui.Image();
		this.wheelL = t;
		t.anchorOffsetX = 14;
		t.anchorOffsetY = 14;
		t.source = "car_front_wheel_png";
		t.x = 147.55;
		t.y = 20.2;
		return t;
	};
	_proto.wheelR_i = function () {
		var t = new eui.Image();
		this.wheelR = t;
		t.anchorOffsetX = 16;
		t.anchorOffsetY = 16;
		t.source = "car_rear_wheel_png";
		t.x = 32.72;
		t.y = 19.28;
		return t;
	};
	return ExtractUnit;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameAlertUI.exml'] = window.GameAlertUI = (function (_super) {
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
		t.fillAlpha = 0.7;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 491;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 894;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i(),this.submitBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "tips_ditu_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "tips_text_en_png";
		t.visible = false;
		t.y = 60;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -5.5;
		t.minHeight = 100;
		t.size = 50;
		t.textAlign = "center";
		t.verticalCenter = -55.5;
		t.width = 765;
		return t;
	};
	_proto.submitBtn_i = function () {
		var t = new eui.Group();
		this.submitBtn = t;
		t.height = 104;
		t.horizontalCenter = 0;
		t.width = 370;
		t.y = 328;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_tjrzc_register_png";
		t.width = 370;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "tips_text_ok_zh_png";
		t.x = 133;
		t.y = 9;
		return t;
	};
	return GameAlertUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameHelpUI.exml'] = window.GameHelpUi = (function (_super) {
	__extends(GameHelpUi, _super);
	function GameHelpUi() {
		_super.call(this);
		this.skinParts = ["modal","langTitleImg","close","layoutGroup"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group1_i()];
		
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
	var _proto = GameHelpUi.prototype;

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
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1054;
		t.left = 0;
		t.right = 0;
		t.width = 1080;
		t.y = 1716;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.langTitleImg_i(),this.close_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = -2;
		t.source = "yltq_ditu_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yltq_title_png";
		t.y = -88;
		return t;
	};
	_proto.langTitleImg_i = function () {
		var t = new eui.Image();
		this.langTitleImg = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_strategy_zh_png";
		t.y = -88;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_close_png";
		t.visible = false;
		t.x = 900;
		t.y = -25;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 966;
		t.horizontalCenter = 0;
		t.width = 900;
		t.y = 4;
		t.viewport = this.layoutGroup_i();
		return t;
	};
	_proto.layoutGroup_i = function () {
		var t = new eui.Group();
		this.layoutGroup = t;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this._Label6_i(),this._Label7_i(),this._Label8_i(),this._Label9_i(),this._Label10_i(),this._Label11_i(),this._Label12_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 20;
		t.size = 44;
		t.textColor = 0xfffd68;
		t.top = 3;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.size = 40;
		t.textColor = 0xffffff;
		t.y = 3.03;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0xFFFD68;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.size = 40;
		t.textColor = 0xFFFFFF;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0xFFFD68;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.size = 40;
		t.textColor = 0xFFFFFF;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0xFFFD68;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		this._Label8 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.size = 40;
		t.textColor = 0xFFFFFF;
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0xFFFD68;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		this._Label10 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.size = 40;
		t.textColor = 0xFFFFFF;
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		this._Label11 = t;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0xFFFD68;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		this._Label12 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.size = 40;
		t.textColor = 0xFFFFFF;
		t.x = 30;
		t.y = 30;
		return t;
	};
	return GameHelpUi;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameStatisticsUI.exml'] = window.GameStatisticsUI = (function (_super) {
	__extends(GameStatisticsUI, _super);
	function GameStatisticsUI() {
		_super.call(this);
		this.skinParts = ["modal","close","langRoundTime","langJackPot","langMyKeys0","roundTab","totalInvestment","totalInvestment0","totalTime","statsTab","teamTabScr","teamsTab","tabBg1","tabAct1","tabActEn1","tab1","tabBg2","tabAct2","tabActEn2","tab2","tabBg3","tabAct3","tabActEn3","tab3","langTitleImg"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group14_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.drainTime"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.activePot"],[0],this._BitmapLabel2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.usdt"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.firstBonus"],[0],this._BitmapLabel3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.secondBonus"],[0],this._BitmapLabel4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.totalInvested"],[0],this._BitmapLabel5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.totalUSTD"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.rewards"],[0],this._BitmapLabel6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.rewardsUSTD"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.rcmdid"],[0],this._BitmapLabel7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this._Label6,"text");
	}
	var _proto = GameStatisticsUI.prototype;

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
	_proto._Group14_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1169.16;
		t.horizontalCenter = 0;
		t.y = 1716;
		t.elementsContent = [this._Image1_i(),this.close_i(),this.roundTab_i(),this.statsTab_i(),this.teamsTab_i(),this._Group13_i(),this._Image10_i(),this.langTitleImg_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yltq_ditu_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_close_png";
		t.visible = false;
		t.x = 900;
		t.y = -25;
		return t;
	};
	_proto.roundTab_i = function () {
		var t = new eui.Group();
		this.roundTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 836;
		t.width = 1030;
		t.x = 25;
		t.y = 255;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 850;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.width = 1012.12;
		t.y = 1.61;
		t.viewport = this._Group6_i();
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 207.58;
		t.elementsContent = [this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 257;
		t.horizontalCenter = -0.060000000000002274;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.y = -7;
		t.elementsContent = [this._Image2_i(),this.langRoundTime_i(),this._Group1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langRoundTime_i = function () {
		var t = new eui.Image();
		this.langRoundTime = t;
		t.horizontalCenter = 0;
		t.source = "statistics_text_cwdi_zh_png";
		t.y = 28;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 60;
		t.left = 0;
		t.right = 0;
		t.y = 124;
		t.elementsContent = [this._BitmapLabel1_i()];
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.font = "game_modal_num_100_fnt";
		t.height = 60;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.y = 8.08;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = -0.060000000000002274;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.y = 281;
		t.elementsContent = [this._Image3_i(),this.langJackPot_i(),this._BitmapLabel2_i(),this._Label1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langJackPot_i = function () {
		var t = new eui.Image();
		this.langJackPot = t;
		t.horizontalCenter = 0;
		t.source = "activepot_zh_png";
		t.y = 12.56;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.font = "game_modal_num_100_fnt";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalCenter = 36;
		t.width = 608;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.size = 38;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 400;
		t.x = 317;
		t.y = 150;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = -0.060000000000002274;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 1030;
		t.y = 546;
		t.elementsContent = [this._Image4_i(),this._BitmapLabel3_i(),this._Image5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 2;
		return t;
	};
	_proto._BitmapLabel3_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel3 = t;
		t.font = "game_modal_num_100_fnt";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.y = 106;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "statistics_text_1_zh_png";
		t.y = 9;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = -0.060000000000002274;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 1030;
		t.y = 812;
		t.elementsContent = [this._Image6_i(),this.langMyKeys0_i(),this._BitmapLabel4_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 2;
		return t;
	};
	_proto.langMyKeys0_i = function () {
		var t = new eui.Image();
		this.langMyKeys0 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_text_2_zh_png";
		t.y = 8.5;
		return t;
	};
	_proto._BitmapLabel4_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel4 = t;
		t.font = "game_modal_num_100_fnt";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.y = 106;
		return t;
	};
	_proto.statsTab_i = function () {
		var t = new eui.Group();
		this.statsTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 794;
		t.visible = false;
		t.width = 1030;
		t.x = 25;
		t.y = 255;
		t.elementsContent = [this._Group8_i(),this._Group10_i(),this._Group12_i()];
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.x = 0;
		t.y = 24;
		t.elementsContent = [this._Image7_i(),this.totalInvestment_i(),this._Group7_i(),this._Label2_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.totalInvestment_i = function () {
		var t = new eui.Image();
		this.totalInvestment = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_text_ti_zh_png";
		t.y = 11;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 60;
		t.horizontalCenter = 0;
		t.width = 758;
		t.y = 92;
		t.elementsContent = [this._BitmapLabel5_i()];
		return t;
	};
	_proto._BitmapLabel5_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel5 = t;
		t.anchorOffsetX = 0;
		t.font = "game_modal_num_100_fnt";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalCenter = 20;
		t.width = 742;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 44;
		t.horizontalCenter = 0;
		t.size = 38;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 584;
		t.y = 150;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.x = 0;
		t.y = 278.42;
		t.elementsContent = [this._Image8_i(),this.totalInvestment0_i(),this._Group9_i(),this._Label3_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.totalInvestment0_i = function () {
		var t = new eui.Image();
		this.totalInvestment0 = t;
		t.horizontalCenter = 0.5;
		t.source = "statistics_stats_text_dr_zh_png";
		t.y = 9;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 60;
		t.horizontalCenter = 0;
		t.width = 770;
		t.y = 88;
		t.elementsContent = [this._BitmapLabel6_i()];
		return t;
	};
	_proto._BitmapLabel6_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel6 = t;
		t.anchorOffsetX = 0;
		t.font = "game_modal_num_100_fnt";
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalCenter = 20;
		t.width = 770;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.size = 38;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 564;
		t.y = 156;
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.x = 0;
		t.y = 538.06;
		t.elementsContent = [this._Image9_i(),this.totalTime_i(),this._Group11_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.totalTime_i = function () {
		var t = new eui.Image();
		this.totalTime = t;
		t.horizontalCenter = 0;
		t.source = "statistics_text_rcmdid_zh_png";
		t.y = 9;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 60;
		t.horizontalCenter = 0;
		t.width = 790;
		t.y = 86;
		t.elementsContent = [this._BitmapLabel7_i()];
		return t;
	};
	_proto._BitmapLabel7_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel7 = t;
		t.anchorOffsetX = 0;
		t.font = "game_modal_num_100_fnt";
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalCenter = 26;
		t.width = 792;
		return t;
	};
	_proto.teamsTab_i = function () {
		var t = new eui.Group();
		this.teamsTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 846;
		t.visible = false;
		t.width = 1030;
		t.x = 25;
		t.y = 255;
		t.elementsContent = [this._Scroller2_i()];
		return t;
	};
	_proto._Scroller2_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 838;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.width = 970;
		t.y = 7;
		t.viewport = this.teamTabScr_i();
		return t;
	};
	_proto.teamTabScr_i = function () {
		var t = new eui.Group();
		this.teamTabScr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 838;
		t.width = 992;
		return t;
	};
	_proto._Group13_i = function () {
		var t = new eui.Group();
		t.height = 108;
		t.horizontalCenter = 0;
		t.width = 1014;
		t.y = 130;
		t.elementsContent = [this.tab1_i(),this.tab2_i(),this.tab3_i()];
		return t;
	};
	_proto.tab1_i = function () {
		var t = new eui.Group();
		this.tab1 = t;
		t.height = 95;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 342;
		t.x = 9;
		t.y = 10;
		t.elementsContent = [this.tabBg1_i(),this.tabAct1_i(),this.tabActEn1_i(),this._Label4_i()];
		return t;
	};
	_proto.tabBg1_i = function () {
		var t = new eui.Image();
		this.tabBg1 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_statistics_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct1_i = function () {
		var t = new eui.Image();
		this.tabAct1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_text_round1_zh_png";
		t.x = 68.16;
		t.y = 20;
		return t;
	};
	_proto.tabActEn1_i = function () {
		var t = new eui.Image();
		this.tabActEn1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_text_round_en_png";
		t.visible = false;
		t.x = 90;
		t.y = 20;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.size = 40;
		t.textAlign = "left";
		t.textColor = 0xd4fef7;
		t.verticalAlign = "middle";
		t.x = 235.89;
		t.y = 23;
		return t;
	};
	_proto.tab2_i = function () {
		var t = new eui.Group();
		this.tab2 = t;
		t.height = 95;
		t.width = 342;
		t.x = 336;
		t.y = 10;
		t.elementsContent = [this.tabBg2_i(),this.tabAct2_i(),this.tabActEn2_i(),this._Label5_i()];
		return t;
	};
	_proto.tabBg2_i = function () {
		var t = new eui.Image();
		this.tabBg2 = t;
		t.horizontalCenter = -21.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_statistics_png";
		t.verticalCenter = -1.5;
		t.visible = false;
		return t;
	};
	_proto.tabAct2_i = function () {
		var t = new eui.Image();
		this.tabAct2 = t;
		t.source = "statistics_text_stats1_zh_png";
		t.x = 46.48;
		t.y = 20;
		return t;
	};
	_proto.tabActEn2_i = function () {
		var t = new eui.Image();
		this.tabActEn2 = t;
		t.source = "statistics_text_stats_en_png";
		t.visible = false;
		t.x = 82.4;
		t.y = 20;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.size = 40;
		t.textAlign = "left";
		t.textColor = 0xd4fef7;
		t.verticalAlign = "middle";
		t.x = 213.66;
		t.y = 24.33;
		return t;
	};
	_proto.tab3_i = function () {
		var t = new eui.Group();
		this.tab3 = t;
		t.height = 95;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 342;
		t.x = 663;
		t.y = 10;
		t.elementsContent = [this.tabBg3_i(),this.tabAct3_i(),this.tabActEn3_i(),this._Label6_i()];
		return t;
	};
	_proto.tabBg3_i = function () {
		var t = new eui.Image();
		this.tabBg3 = t;
		t.horizontalCenter = -45.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_statistics_png";
		t.verticalCenter = -3.5;
		t.visible = false;
		return t;
	};
	_proto.tabAct3_i = function () {
		var t = new eui.Image();
		this.tabAct3 = t;
		t.source = "statistics_text_teams1_zh_png";
		t.x = 20.72;
		t.y = 21.52;
		return t;
	};
	_proto.tabActEn3_i = function () {
		var t = new eui.Image();
		this.tabActEn3 = t;
		t.source = "statistics_text_teams_en_png";
		t.visible = false;
		t.x = 71.76;
		t.y = 20;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.textAlign = "left";
		t.textColor = 0xd4fef7;
		t.verticalAlign = "middle";
		t.x = 206.85;
		t.y = 23;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yltq_title_png";
		t.y = 25.44;
		return t;
	};
	_proto.langTitleImg_i = function () {
		var t = new eui.Image();
		this.langTitleImg = t;
		t.horizontalCenter = 0;
		t.source = "title_text_statistics_zh_png";
		t.y = 30.88;
		return t;
	};
	return GameStatisticsUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameUI.exml'] = window.GameUI = (function (_super) {
	__extends(GameUI, _super);
	function GameUI() {
		_super.call(this);
		this.skinParts = ["alertBgBling","jackPotLabel","readyTimeLabel","langJackPot","totalInvestLabel","totalAsset","buyTip","roundBonus","roundBuy","queueNum","myEarningsPanal","myAsset","extractNum","myNum","currentProf","predictBonus","profidImg","keyImg","unionProf","marqueeBg","marqueeLabel","marquee","roundNum","roundZh","roundNum0","roundEn","tips1","alertBg","alertModal","statisticsBtn","registerBtn","languageBtn","helpBtn","extractText","extractBtn","showBuyModal"];
		
		this.height = 1716;
		this.width = 1080;
		this.alertBgBling_i();
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group3_i(),this._Image6_i(),this.buyTip_i(),this.myEarningsPanal_i(),this._Image11_i(),this._Image12_i(),this._Image13_i(),this._Image14_i(),this.myAsset_i(),this.extractNum_i(),this.myNum_i(),this.currentProf_i(),this.predictBonus_i(),this.profidImg_i(),this.keyImg_i(),this._Image15_i(),this._Image16_i(),this._Image17_i(),this._Image18_i(),this._Label7_i(),this._Image19_i(),this._Label8_i(),this._Label9_i(),this.unionProf_i(),this._Image20_i(),this._Label10_i(),this._Label11_i(),this._Label12_i(),this._Label13_i(),this._Label14_i(),this._Label15_i(),this.marqueeBg_i(),this.marquee_i(),this._Group4_i(),this.tips1_i(),this._Label16_i(),this.alertModal_i(),this.statisticsBtn_i(),this.registerBtn_i(),this.languageBtn_i(),this.helpBtn_i(),this.extractBtn_i(),this.showBuyModal_i()];
		
		eui.Binding.$bindProperties(this, ["alertBg"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object3,"alpha");
		eui.Binding.$bindProperties(this, ["hostComponent.data.jackpot"],[0],this.jackPotLabel,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.readyTime"],[0],this.readyTimeLabel,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.jackpotUs"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalInvest"],[0],this.totalInvestLabel,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalInvestUsd"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.panalTips1"],[0],this.buyTip,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.roundBuy"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.roundBonus"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.roundBonusUs"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.queueNum"],[0],this._Label6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.allTime"],[0],this._Label7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.rcmdid"],[0],this._Label8,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.teamProf"],[0],this._Label9,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.unionBonus"],[0],this._Label10,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.allBuy"],[0],this._Label11,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.myBonus"],[0],this._Label12,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.allBuyUs"],[0],this._Label13,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.secondBonusUs"],[0],this._Label14,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.moduleData.myBonusUs"],[0],this._Label15,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.marqueeText"],[0],this.marqueeLabel,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.timeRemaining"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.roundNum"],[0],this.roundNum,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.roundNum"],[0],this.roundNum0,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.panalTips2"],[0],this.tips1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.remainingBet"],[0],this._Label16,"text");
	}
	var _proto = GameUI.prototype;

	_proto.alertBgBling_i = function () {
		var t = new egret.tween.TweenGroup();
		this.alertBgBling = t;
		t.items = [this._TweenItem1_i()];
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
		t.duration = 750;
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
		t.duration = 750;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
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
		t.horizontalCenter = 0;
		t.source = "yx_ditu3_png";
		t.top = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 172.72;
		t.horizontalCenter = 0;
		t.width = 1042;
		t.y = 200;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Group1_i(),this._Group2_i(),this.totalAsset_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "activepot_bg_png";
		t.y = -106.09;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title_png";
		t.x = 81;
		t.y = -30;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title_png";
		t.x = 599.94;
		t.y = -30;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 152;
		t.left = 533;
		t.right = 29;
		t.width = 580;
		t.y = 21;
		t.elementsContent = [this.jackPotLabel_i(),this.readyTimeLabel_i(),this.langJackPot_i(),this._Label1_i()];
		return t;
	};
	_proto.jackPotLabel_i = function () {
		var t = new eui.BitmapLabel();
		this.jackPotLabel = t;
		t.anchorOffsetX = 0;
		t.bottom = 10;
		t.font = "game_modal_num_100_fnt";
		t.horizontalCenter = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 62;
		return t;
	};
	_proto.readyTimeLabel_i = function () {
		var t = new eui.Label();
		this.readyTimeLabel = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.size = 46;
		t.textAlign = "center";
		t.top = 0;
		t.verticalAlign = "middle";
		t.visible = false;
		return t;
	};
	_proto.langJackPot_i = function () {
		var t = new eui.Image();
		this.langJackPot = t;
		t.horizontalCenter = 2;
		t.source = "activepot_zh_png";
		t.y = -45.2;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.horizontalCenter = -2;
		t.size = 40;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 354;
		t.y = 145.67;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 136;
		t.width = 356;
		t.x = 93;
		t.y = 21;
		t.elementsContent = [this.totalInvestLabel_i(),this._Label2_i()];
		return t;
	};
	_proto.totalInvestLabel_i = function () {
		var t = new eui.BitmapLabel();
		this.totalInvestLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -24;
		t.font = "game_modal_num_big_fnt";
		t.horizontalCenter = -4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 40;
		t.x = 402;
		t.y = 20;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 354;
		t.x = 251;
		t.y = 145.67;
		return t;
	};
	_proto.totalAsset_i = function () {
		var t = new eui.Image();
		this.totalAsset = t;
		t.source = "yx_text_cjxh_zh_png";
		t.x = 153.24;
		t.y = -25.72;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "animal_bear_png";
		return t;
	};
	_proto.buyTip_i = function () {
		var t = new eui.Label();
		this.buyTip = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 47.33;
		t.horizontalCenter = 0;
		t.size = 38;
		t.textAlign = "center";
		t.textColor = 0x79e7dd;
		t.verticalAlign = "middle";
		t.width = 847.33;
		t.y = 1006;
		return t;
	};
	_proto.myEarningsPanal_i = function () {
		var t = new eui.Group();
		this.myEarningsPanal = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 505;
		t.left = 0;
		t.right = 0;
		t.top = 922;
		t.visible = false;
		t.elementsContent = [this._Image7_i(),this.roundBonus_i(),this.roundBuy_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this.queueNum_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this._Label6_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yx_ditu1_png";
		t.y = -10.15;
		return t;
	};
	_proto.roundBonus_i = function () {
		var t = new eui.Image();
		this.roundBonus = t;
		t.source = "yx_text_dqsy_zh_png";
		t.x = 67;
		t.y = 123;
		return t;
	};
	_proto.roundBuy_i = function () {
		var t = new eui.Image();
		this.roundBuy = t;
		t.source = "yx_text_dqtr_zh_png";
		t.x = 67;
		t.y = 52.68;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 196.58;
		t.y = 67.18;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 706.85;
		t.y = 65.52;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 196.58;
		t.y = 137.5;
		return t;
	};
	_proto.queueNum_i = function () {
		var t = new eui.Image();
		this.queueNum = t;
		t.source = "yx_text_syxh_zh_png";
		t.x = 580.14;
		t.y = 60;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0x56D1F4;
		t.verticalAlign = "middle";
		t.width = 242;
		t.x = 255.48;
		t.y = 71.6;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0xe3db60;
		t.verticalAlign = "middle";
		t.width = 242;
		t.x = 255.48;
		t.y = 142.56;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.textColor = 0x79E7DD;
		t.width = 235;
		t.x = 396.72;
		t.y = 146.96;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0x56d1f4;
		t.verticalAlign = "middle";
		t.width = 242;
		t.x = 778.94;
		t.y = 70.72;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 360.34;
		t.source = "yx_ditu2_png";
		t.x = 4;
		t.y = 573.08;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 360.34;
		t.source = "yx_ditu2_png";
		t.x = 544;
		t.y = 573.08;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title1_png";
		t.visible = false;
		t.x = 121.18;
		t.y = 616;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title1_png";
		t.visible = false;
		t.x = 661.59;
		t.y = 618.48;
		return t;
	};
	_proto.myAsset_i = function () {
		var t = new eui.Image();
		this.myAsset = t;
		t.source = "yx_text_wdzc_zh_png";
		t.visible = false;
		t.x = 675.32;
		t.y = 627.49;
		return t;
	};
	_proto.extractNum_i = function () {
		var t = new eui.Image();
		this.extractNum = t;
		t.source = "yx_text_ljcs_zh_png";
		t.x = 42;
		t.y = 710.09;
		return t;
	};
	_proto.myNum_i = function () {
		var t = new eui.Image();
		this.myNum = t;
		t.source = "yx_text_rcmdid_zh_png";
		t.x = 42;
		t.y = 641.3;
		return t;
	};
	_proto.currentProf_i = function () {
		var t = new eui.Image();
		this.currentProf = t;
		t.source = "yx_text_tdjl_zh_png";
		t.x = 586.08;
		t.y = 703.46;
		return t;
	};
	_proto.predictBonus_i = function () {
		var t = new eui.Image();
		this.predictBonus = t;
		t.source = "yx_text_djyc_zh_png";
		t.visible = false;
		t.x = 184.62;
		t.y = 623;
		return t;
	};
	_proto.profidImg_i = function () {
		var t = new eui.Image();
		this.profidImg = t;
		t.source = "yx_text_fhsy_zh_png";
		t.x = 586.08;
		t.y = 774.89;
		return t;
	};
	_proto.keyImg_i = function () {
		var t = new eui.Image();
		this.keyImg = t;
		t.source = "yx_text_ljtr_zh_png";
		t.x = 42.12;
		t.y = 777.06;
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 170.18;
		t.y = 779.55;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 170.18;
		t.y = 714.15;
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 707.28;
		t.y = 711.46;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 708.8;
		t.y = 780.62;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0x56d1f4;
		t.verticalAlign = "middle";
		t.width = 311.7;
		t.x = 221.39;
		t.y = 716.96;
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 169.54;
		t.y = 643.84;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		this._Label8 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0x56D1F4;
		t.verticalAlign = "middle";
		t.width = 311.7;
		t.x = 220.75;
		t.y = 646.65;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0xe3db60;
		t.verticalAlign = "middle";
		t.width = 242;
		t.x = 779.04;
		t.y = 711.52;
		return t;
	};
	_proto.unionProf_i = function () {
		var t = new eui.Image();
		this.unionProf = t;
		t.source = "yx_text_lmjl_zh_png";
		t.x = 586.96;
		t.y = 634.65;
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.source = "yx_ditu_title2_png";
		t.x = 708.16;
		t.y = 642.65;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		this._Label10 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0xE3DB60;
		t.verticalAlign = "middle";
		t.width = 242;
		t.x = 778.4;
		t.y = 644.23;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		this._Label11 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0x56d1f4;
		t.verticalAlign = "middle";
		t.width = 242;
		t.x = 222.48;
		t.y = 784.2;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		this._Label12 = t;
		t.anchorOffsetX = 0;
		t.size = 44;
		t.textAlign = "left";
		t.textColor = 0xe3db60;
		t.verticalAlign = "middle";
		t.width = 242;
		t.x = 779.04;
		t.y = 785.68;
		return t;
	};
	_proto._Label13_i = function () {
		var t = new eui.Label();
		this._Label13 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.textColor = 0x79e7dd;
		t.visible = false;
		t.width = 235;
		t.x = 734.14;
		t.y = 739.12;
		return t;
	};
	_proto._Label14_i = function () {
		var t = new eui.Label();
		this._Label14 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.textColor = 0x79e7dd;
		t.visible = false;
		t.width = 235;
		t.x = 212.14;
		t.y = 837.63;
		return t;
	};
	_proto._Label15_i = function () {
		var t = new eui.Label();
		this._Label15 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.textColor = 0x79e7dd;
		t.visible = false;
		t.width = 235;
		t.x = 738;
		t.y = 822.02;
		return t;
	};
	_proto.marqueeBg_i = function () {
		var t = new eui.Image();
		this.marqueeBg = t;
		t.horizontalCenter = 0;
		t.source = "pmd_png";
		t.visible = false;
		t.y = 13;
		return t;
	};
	_proto.marquee_i = function () {
		var t = new eui.Group();
		this.marquee = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 77.07;
		t.horizontalCenter = -0.5;
		t.maxWidth = 969.33;
		t.scrollEnabled = true;
		t.visible = false;
		t.width = 969.33;
		t.y = 19.8;
		t.elementsContent = [this.marqueeLabel_i()];
		return t;
	};
	_proto.marqueeLabel_i = function () {
		var t = new eui.Label();
		this.marqueeLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40.67;
		t.verticalAlign = "middle";
		t.x = 217;
		t.y = 17.87;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 60;
		t.width = 973.67;
		t.x = 53.17;
		t.y = 431.46;
		t.elementsContent = [this._BitmapLabel1_i(),this.roundZh_i(),this.roundEn_i()];
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.bottom = 20;
		t.font = "time_num_font_fnt";
		t.horizontalCenter = 261.665;
		t.top = -20;
		return t;
	};
	_proto.roundZh_i = function () {
		var t = new eui.Group();
		this.roundZh = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.width = 309.33;
		t.x = 9.68;
		t.y = 11.46;
		t.elementsContent = [this._Image21_i(),this.roundNum_i()];
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_lc2_png";
		t.x = 99.03;
		t.y = -30.07;
		return t;
	};
	_proto.roundNum_i = function () {
		var t = new eui.BitmapLabel();
		this.roundNum = t;
		t.anchorOffsetX = 0;
		t.bottom = 26;
		t.font = "round_text_fnt";
		t.horizontalCenter = 54.83500000000001;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.top = -26;
		t.verticalAlign = "middle";
		t.width = 122.8;
		t.x = 11.879999999999995;
		t.y = -6.4599999999999795;
		return t;
	};
	_proto.roundEn_i = function () {
		var t = new eui.Group();
		this.roundEn = t;
		t.anchorOffsetX = 0;
		t.height = 40;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 379.03;
		t.x = 9.68;
		t.y = 11.46;
		t.elementsContent = [this._Image22_i(),this.roundNum0_i()];
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.source = "yx_lc2_en_png";
		t.x = 47.75;
		t.y = -14.34;
		return t;
	};
	_proto.roundNum0_i = function () {
		var t = new eui.BitmapLabel();
		this.roundNum0 = t;
		t.anchorOffsetX = 0;
		t.bottom = 4;
		t.font = "round_text_fnt";
		t.horizontalCenter = 170.985;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "left";
		t.top = -4;
		t.verticalAlign = "middle";
		t.width = 102.8;
		t.x = 141.87999999999994;
		t.y = -1.4599999999999795;
		return t;
	};
	_proto.tips1_i = function () {
		var t = new eui.Label();
		this.tips1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 39.33;
		t.horizontalCenter = -114;
		t.size = 34;
		t.textAlign = "right";
		t.textColor = 0x79e7dd;
		t.verticalAlign = "middle";
		t.width = 391.63;
		t.y = 1221;
		return t;
	};
	_proto._Label16_i = function () {
		var t = new eui.Label();
		this._Label16 = t;
		t.size = 34;
		t.x = 627;
		t.y = 1225.33;
		return t;
	};
	_proto.alertModal_i = function () {
		var t = new eui.Group();
		this.alertModal = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this.alertBg_i(),this._Image23_i()];
		return t;
	};
	_proto.alertBg_i = function () {
		var t = new eui.Image();
		this.alertBg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "special_effects_light_png";
		t.top = 0;
		return t;
	};
	_proto._Image23_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "special_effects_text_png";
		t.y = 78.79;
		return t;
	};
	_proto.statisticsBtn_i = function () {
		var t = new eui.Image();
		this.statisticsBtn = t;
		t.source = "icon_tj_png";
		t.x = 44.52;
		t.y = 5.24;
		return t;
	};
	_proto.registerBtn_i = function () {
		var t = new eui.Image();
		this.registerBtn = t;
		t.source = "icon_tjzc_png";
		t.x = 247;
		t.y = 7.24;
		return t;
	};
	_proto.languageBtn_i = function () {
		var t = new eui.Image();
		this.languageBtn = t;
		t.source = "icon_gl_png";
		t.x = 805.94;
		t.y = -0.76;
		return t;
	};
	_proto.helpBtn_i = function () {
		var t = new eui.Image();
		this.helpBtn = t;
		t.source = "icon_ft_png";
		t.x = 581;
		t.y = 5.24;
		return t;
	};
	_proto.extractBtn_i = function () {
		var t = new eui.Group();
		this.extractBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 102;
		t.width = 270;
		t.x = 682;
		t.y = 850;
		t.elementsContent = [this._Image24_i(),this.extractText_i()];
		return t;
	};
	_proto._Image24_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_btn_png";
		t.y = 7;
		return t;
	};
	_proto.extractText_i = function () {
		var t = new eui.Image();
		this.extractText = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_tq_zh_png";
		t.y = 20;
		return t;
	};
	_proto.showBuyModal_i = function () {
		var t = new eui.Group();
		this.showBuyModal = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 126;
		t.horizontalCenter = 0;
		t.width = 438;
		t.y = 1070.65;
		t.elementsContent = [this._Image25_i(),this._Image26_i()];
		return t;
	};
	_proto._Image25_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_gmys_png";
		t.y = 2.49;
		return t;
	};
	_proto._Image26_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_gmyc_zh_png";
		t.y = 24.82;
		return t;
	};
	return GameUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/RefereeInfoUI.exml'] = window.RefereeInfoUI = (function (_super) {
	__extends(RefereeInfoUI, _super);
	function RefereeInfoUI() {
		_super.call(this);
		this.skinParts = ["modal","langTitleImg","langWalletAddr","addressUrl","langCopyBtn1","copyAddrUrl","langIdAddr","idUrl","langCopyBtn2","copyIdUrl","close"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group3_i(),this.close_i()];
	}
	var _proto = RefereeInfoUI.prototype;

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
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 1054;
		t.left = 0;
		t.right = 0;
		t.width = 1080;
		t.y = 1716;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.langTitleImg_i(),this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "yltq_ditu_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yltq_title_png";
		t.y = -77.27;
		return t;
	};
	_proto.langTitleImg_i = function () {
		var t = new eui.Image();
		this.langTitleImg = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_tjdz_zh_png";
		t.y = -73.64;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.width = 1030;
		t.y = 87.36;
		t.elementsContent = [this._Image3_i(),this.langWalletAddr_i(),this.addressUrl_i(),this.copyAddrUrl_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_ditu_blue2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langWalletAddr_i = function () {
		var t = new eui.Image();
		this.langWalletAddr = t;
		t.source = "tjdz_text_qbdz_zh_png";
		t.x = 83.67;
		t.y = 43.5;
		return t;
	};
	_proto.addressUrl_i = function () {
		var t = new eui.Label();
		this.addressUrl = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.left = 67;
		t.maxHeight = 38;
		t.maxWidth = 900;
		t.right = 63;
		t.size = 38;
		t.text = "--";
		t.textAlign = "left";
		t.textColor = 0x56d1f4;
		t.verticalAlign = "middle";
		t.width = 900;
		t.y = 124.04;
		return t;
	};
	_proto.copyAddrUrl_i = function () {
		var t = new eui.Group();
		this.copyAddrUrl = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 94;
		t.width = 180;
		t.x = 763.67;
		t.y = 28.32;
		t.elementsContent = [this._Image4_i(),this.langCopyBtn1_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_tjdz_copy_png";
		t.y = 7;
		return t;
	};
	_proto.langCopyBtn1_i = function () {
		var t = new eui.Image();
		this.langCopyBtn1 = t;
		t.horizontalCenter = 2;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_text_fz_zh_png";
		t.y = 11;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.width = 1030;
		t.y = 417.81;
		t.elementsContent = [this._Image5_i(),this.langIdAddr_i(),this.idUrl_i(),this.copyIdUrl_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_ditu_blue2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langIdAddr_i = function () {
		var t = new eui.Image();
		this.langIdAddr = t;
		t.source = "tjdz_text_iddz_zh_png";
		t.x = 83.67;
		t.y = 50;
		return t;
	};
	_proto.idUrl_i = function () {
		var t = new eui.Label();
		this.idUrl = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.left = 67;
		t.maxHeight = 38;
		t.maxWidth = 900;
		t.right = 63;
		t.size = 38;
		t.text = "--";
		t.textAlign = "left";
		t.textColor = 0x56d1f4;
		t.verticalAlign = "middle";
		t.width = 900;
		t.y = 126.7;
		return t;
	};
	_proto.copyIdUrl_i = function () {
		var t = new eui.Group();
		this.copyIdUrl = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 84;
		t.width = 174;
		t.x = 763.67;
		t.y = 34;
		t.elementsContent = [this._Image6_i(),this.langCopyBtn2_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_tjdz_copy_png";
		t.y = 0;
		return t;
	};
	_proto.langCopyBtn2_i = function () {
		var t = new eui.Image();
		this.langCopyBtn2 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_text_fz_zh_png";
		t.y = 4;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_close_png";
		t.visible = false;
		t.x = 969;
		t.y = 570;
		return t;
	};
	return RefereeInfoUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/RegisterUI.exml'] = window.RegisterUI = (function (_super) {
	__extends(RegisterUI, _super);
	function RegisterUI() {
		_super.call(this);
		this.skinParts = ["modal","close","langTitleImg","langRegisterBtn","registerBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group3_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_2"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_3"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_4"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_5"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_6"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_7"],[0],this._Label6,"text");
	}
	var _proto = RegisterUI.prototype;

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
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 1054;
		t.left = 0;
		t.right = 0;
		t.width = 1080;
		t.y = 1716;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.close_i(),this.langTitleImg_i(),this._Image3_i(),this._Group2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "yltq_ditu_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yltq_title_png";
		t.y = -92;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_close_png";
		t.visible = false;
		t.x = 900;
		t.y = -25;
		return t;
	};
	_proto.langTitleImg_i = function () {
		var t = new eui.Image();
		this.langTitleImg = t;
		t.horizontalCenter = 0;
		t.source = "title_text_tjrzc_zh_png";
		t.y = -86;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 555.97;
		t.horizontalCenter = 0;
		t.source = "tjrzc_ditu_png";
		t.y = 50;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 782;
		t.width = 904;
		t.x = 87;
		t.y = 178;
		t.elementsContent = [this._Group1_i(),this.registerBtn_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 380;
		t.width = 820;
		t.x = 79;
		t.y = -82;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this._Label6_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.left = 0;
		t.right = -76;
		t.size = 34;
		t.top = 16;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.lineSpacing = 12;
		t.size = 34;
		t.top = 82;
		t.width = 780.25;
		t.x = 0;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 8;
		t.size = 34;
		t.top = 177;
		t.width = 780.37;
		t.x = 0;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 8;
		t.size = 34;
		t.top = 306;
		t.width = 775.82;
		t.x = 0;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.size = 34;
		t.top = 270;
		t.visible = false;
		t.x = 0;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.size = 34;
		t.top = 332;
		t.visible = false;
		t.x = 0;
		return t;
	};
	_proto.registerBtn_i = function () {
		var t = new eui.Group();
		this.registerBtn = t;
		t.bottom = 166;
		t.height = 131;
		t.horizontalCenter = 0;
		t.width = 478;
		t.elementsContent = [this._Image4_i(),this.langRegisterBtn_i(),this._Label7_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_tjrzc_register_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langRegisterBtn_i = function () {
		var t = new eui.Image();
		this.langRegisterBtn = t;
		t.horizontalCenter = 0.5;
		t.source = "btn_text_zc_zh_png";
		t.verticalCenter = -5.5;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 44;
		t.text = "0.02 ETH";
		t.textColor = 0xfffd68;
		t.y = 159;
		return t;
	};
	return RegisterUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/LanguageUI.exml'] = window.LanguageUI = (function (_super) {
	__extends(LanguageUI, _super);
	function LanguageUI() {
		_super.call(this);
		this.skinParts = ["modal","close","langZHTW_choosed","langZHTW","langEN_choosed","langEN","title"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group1_i()];
	}
	var _proto = LanguageUI.prototype;

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
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1054;
		t.left = 0;
		t.right = 0;
		t.width = 1080;
		t.y = 1716;
		t.elementsContent = [this._Image1_i(),this.close_i(),this.langZHTW_i(),this.langEN_i(),this._Image6_i(),this.title_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 1163;
		t.horizontalCenter = 0;
		t.source = "yltq_ditu_png";
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_close_png";
		t.visible = false;
		t.x = 900;
		t.y = -25;
		return t;
	};
	_proto.langZHTW_i = function () {
		var t = new eui.Group();
		this.langZHTW = t;
		t.height = 177;
		t.horizontalCenter = 0;
		t.width = 1030;
		t.y = 130;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.langZHTW_choosed_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 177;
		t.horizontalCenter = 0;
		t.source = "yltq_ditu_green1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "yuyan_text_chin_png";
		t.x = 66;
		t.y = 37;
		return t;
	};
	_proto.langZHTW_choosed_i = function () {
		var t = new eui.Image();
		this.langZHTW_choosed = t;
		t.source = "icon_ok_png";
		t.x = 850;
		t.y = 42;
		return t;
	};
	_proto.langEN_i = function () {
		var t = new eui.Group();
		this.langEN = t;
		t.height = 177;
		t.horizontalCenter = 0;
		t.width = 1030;
		t.y = 343.95;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this.langEN_choosed_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yltq_ditu_green2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.rotation = 0;
		t.source = "yuyan_text_eng_png";
		t.x = 66;
		t.y = 49;
		return t;
	};
	_proto.langEN_choosed_i = function () {
		var t = new eui.Image();
		this.langEN_choosed = t;
		t.source = "icon_ok_png";
		t.visible = false;
		t.x = 850;
		t.y = 42;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yltq_title_png";
		t.y = -78.5;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "yuyan_text_zh_png";
		t.y = -71;
		return t;
	};
	return LanguageUI;
})(eui.Skin);