// let web3Obj = new Web3("http://192.168.1.106:7545");
let web3Obj = new Web3("https://mainnet.infura.io/");

let ContractAddr = "0x1a5D4d4A08123A6D6E194033e9E553867F3F1b0D";
let TokenAddr = "0x4313b17Cf68BaFA29817438baa36cbfdC68c28a2";

let ContractInstance = null;
let TokenInstance = null;

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
    ContractInstance.methods.playerxID_(id.toString()).call().then((data) => {
        let thisId = id;
        let addr = data.addr;
        let referees = data.referees;
        let allBuy = web3Obj.utils.fromWei(data.allBuy);
        let turnBuy = web3Obj.utils.fromWei(data.turnBuy);
        let turnBonus = web3Obj.utils.fromWei(data.turnBonus);
        let currentBonus = web3Obj.utils.fromWei(data.currentBonus);
        let reinvest = data.reinvest;
        let currentInterest = web3Obj.utils.fromWei(data.currentInterest);
        let agents = data.agents;
        if (addr === "0x0000000000000000000000000000000000000000") {
            showTips(false);
            return;
        }
        getTokenJson().then(() => {
            let list = $("#list");
            TokenInstance.methods.balanceOf(addr).call().then((token) => {
                list.find(".balance").html(web3Obj.utils.fromWei(token));
            });
            TokenInstance.methods.allowance(addr, ContractAddr).call().then((allowance) => {
                list.find(".allowance").html(web3Obj.utils.fromWei(allowance));
            });
        });

        ContractInstance.methods.getCurrentBonusMoney(thisId).call().then((money) => {
            $("#list").find(".getCurrentBonusMoney").html(web3Obj.utils.fromWei(money));
        });
        ContractInstance.methods.allowMoney(addr).call().then((money) => {
            $("#list").find(".allowMoney").html(web3Obj.utils.fromWei(money));
        });
        ContractInstance.methods.playerEtraxAddr_(thisId).call().then((etra) => {
            let performance = web3Obj.utils.fromWei(etra.performance);
            let currentPerformanceOne = web3Obj.utils.fromWei(etra.currentPerformanceOne);
            let currentPerformanceTwo = web3Obj.utils.fromWei(etra.currentPerformanceTwo);
            let earningPrincipal = web3Obj.utils.fromWei(etra.earningPrincipal);
            let teamNum = etra.teamNum;
            let levelPlayer = etra.levelPlayer;
            // let lastBonusId = web3Obj.utils.fromWei(etra.lastBonusId);
            let level = etra.level;
            let currentRound = etra.currentRound;
            let allEarning = web3Obj.utils.fromWei(etra.allEarning);
            let lostTimes = etra.lostTimes;

                ContractInstance.methods.playerxID_(agents).call().then((ref) => {
                    $("#list").find(".referees").html(ref.addr);
                });
                ContractInstance.methods.getRollInArrayDetail(addr).call().then((array) => {
                    showTips(false);
                    let list = $("#list");
                    list.find(".id").html(thisId);
                    list.find(".addr").html(addr);
                    list.find(".allBuy").html(allBuy);
                    list.find(".turnBuy").html(turnBuy);
                    list.find(".turnBonus").html(turnBonus);
                    list.find(".currentBonus").html(currentBonus);
                    list.find(".reinvest").html(reinvest);
                    list.find(".currentInterest").html(currentInterest);
                    list.find(".performance").html(performance);
                    list.find(".currentPerformanceOne").html(currentPerformanceOne);
                    list.find(".currentPerformanceTwo").html(currentPerformanceTwo);
                    list.find(".level").html(level);
                    list.find(".currentRound").html(currentRound);
                    list.find(".allEarning").html(allEarning);
                    list.find(".lostTimes").html(lostTimes);
                    list.find(".agents").html(agents);
                    list.find(".rollInArray").html(array.toString());
                    list.find(".earningPrincipal").html(earningPrincipal);
                    list.find(".teamNum").html(teamNum);
                    list.find(".levelPlayer").html(levelPlayer);
                    // list.find(".lastBonusId").html(lastBonusId);
                }, (err) => {
                    console.log("_______getRollInArrayDetail___________", err);
                });
        }, (err) => {
            console.log("________playerEtraxAddr___________", err);
        });

    }, (err) => {
        console.log("+++++++++++playerxID_+++++++++", err);
    });
}

