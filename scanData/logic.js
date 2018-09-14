let web3Obj = new Web3("https://mainnet.infura.io/")

let ContractAddr = "0x607acab3b6ecaa1bc34e1ff16c4d706faba85405"

let ContractInstance = null

let btn = $("#btn")
let luckyArr = [];
function getData(id) {
    $(".luckyer-box").find(".Luckyer").html("")
    luckyArr.length = 0;
    showTips(true)
    clearContent()
    getPlayerNum()
    getLuckyer(0)
    ContractInstance.methods.playerxID_(id).call().then((data) => {
        let thisId = id
        let addr = data.addr
        let referees = data.referees
        let allBuy = web3Obj.utils.fromWei(data.allBuy)
        let turnBuy = web3Obj.utils.fromWei(data.turnBuy)
        let turnBonus = web3Obj.utils.fromWei(data.turnBonus)
        let currentBonus = web3Obj.utils.fromWei(data.currentBonus)
        let reinvest = data.reinvest
        let unionBonus = web3Obj.utils.fromWei(data.unionBonus)
        if (addr === "0x0000000000000000000000000000000000000000") {
            showTips(false)
            return
        }
        ContractInstance.methods.playerEtraxAddr_(addr).call().then((etra) => {
            let performance = web3Obj.utils.fromWei(etra.performance)
            let level = etra.level
            let currentRound = etra.currentRound
            let allEarning = web3Obj.utils.fromWei(etra.allEarning)
            let lostTimes = etra.lostTimes

            ContractInstance.methods.returnAgent(addr).call().then((agent) => {
                let agents = agent
                ContractInstance.methods.getRollInArrayDetail(addr).call().then((array) => {
                    showTips(false)
                    console.log(thisId, ";" + addr, ";" + referees, ";" + allBuy, ";" + turnBuy,
                        ";" + turnBonus, ";" + currentBonus, ";" + reinvest,
                        ";" + unionBonus, ";" + performance, ";" + level, ";" + currentRound, ";" + allEarning, ";" + lostTimes, ";" + agents, ";" + array)
                    let list = $("#list")
                    list.find(".id").html(thisId)
                    list.find(".addr").html(addr)
                    list.find(".referees").html(referees)
                    list.find(".allBuy").html(allBuy)
                    list.find(".turnBuy").html(turnBuy)
                    list.find(".turnBonus").html(turnBonus)
                    list.find(".currentBonus").html(currentBonus)
                    list.find(".reinvest").html(reinvest)
                    list.find(".unionBonus").html(unionBonus)
                    list.find(".performance").html(performance)
                    list.find(".level").html(level)
                    list.find(".currentRound").html(currentRound)
                    list.find(".allEarning").html(allEarning)
                    list.find(".lostTimes").html(lostTimes)
                    list.find(".agents").html(agents.toString())
                    list.find(".rollInArray").html(array.toString())
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

function showTips(bool) {
    $('#tips').css("display", bool ? "inline-block" : "none")
    btn.attr("disabled", bool)
}

function getPlayerNum() {
    ContractInstance.methods.nPlayerNum().call().then((num) => {
        $("#nPlayerNum").html(num)
    })
}

function getLuckyer(i) {
    ContractInstance.methods.Luckyer(i).call().then((addr) => {
        // $("#nPlayerNum").html(num)
        luckyArr.push(addr)
        i++
        if (i < 10) {
            getLuckyer(i)
        } else {
            let str = luckyArr.join("<br>")
            $(".luckyer-box").find(".Luckyer").html(str)
        }
    })
}

function clearContent() {
    let list = $("#list")
    list.find("li span:last-child").html("")
}

function begin(val) {
    console.log("id;addr;referees;allBuy;turnBuy;turnBonus;currentBonus;reinvest;unionBonus;" +
        "performance;level;currentRound;allEarning;lostTimes;agents;rollInArray")
    getData(val)
}

function getJson() {
    return new Promise((resolve, reject) => {
        fetch("../contract/XMan.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            return response.json()
        }, (error) => {
            reject(error)
        }).then((json) => {
            ContractInstance = new web3Obj.eth.Contract(json.abi)
            ContractInstance.options.address = ContractAddr
            resolve(ContractInstance)
        })
    })
}


btn.on("click", () => {
    let val = $("#input").val()
    if (val === "") {
        return
    }
    getJson().then(() => {
        begin(val)
    })
})

$("#input").on("blur", () => {
    let input = $("#input")
    input.val(input.val().replace(/[^\d]/g, ""))
})

getJson().then(() => {
    getPlayerNum()
    getLuckyer(0)
})
