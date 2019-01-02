/**
 * zh_TW data
 */
var $warn = egret.$warn;
var $ZHTW = {
    type: 'zhtw',
    container: {
        game: '遊戲',
    },
    game: {
        /**main content */
        readyTime: '準備時間',
        bear_team_title: '鋼鐵俠戰隊',
        bear_team_dis: ' ',
        cow_team_title: '綠巨人戰隊',
        cow_team_dis: ' ',
        snake_team_title: '雷神戰隊',
        snake_team_dis: ' ',
        whale_team_title: '滅霸戰隊',
        whale_team_dis: ' ',
        remind_1: '滑動或點擊箭頭選擇壹個隊伍',
        remind_2: '購買鑰匙以支持我的隊伍',
        percentChance: '你有5%的幾率獲得',
        percentChance1: '的玩家好禮',
        totalKeys: '我的钥匙:',
        buyTips: "令牌價格會緩慢增加，以實際成交價格為准.",
        /**register modal */
        register_info_1: '你將獲得被你推薦用戶 20% 的交易額（ETH）',
        register_info_2: '· 名稱必須唯一',
        register_info_3: '· 不超過32個字符',
        register_info_4: '· 名稱隻能為小寫字母+數字的組合',
        register_info_5: '· 名稱不能隻是數字',
        register_info_6: '· 不允許特殊字符',
        register_info_7: '· 字符之間不允許有空格',
        /**help modal */
        help_text_1: '1. 遊戲怎樣結束？',
        help_text_2: '      遊戲開始後的6個小時遊戲結束，遊戲結束後（時間歸0即遊戲結束），購買到最後10個令牌的玩家將獲得獎池中的大獎。',
        help_text_3: '2. 遊戲投注項目有哪些？',
        help_text_4: '      遊戲中分別有滅霸戰隊、綠巨人戰隊、雷神戰隊、鋼鐵俠戰隊4個戰隊（項目）允許玩家購買（投注）。投注每個團隊後，所參與的資金和獎池的分配方法均相同。',
        help_text_5: '3. 如何對團隊進行投注？',
        help_text_6: '      玩家需要令牌來對所選的隊伍進行投注，令牌的價格會隨著遊戲進行而緩慢增加，且每成功購買1個令牌後會增加30秒的遊戲時間，最多增加到6個小時。',
        help_text_7: '4. 什麼是玩家好禮？',
        help_text_8: '      玩家好禮：當玩家購買令牌時，有5%的機會獲得玩家好禮，獎勵直接返還到玩家的錢包。',
        help_text_9: '5. 隊長有什麼用？',
        help_text_10: '     玩家在遊戲中可申請成為隊長，隊長可將遊戲推薦給其他人，當被推薦人在遊戲中購買令牌後，隊長能獲得20%的直接推薦獎勵。\n' +
            '    如果隊長推薦的玩家購買令牌的金額超過了1ETH，隊長就能提升等級，達到要求的推薦玩家越多，隊長等級越高，獲得的獎勵也越高，最高不超過5級。\n',
        help_text_11: '6. 遊戲結束後獎池如何分配？',
        help_text_12: '     當有隊伍獲得勝利後，購買最後1個令牌的玩家獲得大部分獎勵外，另外購買倒數2-9個令牌的玩家按照令牌比例分取剩下的獎池。\n',
    },
    msg: {
        zeroBalance: "余額為零，不能提現",
        exceedBalance: "單次下註金額不能大於20ETH",
        copySuc: "復制成功",
        errorKey: "請輸入正確key數",
        errorReg: "格式錯誤！",
        errInput: "請輸入正確的個數",
        readyTime: "準備時間，不能購買！",
        selfReferrer: "不能推薦自己"
    }
};
/**
 * EN data
 */
