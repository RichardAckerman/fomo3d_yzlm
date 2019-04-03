
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
                generateEUI.skins = {};generateEUI.paths['resource/eui_modules/Game/ExtractUnit.exml'] = window.ExtractUnit = (function (_super) {
	__extends(ExtractUnit, _super);
	function ExtractUnit() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 184.55;
		this.width = 900;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._BitmapLabel1_i(),this._BitmapLabel2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.num"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.extractCoin1"],[0],this._BitmapLabel2,"text");
	}
	var _proto = ExtractUnit.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "statistics_text_wdxh";
		t.verticalCenter = 0;
		t.x = 86.42;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "time_num_fnt";
		t.height = 89.09;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0.22499999999999432;
		t.width = 249.33;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "time_num_fnt";
		t.height = 89.09;
		t.horizontalCenter = 225.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "right";
		t.verticalAlign = "middle";
		t.verticalCenter = 0.22499999999999432;
		t.width = 249.33;
		return t;
	};
	return ExtractUnit;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameStatisticsUI.exml'] = window.GameStatisticsUI = (function (_super) {
	__extends(GameStatisticsUI, _super);
	function GameStatisticsUI() {
		_super.call(this);
		this.skinParts = ["closeBg","title","close","overtimeImg","potImg","roundTab","listNum","totalInvestment","statsTab","teamTabScr","teamsTab","luckyTabScr","luckyTab","tabBg1","tabAct1","tabActEn1","tabBitmap1","tab1","tabBg2","tabAct2","tabActEn2","tabBitmap2","tab2","tabBg3","tabAct3","tabActEn3","tabBitmap3","tab3","tabBg4","tabAct4","tabActEn4","tabBitmap0","tab4"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group6_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.drainTime"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.activePot"],[0],this._BitmapLabel2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.currentNum"],[0],this._BitmapLabel3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.rewards"],[0],this._BitmapLabel4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap0,"text");
	}
	var _proto = GameStatisticsUI.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.7;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1238;
		t.horizontalCenter = 1;
		t.y = -1238;
		t.elementsContent = [this._Image1_i(),this.title_i(),this.close_i(),this.roundTab_i(),this.statsTab_i(),this.teamsTab_i(),this.luckyTab_i(),this._Group5_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_strategy_zh";
		t.y = 11.84;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close";
		t.x = 908;
		t.y = -44.28;
		return t;
	};
	_proto.roundTab_i = function () {
		var t = new eui.Group();
		this.roundTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 924;
		t.horizontalCenter = 0;
		t.width = 836;
		t.y = 251;
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.y = 36;
		t.elementsContent = [this._Image2_i(),this._BitmapLabel1_i(),this.overtimeImg_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg";
		t.y = 33;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.font = "statistics_bold_fnt";
		t.height = 60;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 32;
		t.x = 475;
		return t;
	};
	_proto.overtimeImg_i = function () {
		var t = new eui.Image();
		this.overtimeImg = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_text_djs_zh";
		t.y = 11;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.y = 284.42;
		t.elementsContent = [this._Image3_i(),this._BitmapLabel2_i(),this.potImg_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg";
		t.y = 35;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.font = "statistics_bold_fnt";
		t.height = 60;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 36;
		t.x = 475;
		return t;
	};
	_proto.potImg_i = function () {
		var t = new eui.Image();
		this.potImg = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_text_dc_zh";
		t.y = 9;
		return t;
	};
	_proto.statsTab_i = function () {
		var t = new eui.Group();
		this.statsTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 924;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 836;
		t.y = 251;
		t.elementsContent = [this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.y = 36;
		t.elementsContent = [this._Image4_i(),this.listNum_i(),this._BitmapLabel3_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg";
		t.y = 33;
		return t;
	};
	_proto.listNum_i = function () {
		var t = new eui.Image();
		this.listNum = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_text_dr_zh";
		t.y = 9.67;
		return t;
	};
	_proto._BitmapLabel3_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel3 = t;
		t.anchorOffsetX = 0;
		t.font = "statistics_bold_fnt";
		t.height = 50;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalCenter = 28;
		t.width = 742;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1030;
		t.y = 284.42;
		t.elementsContent = [this._Image5_i(),this.totalInvestment_i(),this._BitmapLabel4_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg";
		t.y = 35;
		return t;
	};
	_proto.totalInvestment_i = function () {
		var t = new eui.Image();
		this.totalInvestment = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_text_ti_zh";
		t.y = 7.67;
		return t;
	};
	_proto._BitmapLabel4_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel4 = t;
		t.anchorOffsetX = 0;
		t.font = "statistics_bold_fnt";
		t.height = 50;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalCenter = 34;
		t.width = 770;
		return t;
	};
	_proto.teamsTab_i = function () {
		var t = new eui.Group();
		this.teamsTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 924;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 900;
		t.y = 251;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.top = 0;
		t.viewport = this.teamTabScr_i();
		return t;
	};
	_proto.teamTabScr_i = function () {
		var t = new eui.Group();
		this.teamTabScr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 852;
		t.width = 868;
		t.x = 38;
		t.y = 0;
		return t;
	};
	_proto.luckyTab_i = function () {
		var t = new eui.Group();
		this.luckyTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 924;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 900;
		t.y = 251;
		t.elementsContent = [this._Scroller2_i()];
		return t;
	};
	_proto._Scroller2_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.top = 0;
		t.viewport = this.luckyTabScr_i();
		return t;
	};
	_proto.luckyTabScr_i = function () {
		var t = new eui.Group();
		this.luckyTabScr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 852;
		t.width = 868;
		t.x = 38;
		t.y = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 108;
		t.horizontalCenter = 0;
		t.width = 878;
		t.y = 128;
		t.elementsContent = [this.tab1_i(),this.tab2_i(),this.tab3_i(),this.tab4_i()];
		return t;
	};
	_proto.tab1_i = function () {
		var t = new eui.Group();
		this.tab1 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 250;
		t.x = -4.56;
		t.y = 10;
		t.elementsContent = [this.tabBg1_i(),this.tabAct1_i(),this.tabActEn1_i(),this.tabBitmap1_i()];
		return t;
	};
	_proto.tabBg1_i = function () {
		var t = new eui.Image();
		this.tabBg1 = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_statistics";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct1_i = function () {
		var t = new eui.Image();
		this.tabAct1 = t;
		t.horizontalCenter = -23.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_text_round_zh";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabActEn1_i = function () {
		var t = new eui.Image();
		this.tabActEn1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_text_round_en";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 12;
		return t;
	};
	_proto.tabBitmap1_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap1 = t;
		t.font = "static_round_gold_fnt";
		t.height = 40;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 360;
		t.x = 179;
		return t;
	};
	_proto.tab2_i = function () {
		var t = new eui.Group();
		this.tab2 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.horizontalCenter = -106;
		t.width = 256;
		t.y = 10;
		t.elementsContent = [this.tabBg2_i(),this.tabAct2_i(),this.tabActEn2_i(),this.tabBitmap2_i()];
		return t;
	};
	_proto.tabBg2_i = function () {
		var t = new eui.Image();
		this.tabBg2 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_statistics_teams";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct2_i = function () {
		var t = new eui.Image();
		this.tabAct2 = t;
		t.horizontalCenter = -25.5;
		t.source = "statistics_text_stats1_zh";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabActEn2_i = function () {
		var t = new eui.Image();
		this.tabActEn2 = t;
		t.source = "statistics_text_stats1_en";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 12;
		return t;
	};
	_proto.tabBitmap2_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap2 = t;
		t.font = "static_round_fnt";
		t.height = 40;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 360;
		t.x = 175;
		return t;
	};
	_proto.tab3_i = function () {
		var t = new eui.Group();
		this.tab3 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 254;
		t.x = 416.29;
		t.y = 10;
		t.elementsContent = [this.tabBg3_i(),this.tabAct3_i(),this.tabActEn3_i(),this.tabBitmap3_i()];
		return t;
	};
	_proto.tabBg3_i = function () {
		var t = new eui.Image();
		this.tabBg3 = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_statistics_teams";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct3_i = function () {
		var t = new eui.Image();
		this.tabAct3 = t;
		t.horizontalCenter = -23.5;
		t.source = "statistics_text_teams1_zh";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabActEn3_i = function () {
		var t = new eui.Image();
		this.tabActEn3 = t;
		t.source = "statistics_text_teams1_en";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 12;
		return t;
	};
	_proto.tabBitmap3_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap3 = t;
		t.font = "static_round_fnt";
		t.height = 40;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.width = 360;
		t.x = 175;
		return t;
	};
	_proto.tab4_i = function () {
		var t = new eui.Group();
		this.tab4 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 254;
		t.x = 626.32;
		t.y = 10;
		t.elementsContent = [this.tabBg4_i(),this.tabAct4_i(),this.tabActEn4_i(),this.tabBitmap0_i()];
		return t;
	};
	_proto.tabBg4_i = function () {
		var t = new eui.Image();
		this.tabBg4 = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_statistics_teams";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabAct4_i = function () {
		var t = new eui.Image();
		this.tabAct4 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_text_rank1_zh";
		t.verticalCenter = 0.5;
		return t;
	};
	_proto.tabActEn4_i = function () {
		var t = new eui.Image();
		this.tabActEn4 = t;
		t.horizontalCenter = 0;
		t.source = "statistics_text_rank1_en";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.tabBitmap0_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap0 = t;
		t.font = "static_round_fnt";
		t.height = 40;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 360;
		t.x = 175;
		return t;
	};
	return GameStatisticsUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameUI.exml'] = window.GameUI = (function (_super) {
	__extends(GameUI, _super);
	function GameUI() {
		_super.call(this);
		this.skinParts = ["alertBgBling","gameoverBling","goTextBling","btnBling","earning","pToearning","tips","stelaTitle","stelaTitle2","roundZh","roundEn","potLabel","readyTime","stela","myNumImg","timesImg","allBuyImg","inviteImg","bonusImg","winImg","footContent","alertBg","alertModal","btnLight","buyBtnG","statistics","invite","faq","lang","headContent","withdrawBtn","goBg","gourd1","gourd2","kjBg","gameoverModel","buyBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.alertBgBling_i();
		this.gameoverBling_i();
		this.goTextBling_i();
		this.btnBling_i();
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.tips_i(),this.stela_i(),this.footContent_i(),this.alertModal_i(),this.buyBtnG_i(),this.headContent_i(),this.withdrawBtn_i(),this.gameoverModel_i(),this.buyBtn_i()];
		
		eui.Binding.$bindProperties(this, ["alertBg"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object3,"alpha");
		eui.Binding.$bindProperties(this, ["goBg"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"alpha");
		eui.Binding.$bindProperties(this, [0.7],[],this._Object5,"alpha");
		eui.Binding.$bindProperties(this, ["gourd1"],[0],this._TweenItem3,"target");
		eui.Binding.$bindProperties(this, [-1000],[],this._Object6,"y");
		eui.Binding.$bindProperties(this, [356],[],this._Object7,"y");
		eui.Binding.$bindProperties(this, ["gourd2"],[0],this._TweenItem4,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object8,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object9,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object10,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object11,"alpha");
		eui.Binding.$bindProperties(this, ["kjBg"],[0],this._TweenItem5,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object12,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object13,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object14,"alpha");
		eui.Binding.$bindProperties(this, ["kjBg"],[0],this._TweenItem6,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object15,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object16,"alpha");
		eui.Binding.$bindProperties(this, ["btnLight"],[0],this._TweenItem7,"target");
		eui.Binding.$bindProperties(this, [0.2],[],this._Object17,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object18,"alpha");
		eui.Binding.$bindProperties(this, [0.2],[],this._Object19,"alpha");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.mainTips1"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.residueTimes"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalBuyTimes"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.mainTips2"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round"],[0],this._BitmapLabel2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentNum"],[0],this._BitmapLabel3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.pot"],[0],this.potLabel,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.leftTime"],[0],this._BitmapLabel4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.inviteBonus"],[0],this._Label7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.earnings"],[0],this._Label8,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.allEarnings"],[0],this._Label9,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.canBonus"],[0],this._Label10,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.buyTimes"],[0],this._Label11,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalBuy"],[0],this._Label12,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.approve"],[0],this._Label13,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.approveNum"],[0],this._Label14,"text");
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
	_proto.gameoverBling_i = function () {
		var t = new egret.tween.TweenGroup();
		this.gameoverBling = t;
		t.items = [this._TweenItem2_i(),this._TweenItem3_i(),this._TweenItem4_i(),this._TweenItem5_i()];
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To3_i()];
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
		t.duration = 500;
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._TweenItem3_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem3 = t;
		t.paths = [this._Wait1_i(),this._Set3_i(),this._To4_i()];
		return t;
	};
	_proto._Wait1_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 500;
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object7_i();
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		this._Object7 = t;
		return t;
	};
	_proto._TweenItem4_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem4 = t;
		t.paths = [this._Set4_i(),this._To5_i(),this._To6_i(),this._To7_i()];
		return t;
	};
	_proto._Set4_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object8_i();
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		this._Object8 = t;
		return t;
	};
	_proto._To5_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object9_i();
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		this._Object9 = t;
		return t;
	};
	_proto._To6_i = function () {
		var t = new egret.tween.To();
		t.duration = 250;
		t.props = this._Object10_i();
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		this._Object10 = t;
		return t;
	};
	_proto._To7_i = function () {
		var t = new egret.tween.To();
		t.duration = 750;
		t.props = this._Object11_i();
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		this._Object11 = t;
		return t;
	};
	_proto._TweenItem5_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem5 = t;
		t.paths = [this._Set5_i(),this._To8_i(),this._To9_i()];
		return t;
	};
	_proto._Set5_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object12_i();
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		this._Object12 = t;
		return t;
	};
	_proto._To8_i = function () {
		var t = new egret.tween.To();
		t.duration = 750;
		t.props = this._Object13_i();
		return t;
	};
	_proto._Object13_i = function () {
		var t = {};
		this._Object13 = t;
		return t;
	};
	_proto._To9_i = function () {
		var t = new egret.tween.To();
		t.duration = 750;
		t.props = this._Object14_i();
		return t;
	};
	_proto._Object14_i = function () {
		var t = {};
		this._Object14 = t;
		return t;
	};
	_proto.goTextBling_i = function () {
		var t = new egret.tween.TweenGroup();
		this.goTextBling = t;
		t.items = [this._TweenItem6_i()];
		return t;
	};
	_proto._TweenItem6_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem6 = t;
		t.paths = [this._Set6_i(),this._To10_i(),this._To11_i()];
		return t;
	};
	_proto._Set6_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To10_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object15_i();
		return t;
	};
	_proto._Object15_i = function () {
		var t = {};
		this._Object15 = t;
		return t;
	};
	_proto._To11_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object16_i();
		return t;
	};
	_proto._Object16_i = function () {
		var t = {};
		this._Object16 = t;
		return t;
	};
	_proto.btnBling_i = function () {
		var t = new egret.tween.TweenGroup();
		this.btnBling = t;
		t.items = [this._TweenItem7_i()];
		return t;
	};
	_proto._TweenItem7_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem7 = t;
		t.paths = [this._Set7_i(),this._To12_i(),this._To13_i()];
		return t;
	};
	_proto._Set7_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object17_i();
		return t;
	};
	_proto._Object17_i = function () {
		var t = {};
		this._Object17 = t;
		return t;
	};
	_proto._To12_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object18_i();
		return t;
	};
	_proto._Object18_i = function () {
		var t = {};
		this._Object18 = t;
		return t;
	};
	_proto._To13_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.ease = "sineInOut";
		t.props = this._Object19_i();
		return t;
	};
	_proto._Object19_i = function () {
		var t = {};
		this._Object19 = t;
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
		t.source = "jc";
		t.y = 889.64;
		return t;
	};
	_proto.tips_i = function () {
		var t = new eui.Group();
		this.tips = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 132;
		t.horizontalCenter = 0.5;
		t.width = 955;
		t.y = 746.37;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this._Image3_i(),this.earning_i(),this.pToearning_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 50;
		t.horizontalCenter = 38;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.textColor = 0xdfc37f;
		t.width = 460.67;
		t.y = 26.04;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.height = 48;
		t.size = 30;
		t.textColor = 0xdfc37f;
		t.width = 210;
		t.x = 551.33;
		t.y = 26;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.text = "/";
		t.textColor = 0xdfc37f;
		t.x = 593;
		t.y = 26;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.height = 48;
		t.size = 30;
		t.textColor = 0xDFC37F;
		t.width = 100;
		t.x = 604.33;
		t.y = 26;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 35.33;
		t.horizontalCenter = 0;
		t.size = 38;
		t.textAlign = "center";
		t.textColor = 0xdfb69a;
		t.width = 907.09;
		t.y = 81.31;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "ldz_bg";
		t.x = 87;
		t.y = 14;
		return t;
	};
	_proto.earning_i = function () {
		var t = new eui.Image();
		this.earning = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_ldz_zh";
		t.visible = false;
		t.x = 85;
		t.y = 16;
		return t;
	};
	_proto.pToearning_i = function () {
		var t = new eui.Image();
		this.pToearning = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_zbld_zh";
		t.x = 85;
		t.y = 16;
		return t;
	};
	_proto.stela_i = function () {
		var t = new eui.Group();
		this.stela = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 388;
		t.width = 996;
		t.x = 41;
		t.y = 892;
		t.elementsContent = [this.stelaTitle_i(),this.stelaTitle2_i(),this._Label6_i(),this.roundZh_i(),this.roundEn_i(),this._BitmapLabel3_i(),this.potLabel_i(),this.readyTime_i(),this._BitmapLabel4_i()];
		return t;
	};
	_proto.stelaTitle_i = function () {
		var t = new eui.Image();
		this.stelaTitle = t;
		t.source = "yx_text_cjxh_zh";
		t.x = 36;
		t.y = 45;
		return t;
	};
	_proto.stelaTitle2_i = function () {
		var t = new eui.Image();
		this.stelaTitle2 = t;
		t.source = "yx_text_jc_zh";
		t.x = 510.68;
		t.y = 45;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.size = 44;
		t.text = "ODF";
		t.textColor = 0xd17357;
		t.x = 662.02;
		t.y = 237.99;
		return t;
	};
	_proto.roundZh_i = function () {
		var t = new eui.Group();
		this.roundZh = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 82;
		t.width = 354;
		t.x = 41;
		t.y = 258;
		t.elementsContent = [this._Image4_i(),this._BitmapLabel1_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_lc2";
		t.x = 21.72999999999999;
		t.y = 11.660000000000082;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "time_num_fnt";
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "center";
		t.width = 102;
		t.x = 119.06;
		t.y = 16;
		return t;
	};
	_proto.roundEn_i = function () {
		var t = new eui.Group();
		this.roundEn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 82;
		t.visible = false;
		t.width = 354;
		t.x = 41;
		t.y = 258;
		t.elementsContent = [this._Image5_i(),this._BitmapLabel2_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_lc2_en";
		t.x = -0.27;
		t.y = 11.660000000000082;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "time_num_fnt";
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "center";
		t.verticalAlign = "center";
		t.width = 102;
		t.x = 229.06;
		t.y = 20;
		return t;
	};
	_proto._BitmapLabel3_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "pot_num_fnt";
		t.height = 108;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 367;
		t.x = 27;
		t.y = 142;
		return t;
	};
	_proto.potLabel_i = function () {
		var t = new eui.BitmapLabel();
		this.potLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "pot_num_fnt";
		t.height = 108;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 485;
		t.x = 463.48;
		t.y = 138.07;
		return t;
	};
	_proto.readyTime_i = function () {
		var t = new eui.Image();
		this.readyTime = t;
		t.source = "yx_text_zbsj_zh";
		t.visible = false;
		t.x = 541.99;
		t.y = 152.03;
		return t;
	};
	_proto._BitmapLabel4_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "time_num_fnt";
		t.height = 50;
		t.textAlign = "center";
		t.verticalAlign = "center";
		t.width = 471.69;
		t.x = 468.19;
		t.y = 302.18;
		return t;
	};
	_proto.footContent_i = function () {
		var t = new eui.Group();
		this.footContent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 348;
		t.width = 994.67;
		t.x = 44;
		t.y = 1327;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i(),this.myNumImg_i(),this.timesImg_i(),this.allBuyImg_i(),this._Image10_i(),this._Image11_i(),this.inviteImg_i(),this._Label7_i(),this.bonusImg_i(),this.winImg_i(),this._Label8_i(),this._Label9_i(),this._Label10_i(),this._Label11_i(),this._Label12_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_ditu2";
		t.x = -16;
		t.y = -1;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_ditu2";
		t.x = 504;
		t.y = -1;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line";
		t.x = 553.16;
		t.y = 94.5;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line";
		t.x = 553.16;
		t.y = 194.5;
		return t;
	};
	_proto.myNumImg_i = function () {
		var t = new eui.Image();
		this.myNumImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_fhqy_zh";
		t.x = 16;
		t.y = 38.36999999999989;
		return t;
	};
	_proto.timesImg_i = function () {
		var t = new eui.Image();
		this.timesImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_ljcs_zh";
		t.x = 16;
		t.y = 148.3599999999999;
		return t;
	};
	_proto.allBuyImg_i = function () {
		var t = new eui.Image();
		this.allBuyImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_ljtr_zh";
		t.x = 16;
		t.y = 261.53;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line";
		t.x = 32;
		t.y = 116;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line";
		t.x = 32;
		t.y = 233;
		return t;
	};
	_proto.inviteImg_i = function () {
		var t = new eui.Image();
		this.inviteImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_dqsy_zh";
		t.x = 541;
		t.y = 25.37;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0xC99755;
		t.verticalAlign = "middle";
		t.width = 230.06;
		t.x = 748.91;
		t.y = 20.36;
		return t;
	};
	_proto.bonusImg_i = function () {
		var t = new eui.Image();
		this.bonusImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_fhsy_zh";
		t.x = 541;
		t.y = 118.86;
		return t;
	};
	_proto.winImg_i = function () {
		var t = new eui.Image();
		this.winImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_ktsy_zh";
		t.x = 541;
		t.y = 219.86;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		this._Label8 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0xC99755;
		t.verticalAlign = "middle";
		t.width = 231.57;
		t.x = 748.91;
		t.y = 117.85;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0xC99755;
		t.verticalAlign = "middle";
		t.width = 231.57;
		t.x = 748.91;
		t.y = 218.35;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		this._Label10 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0xc99755;
		t.verticalAlign = "middle";
		t.width = 225.51;
		t.x = 245;
		t.y = 33.36;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		this._Label11 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0xC99755;
		t.verticalAlign = "middle";
		t.width = 227.03;
		t.x = 245;
		t.y = 147.35;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		this._Label12 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0xC99755;
		t.verticalAlign = "middle";
		t.width = 227.03;
		t.x = 245;
		t.y = 257.37;
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
		t.elementsContent = [this._Image12_i(),this.alertBg_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "special_effects_text_png";
		t.y = 712.79;
		return t;
	};
	_proto.alertBg_i = function () {
		var t = new eui.Image();
		this.alertBg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "border_out_png";
		t.top = 0;
		return t;
	};
	_proto.buyBtnG_i = function () {
		var t = new eui.Group();
		this.buyBtnG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 154.55;
		t.horizontalCenter = -0.5;
		t.width = 427.27;
		t.y = 543.7;
		t.elementsContent = [this._Image13_i(),this._Image14_i(),this.btnLight_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_gmys";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_gmyc_zh";
		t.verticalCenter = -5.775000000000006;
		return t;
	};
	_proto.btnLight_i = function () {
		var t = new eui.Image();
		this.btnLight = t;
		t.horizontalCenter = 0;
		t.source = "light_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.headContent_i = function () {
		var t = new eui.Group();
		this.headContent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 618;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 1080;
		t.elementsContent = [this._Image15_i(),this._Image16_i(),this._Image17_i(),this._Image18_i(),this.statistics_i(),this.invite_i(),this.faq_i(),this.lang_i(),this._Label13_i(),this._Label14_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_dp_top";
		t.top = 0;
		t.x = 60;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_dp_top";
		t.top = 0;
		t.x = 879;
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.source = "icon_dp_bottom";
		t.x = 60;
		t.y = 351.53;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.source = "icon_dp_bottom";
		t.x = 879;
		t.y = 351.53;
		return t;
	};
	_proto.statistics_i = function () {
		var t = new eui.Image();
		this.statistics = t;
		t.source = "icon_tj";
		t.x = 72.96;
		t.y = 171.16;
		return t;
	};
	_proto.invite_i = function () {
		var t = new eui.Image();
		this.invite = t;
		t.source = "icon_tjzc";
		t.x = 76.29;
		t.y = 465.3;
		return t;
	};
	_proto.faq_i = function () {
		var t = new eui.Image();
		this.faq = t;
		t.source = "icon_gl";
		t.x = 891.56;
		t.y = 168.11;
		return t;
	};
	_proto.lang_i = function () {
		var t = new eui.Image();
		this.lang = t;
		t.source = "icon_ft";
		t.x = 897.61;
		t.y = 463.78;
		return t;
	};
	_proto._Label13_i = function () {
		var t = new eui.Label();
		this._Label13 = t;
		t.size = 45;
		t.textColor = 0xdfc37f;
		t.x = 311.11;
		t.y = 699.73;
		return t;
	};
	_proto._Label14_i = function () {
		var t = new eui.Label();
		this._Label14 = t;
		t.size = 45;
		t.textColor = 0xdfc37f;
		t.x = 549.69;
		t.y = 700.25;
		return t;
	};
	_proto.withdrawBtn_i = function () {
		var t = new eui.Group();
		this.withdrawBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116;
		t.horizontalCenter = 258.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 299;
		t.x = 605;
		t.y = 1613;
		t.elementsContent = [this._Image19_i(),this._Image20_i()];
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yx_btn";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yx_text_tq_zh";
		t.verticalCenter = -9.5;
		return t;
	};
	_proto.gameoverModel_i = function () {
		var t = new eui.Group();
		this.gameoverModel = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this.goBg_i(),this.gourd1_i(),this.gourd2_i(),this.kjBg_i()];
		return t;
	};
	_proto.goBg_i = function () {
		var t = new eui.Rect();
		this.goBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.8;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.gourd1_i = function () {
		var t = new eui.Image();
		this.gourd1 = t;
		t.horizontalCenter = 0;
		t.source = "lottery_unopened_png";
		t.y = -1000;
		return t;
	};
	_proto.gourd2_i = function () {
		var t = new eui.Image();
		this.gourd2 = t;
		t.horizontalCenter = 0;
		t.source = "lottery_gods_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.kjBg_i = function () {
		var t = new eui.Image();
		this.kjBg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "border_kj_png";
		t.top = 0;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Rect();
		this.buyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 133.63;
		t.horizontalCenter = -0.5;
		t.width = 423.03;
		t.y = 548.05;
		return t;
	};
	return GameUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/LuckyUnit.exml'] = window.ExtractUnit = (function (_super) {
	__extends(ExtractUnit, _super);
	function ExtractUnit() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 266;
		this.width = 900;
		this.elementsContent = [this._Image1_i(),this._BitmapLabel1_i(),this._Label1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.extractCoin1"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.address"],[0],this._Label1,"text");
	}
	var _proto = ExtractUnit.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 246;
		t.horizontalCenter = 0;
		t.source = "statistics_bg";
		t.verticalCenter = 31;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "statistics_bold_fnt";
		t.height = 89.09;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.textAlign = "right";
		t.verticalAlign = "middle";
		t.verticalCenter = 31.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 1.5;
		t.textColor = 0x4b281f;
		t.y = 31.35;
		return t;
	};
	return ExtractUnit;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/AinimeBg.exml'] = window.GameApprove = (function (_super) {
	__extends(GameApprove, _super);
	function GameApprove() {
		_super.call(this);
		this.skinParts = ["modal"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i()];
	}
	var _proto = GameApprove.prototype;

	_proto.modal_i = function () {
		var t = new eui.Rect();
		this.modal = t;
		t.bottom = 0;
		t.fillAlpha = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	return GameApprove;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/BuyingUI.exml'] = window.GameApprove = (function (_super) {
	__extends(GameApprove, _super);
	function GameApprove() {
		_super.call(this);
		this.skinParts = ["modal","icon"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this.icon_i()];
	}
	var _proto = GameApprove.prototype;

	_proto.modal_i = function () {
		var t = new eui.Rect();
		this.modal = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.rotation = 60;
		t.source = "buyingCircle_png";
		t.verticalCenter = -127;
		return t;
	};
	return GameApprove;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/GameAlertUI.exml'] = window.GameAlertUI = (function (_super) {
	__extends(GameAlertUI, _super);
	function GameAlertUI() {
		_super.call(this);
		this.skinParts = ["modal","title","submitBtn"];
		
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
		t.elementsContent = [this._Image1_i(),this.title_i(),this._Label1_i(),this.submitBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_2";
		t.verticalCenter = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "title_text_ts";
		t.y = 17;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = -5.5;
		t.minHeight = 100;
		t.size = 35;
		t.textAlign = "center";
		t.textColor = 0x21081c;
		t.verticalCenter = -31.5;
		t.width = 765;
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
		t.y = 384.18;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_fz_zh";
		t.verticalCenter = 0;
		return t;
	};
	return GameAlertUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/GameApprove.exml'] = window.GameApprove = (function (_super) {
	__extends(GameApprove, _super);
	function GameApprove() {
		_super.call(this);
		this.skinParts = ["modal","title","submitBtn","cancelBtn"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.modal_i(),this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.msg"],[0],this._Label1,"text");
	}
	var _proto = GameApprove.prototype;

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
		t.elementsContent = [this._Image1_i(),this.title_i(),this._Label1_i(),this.submitBtn_i(),this.cancelBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_2";
		t.verticalCenter = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "title_text_ts";
		t.y = 17;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = -5.5;
		t.lineSpacing = 20;
		t.minHeight = 100;
		t.size = 35;
		t.textAlign = "center";
		t.textColor = 0x21081c;
		t.verticalCenter = -31.5;
		t.width = 765;
		return t;
	};
	_proto.submitBtn_i = function () {
		var t = new eui.Group();
		this.submitBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = -211;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 384.18;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_sure_zh";
		t.verticalCenter = 0;
		return t;
	};
	_proto.cancelBtn_i = function () {
		var t = new eui.Group();
		this.cancelBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 104;
		t.horizontalCenter = 195;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 300;
		t.y = 384.18;
		t.elementsContent = [this._Image4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_cancel_zh";
		t.verticalCenter = 0;
		return t;
	};
	return GameApprove;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/GameHelpUI.exml'] = window.GameHelpUi = (function (_super) {
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
		t.anchorOffsetY = 0;
		t.height = 1250;
		t.width = 1080;
		t.x = 0;
		t.y = -1250;
		t.elementsContent = [this._Image1_i(),this.langTitleImg_i(),this.close_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.langTitleImg_i = function () {
		var t = new eui.Image();
		this.langTitleImg = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_faq_zh";
		t.y = 17.08;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close";
		t.x = 907.63;
		t.y = -37.18;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1043.82;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.width = 838;
		t.y = 115.08;
		t.viewport = this.layoutGroup_i();
		return t;
	};
	_proto.layoutGroup_i = function () {
		var t = new eui.Group();
		this.layoutGroup = t;
		t.anchorOffsetY = 0;
		t.height = 1002;
		t.x = 0;
		t.y = -152;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this._Label6_i(),this._Label7_i(),this._Label8_i(),this._Label9_i(),this._Label10_i(),this._Label11_i(),this._Label12_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0x492428;
		t.y = 50;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.right = 0;
		t.size = 40;
		t.textColor = 0x5b3c40;
		t.width = 838;
		t.y = 100;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0x492428;
		t.y = 150;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.right = 0;
		t.size = 40;
		t.textColor = 0x5b3c40;
		t.width = 838;
		t.y = 250;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0x492428;
		t.y = 350;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.right = 0;
		t.size = 40;
		t.textColor = 0x5b3c40;
		t.width = 838;
		t.y = 450;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0x492428;
		t.y = 550;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		this._Label8 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.right = 0;
		t.size = 40;
		t.textColor = 0x5b3c40;
		t.width = 838;
		t.y = 650;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0x492428;
		t.y = 750;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		this._Label10 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.right = 0;
		t.size = 40;
		t.textColor = 0x5b3c40;
		t.width = 838;
		t.y = 850;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		this._Label11 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0;
		t.size = 44;
		t.textColor = 0x492428;
		t.y = 950;
		return t;
	};
	_proto._Label12_i = function () {
		var t = new eui.Label();
		this._Label12 = t;
		t.anchorOffsetX = 0;
		t.left = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.right = 0;
		t.size = 40;
		t.textColor = 0x5b3c40;
		t.width = 838;
		t.y = 1050;
		return t;
	};
	return GameHelpUi;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/LanguageUI.exml'] = window.LanguageUI = (function (_super) {
	__extends(LanguageUI, _super);
	function LanguageUI() {
		_super.call(this);
		this.skinParts = ["closeBg","close","langZHTW_choosed","langZHTW","langEN_choosed","langEN","title"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group1_i()];
	}
	var _proto = LanguageUI.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.7;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1145;
		t.left = 0;
		t.right = 0;
		t.width = 1080;
		t.y = -1145;
		t.elementsContent = [this._Image1_i(),this.close_i(),this.langZHTW_i(),this.langEN_i(),this.title_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 1163;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.top = 0;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close";
		t.x = 907.76;
		t.y = -8.38;
		return t;
	};
	_proto.langZHTW_i = function () {
		var t = new eui.Group();
		this.langZHTW = t;
		t.anchorOffsetX = 0;
		t.height = 177;
		t.horizontalCenter = -0.5;
		t.width = 763.34;
		t.y = 280;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.langZHTW_choosed_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 177;
		t.horizontalCenter = 0;
		t.source = "yuyan_bg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "yuyan_text_chin";
		t.x = 40.22;
		t.y = 53.67;
		return t;
	};
	_proto.langZHTW_choosed_i = function () {
		var t = new eui.Image();
		this.langZHTW_choosed = t;
		t.source = "icon_ok";
		t.x = 627.27;
		t.y = 45.04;
		return t;
	};
	_proto.langEN_i = function () {
		var t = new eui.Group();
		this.langEN = t;
		t.anchorOffsetX = 0;
		t.height = 177;
		t.horizontalCenter = 1.5;
		t.width = 763.34;
		t.y = 493.95;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this.langEN_choosed_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuyan_bg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.rotation = 0;
		t.source = "yuyan_text_eng";
		t.x = 40.22;
		t.y = 55.19;
		return t;
	};
	_proto.langEN_choosed_i = function () {
		var t = new eui.Image();
		this.langEN_choosed = t;
		t.source = "icon_ok";
		t.visible = false;
		t.x = 627.27;
		t.y = 45.04;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = -0.5;
		t.source = "yuyan_text_zh";
		t.y = 44.36;
		return t;
	};
	return LanguageUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/RegisterUI.exml'] = window.NewFile = (function (_super) {
	__extends(NewFile, _super);
	function NewFile() {
		_super.call(this);
		this.skinParts = ["closeBg","title","close","registerBtn","registerGroup","copyBtn","linkGroup"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group1_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_2"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_3"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_4"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.register_info_5"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.link"],[0],this._Label6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.idUrl"],[0],this._Label7,"text");
	}
	var _proto = NewFile.prototype;

	_proto.closeBg_i = function () {
		var t = new eui.Rect();
		this.closeBg = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.strokeAlpha = 0.5;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1232;
		t.horizontalCenter = 0;
		t.width = 1080;
		t.y = -1232;
		t.elementsContent = [this._Image1_i(),this.title_i(),this.close_i(),this.registerGroup_i(),this.linkGroup_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg_png";
		t.verticalCenter = 16.289999999999964;
		t.x = 0;
		t.y = -3.089999999999975;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_text_referee_zh";
		t.x = 401.00000000000006;
		t.y = 26.25;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close";
		t.x = 907.2;
		t.y = -26.37;
		return t;
	};
	_proto.registerGroup_i = function () {
		var t = new eui.Group();
		this.registerGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1104;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 882;
		t.x = 98.00000000000001;
		t.y = 93.54;
		t.elementsContent = [this.registerBtn_i(),this._Label2_i(),this._Label3_i(),this._Label4_i(),this._Label5_i()];
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
		t.x = 292;
		t.y = 904;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Label1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_yqdy_zh";
		t.y = 8;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35.33;
		t.horizontalCenter = 0;
		t.size = 26;
		t.text = "2 ODF";
		t.textAlign = "center";
		t.textColor = 0xf9f48f;
		t.verticalAlign = "middle";
		t.width = 144.67;
		t.y = 60;
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
		t.textColor = 0x21081c;
		t.top = 177;
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
		t.textColor = 0x21081C;
		t.top = 237;
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
		t.textColor = 0x21081C;
		t.top = 341;
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
		t.textColor = 0x21081C;
		t.top = 439;
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
		t.height = 1104;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 882;
		t.x = 98.00000000000001;
		t.y = 96.63;
		t.elementsContent = [this._Image4_i(),this._Label6_i(),this._Label7_i(),this.copyBtn_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title_text_yqlj_zh";
		t.y = 158.5;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.bold = true;
		t.fontFamily = "MicrosoftYaHei-Bold";
		t.textColor = 0x21081c;
		t.x = 111;
		t.y = 330;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 123.5;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.textColor = 0x21081C;
		t.width = 589.37;
		t.x = 52;
		t.y = 330;
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
		t.elementsContent = [this._Image5_i(),this._Image6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_fz_1_zh";
		t.verticalCenter = 0;
		return t;
	};
	return NewFile;
})(eui.Skin);