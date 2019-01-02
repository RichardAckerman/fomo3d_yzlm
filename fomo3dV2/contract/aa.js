// const Web3 = require('web3')
let web3Obj = new Web3("http://192.168.1.113:7545")
// const json = require('./fomo.json')
let ContractAddr = "0x0c34e8c70a7dd16ef5b353dc03063c9b568dc4d6"
let newCon = "0x8ab3275d07663fc3c1dda182aeacc1ca2eac4b33"

let ContractInstance;

fetch("./fomo.json", {
    method: "GET",
    headers: new Headers({
        'Content-Type': 'application/json'
    })
}).then((response) => {
    return response.json();
}, (error) => {
    console.log(error);
}).then((json) => {
    ContractInstance = new web3Obj.eth.Contract(json.abi)
    ContractInstance.options.address = ContractAddr
    let addr = web3Obj.eth.accounts.wallet.add('0x77e6d6751956a94ba9c55bbb3bb795af706a5330f63dd2c9e93325be1ef288c8')
    console.log(addr)
    // updateUser();
});



let pid = 1

let obj = {
    // {
    //     uint : [id,keyNum,withDrawNum,costNum, allBuy,refereesBonus, performance, level,currentRound],
    //     _addr: _addr,
    //     referees: referees,
    //     agents: []
    //     userName: userName,
    // }
}

function updateUser() {
    ContractInstance.methods.playerxID_(pid).call().then((data, err) => {
        if (err) {
            console.log(err)
        }
        else {
            ContractInstance.methods.playerEtraxID_(data[0]).call().then((other, err) => {
                if (err) {
                    console.log(err)
                } else {
                    // console.log("222", other);
                    obj[data[0]] = {}
                    obj[data[0]]._addr = data[0]
                    obj[data[0]].referees = data[5]
                    let arr = [pid,
                        parseInt(data[1].toString()),
                        parseInt(data[2].toString()),
                        parseInt((data[3]/100000).toString()),
                        parseInt((data[4]/100000).toString()),
                        parseInt(other[1].toString()),
                        parseInt(other[2].toString()),
                        parseInt(other[3].toString()),
                        parseInt(other[4].toString()),
                    ]
                    obj[data[0]].userName = other[0]
                    obj[data[0]].uint = arr
                    // console.log("++++++++++++", obj);
                    pid++
                    if (pid < 10) {
                        updateUser()
                    } else {
                        getAgents()
                    }
                }
            })
        }
    })
}

function getAgents() {
    // console.log("++++++++++++", obj)
    // console.log(3)
    for (let addr in obj) {

        let target = addr
        obj[addr].agents = [0, 0, 0, 0, 0]

        for (let i = 4; i >= 0; i--) {
            if (obj[target].referees === "0x0000000000000000000000000000000000000000") {
                break
            }
            obj[addr].agents[i] = obj[obj[target].referees].uint[0]
            target = obj[target].referees
        }

    }
    setData()
}

// [1,1,2,3,4,5,6,7,8],"0xf0d8b2dbA1FA00C39012e82c563bd28a621Ac7F9","0x2074f898c3B39A9621d9A5808a8a5Da087CE96f6",[0,1,2,4,5],"0x32412341"
function setData() {
    let uin = []
    let _addr = ""
    let referees = ""
    let agents = []
    let userName = ""
    ContractInstance.options.address = newCon
    for (let addr in obj) {
        uin = obj[addr].uint
        console.log(obj[addr].uint, obj[addr]._addr.toString(), obj[addr].referees.toString(), obj[addr].agents, obj[addr].userName.toString())
        ContractInstance.methods.fixedData(obj[addr].uint, obj[addr]._addr.toString(), obj[addr].referees.toString(), obj[addr].agents, obj[addr].userName.toString()).call().then((data) => {
            console.log(data)
        })
        break
    }
}