let web3Obj = new Web3("https://mainnet.infura.io/");

let ContractAddr = "0xd823b5d18542506638b7cae1be63df7f8255c98f";

let ContractInstance = null;

let btn = $("#btn");
let btnAddr = $("#btnAddr");
let luckyArr = [];

function getData(id) {
    $(".luckyer-box").find(".Luckyer").html("");
    luckyArr.length = 0;
    showTips(true);
    clearContent();
    getPlayerNum();
    getLuckyer(0);
    ContractInstance.methods.playerxID_(id).call().then((data) => {
        let thisId = id;
        let addr = data.addr;
        let referees = data.referees;
        let allBuy = web3Obj.utils.fromWei(data.allBuy);
        let turnBuy = web3Obj.utils.fromWei(data.turnBuy);
        let turnBonus = web3Obj.utils.fromWei(data.turnBonus);
        let currentBonus = web3Obj.utils.fromWei(data.currentBonus);
        let reinvest = data.reinvest;
        let unionBonus = web3Obj.utils.fromWei(data.unionBonus);
        if (addr === "0x0000000000000000000000000000000000000000") {
            showTips(false);
            return
        }
        ContractInstance.methods.getLeader(parseInt(thisId)).call().then((leader) => {
            let list = $("#list");
            list.find(".leader").html(leader.toString());
        }, (err) => {
            console.log("_________getLeader_________",err)
        });
        ContractInstance.methods.playerEtraxAddr_(parseInt(thisId)).call().then((etra) => {
        // ContractInstance.methods.playerEtraxAddr_(addr).call().then((etra) => {
            let performance = web3Obj.utils.fromWei(etra.performance);
            let level = etra.level;
            let currentRound = etra.currentRound;
            let allEarning = web3Obj.utils.fromWei(etra.allEarning);
            let lostTimes = etra.lostTimes;
            ContractInstance.methods.returnAgent(addr).call().then((agent) => {
                let agents = agent;
                ContractInstance.methods.playerxID_(agent[9]).call().then((ref) => {
                    $("#list").find(".referees").html(ref.addr);
                });
                ContractInstance.methods.getRollInArrayDetail(addr).call().then((array) => {
                    showTips(false);
                    // let allEarning = (reinvest - array.length) * 3.3
                    // allEarning = allEarning.toFixed(2)
                    console.log(thisId, ";" + addr, ";" + referees, ";" + allBuy, ";" + turnBuy,
                        ";" + turnBonus, ";" + currentBonus, ";" + reinvest,
                        ";" + unionBonus, ";" + performance, ";" + level, ";" + currentRound, ";" + allEarning, ";" + lostTimes, ";" + agents, ";" + array)
                    let list = $("#list");
                    list.find(".id").html(thisId);
                    list.find(".addr").html(addr);
                    list.find(".allBuy").html(allBuy);
                    list.find(".turnBuy").html(turnBuy);
                    list.find(".turnBonus").html(turnBonus);
                    list.find(".currentBonus").html(currentBonus);
                    list.find(".reinvest").html(reinvest);
                    list.find(".unionBonus").html(unionBonus);
                    list.find(".performance").html(performance);
                    list.find(".level").html(level);
                    list.find(".currentRound").html(currentRound);
                    list.find(".allEarning").html(allEarning);
                    list.find(".lostTimes").html(lostTimes);
                    list.find(".agents").html(agents.toString());
                    list.find(".rollInArray").html(array.toString())
                }, (err) => {
                    console.log("_______getRollInArrayDetail___________",err)
                })

            }, (err) => {
                console.log("_________returnAgent_________",err)
            })
        }, (err) => {
            console.log("________playerEtraxAddr___________",err)
        })

    }, (err) => {
        console.log("+++++++++++playerxID_+++++++++",err)
    })
}

function showTips(bool) {
    $("#tips").css("display", bool ? "inline-block" : "none")
    btn.attr("disabled", bool)
    btnAddr.attr("disabled", bool)
}

function getPlayerNum() {
    ContractInstance.methods.nPlayerNum().call().then((num) => {
        $("#nPlayerNum").html(num)
    });
    ContractInstance.methods.nRollIn().call().then((num) => {
        $("#nRollIn").html(num)
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
        fetch("../contract/miracle.json", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then((response) => {
            return response.json()
        }, (error) => {
            reject(error)
        }).then((json) => {
            ContractInstance = new web3Obj.eth.Contract(json.abi);
            ContractInstance.options.address = ContractAddr;
            resolve(ContractInstance)
        })
    })
}


btn.on("click", () => {
    $("#inputAddr").val("");
    let val = $("#input").val();
    if (val === "") {
        return
    }
    getJson().then(() => {
        begin(val)
    })
});

btnAddr.on("click", () => {
    let addr = $("#inputAddr").val();
    $("#input").val("");

    if (addr === "") {
        return
    }
    if (!web3Obj.utils.isAddress(addr)) {
        alert("地址格式不对")
        return
    }
    getJson().then(() => {
        beginAddr(addr)
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

function beginAddr(addr) {
    ContractInstance.methods.pIDxAddr_(addr).call().then((id) => {
        console.log(id)
        getData(id)
    })
}