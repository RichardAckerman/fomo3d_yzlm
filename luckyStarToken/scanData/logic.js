const linkNet = "https://chain3.mytokenpocket.vip";
const chain3 = new Chain3();
chain3.setProvider(new chain3.providers.HttpProvider(linkNet));
let chain3Js = chain3;

let ContractAddr = "0x7fc0432c35ba6c9da4489c84ff8ade154d5b884e";
let TokenAddr = "0xD98792127Cb7A0953669f2986af6fCAa37E40CD0";

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
    ContractInstance.playerxID_(id.toString(), (err, data) => {
        let thisId = id.toString();
        let addr = data[0];
        let allBuy = fromWei(data[1]);
        let turnBuy = fromWei(data[2]);
        let turnBonus = fromWei(data[3]);
        let currentBonus = fromWei(data[4]);
        let reinvest = parseInt(data[5]);
        let unionBonus = fromWei(data[6]);
        let currentInterest = fromWei(data[7]);
        let agents = parseInt(data[8]);
        if (addr === "0x0000000000000000000000000000000000000000") {
            alert("查无此人");
            showTips(false);
            return;
        }
        let list = $("#list");
        list.find(".id").html(thisId);
        list.find(".addr").html(addr);
        list.find(".moacBalance").html(chain3Js.fromSha(chain3Js.mc.getBalance(addr).toString()));
        list.find(".allBuy").html(allBuy);
        list.find(".turnBuy").html(turnBuy);
        list.find(".turnBonus").html(turnBonus);
        list.find(".currentBonus").html(currentBonus);
        list.find(".reinvest").html(reinvest);
        list.find(".unionBonus").html(unionBonus);
        list.find(".currentInterest").html(currentInterest);
        list.find(".agents").html(agents);
        ContractInstance.playerxID_(agents, (err, ref) => {
            $("#list").find(".referees").html(ref[0]);
        });
        ContractInstance.getRollInArrayDetail(addr, (err, array) => {
            showTips(false);
            list.find(".rollInArray").html(array.toString());
        });
        getTokenJson().then((ins) => {
            ins.balanceOf(addr, (err, cbe) => {
                list.find(".cbeBalance").html(fromWei(cbe));
            });
            ins.allowance(addr, ContractAddr, (err, cbe) => {
                list.find(".allowance").html(fromWei(cbe));
            });
        });
    });
    ContractInstance.playerEtraxAddr_(id.toString(), (err, etra) => {
        let performance = fromWei(etra[0]);
        let level = parseInt(etra[1]);
        let currentRound = parseInt(etra[2]);
        let allEarning = fromWei(etra[3]);
        let lostTimes = parseInt(etra[4]);
        let currentPerformanceOne = fromWei(etra[5]);
        let currentPerformanceTwo = fromWei(etra[6]);
        let earningPrincipal = fromWei(etra[7]);
        let list = $("#list");
        list.find(".performance").html(performance);
        list.find(".level").html(level);
        list.find(".currentRound").html(currentRound);
        list.find(".allEarning").html(allEarning);
        list.find(".lostTimes").html(lostTimes);
        list.find(".currentPerformanceOne").html(currentPerformanceOne);
        list.find(".currentPerformanceTwo").html(currentPerformanceTwo);
        list.find(".earningPrincipal").html(earningPrincipal);
    });
}

function fromWei(c) {
    return Math.floor(parseFloat(c.toString()) / 100) / 100 + "";
}

function showTips(bool) {
    $("#tips").css("display", bool ? "inline-block" : "none");
    btn.attr("disabled", bool);
    btnAddr.attr("disabled", bool);
}

function getPlayerNum() {
    ContractInstance.nPlayerNum((err, num) => {
        $("#nPlayerNum").html(num.toString());
    });
    ContractInstance.nRollIn((err, num) => {
        $("#nRollIn").html(num.toString());
        lastLuckyer = [];
        getLastLuckyer(Number(num));
    });
    ContractInstance.nCurrentGainId((err, num) => {
        $("#nCurrentGainId").html(num.toString());
    });
    ContractInstance.getBalance((err, num) => {
        $("#gameBalance").html(fromWei(num));
    });
}

let lastLuckyer = [];

function getLastLuckyer(id) {
    ContractInstance.rollInByPlayerId(id, (err, num) => {
        if (lastLuckyer.length < 10) {
            lastLuckyer.push(num);
            id--;
            getLastLuckyer(id);
        }
        if (lastLuckyer.length === 10) {
            $("#rollInByPlayerId").html(lastLuckyer.join(' , '));
        }
    });
}

function getLuckyer(i) {
    ContractInstance.luckyPotPerson(i, (err, id) => {
        if (err) {
            console.log('到底了');
            let str = luckyArr.join(" , ");
            $(".luckyer-box").find(".Luckyer").html(str);
        } else {
            luckyArr.push(id);
            if (id) {
                i++;
                if (i > 20) {
                    return;
                }
                getLuckyer(i);
            }
        }
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
        fetch("../contract/LuckyStar.json", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then((response) => {
            return response.json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            ContractInstance = chain3Js.mc.contract(json.abi).at(ContractAddr);
            resolve(ContractInstance);
        });
    });
}

function getTokenJson() {
    return new Promise((resolve, reject) => {
        fetch("../contract/token.json", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then((response) => {
            return response.json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            TokenInstance = chain3Js.mc.contract(json.abi).at(TokenAddr);
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
    if (!chain3Js.isAddress(addr)) {
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
    ContractInstance.pIDxAddr_(addr, (err, id) => {
        console.log(id);
        getData(id);
    });
}


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
