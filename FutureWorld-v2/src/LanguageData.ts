/**
 * zh_TW data
 */
import $warn = egret.$warn;

const $ZHTW = {
    type: 'zhtw',
    container: {
        game: '遊戲',
    },
    game: {
        approve: "授權額度:",
        /**register Modal */
        register_info_2: '· 玩家可在本頁面花費 2 CKC探探成為探長。',
        register_info_3: '· 探長可獲得自己推薦的用戶探探的一部分CKC作為探長獎勵。',
        register_info_4: '· 探長推薦的使用者也探探後探長等級會得到提升（最高為4級）。等級越高可獲得的探長獎勵越多。',
        register_info_5: '· 玩家直接分享邀請的玩家視為第1玩家，第1玩家直接分享的玩家第2玩家，第2直接分享的玩家視為第3玩家，。。。當其中一位玩家探探後將給予其第1分享玩家一定的CKC分享權益獎勵。',
        /**help Modal */
        help_text_1: '1. 遊戲怎樣結束？',
        help_text_2: '      遊戲倒計時24小時，玩家每探探1次增加60分鐘的遊戲時間，遊戲結束後，最後探探的11名玩家將會獲得探池中的大獎。',
        help_text_3: '2. 如何進行CKC探探？',
        help_text_4: '     玩家每次探探需要200CKC，探探後本次探探將進入收益序列，每個玩家最多能進行20次探探進入收益序列。當你的收益大於200CKC時複投會自動扣除你的收益進行探探而不是你錢包的餘額。',
        help_text_5: '3.探長有什麼用？',
        help_text_6: '      玩家在遊戲中可申請成為探長，探長可將遊戲推薦給其他人，當被推薦人在遊戲中探探CKC後，探長能獲得最大的直接推薦獎勵。\n' +
            '如果探長推薦的玩家探探了CKC，探長就能提升等級，推薦的玩家越多，探長等級越高，獲得的探長收益也會增加，最高不超過4級。\n' +
            '探長等級提升後，其推薦的玩家如果再推薦了其他玩家，探長也能獲得獎勵，其收益和等級成正比。',
        help_text_7: '4. 如何獲得收益？',
        help_text_8: `      玩家獲得收益的方法主要分為3類：
        A.玩家後，如果後續有其他人繼續探探，並且當前收益排序輪到了該玩家，該玩家就能獲得收益，當收益等於最大收益時，該玩家出局，下一個收益序列的玩家開始獲得收益，以此不斷迴圈。
        B.玩家可申請成為探長，創建連接分享遊戲給其他人，探長能獲得被推薦人的探探分成。
        C.從遊戲開始起後的7*24H如玩家的探探序號一直在序列中未出局即可獲得CKC權益。
        D.每探探2000注，最後探探的8名玩家將平分80%的探池。獲得該權益的玩家最大探探次數將增加10。
        E.時間結束後，最後一個探探的玩家獲得50%的探池獎勵，倒數2-11個探探的玩家均分剩下50%的探池獎勵。`,
        help_text_9: '5. 獲取權益',
        help_text_10: '     遊戲時間結束，最後一個探探的玩家獲得50%的探池獎勵，倒數2-11個探探的玩家均分剩下50%的探池獎勵。',
        /**game main */
        mainTips1: "剩餘探探次數",
        mainTips2: "同时最多可探探20次，每次消耗200CKC",
        /**register */
        link: "邀请链接"
    },
    msg: {
        zeroBalance: "余額為零，不能提現",
        copySuc: "復制成功",
        errorKey: "請輸入正確key數",
        errorReg: "格式錯誤！",
        errInput: "請輸入正確的個數",
        readyTime: "準備時間，不能探探！",
        selfReferrer: "不能推薦自己",
        isQueue: "投注次数大于20，不能投注！",
        showIntro1: "阿迪锅",
        showIntro2: "规划",
        showIntro3: "儿童",
        showIntro4: "威威",
        showIntro5: "刚刚发给",
        showIntro6: "哦哦",
        alreadyBuy: '您發生的交易，正在以太坊網絡出塊打包進行中，請稍後。',
        errorNet: "鏈接以太坊網絡失敗，請確認手機網絡通暢。如切換網絡，請重新加載。"
    }
};