var $EN = {
    type: 'en',
    container: {
        game: 'GAME',
    },
    game: {
        /**main content */
        readyTime: 'Ready Time',
        bear_team_title: 'Team Iron Man',
        bear_team_dis: ' ',
        cow_team_title: 'Team Hulk',
        cow_team_dis: ' ',
        snake_team_title: 'Team Thor',
        snake_team_dis: ' ',
        whale_team_title: 'Team Thanos',
        whale_team_dis: ' ',
        remind_1: 'Sliding or click a team ',
        remind_2: 'Buy a key to support me',
        percentChance: '5% chance to get',
        percentChance1: ' airdrop pot',
        totalKeys: 'My Keys:',
        buyTips: "Key prices will increase slowly, subject to transaction price.",
        /**register modal */
        register_info_1: 'Get a referrals 10% turnover(ETH)',
        register_info_2: '· Address must be unique',
        register_info_3: '· Dont exceed 32 characters',
        register_info_4: '· Address must lower case and number',
        register_info_5: '· Address dont simply number',
        register_info_6: '· Cannot afford have special character',
        register_info_7: '· Must not be any white space',
        /**help modal */
        help_text_1: '1.How did the game end?',
        help_text_2: 'after the game started 6 the end of an hour game, after the game (time 0 end of game), purchase to the end - M A key player will win the prize in the pool.',
        help_text_3: '2.What are the game betting items?',
        help_text_4: 'The game has the fight against Thor，Thanos，Hulk，Iron Man and steel team 4 a Team (project) allows a player to buy (BET). After each team is invested, the allocation of funds and economic pools is the same. ',
        help_text_5: '3.How to make a bet on a team?',
        help_text_6: 'The player needs a key to bet on the selected team, and the price of the key increases slowly as the game progresses and each successful purchase 1 a key will increase 30 seconds of game time, up to 6 an hour.',
        help_text_7: '4.What is a good gift for a player?',
        help_text_8: 'Good gift: When a player buys a key, there is a 5% the opportunity to get the player good gift, rewards directly to the player\'s wallet.',
        help_text_9: '5.What\'s the use of the captain?',
        help_text_10: 'Players can apply to be captain in the game, the captain can recommend the game to others, when the recommended person in the game to buy a key, the captain can get 5% the direct recommendation reward.\n' +
            'If the captain recommends a player purchase key that exceeds the amount of 1ETH , the captain will be able to upgrade the level, to achieve the required number of recommended players, the captain ranks higher, the award is higher, the highest not more than 5 level.\n',
        help_text_11: '6.How is the prize pool allocated after the game is over?',
        help_text_12: 'When a team wins, buy the last key players get most of the rewards and buy the reciprocal 2-9 A key player takes the remaining prize pool according to the key scale.\n',
    },
    msg: {
        zeroBalance: "Balance is zero, cant be cashed out",
        exceedBalance: "Single bet amount cannot be greater than 20ETH",
        copySuc: "Copy is successful",
        errorKey: "Please enter the correct number of keys",
        errorReg: "Input format is wrong!",
        errInput: "Please enter the correct number",
        zeroInput: "The input cannot be zero",
        readyTime: "Preparation time, cannot be purchased！",
        selfReferrer: "Don\'t recommend  yourself"
    }
};
var $AlertMsg = $ZHTW.msg;
/**
 * language methods
 */
