const linkNet = "https://chain3.mytokenpocket.vip";
let chain3Js = chain3;
let $tp;


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
    $tp = tp;
    if (typeof $tp !== 'undefined') {
        if (!$tp.isConnected()) {
            myAddress.html("需要在tp钱包中打开");
            return;
        }
        $tp.getCurrentWallet().then((response) => {
            if (response.result) {
                myAddressAddr = response.data.address;
                myAddress.html(myAddressAddr);
            } else {
                alert('查询失败！' + response.message);
            }
        });
    }
}, 1000);

function $sendTransiction(data, f) {
    if ($tp === undefined || !$tp.isConnected() || myAddressAddr === undefined) {
        alert("需要在tp钱包中打开");
        return;
    }
    let parameters = {
        from: myAddressAddr,
        to: conAddr,
        gasPrice: 30000000000,
        gasLimit: 2000000,
        data: data,
        value: '0',
        chainId: 99,
        via: '',
        shardingFlag: 0,
    };
    $tp.pushMoacTransaction(parameters).then((response) => {
        if (!response.result) {
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