/**
 * EN data
 */
const $EN = {
    type: 'en',
    container: {
        game: 'GAME',
    },
    game: {
        approve: "Authorized:",
        /**register Modal */
        register_info_2: '· Players can spend 5 CKC on this page to become captains.',
        register_info_3: '· The team leader can get a part of CKC from the users recommended by him as the referrer.',
        register_info_4: '· Users recommended by the captain will also be promoted after purchase (up to 4). The higher the rating, the more referrals you can get.',
        register_info_5: '· Players who directly share the invitation are regarded as the 1st player, players who directly share the invitation are regarded as the 2nd player, and players who directly share the invitation are regarded as the 3rd player... When one of the players purchases, the first sharing player will be given a certain CKC sharing equity reward.',
        /**help Modal */
        help_text_1: '1. How does the game end ?',
        help_text_2: 'When the game is down - every time the player invests 1 Times increased - minutes of the game, the end of the game, the final input One players will get a big prize in the prize pool.',
        help_text_3: '2. How do I proceed CKC input?',
        help_text_4: 'CKC devote each time to a fixed investment 200CKC , the investment will be entered into the revenue sequence, each player can have up to - inputs into the revenue sequence. When your earnings are greater than 200CKC , you will automatically deduct your income from the investment rather than the remainder of your wallet.',
        help_text_5: '3. What\'s the use of the leader \'s sleeve?',
        help_text_6: 'The player can be used as a leader in the game, and the leader can recommend the game to others, when the person is recommended to put in the game CKC then, the leader can get the most direct encouragement.\n' +
            'if the leader\'s recommended player puts CKC , the leader can upgrade the class, the more recommended players, the higher the level of the leader sleeves, the benefit of the recommended people will increase, the highest not over 4 rating.\n' +
            'Once the leader has been promoted, the recommended player will be able to reward other players, whose benefits are proportional to the rating.',
        help_text_7: '4. How to get the benefits?',
        help_text_8: `the way the player gains revenue is mainly divided into 3 Category:
                    A. Player Input CKC then, if the other person continues to invest, and when the pre-order returns to the player, the player gains the benefit, and when the profit is the most profitable, the player is out, and the next profit sequence player starts earning the proceeds, so that's the loop.
                    B. players can claim to be a leader, create a link to share the game to other people, and the leader can get the purchased shares of the recommended person.
                    C. Since the beginning of the game. 7*28 If the player's probe sequence has been in the sequence is not out can be CKC benefits..
                    D. every probe the note, the last thing to explore. 8 players will be divided equally 80% Pool of probes. The maximum number of probes for a player who has the benefit will be increased by more than a third .
                    E. when the time is over, the last scout player is 50% pool reward, inverted 2-11 a spy, the rest of the players are divided. 50% pool to reward.`,
        help_text_9: '5. Incentive ',
        help_text_10: 'When the game is over, The last player to put in is 50% prize pool, pour 2-11 the players who put in 50% Prize pool.',
        /**game main */
        mainTips1: "Remaining:",
        mainTips2: "You can make up to 20 shots,200 CKC every time",
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
        showIntro1: "ffff",
        showIntro2: "fff",
        showIntro3: "fff",
        showIntro4: "fff",
        showIntro5: "fffff",
        showIntro6: "fff",
        alreadyBuy: 'The transaction you have made is being packaged in the ethereum network. Please wait.',
        errorNet: "Link to ether lane network failed, please make sure the mobile network is unblocked. If switching network, please reload."
    }
};
let $AlertMsg: any = $ZHTW.msg;
/**
 * language methods
 */
let langStatus: string = $ZHTW.type;

