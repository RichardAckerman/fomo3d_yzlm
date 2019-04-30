const linkNet = "https://chain3.mytokenpocket.vip";
const chain3 = new Chain3();
chain3.setProvider(new chain3.providers.HttpProvider(linkNet));
let chain3Js = chain3;
let $moac;


let setBtn = $("#setBtn");
let warn = $(".warn");
let myAddress = $("#myAddress");
let myAddressAddr = undefined;
let $gameContractInstance;
let conAddr = "0x426f6a364ca09b88e190d51fbbda27001c72c95d";
let emptyAddr = "0x0000000000000000000000000000000000000000";
$("#gameAddr").html(conAddr);
/**
 * updateBanker.html
 * updateBase.html
 * updatePlayer.html
 * updateRate.html
 */

setTimeout(() => {
    const chain3 = new Chain3();
    chain3.setProvider(new chain3.providers.HttpProvider(linkNet));
    chain3Js = chain3;
    $moac = moac;
    if (typeof $moac !== 'undefined') {
        let payload = {
            method: "net_version",
            params: [""],
        };
        $moac.sendAsync(payload, function (response) {
            if (response.code === 'fail') {
                alert("网络错误");
            } else {
                switch (response.data.result) {
                    case "99":
                        myAddress.html($moac.selectedAddress);
                        myAddressAddr = $moac.selectedAddress;
                        break;
                    default:
                        myAddress.html("net_version不正确，当前id为" + response.data.result);
                }
            }
        });
    } else {
        myAddress.html("需要在moac钱包中打开");
    }
}, 1000);

function $sendTransiction(data, f) {
    if (moac === undefined || moac.selectedAddress === undefined) {
        alert("需要在moac钱包中打开");
        return;
    }
    let parameters = {
        data: data,
        from: moac.selectedAddress,
        shardingFlag: 0,
        gasPrice: chain3Js.intToHex(9000000000),
        gasLimit: chain3Js.intToHex(2000000),
        to: conAddr,
    };
    let payload = {
        method: "mc_sendTransaction",
        params: [parameters],
    };
    moac.sendAsync(payload, function (response) {
        if (response.code === 'fail') {
            alert('交易发送失败！' + response.message);
        } else {
            alert('交易发送成功，请等待出块！' + JSON.stringify(response.data)); // 链上的失败消息也会弹出来
            if (f) {
                f();
            }
        }
    });
}

function getJson() {
    return new Promise((resolve, reject) => {
        fetch("../contract/LuckyStar.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            return response.json();
        }, (error) => {
            reject(error);
        }).then((json) => {
            $gameContractInstance = chain3Js.mc.contract(json.abi).at(conAddr);
            resolve($gameContractInstance);
        });
    });
}

function setWarn(bool) {
    warn.css("display", bool ? "inline-block" : "none");
    setTimeout(() => {
        warn.css("display", "none");
    }, 3000);
}

function setBtnShow(bool) {
    setBtn.attr("disabled", bool);
}
