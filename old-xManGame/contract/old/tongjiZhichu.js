const request = require('request')
let url = 'https://etherscan.io/txsInternal?a=0x607acab3b6ecaa1bc34e1ff16c4d706faba85405&p='

let num = 0

function getHtml(page) {
    request({
        url: encodeURI(url + page),
        method: "GET",
        json: true,
        headers: {
            "content-type": "text/html",
        },
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let tbody = body.split("<tbody>")[1].split("</tbody>")[0]
            let tr = tbody.split("</tr>")
            for (let i = 0; i < 50; i++) {
                let hash = tr[i].split('address-tag')[1].split("/tx/")[1].substr(0, 66)
                let from = tr[i].split('address-tag')[2].split("/address/")[1].substr(0, 42)
                let to = tr[i].split('address-tag')[3].split("/address/")[1].substr(0, 42)
                let value = tr[i].split('address-tag')[3].split("Ether")[0].split("<td>")[1]
                if (value.indexOf("b") !== -1) {
                    let int = value.split("<b>")[0];
                    let float = value.split("</b>")[1];
                    value = `${int}.${float}`
                }
                console.log(`${hash},${from},${to},${value}`)
                num++
            }
            page++
            if (page <= 200) {
                getHtml(page)
            } else {
                console.log("++++++++++++++", num)
            }
        }
    })
}

console.log(`ParentTxHash,from,to,value`)
getHtml(1)
