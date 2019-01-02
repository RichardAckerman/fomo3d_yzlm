const Web3 = require('web3')
let web3Obj = new Web3("https://mainnet.infura.io/")
const json = require('./XMan.json')
let ContractAddr = "0x4848ba19a70dfab56c8b5471f83349cbf5f7219a"

let ContractInstance = new web3Obj.eth.Contract(json.abi)
ContractInstance.options.address = ContractAddr


function getData(id) {
    ContractInstance.methods.playerxID_(id).call().then((data) => {

        // addr 0x707b6ee98f07e3a6c1c10f47452408ccd4d84abd
        // referees 0x0000000000000000000000000000000000000000
        // allBuy 9000000000000000000
        // turnBuy 3000000000000000000
        // turnBonus 600000000000000000
        // currentBonus 0
        // reinvest 3
        // unionBonus 0
        // currentInterest 0


        let thisId = id
        let addr = data.addr
        let referees = data.referees
        let allBuy = web3Obj.utils.fromWei(data.allBuy)
        let turnBuy = web3Obj.utils.fromWei(data.turnBuy)
        let turnBonus = web3Obj.utils.fromWei(data.turnBonus)
        let currentBonus = web3Obj.utils.fromWei(data.currentBonus)
        let reinvest = data.reinvest
        let unionBonus = web3Obj.utils.fromWei(data.unionBonus)
        let currentInterest = web3Obj.utils.fromWei(data.currentInterest)

        // 0: uint256: performance 0
        // 1: uint256: level 0
        // 2: uint256: currentRound 1
        // 3: uint256: allEarning 6600000000000000000
        // 4: uint256: lostTimes 0
        // 5: uint256: currentPerformance 2610000000000000000
        // 6: uint256: earningPrincipal 0
        ContractInstance.methods.playerEtraxAddr_(addr).call().then((etra) => {
            let performance = web3Obj.utils.fromWei(etra.performance)
            let level = etra.level
            let currentRound = etra.currentRound
            let allEarning = web3Obj.utils.fromWei(etra.allEarning)
            let lostTimes = etra.lostTimes
            let currentPerformance = web3Obj.utils.fromWei(etra.currentPerformance)
            let earningPrincipal = web3Obj.utils.fromWei(etra.earningPrincipal)

            ContractInstance.methods.returnAgent(addr).call().then((agent) => {
                let agents = agent
                ContractInstance.methods.getRollInArrayDetail(addr).call().then((array) => {
                    let len = array.length
                    console.log(thisId, ";" + addr, ";" + referees, ";" + allBuy, ";" + turnBuy,
                        ";" + turnBonus, ";" + currentBonus, ";" + reinvest,
                        ";" + unionBonus, ";"  + currentInterest, ";" + performance, ";" + level,
                        ";" + currentRound, ";" + allEarning, ";" + lostTimes, ";" + currentPerformance,
                        ";" + earningPrincipal, ";" + agents, ";" + array, ";" + len)
                    thisId++
                    if (thisId <= 607) {
                        getData(thisId)
                    }
                }, (err) => {
                    //console.log("__________________",err)
                })

            }, (err) => {
                //console.log("__________________",err)
            })
        }, (err) => {
            //console.log("__________________",err)
        })

    }, (err) => {
        //console.log("++++++++++++++++++++",err)
    })
}

function begin() {
    console.log("id;addr;referees;allBuy;turnBuy;turnBonus;currentBonus;reinvest;unionBonus;currentInterest;" +
        "performance;level;currentRound;allEarning;lostTimes;currentPerformance;earningPrincipal;agents;rollInArray;len")
    getData(1)
}

begin()