function changeLang(lang) {
    if (lang === $ZHTW.type) {
        $AlertMsg = $ZHTW.msg;
        $Content.game.langData = $ZHTW.game;
        /**img language change */
        $Content.game.statistics.source = 'icon_tj';
        $Content.game.invite.source = 'icon_tjzc';
        $Content.game.faq.source = 'icon_gl';
        $Content.game.lang.source = 'icon_ft';
        $Content.game.buyBtnG.$children[0].source = 'send_eth_zh';
        $Content.game.buyBtnG.$children[1].source = 'send_eth_zh_light';
        $Content.game.withdrawG.$children[2].source = 'tips_zh';
        $Content.game.stelaTitle.source = 'yx_text_cjxh_zh';
        $Content.game.stelaTitle2.source = 'yx_text_jc_zh';
        $Content.game.myNumImg.source = 'yx_text_wdxh_zh';
        $Content.game.timesImg.source = 'yx_text_ljcs_zh';
        $Content.game.allBuyImg.source = 'yx_text_ljtr';
        $Content.game.inviteImg.source = 'yx_text_dqsy_zh';
        $Content.game.bonusImg.source = 'yx_text_fhsy_zh';
        $Content.game.winImg.source = 'yx_text_ktsy_zh';
        $Content.game.alertModal.$children[1].source = 'special_effects_text';
        $Content.game.roundZh.visible = true;
        $Content.game.roundEn.visible = false;

        if($Modal.gameHelp) {
            $Modal.gameHelp.langData = $ZHTW.game;
            $Modal.gameHelp.langTitleImg.source = 'title_text_faq_zh';
        }

        $Modal.gameAlert.title.source = 'title_text_ts';
        $Modal.gameAlert.submitBtn.$children[1].source = 'btn_text_qd_zh';

        if($Modal.register) {
            $Modal.register.langData = $ZHTW.game;
            $Modal.register.title.source = 'title_text_referee_zh';
            $Modal.register.registerBtn.$children[1].source = 'btn_text_yqdy_zh';
            $Modal.register.linkGroup.$children[0].source = 'title_text_yqlj_zh';
            $Modal.register.copyBtn.$children[1].source = 'btn_text_fz_zh';
        }

        if( $Modal.gameStatistics != null)
        {
            $Modal.gameStatistics.title.source = 'title_text_strategy_zh';
            $Modal.gameStatistics.tabAct1.visible = true;
            $Modal.gameStatistics.tabActEn1.visible = false;
            $Modal.gameStatistics.tabAct2.visible = true;
            $Modal.gameStatistics.tabActEn2.visible = false;
            $Modal.gameStatistics.tabAct3.visible = true;
            $Modal.gameStatistics.tabActEn3.visible = false;
            $Modal.gameStatistics.tabAct4.visible = true;
            $Modal.gameStatistics.tabActEn4.visible = false;
            $Modal.gameStatistics.overtimeImg.source = 'statistics_stats_text_djs_zh';
            $Modal.gameStatistics.potImg.source = 'statistics_stats_text_jc_zh';
            $Modal.gameStatistics.outNum.source = 'statistics_stats_text_dr_zh';
            $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_zh';
        }
       

        $Modal.approve.title.source = 'title_text_ts';
        $Modal.approve.submitBtn.$children[1].source = 'btn_sure_zh';
        $Modal.approve.cancelBtn.$children[1].source = 'btn_cancel_zh';
        $Modal.mainIntro.title.source = 'title_text_ts';
    }

    if (lang === $EN.type) {
        $AlertMsg = $EN.msg;
        $Content.game.langData = $EN.game;
        /**img language change */
        $Content.game.statistics.source = 'icon_tj_en';
        $Content.game.invite.source = 'icon_tjzc_en';
        $Content.game.faq.source = 'icon_gl_en';
        $Content.game.lang.source = 'icon_ft_en';
        $Content.game.buyBtnG.$children[0].source = 'send_eth_en';
        $Content.game.buyBtnG.$children[1].source = 'send_eth_en_light';
        $Content.game.withdrawG.$children[2].source = 'tips_en';
        $Content.game.stelaTitle.source = 'yx_text_cjxh_en';
        $Content.game.stelaTitle2.source = 'yx_text_jc_en';
        $Content.game.myNumImg.source = 'yx_text_wdxh_en';
        $Content.game.timesImg.source = 'yx_text_ljcs_en';
        $Content.game.allBuyImg.source = 'yx_text_ljtr_en';
        $Content.game.inviteImg.source = 'yx_text_dqsy_en';
        $Content.game.bonusImg.source = 'yx_text_fhsy_en';
        $Content.game.winImg.source = 'yx_text_ktsy_en';
        $Content.game.alertModal.$children[1].source = 'special_effects_text_en';
        $Content.game.roundZh.visible = false;
        $Content.game.roundEn.visible = true;

        if($Modal.gameHelp) {
            $Modal.gameHelp.langData = $EN.game
            $Modal.gameHelp.langTitleImg.source = 'title_text_faq_en';
        }

        $Modal.gameAlert.title.source = 'title_text_ts_en';
        $Modal.gameAlert.submitBtn.$children[1].source = 'btn_text_qd_en';

        if($Modal.register) {
            $Modal.register.langData = $EN.game;
            $Modal.register.title.source = 'title_text_referee_en';
            $Modal.register.registerBtn.$children[1].source = 'btn_text_yqdy_en';
            $Modal.register.linkGroup.$children[0].source = 'title_text_yqlj_en';
            $Modal.register.copyBtn.$children[1].source = 'btn_text_fz_en';
        }

        if($Modal.gameStatistics != null) {
            $Modal.gameStatistics.title.source = 'title_text_strategy_en';
            $Modal.gameStatistics.tabAct1.visible = false;
            $Modal.gameStatistics.tabActEn1.visible = true;
            $Modal.gameStatistics.tabAct2.visible = false;
            $Modal.gameStatistics.tabActEn2.visible = true;
            $Modal.gameStatistics.tabAct3.visible = false;
            $Modal.gameStatistics.tabActEn3.visible = true;
            $Modal.gameStatistics.tabAct4.visible = false;
            $Modal.gameStatistics.tabActEn4.visible = true;
            $Modal.gameStatistics.overtimeImg.source = 'statistics_stats_text_djs_en';
            $Modal.gameStatistics.potImg.source = 'statistics_stats_text_jc_en';
            $Modal.gameStatistics.outNum.source = 'statistics_stats_text_dr_en';
            $Modal.gameStatistics.totalInvestment.source = 'statistics_stats_text_ti_en';
        }

        $Modal.approve.title.source = 'title_text_ts_en';
        $Modal.approve.submitBtn.$children[1].source = 'btn_sure_en';
        $Modal.approve.cancelBtn.$children[1].source = 'btn_cancel_en';

        $Modal.mainIntro.title.source = 'title_text_ts_en';
    }
}

function getLanStatus() {
    let lang = localStorage.getItem('language');
    if (lang) {
        langStatus = lang;
        changeLang(lang);
        setLanguageModalState(langStatus);
    }
}

function setLanguageModalState(lang) {
    if (lang === $ZHTW.type) {
        $Modal.language.title.source = 'yuyan_text_zh';
        $Modal.language.langTitle.source = 'title_text_yy';
        $Modal.language.soundTitle.source = 'title_text_yx';
        $Modal.language.soundTitle1.source = 'yinyue_text';
        $Modal.language.soundTitle2.source = 'yinxiao_text';
        $Modal.language.langZHTW_choosed.visible = true;
        $Modal.language.langEN_choosed.visible = false;
    }

    if (lang === $EN.type) {
        $Modal.language.title.source = 'yuyan_text_en';
        $Modal.language.langTitle.source = 'title_text_yy_en';
        $Modal.language.soundTitle.source = 'title_text_yx_en';
        $Modal.language.soundTitle1.source = 'yinyue_text_en';
        $Modal.language.soundTitle2.source = 'yinxiao_text_en';
        $Modal.language.langZHTW_choosed.visible = false;
        $Modal.language.langEN_choosed.visible = true;
    }
}