// var Promise = require('promise');
var TYPE_MAP = {
    eth: '1',
    jingtum: '2',
    moac: '3',
    eos: '4',
    enu: '5'
};

var chain3 = new Chain3(new Chain3.providers.HttpProvider('https://chain3.mytokenpocket.vip'));


var _getTypeByStr = function (typeStr) {
    var reTrim = /^\s+|\s+$/g;
    typeStr += '';
    typeStr = typeStr.replace(reTrim, '').toLowerCase();
    return TYPE_MAP[typeStr] || typeStr;
};

var _getCallbackName = function () {
    var ramdom = parseInt(Math.random() * 100000);
    return 'tp_callback_' + new Date().getTime() + ramdom;
};

var _sendTpRequest = function (methodName, params, callback) {
    if (window.TPJSBrigeClient) {
        window.TPJSBrigeClient.callMessage(methodName, params, callback);
    }
    // ios
    if (window.webkit) {
        window.webkit.messageHandlers[methodName].postMessage({
            body: {
                'params': params,
                'callback': callback
            }
        });
    }
};

var tp = {
    version: '2.4.1',
    isConnected: function () {
        return !!(window.TPJSBrigeClient || (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getDeviceId));
    },
    invokeQRScanner: function () {
        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    var data = res.qrResult || '';
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            };

            _sendTpRequest('invokeQRScanner', '', tpCallbackFun);

        });
    },
    shareNewsToSNS: function (params) {
        var title = params.title || 'TokenPocket 你的通用数字钱包';
        var description = params.desc || '';
        var url = params.url || 'https://www.mytokenpocket.vip/';
        var previewImage = params.previewImage || '';


        var data = {
            title: title,
            description: description,
            url: url,
            previewImage: previewImage
        };

        _sendTpRequest('shareNewsToSNS', JSON.stringify(data), '');

    },
    getAppInfo: function () {
        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };
            _sendTpRequest('getAppInfo', '', tpCallbackFun);

        });
    },
    getDeviceId: function () {
        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    if (res.device_id) {
                        res.data = res.device_id;
                    }
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };

            _sendTpRequest('getDeviceId', '', tpCallbackFun);

        });

    },
    getWalletList: function (type) {
        type = _getTypeByStr(type);

        if (!type) {
            throw new Error('type invalid');
        }

        var params = {
            type: type
        };

        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {

                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };
            _sendTpRequest('getWalletList', JSON.stringify(params), tpCallbackFun);

        });
    },
    getWallets: function () {
        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };

            _sendTpRequest('getWallets', '', tpCallbackFun);

        });
    },
    getCurrentWallet: function () {
        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();
            // callback
            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    if (res.rawTransaction) {
                        res.data = res.rawTransaction;
                    }
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };
            _sendTpRequest('getCurrentWallet', '', tpCallbackFun);
        });
    },
    sign: function (params) {

        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };

            _sendTpRequest('sign', JSON.stringify(params), tpCallbackFun);
        });
    },
    back: function () {
        _sendTpRequest('back', '', '');
    },
    fullScreen: function (params) {
        _sendTpRequest('fullScreen', JSON.stringify(params), '');
    },
    close: function () {
        _sendTpRequest('close', '', '');
    },

    // eth moac
    pushMoacTransaction: function (params) {
        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };
            _sendTpRequest('pushMoacTransaction', JSON.stringify(params), tpCallbackFun);
        });
    },
    moacTokenTransfer: function (params) {

        if (!params.from || !params.to || !params.amount || !params.gasLimit || !params.tokenName) {
            throw new Error('missing params; "from", "to", "amount", "gasLimit", "tokenName" is required ');
        }

        if (params.contract && !params.decimal) {
            throw new Error('missing params; "decimal" is required ');
        }

        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();

            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };
            _sendTpRequest('moacTokenTransfer', JSON.stringify(params), tpCallbackFun);
        });

    },
    signTransaction: function (params) {
        if (!params.from || !params.to || !params.gasPrice || !params.gasLimit || !params.type || params.data === undefined) {
            throw new Error('missing params');
        }

        var type = _getTypeByStr(params.type);

        // 暂不支持井通
        if (!type || type === '2') {
            throw new Error('type invalid');
        }

        if (chain3.isAddress(params.from)) {
            throw new Error('from address is invalid');
        }

        if (chain3.isAddress(params.to)) {
            throw new Error('to address is invalid');
        }

        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();
            // callback
            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    if (res.rawTransaction) {
                        res.data = res.rawTransaction;
                    }
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };

            _sendTpRequest('signedTransaction', JSON.stringify(params), tpCallbackFun);

        });
    },
    makeTransaction: function (params) {
        if (!params.from || !params.to || !params.contractAddress || !params.gasPrice || !params.value || !params.type) {
            throw new Error('missing params');
        }

        var type = _getTypeByStr(params.type);
        if (!type) {
            throw new Error('type invalid');
        }

        if (chain3.isAddress(params.from)) {
            throw new Error('from address is invalid');
        }

        if (chain3.isAddress(params.to)) {
            throw new Error('to address is invalid');
        }

        if (chain3.isAddress(params.contractAddress)) {
            throw new Error('contractAddress address is invalid');
        }

        var inputData = '';
        // var gas = params.gasPrice || '';
        var abi = [
            {
                "constant": false,
                "inputs": [{
                    "name": "_spender",
                    "type": "address"
                }, {
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "approve",
                "outputs": [{
                    "name": "success",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "_from",
                    "type": "address"
                }, {
                    "name": "_to",
                    "type": "address"
                }, {
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "transferFrom",
                "outputs": [{
                    "name": "success",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_owner",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "name": "balance",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "_to",
                    "type": "address"
                }, {
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "transfer",
                "outputs": [{
                    "name": "success",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "_owner",
                    "type": "address"
                }, {
                    "name": "_spender",
                    "type": "address"
                }],
                "name": "allowance",
                "outputs": [{
                    "name": "remaining",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                }, {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "Transfer",
                "type": "event"
            }, {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "_owner",
                    "type": "address"
                }, {
                    "indexed": true,
                    "name": "_spender",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }],
                "name": "Approval",
                "type": "event"
            }
        ];
        // 墨客
        if (params.type === '3') {
            var contract = new chain3.mc.contract(abi);
            var contractInstance = contract.at(this.contractAddress);
            inputData = contractInstance.transfer.getData(params.to, params.value);
        } else {
            throw new Error('the type is not supported yet');
        }

        return new Promise(function (resolve, reject) {
            var tpCallbackFun = _getCallbackName();
            // callback
            window[tpCallbackFun] = function (result) {
                result = result.replace(/\r/ig, "").replace(/\n/ig, "");
                try {
                    var res = JSON.parse(result);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            };

            var transactionObject = {
                from: params.from,
                to: params.to,
                gasPrice: params.gasPrice,
                gasLimit: 60000,
                contractAddress: params.contractAddress,
                data: inputData,
                chainId: type
            };

            _sendTpRequest('makeTransactions', JSON.stringify(transactionObject), tpCallbackFun);

        });
    }
};
