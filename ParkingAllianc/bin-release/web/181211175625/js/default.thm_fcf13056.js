
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
		this.width = 850;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Image3_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.num"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.extractCoin1"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.index"],[0],this._Label3,"text");
	}
	var _proto = ExtractUnit.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "list_item_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "statistics_text_wdxh_png";
		t.verticalCenter = 0.22499999999999432;
		t.x = 80.34;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = 64;
		t.size = 58;
		t.textColor = 0xbafffe;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.size = 58;
		t.textColor = 0xbafffe;
		t.verticalCenter = 0;
		t.x = 650.29;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 43.5;
		t.size = 34;
		t.textAlign = "center";
		t.textColor = 0xfdffdc;
		t.verticalAlign = "middle";
		t.width = 73.5;
		t.x = 281.86;
		t.y = 47.5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 64.5;
		t.source = "num_13_png";
		t.verticalCenter = 1.2249999999999943;
		t.width = 43.5;
		t.x = 607;
		return t;
	};
	return ExtractUnit;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameStatisticsUI.exml'] = window.GameStatisticsUI = (function (_super) {
	__extends(GameStatisticsUI, _super);
	function GameStatisticsUI() {
		_super.call(this);
		this.skinParts = ["closeBg","title","close","overtimeImg","potImg","roundTab","listNum","totalInvestment","totalBuyTimes","myBuyTimes","statsTab","teamTabScr","teamsTab","luckyInfo","luckyTitle","lucky","tabAct1","tabActEn1","tabBitmap1","tab1","tabAct2","tabActEn2","tabBitmap2","tab2","tabAct3","tabActEn3","tabBitmap3","tab3","tabAct4","tabActEn4","tabBitmap4","tab4"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.closeBg_i(),this._Group9_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.drainTime"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round.activePot"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.currentNum"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.rewards"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.totalBuyTimes"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.stats.myReinvest"],[0],this._Label6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentRound"],[0],this.tabBitmap4,"text");
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
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1272;
		t.horizontalCenter = 1;
		t.y = -1272;
		t.elementsContent = [this._Image1_i(),this.title_i(),this.close_i(),this.roundTab_i(),this.statsTab_i(),this.teamsTab_i(),this.lucky_i(),this._Group8_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_strategy_zh2_png";
		t.y = 60.88;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close_png";
		t.visible = false;
		t.x = 908;
		t.y = 17.72;
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
		t.y = 263;
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 204;
		t.horizontalCenter = -0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 825.45;
		t.y = 51.2;
		t.elementsContent = [this._Image2_i(),this.overtimeImg_i(),this._Label1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.overtimeImg_i = function () {
		var t = new eui.Image();
		this.overtimeImg = t;
		t.horizontalCenter = 0;
		t.source = "statistics_stats_text_djs_zh_png";
		t.y = 11;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = 0.27499999999997726;
		t.size = 58;
		t.textColor = 0xedff82;
		t.y = 110.48;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 854.24;
		t.y = 284.42;
		t.elementsContent = [this._Image3_i(),this.potImg_i(),this._Label2_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg_png";
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
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.horizontalCenter = 255.38;
		t.size = 58;
		t.textAlign = "left";
		t.textColor = 0xbafffe;
		t.width = 571;
		t.y = 109.86;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "num_13_png";
		t.x = 335.31;
		t.y = 96.36;
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
		t.y = 263;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 806;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.width = 858;
		t.y = 53;
		t.viewport = this._Group7_i();
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 238;
		t.width = 230;
		t.elementsContent = [this._Group3_i(),this._Group4_i(),this._Group5_i(),this._Group6_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 858.48;
		t.y = -3.3899999999999864;
		t.elementsContent = [this._Image5_i(),this.listNum_i(),this._Label3_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.listNum_i = function () {
		var t = new eui.Image();
		this.listNum = t;
		t.horizontalCenter = -0.2400000000000091;
		t.source = "statistics_text_cjxh_png";
		t.y = 12.71;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.horizontalCenter = 0.7599999999999909;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 58;
		t.textColor = 0xEDFF82;
		t.x = 120;
		t.y = 110.87;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 828.48;
		t.x = 3;
		t.y = 231.42000000000007;
		t.elementsContent = [this._Image6_i(),this.totalInvestment_i(),this._Label4_i(),this._Image7_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.totalInvestment_i = function () {
		var t = new eui.Image();
		this.totalInvestment = t;
		t.horizontalCenter = -0.2400000000000091;
		t.source = "statistics_stats_text_ti_zh_png";
		t.y = 11.67;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 58;
		t.textColor = 0xBAFFFE;
		t.width = 512;
		t.x = 398.67;
		t.y = 107.44;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "num_13_png";
		t.x = 328.98;
		t.y = 95;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 828.48;
		t.x = 13;
		t.y = 466;
		t.elementsContent = [this._Image8_i(),this.totalBuyTimes_i(),this._Label5_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.totalBuyTimes_i = function () {
		var t = new eui.Image();
		this.totalBuyTimes = t;
		t.horizontalCenter = -0.2400000000000091;
		t.source = "statistics_stats_text_ztd_zh_png";
		t.y = 11.67;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.horizontalCenter = 0.2599999999999909;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 58;
		t.textColor = 0xBAFFFE;
		t.x = 129;
		t.y = 107.44;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 204;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 828.48;
		t.x = 23;
		t.y = 704;
		t.elementsContent = [this._Image9_i(),this.myBuyTimes_i(),this._Label6_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "statistics_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.myBuyTimes_i = function () {
		var t = new eui.Image();
		this.myBuyTimes = t;
		t.horizontalCenter = -0.2400000000000091;
		t.source = "statistics_stats_text_wdtd_zh_png";
		t.y = 11.67;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.horizontalCenter = 0.2599999999999909;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 58;
		t.textColor = 0xBAFFFE;
		t.x = 129;
		t.y = 107.44;
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
		t.width = 836;
		t.y = 263;
		t.elementsContent = [this._Scroller2_i()];
		return t;
	};
	_proto._Scroller2_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 72;
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
	_proto.lucky_i = function () {
		var t = new eui.Group();
		this.lucky = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 924;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 836;
		t.y = 263;
		t.elementsContent = [this._Scroller3_i(),this.luckyTitle_i()];
		return t;
	};
	_proto._Scroller3_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 62;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.top = 106;
		t.viewport = this.luckyInfo_i();
		return t;
	};
	_proto.luckyInfo_i = function () {
		var t = new eui.Group();
		this.luckyInfo = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 888;
		t.width = 836;
		t.x = 0;
		t.y = 36;
		return t;
	};
	_proto.luckyTitle_i = function () {
		var t = new eui.Image();
		this.luckyTitle = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_text_xyph_png";
		t.x = 263;
		t.y = 48.44;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 108;
		t.horizontalCenter = 0;
		t.width = 816;
		t.y = 177.29;
		t.elementsContent = [this.tab1_i(),this.tab2_i(),this.tab3_i(),this.tab4_i()];
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
		t.width = 250;
		t.elementsContent = [this.tabAct1_i(),this.tabActEn1_i(),this.tabBitmap1_i(),this._Image10_i()];
		return t;
	};
	_proto.tabAct1_i = function () {
		var t = new eui.Image();
		this.tabAct1 = t;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_text_round1_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabActEn1_i = function () {
		var t = new eui.Image();
		this.tabActEn1 = t;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "statistics_text_round1_en_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.tabBitmap1_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap1 = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.font = "static_round_gold_fnt";
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.verticalAlign = "middle";
		t.width = 210;
		t.x = 188.72;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.bottom = -18;
		t.horizontalCenter = 0;
		t.source = "light_png";
		return t;
	};
	_proto.tab2_i = function () {
		var t = new eui.Group();
		this.tab2 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.horizontalCenter = -106.5;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 256;
		t.elementsContent = [this.tabAct2_i(),this.tabActEn2_i(),this.tabBitmap2_i(),this._Image11_i()];
		return t;
	};
	_proto.tabAct2_i = function () {
		var t = new eui.Image();
		this.tabAct2 = t;
		t.left = 0;
		t.source = "statistics_text_stats_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabActEn2_i = function () {
		var t = new eui.Image();
		this.tabActEn2 = t;
		t.left = 0;
		t.source = "statistics_text_stats_en_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.tabBitmap2_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap2 = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.font = "static_round_fnt";
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.verticalAlign = "middle";
		t.width = 152.5;
		t.x = 198.34;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.bottom = -18;
		t.horizontalCenter = 0;
		t.scaleX = 1.25;
		t.scaleY = 1.25;
		t.source = "light_png";
		t.visible = false;
		t.y = 20;
		return t;
	};
	_proto.tab3_i = function () {
		var t = new eui.Group();
		this.tab3 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 254;
		t.x = 408.3;
		t.elementsContent = [this.tabAct3_i(),this.tabActEn3_i(),this.tabBitmap3_i(),this._Image12_i()];
		return t;
	};
	_proto.tabAct3_i = function () {
		var t = new eui.Image();
		this.tabAct3 = t;
		t.left = 0;
		t.source = "statistics_text_teams_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabActEn3_i = function () {
		var t = new eui.Image();
		this.tabActEn3 = t;
		t.left = 0;
		t.source = "statistics_text_teams_en_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.tabBitmap3_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap3 = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.font = "static_round_fnt";
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.verticalAlign = "middle";
		t.width = 190;
		t.x = 188.33;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.bottom = -18;
		t.horizontalCenter = 0;
		t.scaleX = 1.5625;
		t.scaleY = 1.5625;
		t.source = "light_png";
		t.visible = false;
		t.y = -10;
		return t;
	};
	_proto.tab4_i = function () {
		var t = new eui.Group();
		this.tab4 = t;
		t.anchorOffsetX = 0;
		t.height = 95;
		t.right = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = 0;
		t.width = 254;
		t.elementsContent = [this.tabAct4_i(),this.tabActEn4_i(),this.tabBitmap4_i(),this._Image13_i()];
		return t;
	};
	_proto.tabAct4_i = function () {
		var t = new eui.Image();
		this.tabAct4 = t;
		t.left = 0;
		t.source = "statistics_text_rank_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabActEn4_i = function () {
		var t = new eui.Image();
		this.tabActEn4 = t;
		t.left = 0;
		t.source = "statistics_text_rank_en_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.tabBitmap4_i = function () {
		var t = new eui.BitmapLabel();
		this.tabBitmap4 = t;
		t.bottom = 0;
		t.font = "static_round_fnt";
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.verticalAlign = "middle";
		t.width = 200;
		t.x = 216.65;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.bottom = -18;
		t.horizontalCenter = 0;
		t.scaleX = 1.5625;
		t.scaleY = 1.5625;
		t.source = "light_png";
		t.visible = false;
		t.y = -10;
		return t;
	};
	return GameStatisticsUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/GameUI.exml'] = window.GameUI = (function (_super) {
	__extends(GameUI, _super);
	function GameUI() {
		_super.call(this);
		this.skinParts = ["alertBgBling","gameoverBling","goTextBling","tips","stelaTitle","finalLuck","potLabel","stelaTitle2","totalOutImg","roundZh","roundEn","readyTime","stela","myBuyTitle1","myBounsTitle2","allBuyImg","timesImg","outTimeImg","notOutImg","bonusImg","levelUpImg","leaderImg","roundTImg","headContent","alertBg","alertModal","lang","faq","invite","statistics","footContent","buyBtn","registerBtn","withdrawBtn","goBg","gourd1","gourd2","kjBg","gameoverModel"];
		
		this.height = 1716;
		this.width = 1080;
		this.alertBgBling_i();
		this.gameoverBling_i();
		this.goTextBling_i();
		this.elementsContent = [this._Image1_i(),this.tips_i(),this.stela_i(),this.headContent_i(),this.alertModal_i(),this.footContent_i(),this.buyBtn_i(),this.registerBtn_i(),this.withdrawBtn_i(),this.gameoverModel_i()];
		
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
		eui.Binding.$bindProperties(this, ["hostComponent.langData.mainTips2"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.residueTimes"],[0],this._Label2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.langData.mainTips1"],[0],this._Label3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.weekPot"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalFinalPot"],[0],this.potLabel,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.myNum"],[0],this._BitmapLabel2,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.currentNum"],[0],this._BitmapLabel3,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.leftTime"],[0],this._BitmapLabel4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.weekLeftTime"],[0],this._BitmapLabel5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round"],[0],this._BitmapLabel6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.round"],[0],this._BitmapLabel7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.totalBuy"],[0],this._Label4,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.buyTimes"],[0],this._Label5,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.notoutTimes"],[0],this._Label6,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.outTimes"],[0],this._Label7,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.earnings"],[0],this._Label8,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.leaderBonus"],[0],this._Label9,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.levelupBonus"],[0],this._Label10,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.roundBonus"],[0],this._Label11,"text");
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
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "game_bg_png";
		t.top = 0;
		return t;
	};
	_proto.tips_i = function () {
		var t = new eui.Group();
		this.tips = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 132;
		t.horizontalCenter = -222;
		t.width = 509.55;
		t.y = 178.67;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 29;
		t.textColor = 0xa2cdd9;
		t.width = 708.67;
		t.x = 24;
		t.y = 38.33;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.height = 48;
		t.size = 29;
		t.textColor = 0xd9786a;
		t.width = 56;
		t.x = 212.81;
		t.y = 97.33;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 35.33;
		t.size = 29;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.width = 462.09;
		t.x = 24;
		t.y = 95.64;
		return t;
	};
	_proto.stela_i = function () {
		var t = new eui.Group();
		this.stela = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 614;
		t.width = 996;
		t.x = 41;
		t.y = 329.94;
		t.elementsContent = [this._Image2_i(),this.stelaTitle_i(),this.finalLuck_i(),this._BitmapLabel1_i(),this.potLabel_i(),this._Image3_i(),this.stelaTitle2_i(),this._BitmapLabel2_i(),this._Image4_i(),this.totalOutImg_i(),this._BitmapLabel3_i(),this._BitmapLabel4_i(),this._BitmapLabel5_i(),this.roundZh_i(),this.roundEn_i(),this.readyTime_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "pot_countdown_sort_bg_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.stelaTitle_i = function () {
		var t = new eui.Image();
		this.stelaTitle = t;
		t.source = "title1_week_pot_png";
		t.x = 181;
		t.y = 54.51;
		return t;
	};
	_proto.finalLuck_i = function () {
		var t = new eui.Image();
		this.finalLuck = t;
		t.source = "title1_max_pot_zh_png";
		t.x = 181;
		t.y = 304;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "pot_num_fnt";
		t.height = 108;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 465.48;
		t.x = 54.52;
		t.y = 126;
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
		t.width = 467;
		t.x = 54.52;
		t.y = 364;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "title2_bg_png";
		t.x = 565;
		t.y = 70;
		return t;
	};
	_proto.stelaTitle2_i = function () {
		var t = new eui.Image();
		this.stelaTitle2 = t;
		t.source = "title2_my_sort_png";
		t.x = 598.68;
		t.y = 91;
		return t;
	};
	_proto._BitmapLabel2_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "pot_num_fnt";
		t.height = 108;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 439;
		t.x = 527.48;
		t.y = 180.07;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "title2_bg_png";
		t.x = 565;
		t.y = 306;
		return t;
	};
	_proto.totalOutImg_i = function () {
		var t = new eui.Image();
		this.totalOutImg = t;
		t.source = "title2_out_sort_png";
		t.x = 603.66;
		t.y = 327.99;
		return t;
	};
	_proto._BitmapLabel3_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "pot_num_fnt";
		t.height = 84.67;
		t.textAlign = "center";
		t.verticalAlign = "center";
		t.width = 445.69;
		t.x = 524.19;
		t.y = 428.18;
		return t;
	};
	_proto._BitmapLabel4_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "time_num_fnt";
		t.height = 84.67;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 445.69;
		t.x = 66.19;
		t.y = 462.18;
		return t;
	};
	_proto._BitmapLabel5_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "time_num_fnt";
		t.height = 84.67;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 445.69;
		t.x = 66.19;
		t.y = 230.18;
		return t;
	};
	_proto.roundZh_i = function () {
		var t = new eui.Group();
		this.roundZh = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 82;
		t.visible = false;
		t.width = 354;
		t.x = 117;
		t.y = 258;
		t.elementsContent = [this._Image5_i(),this._BitmapLabel6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_lc2_png";
		t.x = 21.72999999999999;
		t.y = 11.660000000000082;
		return t;
	};
	_proto._BitmapLabel6_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel6 = t;
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
		t.elementsContent = [this._Image6_i(),this._BitmapLabel7_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_lc2_en_png";
		t.x = -0.27;
		t.y = 11.660000000000082;
		return t;
	};
	_proto._BitmapLabel7_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel7 = t;
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
	_proto.readyTime_i = function () {
		var t = new eui.Image();
		this.readyTime = t;
		t.source = "yx_text_zbsj_zh_png";
		t.visible = false;
		t.x = 119.99;
		t.y = 380.03;
		return t;
	};
	_proto.headContent_i = function () {
		var t = new eui.Group();
		this.headContent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 348;
		t.width = 994.67;
		t.x = 44;
		t.y = 998.85;
		t.elementsContent = [this._Image7_i(),this._Image8_i(),this.myBuyTitle1_i(),this.myBounsTitle2_i(),this._Image9_i(),this.allBuyImg_i(),this.timesImg_i(),this.outTimeImg_i(),this.notOutImg_i(),this._Image10_i(),this._Image11_i(),this.bonusImg_i(),this.levelUpImg_i(),this.leaderImg_i(),this.roundTImg_i(),this._Label4_i(),this._Label5_i(),this._Label6_i(),this._Label7_i(),this._Label8_i(),this._Label9_i(),this._Label10_i(),this._Label11_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "my_send_profit_bg_png";
		t.y = -1;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "my_send_profit_bg_png";
		t.y = -1;
		return t;
	};
	_proto.myBuyTitle1_i = function () {
		var t = new eui.Image();
		this.myBuyTitle1 = t;
		t.source = "title3_my_send_png";
		t.x = 92.56;
		t.y = -33;
		return t;
	};
	_proto.myBounsTitle2_i = function () {
		var t = new eui.Image();
		this.myBounsTitle2 = t;
		t.source = "title3_my_profit_png";
		t.x = 637.8;
		t.y = -31.48;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line_png";
		t.x = 553.16;
		t.y = 116;
		return t;
	};
	_proto.allBuyImg_i = function () {
		var t = new eui.Image();
		this.allBuyImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_ljtr_zh_png";
		t.x = 23.98;
		t.y = 60.2;
		return t;
	};
	_proto.timesImg_i = function () {
		var t = new eui.Image();
		this.timesImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_ljcs_zh_png";
		t.x = 23.98;
		t.y = 117.01;
		return t;
	};
	_proto.outTimeImg_i = function () {
		var t = new eui.Image();
		this.outTimeImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_cjcs_zh_png";
		t.x = 23.98;
		t.y = 174.35;
		return t;
	};
	_proto.notOutImg_i = function () {
		var t = new eui.Image();
		this.notOutImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_wccs_zh_png";
		t.x = 23.98;
		t.y = 233.27;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line_png";
		t.x = 32;
		t.y = 116;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "line_png";
		t.x = 32;
		t.y = 233;
		return t;
	};
	_proto.bonusImg_i = function () {
		var t = new eui.Image();
		this.bonusImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_fhsy_zh_png";
		t.x = 570.38;
		t.y = 59.71;
		return t;
	};
	_proto.levelUpImg_i = function () {
		var t = new eui.Image();
		this.levelUpImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_jjsy_zh_png";
		t.x = 570.38;
		t.y = 117;
		return t;
	};
	_proto.leaderImg_i = function () {
		var t = new eui.Image();
		this.leaderImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_lxsy_zh_png";
		t.x = 570.38;
		t.y = 175.65;
		return t;
	};
	_proto.roundTImg_i = function () {
		var t = new eui.Image();
		this.roundTImg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yx_text_ltsy_zh_png";
		t.x = 570.38;
		t.y = 231.67;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		this._Label4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 232.91;
		t.y = 50.01;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 232.91;
		t.y = 104.84;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 232.91;
		t.y = 220.96;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 232.91;
		t.y = 164.29;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		this._Label8 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 792.61;
		t.y = 49.32;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 792.61;
		t.y = 164;
		return t;
	};
	_proto._Label10_i = function () {
		var t = new eui.Label();
		this._Label10 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 792.61;
		t.y = 102.79;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		this._Label11 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57.27;
		t.size = 36;
		t.textAlign = "left";
		t.textColor = 0xa2cdd9;
		t.verticalAlign = "middle";
		t.width = 210.36;
		t.x = 792.61;
		t.y = 219.48;
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
		t.elementsContent = [this.alertBg_i(),this._Image12_i()];
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
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "special_effects_text_png";
		t.y = 78.79;
		return t;
	};
	_proto.footContent_i = function () {
		var t = new eui.Group();
		this.footContent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 54;
		t.height = 202.85;
		t.horizontalCenter = 0;
		t.width = 1080;
		t.elementsContent = [this._Image13_i(),this._Image14_i(),this._Image15_i(),this._Image16_i(),this.lang_i(),this.faq_i(),this.invite_i(),this.statistics_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		t.x = 46;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		t.x = 304;
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		t.x = 562;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_bg_png";
		t.verticalCenter = 0;
		t.x = 820;
		return t;
	};
	_proto.lang_i = function () {
		var t = new eui.Image();
		this.lang = t;
		t.source = "icon_ft_png";
		t.verticalCenter = 0;
		t.x = 83.06;
		return t;
	};
	_proto.faq_i = function () {
		var t = new eui.Image();
		this.faq = t;
		t.source = "icon_gl_png";
		t.verticalCenter = 0;
		t.x = 339;
		return t;
	};
	_proto.invite_i = function () {
		var t = new eui.Image();
		this.invite = t;
		t.source = "icon_tjzc_png";
		t.verticalCenter = 0;
		t.x = 598.17;
		return t;
	};
	_proto.statistics_i = function () {
		var t = new eui.Image();
		this.statistics = t;
		t.source = "icon_tj_png";
		t.verticalCenter = 0;
		t.x = 853.5;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Group();
		this.buyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116;
		t.width = 335;
		t.x = 20;
		t.y = 72.24;
		t.elementsContent = [this._Image17_i(),this._Image18_i()];
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yx_btn_blue_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.3650000000000091;
		t.source = "btn_text_gmyc_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.registerBtn_i = function () {
		var t = new eui.Group();
		this.registerBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 335;
		t.x = 725;
		t.y = 72.24;
		t.elementsContent = [this._Image19_i(),this._Image20_i()];
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yx_btn_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_register_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.withdrawBtn_i = function () {
		var t = new eui.Group();
		this.withdrawBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 299;
		t.x = 677.34;
		t.y = 1295.61;
		t.elementsContent = [this._Image21_i(),this._Image22_i()];
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "yx_btn_green_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_tq_zh_png";
		t.verticalCenter = -1.5;
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
	return GameUI;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Game/LuckyUnit.exml'] = window.ExtractUnit = (function (_super) {
	__extends(ExtractUnit, _super);
	function ExtractUnit() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 150;
		this.width = 836;
		this.elementsContent = [this._Image1_i(),this._BitmapLabel1_i(),this._Label1_i(),this._Image2_i(),this._Label2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.index"],[0],this._BitmapLabel1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.address"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.extractCoin1"],[0],this._Label2,"text");
	}
	var _proto = ExtractUnit.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "list_item_bg2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		this._BitmapLabel1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "lucky_num_fnt";
		t.height = 56.36;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 6;
		t.width = 126.97;
		t.x = 4.25;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = -25;
		t.size = 30;
		t.textAlign = "left";
		t.textColor = 0xd9786a;
		t.verticalCenter = 16;
		t.width = 400;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "icon_fof_png";
		t.verticalCenter = 10.5;
		t.x = 637;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54.67;
		t.size = 40;
		t.textColor = 0xe9daff;
		t.verticalAlign = "middle";
		t.verticalCenter = 10.5;
		t.width = 186.33;
		t.x = 670.24;
		return t;
	};
	return ExtractUnit;
})(eui.Skin);generateEUI.paths['resource/eui_modules/Modal/GameAlertUI.exml'] = window.GameAlertUI = (function (_super) {
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
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.submitBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg2_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 144;
		t.horizontalCenter = -5.5;
		t.minHeight = 100;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalCenter = -89.5;
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
		t.y = 294.18;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_fz_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	return GameAlertUI;
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
		t.height = 1220;
		t.width = 1080;
		t.x = 0;
		t.y = -1220;
		t.elementsContent = [this._Image1_i(),this.langTitleImg_i(),this.close_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		return t;
	};
	_proto.langTitleImg_i = function () {
		var t = new eui.Image();
		this.langTitleImg = t;
		t.horizontalCenter = 0.5;
		t.source = "title_text_faq_zh_png";
		t.y = 36.3;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close_png";
		t.visible = false;
		t.x = 907.63;
		t.y = -17.96;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 898.37;
		t.horizontalCenter = -0.5;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "on";
		t.width = 759.22;
		t.y = 190.3;
		t.viewport = this.layoutGroup_i();
		return t;
	};
	_proto.layoutGroup_i = function () {
		var t = new eui.Group();
		this.layoutGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1002;
		t.width = 859.21;
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
		t.bottom = 827.37;
		t.left = 0;
		t.maxWidth = 880;
		t.right = 0.22000000000002728;
		t.size = 44;
		t.textColor = 0xf2c2b0;
		t.top = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 778.37;
		t.left = 0;
		t.lineSpacing = 10;
		t.maxWidth = 900;
		t.right = 0;
		t.size = 40;
		t.textColor = 0x9a747c;
		t.top = 0;
		t.width = 760;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0xf2c2b0;
		t.width = 760;
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
		t.size = 40;
		t.textColor = 0x9a747c;
		t.width = 760;
		t.y = 250;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		this._Label5 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0xf2c2b0;
		t.width = 760;
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
		t.size = 40;
		t.textColor = 0x9a747c;
		t.width = 760;
		t.y = 450;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0xf2c2b0;
		t.width = 760;
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
		t.size = 40;
		t.textColor = 0x9a747c;
		t.width = 760;
		t.y = 650;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		this._Label9 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0xf2c2b0;
		t.width = 760;
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
		t.size = 40;
		t.textColor = 0x9a747c;
		t.width = 760;
		t.y = 850;
		return t;
	};
	_proto._Label11_i = function () {
		var t = new eui.Label();
		this._Label11 = t;
		t.bold = true;
		t.left = 0;
		t.maxWidth = 880;
		t.size = 44;
		t.textColor = 0xf2c2b0;
		t.width = 760;
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
		t.size = 40;
		t.textColor = 0x9a747c;
		t.width = 760;
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
		t.height = 1182;
		t.left = 0;
		t.right = 0;
		t.width = 1080;
		t.y = -1182;
		t.elementsContent = [this._Image1_i(),this.close_i(),this.langZHTW_i(),this.langEN_i(),this.title_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 1163;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.y = 30;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close_png";
		t.visible = false;
		t.x = 907.76;
		t.y = 21.92;
		return t;
	};
	_proto.langZHTW_i = function () {
		var t = new eui.Group();
		this.langZHTW = t;
		t.anchorOffsetX = 0;
		t.height = 177;
		t.horizontalCenter = -0.5;
		t.width = 763.34;
		t.y = 310.3;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.langZHTW_choosed_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 177;
		t.horizontalCenter = 0;
		t.source = "yuyan_bg_png";
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
		t.source = "icon_ok_png";
		t.verticalCenter = 0;
		t.x = 627.27;
		return t;
	};
	_proto.langEN_i = function () {
		var t = new eui.Group();
		this.langEN = t;
		t.anchorOffsetX = 0;
		t.height = 177;
		t.horizontalCenter = 1.5;
		t.width = 763.34;
		t.y = 524.25;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this.langEN_choosed_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuyan_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.rotation = 0;
		t.source = "yuyan_text_eng_png";
		t.verticalCenter = 0;
		t.x = 40.22;
		return t;
	};
	_proto.langEN_choosed_i = function () {
		var t = new eui.Image();
		this.langEN_choosed = t;
		t.source = "icon_ok_png";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 627.27;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.source = "yuyan_text_zh_png";
		t.y = 58.66;
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
		t.height = 1211;
		t.horizontalCenter = 0;
		t.width = 1080;
		t.y = -1211;
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
		t.y = -3.089999999999975;
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
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "close_png";
		t.visible = false;
		t.x = 907.2;
		t.y = -37.17;
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
		t.y = 82.74;
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
		t.y = 816;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Label1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_yqdy_zh_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35.33;
		t.horizontalCenter = 0.5;
		t.size = 26;
		t.text = "0.02 ETH";
		t.textAlign = "center";
		t.textColor = 0xf9f48f;
		t.verticalAlign = "middle";
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
		t.textColor = 0xffe2c3;
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
		t.textColor = 0xffe2c3;
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
		t.textColor = 0xffe2c3;
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
		t.textColor = 0xffe2c3;
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
		t.y = 85.83;
		t.elementsContent = [this._Image4_i(),this._Label6_i(),this._Label7_i(),this.copyBtn_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "title_text_yqlj_zh_png";
		t.y = 158.5;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		this._Label6 = t;
		t.bold = true;
		t.fontFamily = "MicrosoftYaHei-Bold";
		t.textColor = 0xffe2c3;
		t.x = 101;
		t.y = 330;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		this._Label7 = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 121.5;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.textColor = 0xffe2c3;
		t.width = 589.37;
		t.x = 52;
		t.y = 332;
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
		t.source = "btn_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "btn_text_fz_zh2_png";
		t.verticalCenter = 0;
		return t;
	};
	return NewFile;
})(eui.Skin);