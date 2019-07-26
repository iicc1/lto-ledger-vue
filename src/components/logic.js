import "@babel/polyfill";
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import {WavesLedger} from 'lto-ledger-js-unofficial-test';
import * as Transactions from './transactions.js'


async function getData(address, network, api, priceData) {
    let addressData = await getAddressBalance(network, address, api);
    if (addressData.error) {
        return {"error": "Error getting balance data: " + addressData.message};
    }
    else if (priceData.error) {
        return {"error": "Error getting price data: "};
    }
    else {
        let composedData = {};
        if (priceData.hasOwnProperty("lto-network")) {
            let keys = Object.keys(priceData["lto-network"]);
            keys.forEach(key => {
                if (key == 'usd') {
                    composedData[key] = {
                        "available": (addressData.available * priceData["lto-network"][key]) / 100000000,
                        "regular": (addressData.regular * priceData["lto-network"][key]) / 100000000
                    }
                }
            });
        }
        return {"composedData":composedData,"addressData":addressData};
    }
}

async function getPrice() {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=lto-network&vs_currencies=usd",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await res.json();
    } catch (err) {
        return {
            error: 500,
            message: err.message,
        }
    }
}

async function getAddressBalance(network, address, api) {
    try {
        let url = `${api[network]}addresses/balance/details/${address}`;
        const res = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await res.json();
    } catch (err) {
        return {
            error: 500,
            message: err.message,
        }
    }
}

