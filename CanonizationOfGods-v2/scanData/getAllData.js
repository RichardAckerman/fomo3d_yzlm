const Web3 = require('web3');
let web3Obj = new Web3("https://mainnet.infura.io/");
const json = require('./FutureWorld.json');
let ContractAddr = "0x1a5D4d4A08123A6D6E194033e9E553867F3F1b0D";

let ContractInstance = new web3Obj.eth.Contract(json.abi);
ContractInstance.options.address = ContractAddr;

function getData(id) {
    ContractInstance.methods.playerxID_(id).call().then((data) => {
        let thisId = id;
        let addr = data.addr;
        let allBuy = web3Obj.utils.fromWei(data.allBuy);
        let turnBuy = data.turnBuy;
        let turnBonus = web3Obj.utils.fromWei(data.turnBonus);
        let currentBonus = web3Obj.utils.fromWei(data.currentBonus);
        let reinvest = data.reinvest;
        let currentInterest = web3Obj.utils.fromWei(data.currentInterest);
        let agents = data.agents;
        let str = ";";
        ContractInstance.methods.playerEtraxAddr_(id).call().then((etra) => {
            let performance = web3Obj.utils.fromWei(etra.performance);
            let level = etra.level;
            let teamNum = etra.teamNum;
            let currentRound = etra.currentRound;
            let allEarning = web3Obj.utils.fromWei(etra.allEarning);
            let lostTimes = etra.lostTimes;
            let currentPerformanceOne = web3Obj.utils.fromWei(etra.currentPerformanceOne);
            let currentPerformanceTwo = web3Obj.utils.fromWei(etra.currentPerformanceTwo);
            let earningPrincipal = web3Obj.utils.fromWei(etra.earningPrincipal);
            let levelPlayer = etra.levelPlayer;
            let lastBonusId = etra.lastBonusId;
            ContractInstance.methods.getRollInArrayDetail(addr).call().then((array) => {
                console.log(thisId + str + addr + str + allBuy + str + turnBuy +
                    str + turnBonus + str + currentBonus + str + reinvest +
                    str + currentInterest + str + agents + str + performance + str +
                    level + str + teamNum + str + currentRound + str + allEarning + str + lostTimes +
                    str + currentPerformanceOne + str + currentPerformanceTwo + str + earningPrincipal +
                    str + levelPlayer + str + lastBonusId + str + array);
                thisId++;
                if (thisId <= 366) {
                    getData(thisId);
                }
            }, (err) => {
                //console.log("__________________",err)
            });

        }, (err) => {
            //console.log("__________________",err)
        });

    }, (err) => {
        //console.log("++++++++++++++++++++",err)
    });
}

function begin() {
    console.log("id;addr;allBuy;turnBuy;turnBonus;currentBonus;reinvest;currentInterest;agents;" +
        "performance;level;teamNum;currentRound;allEarning;lostTimes;currentPerformanceOne;" +
        "currentPerformanceTwo;earningPrincipal;levelPlayer;lastBonusId;rollInArray");
    getData(1);
}

begin();
