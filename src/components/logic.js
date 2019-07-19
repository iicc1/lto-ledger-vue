import TransportU2F from '@ledgerhq/hw-transport-u2f';
import {WavesLedger} from 'lto-ledger-js-unofficial-test';
import { binary, json } from '@lto-network/lto-marshall'

const options = {
    debug: true,
    openTimeout: 3000,
    listenTimeout: 100000,
    exchangeTimeout: 100000,
    networkCode: 84, // 76 LTO Network mainnet 84 TESTNET // TODO add selector
    transport: TransportU2F
};
const ledger = new WavesLedger(options);

export default {
    name: 'Panel',
    data() {
        return {
            userId: 0,
            publicKey: null,
            address: null,
            ledgerAddressIsOk: null,
            recipientIsOk: null,
            userIsSigning: false,
            txData: {
                type: null,
                amount: null,
                fee: null,
                recipient: null,
                leaseId: null,  // TODO improve
            }
        }
    },
    mounted: async function () {
        const userInfo = await ledger.getUserDataById(this.userId);
        if (userInfo.address) {
            this.address = userInfo.address;
            this.publicKey = userInfo.publicKey;
            this.ledgerAddressIsOk = "is-success";
        }
    },
    methods: {
        async handleConnect(id) {
            this.userId = id;
            const userInfo = await ledger.getUserDataById(this.userId);
            if (userInfo.address) {
                this.address = userInfo.address;
                this.publicKey = userInfo.publicKey;
                this.ledgerAddressIsOk = "is-success";
            }
        },
        async transactionTypeSelection(type) {
            this.txData.type = type;
        },
        async amountSelection(amount) {
            this.txData.amount = amount * 10000000;
        },
        async recipientSelection(recipient) {
            if (/^(3[mMjJ]\w{33})$/.test(recipient)) {
                this.txData.recipient = recipient;
                this.recipientIsOk = "is-success";
            } else {
                this.recipientIsOk = "is-danger";
            }
        },
        async feeSelection(fee) {
            this.txData.fee = fee * 10000000;
        },
        async signTransaction() {
            // Validation
            if (! this.txData.type || ! this.txData.amount || ! this.txData.recipient || ! this.txData.fee) {
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
            const timestamp = new Date().getTime();

            let tx = {
                type: Number(this.txData.type),
                version: 2,
                senderPublicKey: this.publicKey,
                timestamp: timestamp,
                fee: this.txData.fee,
                attachment: ''
            };

            if (tx.type == 4 || tx.type == 8) {
                tx.amount = this.txData.amount;
                tx.recipient = this.txData.recipient;
            }

            if (tx.type == 9) {
                tx.leaseId = this.txData.leaseId;
            }
            console.log(tx)
            const bytes = binary.serializeTx(tx);
            //console.log("bytes: " + bytes);
            //console.log("json:" + json.stringifyTx(binary.parseTx(bytes)))
            try {
                const signature = await ledger.signTransaction(this.userId, '', bytes);
                tx.proofs = [];
                tx.proofs.push(signature);
                console.log("signature:" + signature);
                this.$dialog.confirm({
                    title: 'Transaction signed successfully',
                    message: '<b>Transaction data:</b> <pre>' + JSON.stringify(tx, null, 2) + '</pre>',
                    cancelText: 'Cancel',
                    confirmText: 'Broadcast transaction',
                    type: 'is-success',
                    onConfirm: async () => {
                        try {
                            const res = await fetch('https://nodes.lto.network/transactions/broadcast', {//nodes.lto.network  52.215.162.123:6869
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
                                console.log(content);
                                this.$dialog.alert(`Transaction broadcasted over the network! You can track it <a href="https://explorer.lto.network/transaction/` + content.id + `">here</a>`)
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