export default {
    name: 'Panel',
    data() {
        return {
            // Ledger stuff
            ledgerOptions: {
                openTimeout: 3000,
                listenTimeout: 250000,
                exchangeTimeout: 250000,
                networkCode: 76, // 76 LTO Network mainnet 84 TESTNET
                transport: TransportU2F
            },
            ledger : null,
            userId: 0, // default bip32 path
            publicKey: null,
            ledgerAddressIsOk: null,
            address: null,
            // Api
            api: {
                Mainnet: 'https://nodes.lto.network/',
                Testnet: 'https://testnet.lto.network/'
            },
            // Statuses
            recipientIsOk: null,
            userIsSigning: false,
            network: 'Mainnet',
            isSwitched: false,
            composedData: null,
            isLoading: true,
            addressData: null,
            priceData: null,
            // Transaction data
            txData: {
                type: null,
                amount: null,
                fee: null,
                recipient: null,
            }
        }
    },
    mounted: async function () {
        // gets price data from coingecko and saves it for later use
        const priceData = await getPrice();
        if (priceData.hasOwnProperty("error")) {
            this.$notification.open({
                message: "Error getting price data",
                position: 'is-bottom-right',
                duration: 20000,
                type: 'is-danger',
                hasIcon: true,
                queue: false
            })
        }
        else {
            this.priceData = priceData;
        }
        // Creates a new default ledger instance
        this.ledger = new WavesLedger(this.ledgerOptions);
        // Tries to connect and fetches the first wallet
        const userInfo = await this.ledger.getUserDataById(this.userId);
        if (userInfo.address) {
            this.address = userInfo.address;
            this.publicKey = userInfo.publicKey;
            this.ledgerAddressIsOk = "is-success";
            this.isLoading = true;
            let dataGet = await getData(this.address, this.network, this.api, this.priceData);
            if (dataGet.hasOwnProperty("error")) {
                this.$notification.open({
                    message: dataGet.error,
                    position: 'is-bottom-right',
                    duration: 20000,
                    type: 'is-danger',
                    hasIcon: true,
                    queue: false
                })
            }
            else {
                this.composedData = dataGet;
            }
            this.isLoading = false;
        }
    },
    methods: {
        async networkChange(selector) {
            this.network = selector;
            // Modifies the ledger instance reactively
            if (selector == "Mainnet") {
                this.ledgerOptions.networkCode = 76;
            } else {
                this.ledgerOptions.networkCode = 84;
            }
            this.ledger = new WavesLedger(this.ledgerOptions);
            // Gets again the basic ledger data
            const userInfo = await this.ledger.getUserDataById(this.userId);
            if (userInfo.address) {
                this.address = userInfo.address;
                this.publicKey = userInfo.publicKey;
                this.ledgerAddressIsOk = "is-success";
                this.isLoading = true;
                let dataGet = await getData(this.address, this.network, this.api, this.priceData);
                if (dataGet.hasOwnProperty("error")) {
                    this.$notification.open({
                        message: dataGet.error,
                        position: 'is-bottom-right',
                        duration: 20000,
                        type: 'is-danger',
                        hasIcon: true,
                        queue: false
                    })
                }
                else {
                    this.composedData = dataGet;
                }
                this.isLoading = false;
            }
        },
        async addressInExplorer() {
            let url;
            if (this.network.toLowerCase() != "mainnet") {
                url = `https://testnet-explorer.lto.network/addresses/${this.address}`
            }
            else {
                url = `https://explorer.lto.network/addresses/${this.address}`
            }
            let win = window.open(url, '_blank');
            win.focus();
        },
        async handleConnect(id) {
            this.userId = id;
            const userInfo = await this.ledger.getUserDataById(this.userId);
            if (userInfo.address) {
                this.address = userInfo.address;
                this.publicKey = userInfo.publicKey;
                this.ledgerAddressIsOk = "is-success";
                this.isLoading = true;
                let dataGet = await getData(this.address, this.network, this.api, this.priceData);
                if (dataGet.hasOwnProperty("error")){
                    this.$notification.open({
                        message: dataGet.error,
                        position: 'is-bottom-right',
                        duration: 20000,
                        type: 'is-danger',
                        hasIcon: true,
                        queue: false
                    })
                }
                else {
                    this.composedData = dataGet;
                }
                this.isLoading = false;
            }
        },
        async transactionTypeSelection(type) {
            this.txData.type = Number(type);
        },
        async amountSelection(amount) {
            this.txData.amount = amount * 100000000;
        },
        async recipientSelection(recipient) {
            let regex;
            if (this.network == 'Mainnet') {
                regex = /^(3[jJ]\w{33})$/;
            } else {
                regex = /^(3[mM]\w{33})$/;
            }
            if (regex.test(recipient)) {
                this.txData.recipient = recipient;
                this.recipientIsOk = "is-success";
            } else {
                this.recipientIsOk = "is-danger";
            }
        },
        async feeSelection(fee) {
            this.txData.fee = fee * 100000000;
        },
        async signTransaction() {
            // Validation
            let tx = this.txData;
            tx.senderPublicKey = this.publicKey;
            if (! tx.type || ! tx.amount || ! tx.recipient || ! tx.fee || ! tx.senderPublicKey) {
                this.$notification.open({
                    message: `Please fill all fields first!`,
                    position: 'is-bottom-right',
                    duration: 15000,
                    type: 'is-danger',
                    hasIcon: true,
                    queue: false
                });
                return;
            }
            // Start signing
            this.userIsSigning = true;
            tx.timestamp = new Date().getTime();
            const bytes = Transactions.prepareBytes(tx);
            try {
                tx.signature = await this.ledger.signTransaction(this.userId, '', bytes, 1);
                this.$dialog.confirm({
                    title: 'Transaction signed successfully',
                    message: '<b>Transaction data:</b> <pre>' + JSON.stringify(tx, null, 2) + '</pre>',
                    cancelText: 'Cancel',
                    confirmText: 'Broadcast transaction',
                    type: 'is-success',
                    onConfirm: async () => {
                        try {
                            const res = await fetch(`${this.api[this.network]}transactions/broadcast`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(tx)
                            });
                            const content = await res.json();
                            if (content.error) {
                                this.$dialog.alert({
                                    title: 'Error '+ content.error,
                                    message: content.message,
                                    type: 'is-danger',
                                    hasIcon: true,
                                    icon: 'info-circle',
                                })
                            } else {
                                let txUrl;
                                if (this.network.toLowerCase() != "mainnet") {
                                    txUrl = `https://testnet-explorer.lto.network/`;
                                }
                                else {
                                    txUrl = `https://explorer.lto.network/}`;
                                }
                                this.$dialog.alert(`Transaction broadcasted over the network! You can track it <a href="${txUrl}/transaction/` + content.id + `">here</a>.
                                                    Remember to refresh the page if the explorer has not found the transaction yet!`)
                            }
                        } catch (e) {
                            this.$dialog.alert({
                                title: 'Error',
                                message: e.message,
                                type: 'is-danger',
                                hasIcon: true,
                                icon: 'info-circle',
                            })
                        }
                    }
                })
            } catch (e)  {
                this.$notification.open({
                    message: `Transaction cancelled by the user.`,
                    position: 'is-bottom-right',
                    duration: 20000,
                    type: 'is-danger',
                    hasIcon: true,
                    queue: false
                })
            }
            this.userIsSigning = null;
        }
    }
}