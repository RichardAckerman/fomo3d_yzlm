const Web3 = require('web3')
let web3Obj = new Web3("https://mainnet.infura.io/")
const json = require('./XMan.json')
let ContractAddr = "0x607acab3b6ecaa1bc34e1ff16c4d706faba85405"

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


        let thisId = id
        let addr = data.addr
        let referees = data.referees
        let allBuy = web3Obj.utils.fromWei(data.allBuy)
        let turnBuy = web3Obj.utils.fromWei(data.turnBuy)
        let turnBonus = web3Obj.utils.fromWei(data.turnBonus)
        let currentBonus = web3Obj.utils.fromWei(data.currentBonus)
        let reinvest = data.reinvest
        let unionBonus = web3Obj.utils.fromWei(data.unionBonus)

        // 0: uint256: performance 0
        // 1: uint256: level 0
        // 2: uint256: currentRound 1
        // 3: uint256: allEarning 6600000000000000000
        // 4: uint256: lostTimes 0
        ContractInstance.methods.playerEtraxAddr_(addr).call().then((etra) => {
            let performance = web3Obj.utils.fromWei(etra.performance)
            let level = etra.level
            let currentRound = etra.currentRound
            let allEarning = web3Obj.utils.fromWei(etra.allEarning)
            let lostTimes = etra.lostTimes

            ContractInstance.methods.returnAgent(addr).call().then((agent) => {
                let agents = agent
                ContractInstance.methods.getRollInArrayDetail(addr).call().then((array) => {
                    let arr = array
                    console.log(thisId, ";" + addr, ";" + referees, ";" + allBuy, ";" + turnBuy,
                        ";" + turnBonus, ";" + currentBonus, ";" + reinvest,
                        ";" + unionBonus, ";" + performance, ";" + level, ";" + currentRound, ";" + allEarning, ";" + lostTimes, ";" + agents, ";" + arr)
                    thisId++
                    if (thisId <= 8) {
                        getData(thisId)
                    }
                    // let arr = rollInArray;
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
    console.log("id;addr;referees;allBuy;turnBuy;turnBonus;currentBonus;reinvest;unionBonus;" +
        "performance;level;currentRound;allEarning;lostTimes;agents;rollInArray")
    getData(1)
}

begin()
