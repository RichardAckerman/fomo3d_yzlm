/**
 * web3 network
 */
let {setProvider, web3} = require('./Web3')
setProvider(getNonce)

const ajax = require('request')
/**
 * mysql
 */
let SQL = require('./SQL')
SQL.connectSql()


/**
 * contract json
 */
let Ins = require('./Contract')

/**
 * accounts
 */
const Accounts = require('./Accounts')
let Acc = Accounts.Acc


// let wallet = web3.eth.accounts.wallet;
// console.log(wallet);
/**
 * 获取nonce
 */
let addrs = {}

function getNonce() {
    web3.eth.getTransactionCount(Acc.address).then(nonce => {
        console.log('nonce ----- ', nonce)
        startInterval(nonce)
    }, err => {
        console.log('nonce error ----- ', err)
    })
    // ins.options.address = addr
}

function startInterval(nonce) {
    console.log('是否连接到数据库：', SQL.isConnected)
    setInterval(() => {
        if (SQL.isConnected) {
            let total = "select count(*) as totalNum from contractlist where gameType in(1, 3) and betTime != '0'"
            SQL.mysql.query(total, (err, result) => {
                if (err) {
                    console.log("query err ----- ", err)
                } else {
                    //console.log(result)
                    let pageSize = 1000
                    let totalPage = Math.ceil(result[0]['totalNum'] / pageSize)

                    for (let i = totalPage; i > 0; i--) {
                        pageNum = (totalPage - i) * pageSize
                        let newBlockSql = "select * from contractlist where gameType in(1, 3) and betTime != '0' order by betTime asc limit " + pageNum + "," + pageSize

                        SQL.mysql.query(newBlockSql, (err, result) => {
                            if (err) {
                                console.log("query err ----- ", err)
                            } else {
                                for (let b = 0; b < result.length; b++) {

                                    let now = Date.parse(new Date()) / 1000

                                    console.log(result[b].contractAddr, ' ----- ', result[b].contractName, ' ----- 剩余时间:', 60 - (now - result[b].betTime))

                                    if (now - result[b].betTime < 59) {
                                        continue
                                    } else {
                                        if (!addrs[result[b].contractAddr]) {
                                            addrs[result[b].contractAddr] = {
                                                isRuning: false,
                                                runCount: 0,
                                            }
                                        }
                                        if (!addrs[result[b].contractAddr].isRuning) {

                                            addrs[result[b].contractAddr].isRuning = true

                                            let addr = result[b].contractAddr
                                            let ins
                                            let text = result[b].contractName
                                            switch (result[b].gameType) {
                                                case 1: //龙虎斗
                                                    ins = Ins.dtFIght
                                                    break

                                                case 3: //百家乐
                                                    ins = Ins.baccarat
                                                    break

                                                // case 4: //十一选五
                                                //     ins = Ins.p11c5
                                                //     break
                                            }
                                            ins.options.address = addr

                                            ins.methods.getResult()
                                                .send({
                                                    from: Acc.address,
                                                    gas: 4000000,
                                                    txType: 0,
                                                    datasourcecode: '',
                                                    nonce,
                                                })
                                                .on('error', (err) => {
                                                    console.log(addr, " ----- " + text + " --- 错误 ----- ", err)
                                                    addrs[result[b].contractAddr].isRuning = false
                                                    addrs[result[b].contractAddr].runCount += 1
                                                    if (addrs[result[b].contractAddr].runCount > 2) {
                                                        setProvider()
                                                    }
                                                })
                                                .on('receipt', (receipt) => {
                                                    console.log(addr, " ----- " + text + " --- 成功 -----", new Date().toLocaleString())

                                                    addrs[result[b].contractAddr].isRuning = false
                                                    addrs[result[b].contractAddr].runCount = 0
                                                })

                                            nonce++

                                        }
                                    }

                                }
                            }
                        })
                    }
                }
            })
            let query11C5 = "select * from contractlist where gameType=4"
            SQL.mysql.query(query11C5, (err, result) => {
                if (err) {
                    console.log("query err ----- ", err)
                } else {
                    // console.log(result)
                    for (let i = 0; i < result.length; i++) {
                        let ins = Ins.p11c5

                        let addr = result[i].contractAddr
                        let text = result[i].contractName
                        ins.options.address = result[i].contractAddr
                        ins.methods.creationTime().call().then((time) => {
                            let nowTime = Date.parse(new Date() + "") / 1000
                            let overTime = (time + 600 - nowTime) % 600
                            if (overTime < 3 && overTime >= 0) {
                                ins.methods.getResult()
                                    .send({
                                        from: Acc.address,
                                        gas: 4000000,
                                        txType: 0,
                                        datasourcecode: '',
                                        nonce,
                                    })
                                    .on('error', (err) => {
                                        console.log(addr, " ----- " + text + " --- 错误 ----- ", err)
                                    })
                                    .on('receipt', (receipt) => {
                                        console.log(addr, " ----- " + text + " --- 成功 -----", new Date().toLocaleString())
                                        ajax({
                                            url: "http://47.75.103.95/apiTest/api/addBetting.php",
                                            method: "POST",
                                            json: false,
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                prizeNum: receipt.events.returnSettleRes.returnValues[0].join(","),
                                            })
                                        }, (error, response, body) => {
                                            console.log(body)
                                        })
                                    })

                                nonce++
                            }
                        })
                    }
                }
            })
        }
    }, 3000)
}