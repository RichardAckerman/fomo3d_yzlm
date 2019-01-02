const Web3 = require('web3')
let web3Obj = new Web3("https://mainnet.infura.io/")
const json = require('../fomo.json')
let ContractAddr = "0x6380f1434a93abeb475bae6ff88cb3a274b4e09c"

let ContractInstance = new web3Obj.eth.Contract(json.abi)
ContractInstance.options.address = ContractAddr


function getData(id) {
    ContractInstance.methods.playerxID_(id).call().then((data) => {
        // 0: address: addr 0x1699a3c42db193d5b61e49ac0e1c014029ac5fc8
        // 1: uint256: keyNum 48489
        // 2: uint256: withDrawNum 3324713819330055340
        // 3: uint256: costNum 18265236409845594708
        // 4: uint256: allBuy 18881105800000000000
        let thisId = id
        let addr = data.addr
        let keyNum = data.keyNum
        let withDrawNum = web3Obj.utils.fromWei(data.withDrawNum)
        let costNum = web3Obj.utils.fromWei(data.costNum)
        let allBuy = web3Obj.utils.fromWei(data.allBuy)
        let referees = data.referees

        ContractInstance.methods.playerEtraxID_(addr).call().then((etra) => {

            // 1: uint256: refereesBonus 12843248800000000
            // 2: uint256: performance 116198110221600000000
            // 3: uint256: level 5
            // 4: uint256: currentRound 1
            // 5: uint256: cWithdraw 5885215871909255708

            let refereesBonus = web3Obj.utils.fromWei(etra.refereesBonus)
            let performance = web3Obj.utils.fromWei(etra.performance)
            let level = etra.level
            let currentRound = etra.currentRound
            let cWithdraw = web3Obj.utils.fromWei(etra.cWithdraw)

            console.log(`${thisId},${addr},${keyNum},${withDrawNum},${costNum},${allBuy},${referees},${refereesBonus},${performance},${level},${currentRound},${cWithdraw}`)

        }, (err) => {
            //console.log("__________________",err)
        })
        id++
        if (id <= 435) {
            getData(id)
        }

    }, (err) => {
        //console.log("++++++++++++++++++++",err)
    })
}

function begin() {
    console.log("id,addr,keyNum,withDrawNum,costNum,allBuy,referees,refereesBonus,performance,level," +
        "currentRound,cWithdraw")
    getData(1)
}

begin()
