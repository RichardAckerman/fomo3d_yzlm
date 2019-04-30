const linkNet = "https://chain3.mytokenpocket.vip";
const chain3 = new Chain3();
chain3.setProvider(new chain3.providers.HttpProvider(linkNet));
let chain3Js = chain3;

let ContractAddr = "0x3acbf2503d8963983d5194f16a187ad4d86831fc";

let ContractInstance = null;

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

let agent1Num = 0;
let arr = [];
let who = "44";

function recursive(id) {
    ContractInstance.playerxID_(id.toString(), (err1, data) => {
        let agents = data[8].toString();
        console.log(id.toString());
        ContractInstance.nPlayerNum((err2, num) => {
            if (id < num) {
                if (agents === who) {
                    agent1Num++;
                    arr.push(id);
                }
                id++;
                getData(id);
            } else {
                console.log("over+++++:", agent1Num);
                console.log("arr+++++:", arr);
            }
        });
    });
}

getJson().then(() => {
    // recursive(1);
    loopQuery();
});

function loopQuery() {
    ContractInstance.nPlayerNum((err2, num) => {
        for (let i = 1; i <= num; i++) {
            ContractInstance.playerxID_(i, (err1, data) => {
                let agents = data[8].toString();
                if (agents === who) {
                    agent1Num++;
                    arr.push(i);
                    console.log("+++++:", agent1Num);
                    console.log("++++:", arr);
                }
            });
        }
    });
}
