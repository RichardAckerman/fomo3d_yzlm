var mysql = require('mysql');

/********************************************/
let connection;
const Web3 = require('web3');
let web3Obj = new Web3("https://mainnet.infura.io/");
const json = require('./FutureWorld.json');
let ContractAddr = "0x1a5D4d4A08123A6D6E194033e9E553867F3F1b0D";

let ContractInstance = new web3Obj.eth.Contract(json.abi);
ContractInstance.options.address = ContractAddr;

//连接数据库
function connectionMysql() {
    connection = mysql.createConnection({
        host: "120.79.180.141",
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'LuckyId',
    });
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(connectionMysql, 2000);
        } else {
            setInterval(getLuckyerFw, 30 * 60 * 1000);
        }
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectionMysql();
        } else {
            throw err;
        }
    });
}

/********************************************/

connectionMysql();


//写入收益ID对应玩家ID
function getLuckyerFw() {
    let coin = 0;
    ContractInstance.methods.luckyPlayerMoney().call().then((money) => {
        coin = web3Obj.utils.fromWei(money);
        getLuckyAddress(0, coin);
    });
}

function getLuckyAddress(index, coin) {
    ContractInstance.methods.luckyer(index).call().then((id) => {
        console.log(id, coin);
        let sql = 'insert into luckyId_futureworld (userId,bonus,time) values(?,?,?) ;';
        let time = Date.parse(new Date());
        let params = [id, coin, timestampToTime(time)];
        connection.query(sql, params, function (err, result) {
            if (result) {
                index++;
                getLuckyAddress(index, coin);
            }
        });
    }, (err) => {
        console.log("=====================err=====", err);
    });
}

function timestampToTime(timestamp) {
    if (timestamp.length === 10) {
        timestamp = timestamp * 1000;
    } else {
        timestamp = timestamp * 1;
    }
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '.';
    let M = fillZero(date.getMonth() + 1) + '.';
    let D = fillZero(date.getDate()) + ' ';
    let h = fillZero(date.getHours()) + ':';
    let m = fillZero(date.getMinutes()) + ':';
    let s = fillZero(date.getSeconds());
    return Y + M + D + h + m + s;
}

function fillZero(time) {
    time = time < 10 ? "0" + time : time;
    return time;
}