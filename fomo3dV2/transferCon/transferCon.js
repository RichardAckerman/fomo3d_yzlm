let ContractInstance = null

let web3js
let $myAddress

let btn = document.getElementById("button")
let input = document.getElementById("input")
btn.addEventListener("click", (e) => {
    e.preventDefault()
    let value = input.value
    if (value === "") {
        alert("请输入金额")
        return
    }
    let coin = web3js.toWei(value)
    console.log(coin)
    $myAddress && ContractInstance.divideMoney({
        from: $myAddress,
        value: coin
    }, (err, hash) => {
        err && console.log(err)
        hash && console.log(hash)
    })
})

input.addEventListener("blur", (e) => {
    // input.value = input.value.replace(/[^\d]/g, "")
})

getNetWork().then(() => {
    getJson().then((Instance) => {
        ContractInstance = Instance
    })
})

function getNetWork() {
    return new Promise(resolve => {
        if (typeof web3 !== 'undefined') {
            web3.version.getNetwork((err, netId) => {
                switch (netId) {
                    case "1":
                        web3js = new Web3(web3.currentProvider)
                        resolve()
                        /**get user address */
                        $myAddress = web3js.eth.accounts[0]
                        let timer = setInterval(() => {
                            $myAddress = web3js.eth.accounts[0]
                            if (!$myAddress) {
                                clearInterval(timer)
                            }
                        }, 2000)
                        break
                    default:
                        //Use ethereum main provider
                        // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.103:7545"))
                        web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"))
                        resolve()
                }
            })
        } else {
            // web3js = new Web3(new Web3.providers.HttpProvider("http://192.168.1.103:7545"))
            web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"))
            resolve()
        }
    })
}


function getJson() {
    return new Promise((resolve, reject) => {
        fetch("./transferCon.json", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            return response.json()
        }, (error) => {
            reject(error)
        }).then((json) => {
            let $gameContract = web3js.eth.contract(json.abi)
            let $gameContractInstance = $gameContract.at("0x7f8ff132bde0593d4400c4daf48c8aa4608e0dfd")
            resolve($gameContractInstance)
        })
    })
}