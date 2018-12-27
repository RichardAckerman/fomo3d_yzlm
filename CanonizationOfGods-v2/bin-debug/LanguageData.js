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
        approve: "授權額度:",
        /**register Modal */
        register_info_2: '· 玩家可在本頁面花費2 ODF購買成為隊長。',
        register_info_3: '· 隊長可獲得自己推薦的用戶購買投入的一部分ODF作為推薦人獎勵。',
        register_info_4: '· 隊長推薦的使用者也購買投入後隊長等級會得到提升（最高為3級）。等級越高可獲得的推薦人獎勵越多。',
        register_info_5: '· 玩家直接分享邀請的玩家視為第1玩家，第1玩家直接分享的玩家第2玩家，第2直接分享的玩家視為第3玩家，。。。當其中一位玩家購買後將給予其第1分享玩家一定的ODF分享權益獎勵。',
        /**help Modal */
        help_text_1: '1. 遊戲如何結束？',
        help_text_2: '      遊戲倒計時24小時，玩家每煉丹1次增加30分鐘的遊戲時間，遊戲結束後，最後投入的10名玩家將會獲得ODF中的獲獎權益。',
        help_text_3: '2. 什麼是授權額度？',
        help_text_4: '     玩家開始遊戲需要對ODF進行授權，每次授權額度為10000，進行遊戲會消耗額度。額度為0後需要再次授權。',
        help_text_5: '3. 玩家如何獲得序號（煉丹）？',
        help_text_6: '      當玩家點擊煉丹後即可獲得序號。單次購買花費 200 ODF。每個玩家最多能有30次投入進入收益序列。當你的收益大於200 ODF時會自動扣除你的收益進行投入而不是你錢包的餘額。每複投10輪，玩家可以提取一輪的(200枚)ODF。',
        help_text_7: '4. 分享道友有什麼用？',
        help_text_8: '      玩家可在遊戲介面點擊“邀請”按鈕，購買分享連結邀請新玩家，將遊戲分享給其他人。\n' +
            '當新玩家成功購買後視為分享成功。\n' +
            '分享的玩家越多其分享等級越高，可以獲得的分享權益也越多。\n',
        help_text_9: '5. 如何獲得收益？',
        help_text_10: '      玩家獲得收益的方式如下：\n' +
            'A.\t玩家最新購買序號花費的ODF，將會作為收益（收益為部分所花費的ODF）給該序號之前的購買過且未出局的玩家。\n' +
            'B.\t玩家A可分享道友，將分享連結發給未購買過的玩家B，當玩家B在此地址成功煉丹（購買）後玩家A即可獲得分享道友收益。\n' +
            'C.\t每炼丹1000次，将分配部分奖池给最近下注的玩家，直到这部分奖池分完。\n' +
            'D.\t當遊戲時間結束最後購買的10名玩家可以獲得ODF權益。',
        help_text_11: '6. 結算權益如何分配？',
        help_text_12: '     遊戲時間結束後。以最後10筆交易為准產生權益玩家。',
        /**game main */
        mainTips1: "剩餘煉丹次數",
        mainTips2: "同時最多可煉丹 30 次，每次需投入 200 ODF",
        /**register */
        link: "邀请链接"
    },
    msg: {
        zeroBalance: "余額為零，不能提現",
        copySuc: "復制成功",
        errorKey: "請輸入正確key數",
        errorReg: "格式錯誤！",
        errInput: "請輸入正確的個數",
        readyTime: "準備時間，不能購買！",
        selfReferrer: "不能推薦自己",
        isQueue: "投注次数大于10，不能投注！",
        alreadyBuy: '您發生的交易，正在以太坊網絡出塊打包進行中，請稍後。',
        inviteApprove: "进行邀请需要ODF\n现在将为你授权10000 ODF！\n",
        buyApprove: "进行炼丹需要ODF\n现在将为你授权10000 ODF！\n",
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
        approve: "Authorized:",
        /**register Modal */
        register_info_2: '· Address must be unique',
        register_info_3: '· Dont exceed 32 characters',
        register_info_4: '· Address must lower case and number',
        register_info_5: '· Address dont simply number',
        /**help Modal */
        help_text_1: '1. How does the game end?',
        help_text_2: 'Game Countdown - hours, each player invests 1 Times +30 minutes of game time, after the game is over, finally put into the Ten players will be awarded the jackpot in the prize pool.',
        help_text_3: '2. What is the degree of authorization?',
        help_text_4: 'The player needs to start the game ODF Authority , each time it is granted the right to authorize 10000 ODF , the game will consume an extra degree. It will need to be granted again after 0 .',
        help_text_5: '3. ow to do ODF input?',
        help_text_6: 'When the player clicks on alchemy, he can get the order. Buy a single time to spend the ODF. the maximum number of times each player can enter a revenue sequence. When your earnings are greater than ODF , you will automatically deduct your earnings into investment rather than the remainder of your wallet. for each round , the player can withdraw a round of principal.',
        help_text_7: '4. What\'s the use of the leader?',
        help_text_8: 'Players can apply to be captain in the game, the captain can recommend the game to other people, when the recommended person in the game to put ODF , the captain can get the maximum Direct referral reward.\n' +
            'If the player recommended by the captain puts ODF, the captain will be able to raise the level.\n' +
            'The more recommended players, the higher the Captain level, the benefit of the referral will be increased, the highest not more than 5 level.\n',
        help_text_9: '5. How to get benefits?',
        help_text_10: 'the way the player gains revenue is mainly divided into 3 class:\n' +
            'A. Player Input ODF after that, if someone else continues to invest, and the current revenue sort is on the player, the player will get the benefit when equals maximum benefit, the player is out of the game, and the next profit sequence player starts earning revenue, which keeps cycling.\n' +
            'B. Players can apply to become captain, create a Connection Sharing game to others, the captain can get the recommended person to put ODF for more details see Captain Fund allocation form\n' +
            'C. per alchemy 1000 , part of the prize pool will be allocated to the most recently bet players until this part of the prize pool is divided.\n' +
            'D. When the game is finished, the last thing you buy Ten players can get all the rewards of prize pool.\n',
        help_text_11: '6. Settlement reward.',
        help_text_12: 'Game time is over . finally put in Ten players split all the prize pools.',
        /**game main */
        mainTips1: "Remaining:",
        mainTips2: "You can make up to 30 shots,200 ODF every time",
        /**register */
        link: "My link:"
    },
    msg: {
        zeroBalance: "Balance is zero, cant be cashed out",
        copySuc: "Successful copy",
        errorKey: "Please enter the correct number of keys",
        errorReg: "Input format is wrong!",
        errInput: "Please enter the correct number",
        zeroInput: "The input cannot be zero",
        readyTime: "Preparation time, cannot be purchased！",
        selfReferrer: "Don\'t recommend  yourself",
        isQueue: "You are still in the queue and cannot be purchased",
        alreadyBuy: 'The transaction you have made is being packaged in the ethereum network. Please wait.',
        inviteApprove: "Send needs ODF\nAuthorize 10000 ODF !",
        buyApprove: "Send needs ODF\nAuthorize 10000 ODF !"
    }
};
var $AlertMsg = $ZHTW.msg;
/**
 * language methods
 */
