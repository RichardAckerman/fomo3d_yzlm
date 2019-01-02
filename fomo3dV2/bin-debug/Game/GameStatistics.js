var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameStatistics = (function (_super) {
    __extends(GameStatistics, _super);
    function GameStatistics() {
        var _this = _super.call(this) || this;
        _this.data = {
            currentRound: '#1',
            round: {
                drainTime: '00:00:00',
                activePot: '0',
                usdt: '0.00000 USDT',
                myKeys: '0',
                totalKeys: 'Total 0 Keys',
            },
            stats: {
                totalInvested: '0',
                totalUSTD: '0.00000 USDT',
                rewards: '0',
                rewardsUSTD: '0.00000 USDT',
                purchased: '0',
                purchasedSecond: '0 Seconds',
            },
            teams: {
                snakes: '0 ETH',
                whales: '0 ETH',
                bulls: '0 ETH',
                bears: '0 ETH',
            }
        };
        _this.status = 0;
        _this.updateData = new egret.Timer(2000, 0);
        /**load Container skin */
        _this.skinName = "resource/eui_modules/Game/GameStatisticsUI.exml";
        return _this;
    }
    GameStatistics.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.modal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clostFun, this);
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 0), this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 1), this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTab.bind(this, 2), this);
        this.updateData.addEventListener(egret.TimerEvent.TIMER, this.getData, this);
    };
    GameStatistics.prototype.getData = function () {
        this.getTeamTotalPot();
        this.getTotalKey();
    };
    /**
     * 获取四个队的奖池总金额
     */
    GameStatistics.prototype.getTeamTotalPot = function () {
        var _this = this;
        $gameContractInstance.teamPot(0, function (err, Coin) {
            if (err) {
                console.log("++++++", err);
                _this.updateData.stop();
            }
            else {
                _this.data.teams.whales = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        $gameContractInstance.teamPot(1, function (err, Coin) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.teams.bears = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        $gameContractInstance.teamPot(2, function (err, Coin) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.teams.snakes = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        $gameContractInstance.teamPot(3, function (err, Coin) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.teams.bulls = web3js.fromWei(Coin[0]).toFixed(5) + "ETH";
            }
        });
        this.data.stats.totalInvested = (parseFloat(this.data.teams.snakes.split("E")[0]) + parseFloat(this.data.teams.whales.split("E")[0])
            + parseFloat(this.data.teams.bulls.split("E")[0]) + parseFloat(this.data.teams.bears.split("E")[0])).toFixed(6) + "";
        $Content.game.data.totalInvest = "e" + parseFloat(this.data.stats.totalInvested).toFixed(2);
        getEthXUSDrate().then(function (rate) {
            _this.data.stats.totalUSTD = (parseFloat(rate + "") * parseFloat(_this.data.stats.totalInvested + "")).toFixed(4) + " USDT";
            $Content.game.data.totalInvestUsd = _this.data.stats.totalUSTD;
        });
        $gameContractInstance.totalKeyBonus(function (err, Coin) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.stats.rewards = parseFloat(web3js.fromWei(Coin, 'ether') + "").toFixed(6) + "";
                getEthXUSDrate().then(function (rate) {
                    _this.data.stats.rewardsUSTD = (parseFloat(rate + "") * parseFloat(_this.data.stats.rewards + "")).toFixed(4) + " USDT";
                });
            }
        });
    };
    /**
     * 获取总钥匙
     */
    GameStatistics.prototype.getTotalKey = function () {
        var _this = this;
        $gameContractInstance.round(function (err, round) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.currentRound = '#' + round.toNumber();
            }
        });
        $gameContractInstance.totalKey(function (err, keys) {
            if (err) {
                console.log(err);
            }
            else {
                _this.data.round.totalKeys = "Total " + keys.toString() + " Keys";
                _this.data.stats.purchasedSecond = keys * 30 + " S";
                _this.data.stats.purchased = (keys * 30 / 60 / 60 / 24 / 365).toFixed(4) + "";
            }
        });
    };
    GameStatistics.prototype.clostFun = function () {
        this.updateData.stop();
        var group = $Modal.gameStatistics.$children[1];
        var tw = egret.Tween.get(group); //开始动画
        tw.to({ y: 1716 }, 200).call(function () {
            $Modal.gameStatistics.visible = false;
            tw = null;
        });
    };
    GameStatistics.prototype.selectTab = function (target) {
        if (target !== this.status) {
            if (target === 0) {
                this.tabBg1.visible = true;
                this.tabAct1.source = 'statistics_text_round_zh_png';
                this.tabActEn1.source = 'statistics_text_round_en_png';
                this.tabBg2.visible = false;
                this.tabAct2.source = 'statistics_text_stats1_zh_png';
                this.tabActEn2.source = 'statistics_text_stats1_en_png';
                this.tabBg3.visible = false;
                this.tabAct3.source = 'statistics_text_teams1_zh_png';
                this.tabActEn3.source = 'statistics_text_teams1_en_png';
                this.roundTab.visible = true;
                this.statsTab.visible = false;
                this.teamsTab.visible = false;
            }
            if (target === 1) {
                this.tabBg1.visible = false;
                this.tabAct1.source = 'statistics_text_round1_zh_png';
                this.tabActEn1.source = 'statistics_text_round1_en_png';
                this.tabBg2.visible = true;
                this.tabAct2.source = 'statistics_text_stats_zh_png';
                this.tabActEn2.source = 'statistics_text_stats_en_png';
                this.tabBg3.visible = false;
                this.tabAct3.source = 'statistics_text_teams1_zh_png';
                this.tabActEn3.source = 'statistics_text_teams1_en_png';
                this.roundTab.visible = false;
                this.statsTab.visible = true;
                this.teamsTab.visible = false;
            }
            if (target === 2) {
                this.tabBg1.visible = false;
                this.tabAct1.source = 'statistics_text_round1_zh_png';
                this.tabActEn1.source = 'statistics_text_round1_en_png';
                this.tabBg2.visible = false;
                this.tabAct2.source = 'statistics_text_stats1_zh_png';
                this.tabActEn2.source = 'statistics_text_stats1_en_png';
                this.tabBg3.visible = true;
                this.tabAct3.source = 'statistics_text_teams_zh_png';
                this.tabActEn3.source = 'statistics_text_teams_en_png';
                this.roundTab.visible = false;
                this.statsTab.visible = false;
                this.teamsTab.visible = true;
            }
            this.status = target;
        }
    };
    return GameStatistics;
}(eui.Component));
__reflect(GameStatistics.prototype, "GameStatistics");
