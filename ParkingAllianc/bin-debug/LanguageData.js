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
        /**register Modal */
        register_info_2: '· 玩家可在本頁面花費0.02ETH購買成為隊長。',
        register_info_3: '· 隊長可獲得自己推薦的用戶購買投入的一部分ETH作為推薦人獎勵。',
        register_info_4: '· 隊長推薦的使用者也購買投入後隊長等級會得到提升（最高為5級）。等級越高可獲得的推薦人獎勵越多。',
        register_info_5: '· 玩家的直接推薦人視為1代推薦人，1代推薦人的推薦人視為2代推薦人，2代推薦人的推薦人視為3代推薦人……當其中一個玩家購買後將給予其1代推薦人一定ETH獎勵。',
        /**help Modal */
        help_text_1: '1. 遊戲如何結束？',
        help_text_2: '      遊戲倒計時24小時，玩家每煉丹1次增加30分鐘的遊戲時間，遊戲結束後，最後投入的10名玩家將會獲得獎池中的大獎。',
        help_text_3: '2. 如何進行ETH投入？',
        help_text_4: '      ETH投入每次定投3 ETH，投入後本次投入將進入收益序列，每個玩家最多能有30次投入進入收益序列。當你的收益大於3ETH時複投會自動扣除你的收益進行投入而不是你錢包的餘額。',
        help_text_5: '3. 領袖有什麼用？',
        help_text_6: '      玩家在遊戲中可申請成為領袖，領袖可將遊戲推薦給其他人，當被推薦人在遊戲中投入ETH後，領袖能獲得最大的直接推薦獎勵。\n' +
            '如果領袖推薦的玩家投入了ETH，領袖就能提升等級，推薦的玩家越多，領袖等級越高，獲得的推薦人收益也會增加，最高不超過4級\n' +
            '領袖等級提升後，其推薦的玩家如果再推薦了其他玩家，領袖也能獲得獎勵，其收益和等級成正比。\n',
        help_text_7: '4. 什麼是幸運獎池？',
        help_text_8: '      每週五的12:00點，將會隨機選出9名玩家成為幸運玩家，第一名獲得50%的幸運獎池獎金，第2、3、4名平分獲得30%的幸運獎池獎金，第5、6、7、8、9名平均獲得20%的幸運獎池獎金。',
        help_text_9: '5. 如何獲得收益？',
        help_text_10: '      玩家獲得收益的方法主要分為3類：\n' +
            'A.\t玩家投入ETH後，如果後續有其他人繼續投入，並且當前收益排序輪到了該玩家，該玩家就能獲得收益，當收益等於最大收益時，該玩家出局，下一個收益序列的玩家開始獲得收益，以此不斷迴圈。\n' +
            'B.\t玩家可申請成為領袖，創建連接分享遊戲給其他人，領袖能獲得被推薦人的購買分成。\n' +
            'C.\t接收推薦連結的玩家之間會形成聯盟，在聯盟之內的玩家可以得到聯盟獎勵。一個玩家的聯盟內最多能有10個玩家。\n' +
            'D.\t每週五的12點將隨機抽取10名玩家獲得幸運獎池中的獎金。' +
            'E.\t時間結束後，最後一個投入的玩家獲得50%的獎池獎勵，倒數2-9個投入的玩家均分剩下50%的獎池獎勵。',
        help_text_11: '6. 結算獎勵如何分配？',
        help_text_12: '遊戲時間結束，最後一個投入的玩家獲得50%的獎池獎勵，倒數2-9個投入的玩家均分剩下50%的獎池獎勵。',
        /**game main */
        mainTips1: "剩餘投入次數:",
        mainTips2: "同時最多可投入 30 次，每次需投入 3 ETH",
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
        isQueue: "投注次数大于10，不能投注！"
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
        /**register Modal */
        register_info_2: '· Address must be unique',
        register_info_3: '· Dont exceed 32 characters',
        register_info_4: '· Address must lower case and number',
        register_info_5: '· Address dont simply number',
        /**help Modal */
        help_text_1: '1. How does the game end?',
        help_text_2: 'When the game is down - every time the player invests 1 Times increased - minutes of the game, the end of the game, the final input Ten players will get a big prize in the prize pool.',
        help_text_3: '2. How do I proceed? ETH input?',
        help_text_4: 'ETH devote each time to a fixed investment 3 ETH , the investment will be entered into the revenue sequence, each player can have up to Ten inputs into the revenue sequence. When your earnings are greater than 3ETH , you will automatically deduct your income from the investment rather than the remainder of your wallet. The player can withdraw the principal.',
        help_text_5: '3. What\'s the use of the leader\'s sleeve?',
        help_text_6: 'The player can be used as a leader in the game, and the leader can recommend the game to others, when the person is recommended to put in the game ETH then, the leader can get the most direct encouragement.\n' +
            'if the leader\'s recommended player puts ETH , the leader can upgrade the class, the more recommended players, the higher the level of the leader sleeves, the benefit of the recommended people will increase, the highest not over 4 rating.\n' +
            'Once the leader has been promoted, the recommended player will be able to reward other players, whose benefits are proportional to the rating.\n',
        help_text_7: '4.  What is the lucky prize pool?',
        help_text_8: '      per week, five 12:00pm Will be chosen randomly. 9 The first player to be a lucky player 50% Prize Pool Award, the first 2 , 3 , 4 The name is equally divided. 30% Prize Pool Award, the first 5 , 6 , 7 , 8 , 9 The average gain of the name 20% Lucky Prize in the jackpot.',
        help_text_9: '5. How to get benefits?',
        help_text_10: 'the way the player gains revenue is mainly divided into 3 Category:\n' +
            'A. Player Input ETH then, if the other person continues to invest, and when the pre-order returns to the player, the player gains the benefit, and when the profit is the most profitable, the player is out, and the next profit sequence player starts earning the proceeds, so that\'s the loop.\n' +
            'B. players can claim to be a leader, create a link to share the game to other people, and the leader can get the purchased shares of the recommended person.\n' +
            'C. The players who receive the recommended connections form the union, and the Alliance rewards players in the league. A player\'s union can have up to ten players.\n' +
            'D. per week, five A The random machine Ten the player is entitled to the prize in the luckily prize pool.\n' +
            'E. After the end of the time , the last player to put in 50% prize pool, pour 2-9 the players who put in 50% Prize pool.',
        help_text_11: '6. Settlement reward.',
        help_text_12: 'Game time is over . finally put in Ten players split all the prize pools.',
        /**game main */
        mainTips1: "Incentive:",
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
        isQueue: "You are still in the queue and cannot be purchased"
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
        $Content.game.statistics.source = 'icon_tj_png';
        $Content.game.invite.source = 'icon_tjzc_png';
        $Content.game.faq.source = 'icon_gl_png';
        $Content.game.lang.source = 'icon_ft_png';
        $Content.game.buyBtn.$children[1].source = 'btn_text_gmyc_zh_png';
        $Content.game.registerBtn.$children[1].source = 'btn_text_register_zh_png';
        $Content.game.withdrawBtn.$children[1].source = 'btn_text_tq_zh_png';
        $Content.game.stelaTitle.source = 'title1_week_pot_png';
        $Content.game.stelaTitle2.source = 'title2_my_sort_png';
        $Content.game.timesImg.source = 'yx_text_ljcs_zh_png';
        $Content.game.allBuyImg.source = 'yx_text_ljtr_zh_png';
        $Content.game.bonusImg.source = 'yx_text_fhsy_zh_png';
        $Content.game.finalLuck.source = 'title1_max_pot_zh_png';
        $Content.game.totalOutImg.source = 'title2_out_sort_png';
        $Content.game.outTimeImg.source = 'yx_text_cjcs_zh_png';
        $Content.game.notOutImg.source = 'yx_text_wccs_zh_png';
        $Content.game.levelUpImg.source = 'yx_text_jjsy_zh_png';
        $Content.game.leaderImg.source = 'yx_text_lxsy_zh_png';
        $Content.game.roundTImg.source = 'yx_text_ltsy_zh_png';
        $Content.game.myBuyTitle1.source = 'title3_my_send_png';
        $Content.game.myBounsTitle2.source = 'title3_my_profit_png';
        $Content.game.alertModal.$children[1].source = 'special_effects_text_png';
        $Content.game.roundZh.visible = false;
        $Content.game.roundEn.visible = false;
        $Modal.gameHelp.langTitleImg.source = 'title_text_faq_zh_png';
        $Modal.gameAlert.submitBtn.$children[1].source = 'btn_text_fz_zh_png';
        $Modal.register.title.source = 'title_text_referee_zh_png';
        $Modal.register.registerBtn.$children[1].source = 'btn_text_yqdy_zh_png';
        $Modal.register.linkGroup.$children[0].source = 'title_text_yqlj_zh_png';
        $Modal.register.copyBtn.$children[1].source = 'btn_text_fz_zh2_png';
        $Modal.gameStatistics.title.source = 'title_text_strategy_zh2_png';
        $Modal.gameStatistics.tabAct1.visible = true;
        $Modal.gameStatistics.tabActEn1.visible = false;
        $Modal.gameStatistics.tabAct2.visible = true;
        $Modal.gameStatistics.tabActEn2.visible = false;
        $Modal.gameStatistics.tabAct3.visible = true;
        $Modal.gameStatistics.tabActEn3.visible = false;
        $Modal.gameStatistics.tabAct4.visible = true;
        $Modal.gameStatistics.tabActEn4.visible = false;
        $Modal.gameStatistics.luckyTitle.source = 'title_text_xyph_png';
        $Modal.gameStatistics.overtimeImg.source = 'statistics_stats_text_djs_zh_png';
        $Modal.gameStatistics.potImg.source = 'statistics_stats_text_zhdjjc_zh_png';
        $Modal.gameStatistics.listNum.source = 'statistics_text_cjxh_png';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_zh_png';
        $Modal.gameStatistics.totalBuyTimes.source = 'statistics_stats_text_ztd_zh_png';
        $Modal.gameStatistics.myBuyTimes.source = 'statistics_stats_text_wdtd_zh_png';
    }
    if (lang === $EN.type) {
        $AlertMsg = $EN.msg;
        $Content.game.langData = $EN.game;
        $Modal.gameHelp.langData = $EN.game;
        $Modal.register.langData = $EN.game;
        /**img language change */
        $Content.game.statistics.source = 'icon_tj_en_png';
        $Content.game.invite.source = 'icon_tjzc_en_png';
        $Content.game.faq.source = 'icon_gl_en_png';
        $Content.game.lang.source = 'icon_ft_en_png';
        $Content.game.buyBtn.$children[1].source = 'btn_text_gmyc_en_png';
        $Content.game.registerBtn.$children[1].source = 'btn_text_register_en_png';
        $Content.game.withdrawBtn.$children[1].source = 'btn_text_tq_en_png';
        $Content.game.stelaTitle.source = 'title1_week_pot_en_png';
        $Content.game.stelaTitle2.source = 'title2_my_sort_en_png';
        $Content.game.timesImg.source = 'yx_text_ljcs_en_png';
        $Content.game.allBuyImg.source = 'yx_text_ljtr_en_png';
        $Content.game.bonusImg.source = 'yx_text_fhsy_en_png';
        $Content.game.finalLuck.source = 'title1_max_pot_en_png';
        $Content.game.totalOutImg.source = 'title2_out_sort_en_png';
        $Content.game.outTimeImg.source = 'yx_text_cjcs_en_png';
        $Content.game.notOutImg.source = 'yx_text_wccs_en_png';
        $Content.game.levelUpImg.source = 'yx_text_jjsy_en_png';
        $Content.game.leaderImg.source = 'yx_text_lxsy_en_png';
        $Content.game.roundTImg.source = 'yx_text_ltsy_en_png';
        $Content.game.myBuyTitle1.source = 'title3_my_send_en_png';
        $Content.game.myBounsTitle2.source = 'title3_my_profit_en_png';
        $Content.game.alertModal.$children[1].source = 'special_effects_text_en_png';
        $Content.game.roundZh.visible = false;
        $Content.game.roundEn.visible = false;
        $Modal.gameHelp.langTitleImg.source = 'title_text_faq_en_png';
        $Modal.gameAlert.submitBtn.$children[1].source = 'btn_text_fz_en_png';
        $Modal.register.title.source = 'title_text_referee_en_png';
        $Modal.register.registerBtn.$children[1].source = 'btn_text_yqdy_en_png';
        $Modal.register.linkGroup.$children[0].source = 'title_text_yqlj_en_png';
        $Modal.register.copyBtn.$children[1].source = 'btn_text_fz_en2_png';
        $Modal.gameStatistics.title.source = 'title_text_strategy_en_png';
        $Modal.gameStatistics.tabAct1.visible = false;
        $Modal.gameStatistics.tabActEn1.visible = true;
        $Modal.gameStatistics.tabAct2.visible = false;
        $Modal.gameStatistics.tabActEn2.visible = true;
        $Modal.gameStatistics.tabAct3.visible = false;
        $Modal.gameStatistics.tabActEn3.visible = true;
        $Modal.gameStatistics.tabAct4.visible = false;
        $Modal.gameStatistics.tabActEn4.visible = true;
        $Modal.gameStatistics.luckyTitle.source = 'title_text_xyph_en_png';
        $Modal.gameStatistics.overtimeImg.source = 'statistics_stats_text_djs_en_png';
        $Modal.gameStatistics.potImg.source = 'statistics_stats_text_zhdjjc_en_png';
        $Modal.gameStatistics.listNum.source = 'statistics_text_cjxh_en_png';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_en_png';
        $Modal.gameStatistics.totalBuyTimes.source = 'statistics_stats_text_ztd_en_png';
        $Modal.gameStatistics.myBuyTimes.source = 'statistics_stats_text_wdtd_en_png';
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