var langStatus = $ZHTW.type;
function changeLang(lang) {
    if (lang === $ZHTW.type) {
        $AlertMsg = $ZHTW.msg;
        $Content.game.langData = $ZHTW.game;
        $Modal.gameHelp.langData = $ZHTW.game;
        $Modal.register.langData = $ZHTW.game;
        /**img language change */
        $Content.game.statistics.source = 'icon_tj';
        $Content.game.invite.source = 'icon_tjzc';
        $Content.game.faq.source = 'icon_gl';
        $Content.game.lang.source = 'icon_ft';
        $Content.game.buyBtnG.$children[1].source = 'btn_text_gmyc_zh';
        $Content.game.withdrawBtn.$children[1].source = 'yx_text_tq_zh';
        $Content.game.stelaTitle.source = 'yx_text_cjxh_zh';
        $Content.game.stelaTitle2.source = 'yx_text_jc_zh';
        $Content.game.myNumImg.source = 'yx_text_fhqy_zh';
        $Content.game.timesImg.source = 'yx_text_ljcs_zh';
        $Content.game.allBuyImg.source = 'yx_text_ljtr_zh';
        $Content.game.inviteImg.source = 'yx_text_dqsy_zh';
        $Content.game.bonusImg.source = 'yx_text_fhsy_zh';
        $Content.game.winImg.source = 'yx_text_ktsy_zh';
        $Content.game.earning.source = 'yx_text_ldz_zh';
        $Content.game.pToearning.source = 'yx_text_zbld_zh';
        $Content.game.alertModal.$children[0].source = 'special_effects_text_png';
        $Content.game.roundZh.visible = true;
        $Content.game.roundEn.visible = false;
        $Modal.gameHelp.langTitleImg.source = 'title_text_faq_zh';
        $Modal.gameAlert.title.source = 'title_text_ts';
        $Modal.gameAlert.submitBtn.$children[1].source = 'btn_text_fz_zh';
        $Modal.register.title.source = 'title_text_referee_zh';
        $Modal.register.registerBtn.$children[1].source = 'btn_text_yqdy_zh';
        $Modal.register.linkGroup.$children[0].source = 'title_text_yqlj_zh';
        $Modal.register.copyBtn.$children[1].source = 'btn_text_fz_1_zh';
        $Modal.gameStatistics.title.source = 'title_text_strategy_zh';
        $Modal.gameStatistics.tabAct1.visible = true;
        $Modal.gameStatistics.tabActEn1.visible = false;
        $Modal.gameStatistics.tabAct2.visible = true;
        $Modal.gameStatistics.tabActEn2.visible = false;
        $Modal.gameStatistics.tabAct3.visible = true;
        $Modal.gameStatistics.tabActEn3.visible = false;
        $Modal.gameStatistics.overtimeImg.source = 'statistics_stats_text_djs_zh';
        $Modal.gameStatistics.potImg.source = 'statistics_stats_text_dc_zh';
        $Modal.gameStatistics.listNum.source = 'statistics_stats_text_dr_zh';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_zh';
        $Modal.approve.title.source = 'title_text_ts';
        $Modal.approve.submitBtn.$children[1].source = 'btn_sure_zh';
        $Modal.approve.cancelBtn.$children[1].source = 'btn_cancel_zh';
    }
    if (lang === $EN.type) {
        $AlertMsg = $EN.msg;
        $Content.game.langData = $EN.game;
        $Modal.gameHelp.langData = $EN.game;
        $Modal.register.langData = $EN.game;
        /**img language change */
        $Content.game.statistics.source = 'icon_tj_en';
        $Content.game.invite.source = 'icon_tjzc_en';
        $Content.game.faq.source = 'icon_gl_en';
        $Content.game.lang.source = 'icon_ft_en';
        $Content.game.buyBtnG.$children[1].source = 'btn_text_gmyc_en';
        $Content.game.withdrawBtn.$children[1].source = 'yx_text_tq_en';
        $Content.game.stelaTitle.source = 'yx_text_cjxh_en';
        $Content.game.stelaTitle2.source = 'yx_text_jc_en';
        $Content.game.myNumImg.source = 'yx_text_fhsy_en';
        $Content.game.timesImg.source = 'yx_text_ljcs_en';
        $Content.game.allBuyImg.source = 'yx_text_ljtr_en';
        $Content.game.inviteImg.source = 'yx_text_dqsy_en';
        $Content.game.bonusImg.source = 'yx_text_fhsy_en';
        $Content.game.winImg.source = 'yx_text_ktsy_en';
        $Content.game.earning.source = 'yx_text_ldz_en';
        $Content.game.pToearning.source = 'yx_text_zbld_en';
        $Content.game.alertModal.$children[0].source = 'special_effects_text_en_png';
        $Content.game.roundZh.visible = false;
        $Content.game.roundEn.visible = true;
        $Modal.gameHelp.langTitleImg.source = 'title_text_faq_en';
        $Modal.gameAlert.title.source = 'title_text_ts_en';
        $Modal.gameAlert.submitBtn.$children[1].source = 'btn_text_fz_en';
        $Modal.register.title.source = 'title_text_referee_en';
        $Modal.register.registerBtn.$children[1].source = 'btn_text_yqdy_en';
        $Modal.register.linkGroup.$children[0].source = 'title_text_yqlj_en';
        $Modal.register.copyBtn.$children[1].source = 'btn_text_fz_1_en';
        $Modal.gameStatistics.title.source = 'title_text_strategy_en';
        $Modal.gameStatistics.tabAct1.visible = false;
        $Modal.gameStatistics.tabActEn1.visible = true;
        $Modal.gameStatistics.tabAct2.visible = false;
        $Modal.gameStatistics.tabActEn2.visible = true;
        $Modal.gameStatistics.tabAct3.visible = false;
        $Modal.gameStatistics.tabActEn3.visible = true;
        $Modal.gameStatistics.overtimeImg.source = 'statistics_stats_text_djs_en';
        $Modal.gameStatistics.potImg.source = 'statistics_stats_text_dc_en';
        $Modal.gameStatistics.listNum.source = 'statistics_stats_text_dr_en';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_en';
        $Modal.approve.title.source = 'title_text_ts_en';
        $Modal.approve.submitBtn.$children[1].source = 'btn_sure_en';
        $Modal.approve.cancelBtn.$children[1].source = 'btn_cancel_en';
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
        $Modal.language.title.source = 'yuyan_text_zh';
        $Modal.language.langZHTW_choosed.visible = true;
        $Modal.language.langEN_choosed.visible = false;
    }
    if (lang === $EN.type) {
        $Modal.language.title.source = 'yuyan_text_en';
        $Modal.language.langZHTW_choosed.visible = false;
        $Modal.language.langEN_choosed.visible = true;
    }
}
