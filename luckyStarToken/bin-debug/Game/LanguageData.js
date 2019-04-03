/**
 * zh_TW data
 */
var $ZHTW = {
    type: 'zhtw',
    container: {
        game: '遊戲',
    },
    game: {
        /**register Modal */
        register_info_2: '● 玩家可在本页面花费0.1 CBE申请成为队长。',
        register_info_3: '● 队长可获得自己推荐的用户购买投入的一部分CBE作为推荐人奖励。',
        register_info_4: '● 队长推荐的玩家也购买投入后，队长等级会得到提升（最高为4级）。等级越高可获得的推荐人奖励越多。',
        register_info_5: '● 玩家的直接推荐人视为1代推荐人，1代推荐人的推荐人视为2代推荐人，2代推荐人的推荐人视为3代推荐人……当其中一个玩家购买后将给予其1代推荐人一定CBE奖励。',
        /**help Modal */
        help_text_1: '1. 游戏如何结束？',
        help_text_2: '      游戏倒计时24小时，玩家每投入1次会增加游戏时间，游戏结束后，最后投入的10名玩家将会获得奖池中的大奖。',
        help_text_3: '2. 如何进行CBE投入？',
        help_text_4: '      每次投入CBE后本次投入将进入收益序列，每个玩家可以多次投入进入收益序列。当你的收益大于或等于投入所需的CBE时复投会扣除你游戏内的余额而不是你的钱包余额。',
        help_text_5: '3. 队长有什么用？',
        help_text_6: '      玩家在游戏中可申请成为队长，队长可将游戏推荐给其他人，当被推荐人在游戏中投入CBE后，队长能获得最大的直接推荐奖励。\n' +
            '      如果队长推荐的玩家投入了CBE，队长就能提升等级，推荐的玩家越多，队长等级越高，获得的推荐人收益也会增加，最高4级。\n' +
            '      队长等级提升后，其推荐的玩家如果再推荐了其他玩家，队长也能获得奖励，其收益和等级成正比。\n',
        help_text_7: '4. 什么是幸运奖池？',
        help_text_8: '      每周日的12:00点，将会随机选出10名玩家成为幸运玩家，他们将均分所有幸运奖池的奖金。',
        help_text_9: '5. 如何获得收益？',
        help_text_10: '      玩家获得收益的方法主要分为5类：\n' +
            '      A.玩家投入CBE后，如果后续有其他人继续投入，并且当前收益排序轮到了该玩家，该玩家就能获得收益，当收益等于最大收益时，该玩家出局，下一个收益序列的玩家开始获得收益，以此不断循环。\n' +
            '      B.玩家可申请成为队长，创建连接分享游戏给其他人，队长能获得被推荐人的购买分成。\n' +
            '      C.接收推荐连接的玩家之间会形成联盟，在联盟之内的玩家可以得到联盟奖励。一个玩家的联盟内最多能有10个玩家。\n' +
            '      D.每周日的12点将随机抽取10名玩家获得幸运奖池中的奖金。\n' +
            '      E.时间结束后，最后一个投入的玩家获得50%的奖池奖励，倒数2-10个投入的玩家均分剩下50%的奖池奖励。\n',
        help_text_11: '6. 结算奖励如何分配？',
        help_text_12: '      游戏时间结束，最后1个投入的玩家获得50%的奖池奖励，倒数2-10个投入的玩家均分剩下50%的奖池奖励。',
        /**game main */
        mainTips1: "剩余投入次数：",
        mainTips2: "可投入多次，每次需投入 1000 CBE",
        /**register */
        link: "邀请连接"
    },
    msg: {
        zeroBalance: "余额为零，不能提现",
        copySuc: "复制成功",
        errorKey: "请输入正确key数",
        errorReg: "格式错误！",
        errInput: "请输入正确的个数",
        readyTime: "准备时间，不能购买！",
        selfReferrer: "不能推荐自己",
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
        help_text_2: 'When the game is inverted, . hours, players every input 1 Times Increase $ Minutes of the game, after the end of the game, The amount of the "Week award pool" precipitates into the next round of the game\'s the "Week of the Jackpot award pool ."',
        help_text_3: '2. How to proceed CBE input?',
        help_text_4: 'CBE put in every fixed shot 3 CBE , the investment will be put into the earnings sequence, each player can have a maximum of $ input into the earnings sequence. When your earnings are more than 3CBE , you\'re going to deduct your earnings and put in the rest of your money bag.\n',
        help_text_5: '3. What\'s the use of the leader sleeve?',
        help_text_6: 'Players in the game can be used as a leader, the leader can push the game recommended to others, when pushed recommended people in the game put into CBE after that, the leader sleeves can get the most direct push recommended reward.\n' +
            'If the leader pushes the recommended player into the CBE , the leader will be able to upgrade the level, the more players pushing the recommended, the higher the leadership sleeve level, get the push recommended the return of people will also increase, the maximum is not more than 4 grade.\n' +
            'After the elevation of the leader, the player who pushes the recommended to recommended other players, the leader sleeve can also be won the reward, its earnings and equal grade is proportional.\n',
        help_text_7: '4.  What is the lucky prize pool?',
        help_text_8: '      five per week. 12:00 Point, will be chosen by random . 9 players as lucky players, the first place to get 50% the Lucky Prize for the award, No. 2 , 3 , 4 The name is divided equally to get 30% the Lucky Prize for the award, No. 5 , 6 , 7 , 8 , 9 name on average get 20% Award for the Medal of Honor.\n',
        help_text_9: '5. How to get benefits?',
        help_text_10: 'the way players get their earnings is mainly divided into 4 Categories:\n' +
            'A. Player Input CBE after that, if another person continues to continue to invest, and the former earnings ranking to the player, the player can get the benefit, when the return is equal to the maximum return, the player is out, the next earnings sequence of the player began to get the benefit, in order to keep the circle.\n' +
            'B. players can be asked to become the leader, create a link to share the game to others, the leader can be pushed recommended people to buy a share of the purchase.\n' +
            'C. Players who receive push recommended links form a union, and players within the Union can be recognized by the Union. There can be up to five players in a player\'s union .\n' +
            'D. Five per week. A/ Point the random extraction - players are lucky the prize money in the prize pool.' +
            'E. After the end of the time , the last player to put in 50% prize pool, pour 2-9 the players who put in 60% Prize pool.',
        help_text_11: '6. Incentive',
        help_text_12: 'When the game is over, The last player to put in is 50% prize pool, pour 2-9 the players who put in 60% Prize pool.',
        /**game main */
        mainTips1: "Incentive:",
        mainTips2: "You can make up to many shots,3 CBE every time",
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
 * language mMOACods
 */
var langStatus = $ZHTW.type;
function changeLang(lang) {
    if (lang === $ZHTW.type) {
        $AlertMsg = $ZHTW.msg;
        $Content.game.langData = $ZHTW.game;
        /**img language change */
    }
    if (lang === $EN.type) {
        $AlertMsg = $EN.msg;
        $Content.game.langData = $EN.game;
        /**img language change */
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
    }
    if (lang === $EN.type) {
    }
}
