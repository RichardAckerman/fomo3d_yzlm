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
        bear_team_title: '死侍戰隊',
        cow_team_title: '鳳凰女戰隊',
        snake_team_title: '金剛狼戰隊',
        whale_team_title: '萬磁王戰隊',
        remind_1: '滑動或點擊箭頭選擇壹個隊伍',
        /**register modal */
        register_info_2: '· 玩家可在本頁面花費0.02ETH購買成為隊長。',
        register_info_3: '· 隊長可獲得自己推薦的用戶購買投入的一部分ETH作為推薦人獎勵。',
        register_info_4: '· 隊長推薦的使用者也購買投入後隊長等級會得到提升（最高為5級）。等級越高可獲得的推薦人獎勵越多。',
        register_info_5: '· 玩家的直接推薦人視為1代推薦人，1代推薦人的推薦人視為2代推薦人，2代推薦人的推薦人視為3代推薦人……當其中一個玩家購買後將給予其1代推薦人一定ETH獎勵。',
        panalTips1: "同時最多可投放 30 次，每次 1 ETH",
        panalTips2: "剩余投放次數:",
        /**help modal */
        help_text_1: '1. 遊戲怎樣結束？',
        help_text_2: '      遊戲倒計時24小時，玩家每投入1次增加一个小时的遊戲時間，遊戲結束後，最後投入的10名玩家將會獲得獎池中的大獎。',
        help_text_3: '2. 如何進行ETH投入？',
        help_text_4: '      ETH投入每次定投1 ETH，投入後本次投入將進入收益序列，每個玩家最多能有30次投入進入收益序列。當你的收益大於1ETH時會自動扣除你的收益進行投入而不是你錢包的餘額。複投10輪，玩家可以提取所有本金。',
        help_text_5: '3. 隊長有什麼用？',
        help_text_6: '      玩家在遊戲中可申請成為隊長，隊長可將遊戲推薦給其他人，當被推薦人在遊戲中投入ETH後，隊長能獲得最大的直接推薦獎勵。\n' +
            '如果隊長推薦的玩家投入了ETH，隊長就能提升等級，推薦的玩家越多，隊長等級越高，獲得的推薦人收益也會增加，最高不超過5級。\n' +
            '隊長等級提升後，其推薦的玩家如果再推薦了其他玩家，隊長也能獲得獎勵，其收益和等級成正比。\n',
        help_text_7: '4. 如何獲得收益？',
        help_text_8: '      玩家獲得收益的方法主要分為3類：\n' +
            'A.\t玩家投入ETH後，如果後續有其他人繼續投入，並且當前收益排序輪到了該玩家，該玩家就能獲得收益，當收益等於最大收益時，該玩家出局，下一個收益序列的玩家開始獲得收益，以此不斷迴圈。\n' +
            'B.\t玩家可申請成為隊長，創建連接分享遊戲給其他人，隊長能獲得被推薦人投入ETH的一定比列，詳情見隊長資金分配表\n' +
            'C.\t接收推薦連結的玩家之間會形成聯盟，在聯盟之內的玩家可以得到聯盟獎勵。一個玩家的聯盟內最多能有10個玩家。\n' +
            'D.\t時間結束後，最後投入的10名玩家平分所有獎池獎勵。',
        help_text_9: '5. 結算獎勵.',
        help_text_10: '     遊戲時間結束最後10名玩家平分所有獎勵。',
    },
    msg: {
        zeroBalance: "余額為零，不能提現",
        exceedBalance: "單次下註金額不能大於20ETH",
        copySuc: "復制成功",
        errorKey: "請輸入正確key數",
        errorReg: "格式錯誤！",
        errInput: "請輸入正確的個數",
        readyTime: "準備時間，不能購買！",
        selfReferrer: "不能推薦自己",
        isQueue: "投注次数大于10，不能投注！",
        notSufficientFunds: "余额不足，不能投注！",
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
        bear_team_title: 'Deadpool',
        cow_team_title: 'Phoenix',
        snake_team_title: 'Wolverine',
        whale_team_title: 'Magneto',
        remind_1: 'Sliding or click a team ',
        /**register modal */
        register_info_2: '· Address must be unique',
        register_info_3: '· Dont exceed 32 characters',
        register_info_4: '· Address must lower case and number',
        register_info_5: '· Address dont simply number',
        register_info_6: '· Cannot afford have special character',
        register_info_7: '· Must not be any white space',
        panalTips1: "You can make up to 30 shots, 1 ETH at every time",
        panalTips2: "Number of residual inputs:",
        /**help modal */
        help_text_1: '1. How does the game end?',
        help_text_2: 'Game Countdown - hours, each player invests 1 Times increased one hour of game time, after the game is over, finally put into the Ten players will be awarded the jackpot in the prize pool.',
        help_text_3: '2. how to do ETH input?',
        help_text_4: 'ETH devote each time to a fixed investment 1 ETH , the investment will enter the revenue sequence, each player can have up to Thirty input into the revenue sequence. When your earnings are greater than 1ETH , you will automatically deduct your earnings to invest instead of the balance of your wallet. The player can withdraw all the principal.',
        help_text_5: '3. What\'s the use of the leader?',
        help_text_6: 'players can apply to be captain in the game, the captain can recommend the game to other people, when the recommended person in the game to put ETH , the captain can get the maximum Direct referral reward.\n' +
            'If the player recommended by the captain puts ETH , the captain will be able to raise the level, the more recommended players, the higher the Captain level, the benefit of the referral will be increased, the highest not more than 5 level.\n' +
            'Once the captain has been promoted, the recommended player will be rewarded for the bonus, which is proportional to the level of return.\n',
        help_text_7: '4. How to get benefits?',
        help_text_8: 'the way the player gains revenue is mainly divided into 3 class:\n' +
            'A. Player Input ETH after that, if someone else continues to invest, and the current revenue sort is on the player, the player will get the benefit when equals maximum benefit, the player is out of the game, and the next profit sequence player starts earning revenue, which keeps cycling.\n' +
            'B. Players can apply to become captain, create a Connection Sharing game to others, the captain can get the recommended person to put ETH for more details see Captain Fund allocation form\n' +
            'C. Alliances are formed between players who receive referral links, and players within the league can receive affiliate rewards. A player can have up to ten players in the league .\n' +
            'D. When the time is over, finally put in Ten players split all prize pool bonuses.\n',
        help_text_9: '5. Settlement reward.',
        help_text_10: 'Game time is over . finally put in Ten players split all the prize pools.',
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
        selfReferrer: "Don\'t recommend  yourself",
        isQueue: "You are still in the queue and cannot be purchased",
        notSufficientFunds: "not sufficient funds",
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
        $Content.game.extractNum.source = 'yx_text_ljcs_zh_png';
        $Content.game.myNum.source = 'yx_text_rcmdid_zh_png';
        $Content.game.currentProf.source = 'yx_text_tdjl_zh_png';
        $Content.game.unionProf.source = 'yx_text_lmjl_zh_png';
        $Content.game.extractText.source = 'yx_text_tq_zh_png';
        $Content.game.showBuyModal.$children[1].source = 'btn_text_gmyc_zh_png';
        $Content.game.statisticsBtn.source = 'icon_tj_png';
        $Content.game.registerBtn.source = 'icon_tjzc_png';
        $Content.game.helpBtn.source = 'icon_gl_png';
        $Content.game.roundZh.visible = true;
        $Content.game.roundEn.visible = false;
        $Content.game.profidImg.source = 'yx_text_fhsy_zh_png';
        $Content.game.keyImg.source = 'yx_text_ljtr_zh_png';
        $Content.game.totalAsset.source = 'yx_text_cjxh_zh_png';
        $Modal.gameStatistics.langTitleImg.source = 'title_text_statistics_zh_png';
        $Modal.gameStatistics.langRoundTime.source = 'statistics_text_cwdi_zh_png';
        $Modal.gameStatistics.langJackPot.source = 'activepot_zh_png';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_zh_png';
        $Modal.gameStatistics.totalTime.source = 'statistics_text_rcmdid_zh_png';
        $Modal.gameStatistics.totalInvestment0.source = 'statistics_stats_text_dr_zh_png';
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
        $Modal.register.langTitleImg.source = 'title_text_tjrzc_zh_png';
        $Modal.register.langRegisterBtn.source = 'btn_text_zc_zh_png';
        $Modal.gameHelp.langTitleImg.source = 'title_text_strategy_zh_png';
        $Modal.buyKey.totalTitle.source = 'gmys_text_yys_zh_png';
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
        $Content.game.languageBtn.source = 'icon_ft_en_png';
        $Content.game.langJackPot.source = 'activepot_en_png';
        $Content.game.myAsset.source = 'yx_text_wdzc_en_png';
        $Content.game.predictBonus.source = 'yx_text_djyc_en_png';
        $Content.game.extractNum.source = 'yx_text_ljcs_en_png';
        $Content.game.myNum.source = 'yx_text_rcmdid_en_png';
        $Content.game.currentProf.source = 'yx_text_tdjl_en_png';
        $Content.game.unionProf.source = 'yx_text_lmjl_en_png';
        $Content.game.extractText.source = 'yx_text_tq_en_png';
        $Content.game.showBuyModal.$children[1].source = 'gmys_text_en_png';
        $Content.game.statisticsBtn.source = 'icon_tj_en_png';
        $Content.game.registerBtn.source = 'icon_tjzc_en_png';
        $Content.game.helpBtn.source = 'icon_gl_en_png';
        $Content.game.roundZh.visible = false;
        $Content.game.roundEn.visible = true;
        $Content.game.profidImg.source = 'yx_text_fhsy_en_png';
        $Content.game.keyImg.source = 'yx_text_ljtr_en_png';
        $Content.game.totalAsset.source = 'yx_text_cjxh_en_png';
        $Modal.gameStatistics.langTitleImg.source = 'title_text_statistics_en_png';
        $Modal.gameStatistics.langRoundTime.source = 'statistics_text_cwdi_en_png';
        $Modal.gameStatistics.langJackPot.source = 'activepot_en_png';
        $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_en_png';
        $Modal.gameStatistics.totalTime.source = 'statistics_text_rcmdid_en_png';
        $Modal.gameStatistics.totalInvestment0.source = 'statistics_stats_text_dr_en_png';
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
        $Modal.register.langTitleImg.source = 'title_text_tjrzc_en_png';
        $Modal.register.langRegisterBtn.source = 'btn_text_zc_en_png';
        $Modal.gameHelp.langTitleImg.source = 'title_text_strategy_en_png';
        $Modal.buyKey.totalTitle.source = 'gmys_text_yys_en_png';
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