var langStatus = $ZHTW.type;
function changeLang(lang) {
    if (lang === $ZHTW.type) {
        /**text language change */
        $Content.container.langData = $ZHTW.container;
        $Content.game.langData = $ZHTW.game;
        $Modal.gameHelp.langData = $ZHTW.game;
        $Modal.register.langData = $ZHTW.game;
        $Modal.buyKey.langData = $ZHTW.game;
        /**img language change */
        $Content.game.languageBtn.source = 'icon_ft_png';
        $Content.game.langJackPot.source = 'activepot_zh_png';
        $Content.game.myAsset.source = 'yx_text_wdzc_zh_png';
        $Content.game.predictBonus.source = 'yx_text_djyc_zh_png';
        $Content.game.extractBtn.$children[1].source = 'yx_text_tq_zh_png';
        $Content.game.showBuyModal.$children[1].source = 'btn_text_gmyc_zh_png';
        $Content.game.statisticsBtn.source = 'icon_tj_png';
        $Content.game.registerBtn.source = 'icon_tjzc_png';
        $Content.game.helpBtn.source = 'icon_gl_png';
        $Content.game.roundZh.visible = true;
        $Content.game.roundEn.visible = false;
        $Content.game.firstImg.source = 'yx_text_1_zh_png';
        $Content.game.secondImg.source = 'yx_text_2_zh_png';
        $Content.game.profidImg.source = 'yx_text_sy_zh_png';
        $Content.game.keyImg.source = 'yx_text_ys_zh_png';
        $Content.game.totalAsset.source = 'totalInvested_zh_png';
        $Modal.gameStatistics.langTitleImg.source = 'title_text_statistics_zh_png';
        $Modal.gameStatistics.langRoundTime.source = 'statistics_text_cwdi_zh_png';
        $Modal.gameStatistics.langJackPot.source = 'statistics_text_ap_zh_png';
        $Modal.gameStatistics.langMyKeys.source = 'statistics_text_mk_zh_png';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_zh_png';
        $Modal.gameStatistics.totalDividend.source = 'statistics_stats_text_dr_zh_png';
        $Modal.gameStatistics.totalTime.source = 'statistics_stats_text_tp_zh_png';
        $Modal.gameStatistics.snakeTeam.source = 'animal_sneks_png';
        $Modal.gameStatistics.whaleTeam.source = 'animal_whales_png';
        $Modal.gameStatistics.cowTeam.source = 'animal_bulls_png';
        $Modal.gameStatistics.bearTeam.source = 'animal_bears_png';
        $Modal.gameStatistics.tabAct1.visible = true;
        $Modal.gameStatistics.tabAct2.visible = true;
        $Modal.gameStatistics.tabAct3.visible = true;
        $Modal.gameStatistics.tabActEn1.visible = false;
        $Modal.gameStatistics.tabActEn2.visible = false;
        $Modal.gameStatistics.tabActEn3.visible = false;
        $Modal.refereeInfo.langTitleImg.source = 'title_text_tjdz_zh_png';
        $Modal.refereeInfo.langWalletAddr.source = 'tjdz_text_qbdz_zh_png';
        $Modal.refereeInfo.langCopyBtn1.source = 'btn_text_fz_zh_png';
        $Modal.refereeInfo.langIdAddr.source = 'tjdz_text_iddz_zh_png';
        $Modal.refereeInfo.langCopyBtn2.source = 'btn_text_fz_zh_png';
        $Modal.refereeInfo.langNameAddr.source = 'tjdz_text_mcdz1_zh_png';
        $Modal.refereeInfo.langCopyBtn3.source = 'btn_text_fz_zh_png';
        $Modal.register.langTitleImg.source = 'title_text_tjrzc_zh_png';
        $Modal.register.langRandomBtn.source = 'btn_text_sj_zh_png';
        $Modal.register.langRegisterBtn.source = 'btn_text_zc_zh_png';
        $Modal.extract.langTitleImg.source = 'title_text_yltq_zh_png';
        $Modal.extract.langExtractBtn.source = 'btn_text_tq_zh_png';
        $Modal.extract.langFenHong.source = 'yltq_text_zh_bb_png';
        $Modal.extract.langTuiJian.source = 'yltq_text_zh_ra_png';
        $Modal.extract.langTotal.source = 'yltq_text_zh_tg_png';
        $Modal.gameHelp.langTitleImg.source = 'title_text_strategy_zh_png';
        $Modal.buyKey.totalTitle.source = 'gmys_text_yys_zh_png';
        $Modal.buyKey.buyModalBtn.$children[1].source = 'btn_text_gmyc_zh_png';
        $AlertMsg = $ZHTW.msg;
    }
    if (lang === $EN.type) {
        /**text language change */
        $Content.container.langData = $EN.container;
        $Content.game.langData = $EN.game;
        $Modal.gameHelp.langData = $EN.game;
        $Modal.register.langData = $EN.game;
        $Modal.buyKey.langData = $EN.game;
        /**img language change */
        $Content.game.languageBtn.source = 'icon_yy_png';
        $Content.game.langJackPot.source = 'activepot_en_png';
        $Content.game.myAsset.source = 'yx_text_wdzc_en_png';
        $Content.game.predictBonus.source = 'yx_text_djyc_en_png';
        $Content.game.extractBtn.$children[1].source = 'yx_text_tq_en_png';
        $Content.game.showBuyModal.$children[1].source = 'btn_text_gmyc_en_png';
        $Content.game.statisticsBtn.source = 'icon_tj_en_png';
        $Content.game.registerBtn.source = 'icon_tjzc_en_png';
        $Content.game.helpBtn.source = 'icon_gl_en_png';
        $Content.game.roundZh.visible = false;
        $Content.game.roundEn.visible = true;
        $Content.game.firstImg.source = 'yx_text_1_en_png';
        $Content.game.secondImg.source = 'yx_text_2_en_png';
        $Content.game.profidImg.source = 'yx_text_sy_en_png';
        $Content.game.keyImg.source = 'yx_text_ys_en_png';
        $Content.game.totalAsset.source = 'totalInvested_en_png';
        $Modal.gameStatistics.langTitleImg.source = 'title_text_statistics_en_png';
        $Modal.gameStatistics.langRoundTime.source = 'statistics_text_cwdi_en_png';
        $Modal.gameStatistics.langJackPot.source = 'statistics_text_ap_en_png';
        $Modal.gameStatistics.langMyKeys.source = 'statistics_text_mk_en_png';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_en_png';
        $Modal.gameStatistics.totalDividend.source = 'statistics_stats_text_dr_en_png';
        $Modal.gameStatistics.totalTime.source = 'statistics_stats_text_tp_en_png';
        $Modal.gameStatistics.snakeTeam.source = 'animal_sneks_en_png';
        $Modal.gameStatistics.whaleTeam.source = 'animal_whales_en_png';
        $Modal.gameStatistics.cowTeam.source = 'animal_bulls_en_png';
        $Modal.gameStatistics.bearTeam.source = 'animal_bears_en_png';
        $Modal.gameStatistics.tabAct1.visible = false;
        $Modal.gameStatistics.tabAct2.visible = false;
        $Modal.gameStatistics.tabAct3.visible = false;
        $Modal.gameStatistics.tabActEn1.visible = true;
        $Modal.gameStatistics.tabActEn2.visible = true;
        $Modal.gameStatistics.tabActEn3.visible = true;
        $Modal.refereeInfo.langTitleImg.source = 'title_text_tjrzc_en_png';
        $Modal.refereeInfo.langWalletAddr.source = 'tjdz_text_qbdz_en_png';
        $Modal.refereeInfo.langCopyBtn1.source = 'btn_text_fz_en_png';
        $Modal.refereeInfo.langIdAddr.source = 'tjdz_text_iddz_en_png';
        $Modal.refereeInfo.langCopyBtn2.source = 'btn_text_fz_en_png';
        $Modal.refereeInfo.langNameAddr.source = 'tjdz_text_mcdz1_en_png';
        $Modal.refereeInfo.langCopyBtn3.source = 'btn_text_fz_en_png';
        $Modal.register.langTitleImg.source = 'title_text_tjrzc_en_png';
        $Modal.register.langRandomBtn.source = 'btn_text_sj_en_png';
        $Modal.register.langRegisterBtn.source = 'btn_text_zc_en_png';
        $Modal.extract.langTitleImg.source = 'title_text_yltq_en_png';
        $Modal.extract.langExtractBtn.source = 'btn_text_tq_en_png';
        $Modal.extract.langFenHong.source = 'yltq_text_en_bb_png';
        $Modal.extract.langTuiJian.source = 'yltq_text_en_ra_png';
        $Modal.extract.langTotal.source = 'yltq_text_en_tg_png';
        $Modal.gameHelp.langTitleImg.source = 'title_text_strategy_en_png';
        $Modal.buyKey.totalTitle.source = 'gmys_text_yys_en_png';
        $Modal.buyKey.buyModalBtn.$children[1].source = 'btn_text_gmyc_en_png';
        $AlertMsg = $EN.msg;
    }
}
function getLanStatus() {
    var lang = localStorage.getItem('language');
    if (lang) {
        langStatus = lang;
        changeLang(lang);
        setLanguageModalState(langStatus);
    }
}
function setLanguageModalState(lang) {
    if (lang === $ZHTW.type) {
        $Modal.language.title.source = 'yuyan_text_zh_png';
        $Modal.language.langZHTW_choosed.visible = true;
        $Modal.language.langEN_choosed.visible = false;
    }
    if (lang === $EN.type) {
        $Modal.language.title.source = 'yuyan_text_en_png';
        $Modal.language.langZHTW_choosed.visible = false;
        $Modal.language.langEN_choosed.visible = true;
    }
}