function showTips(bool) {
    $("#tips").css("display", bool ? "inline-block" : "none");
    btn.attr("disabled", bool);
    btnAddr.attr("disabled", bool);
}

function getPlayerNum() {
    ContractInstance.methods.nPlayerNum().call().then((num) => {
        $("#nPlayerNum").html(num);
    });
    //rollInByPlayerId
    ContractInstance.methods.nRollIn().call().then((num) => {
        $("#nRollIn").html(num);
        lastLuckyer = [];
        getLastLuckyer(Number(num));
    });
    ContractInstance.methods.nCurrentGainId().call().then((num) => {
        $("#nCurrentGainId").html(num);
    });
    ContractInstance.methods.lastBonusRollId().call().then((num) => {
        $("#lastBonusRollId").html(num);
    });
    ContractInstance.methods.lastBonusTime().call().then((num) => {
        let time = new Date(num * 1000);
        time = time.Format("yyyy-MM-dd hh:mm:ss");     
        $("#lastBonusTime").html(time);
    });
}

let lastLuckyer = [];
function getLastLuckyer(id) {
    ContractInstance.methods.rollInByPlayerId(id).call().then((num) => {
        
        if(lastLuckyer.length < 10) {
            lastLuckyer.push(num);
            id--;
            getLastLuckyer(id);
        }
        if(lastLuckyer.length == 10) {
            $("#rollInByPlayerId").html(lastLuckyer.join(' , '));
        }
    });
}

function getLuckyer(i) {
    ContractInstance.methods.luckyer(i).call().then((addr) => {
        // $("#nPlayerNum").html(num)
        luckyArr.push(addr);
        if (addr) {
            i++;
            getLuckyer(i);
        }
    },(err)=>{
        // console.log(err);
        console.log('到底了');
        let str = luckyArr.join(" , ");
        $(".luckyer-box").find(".Luckyer").html(str);
    });
}

function clearContent() {
    let list = $("#list");
    list.find("li span:last-child").html("");
}

function begin(val) {
    getData(val);
}

function getJson() {
    return new Promise((resolve, reject) => {
        fetch("../contract/FutureWorld.json", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then((response) => {
            return response.json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            ContractInstance = new web3Obj.eth.Contract(json.abi);
            ContractInstance.options.address = ContractAddr;
            resolve(ContractInstance);
        });
    });
}

function getTokenJson() {
    return new Promise((resolve, reject) => {
        fetch("../contract/Token.json", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then((response) => {
            return response.json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            TokenInstance = new web3Obj.eth.Contract(json.abi);
            TokenInstance.options.address = TokenAddr;
            resolve(TokenInstance);
        });
    });
}

btn.on("click", () => {
    $("#inputAddr").val("");
    let val = $("#input").val();
    if (val === "") {
        return;
    }
    getJson().then(() => {
        begin(val);
    });
});

btnAddr.on("click", () => {
    let addr = $("#inputAddr").val();
    $("#input").val("");

    if (addr === "") {
        return;
    }
    if (!web3Obj.utils.isAddress(addr)) {
        alert("地址格式不对");
        return;
    }
    getJson().then(() => {
        beginAddr(addr);
    });
});


$("#input").on("blur", () => {
    let input = $("#input");
    input.val(input.val().replace(/[^\d]/g, ""));
});

getJson().then(() => {
    getPlayerNum();
    getLuckyer(0);
});

function beginAddr(addr) {
    ContractInstance.methods.pIDxAddr_(addr).call().then((id) => {
        console.log(id);
        getData(id);
    });
}


Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  
