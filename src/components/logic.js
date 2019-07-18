import AsyncLock from 'async-lock';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import {WavesLedger} from '@waves/ledger';
import { binary, json } from '@lto-network/lto-marshall'

const options = {
    debug: true,
    openTimeout: 3000,
    listenTimeout: 100000,
    exchangeTimeout: 100000,
    networkCode: 84, // 76 LTO Network mainnet 84 TESTNET
    transport: TransportU2F
};
const ledger = new WavesLedger(options);

export default {
    name: 'Panel',
    data() {
        return {
            userId: 1,
            userInfo: null,
            loading: true,
            placeholder: "Loading addresses from Ledger",
            address: null,
            publicKey: null,
            addressOk: null,
            recipientOk: null,
            userIsSigning: false,
            tx: {
                senderPublicKey: null,
                type: null,
                version: 2,
                amount: null,
                recipient: null,
                fee: null,
                timestamp: 1542539421565,
                attachment: '',
                signature: null,
            }
        }
    },
    mounted: async function () {
        this.userInfo = await ledger.getUserDataById(this.userId);
        if (this.userInfo.address) {
            this.address = this.userInfo.address;
            this.publicKey = this.userInfo.publicKey;
            this.addressOk = "is-success";
        }
    },
    methods: {
        async handleConnect(id) {
            this.userId = id;
            this.userInfo = await ledger.getUserDataById(this.userId);
            if (this.userInfo.address) {
                this.address = this.userInfo.address;
                this.publicKey = this.userInfo.publicKey;
                this.addressOk = "is-success";
            }
        },
        async transactionTypeSelection(type) {
            this.tx.type = type;
        },
        async amountSelection(amount) {
            this.tx.amount = amount * 10000000;
        },
        async recipientSelection(recipient) {
            if (/^(3[jJ]\w{33})$/.test(recipient)) {
                this.tx.recipient = recipient;
                this.recipientOk = "is-success";
            } else {
                this.recipientOk = "is-danger";
            }
        },
        async feeSelection(fee) {
            this.tx.fee = fee * 10000000;
        },
        async signTransaction() {
            this.userIsSigning = true;
            this.tx.timestamp = new Date().getTime();
            let tx2 = {
                type: 8,
                version: 2,
                senderPublicKey: '6x8szHwCLYVjKR2N8u4Ux4XLkTUB7nobDNDX1tniH3mp',
                timestamp: 1563442673094,
                amount: 100000000,
                fee: 100000000,
                recipient: '3MyhVrN18vX7X77AeF8mzL8arJnkicY4GDc',
                attachment: ''
            };

            let tx = {
                type: 4,
                version: 2,
                senderPublicKey: '6x8szHwCLYVjKR2N8u4Ux4XLkTUB7nobDNDX1tniH3mp',
                timestamp: 1563442673094,
                amount: 100000000,
                fee: 100000000,
                recipient: '3MyhVrN18vX7X77AeF8mzL8arJnkicY4GDc',
                attachment: ''
            };

            let tx22 = {
                type: 9,
                version: 2,
                senderPublicKey: '6x8szHwCLYVjKR2N8u4Ux4XLkTUB7nobDNDX1tniH3mp',
                timestamp: 1563442673094,
                amount: 100000000,
                fee: 100000000,
                leaseId: '5zB1xv7e4WA2q3n1WhxWSKEvVDyBjAZrmqDxsFtZht1x',
                chainId:84
            };

            const bytes = binary.serializeTx(tx);
            console.log("bytes: " + bytes);
            console.log("json:" + json.stringifyTx(binary.parseTx(bytes)))
            try {
                const signature = await ledger.signTransaction(this.userId, '', bytes);
                tx.proofs = [];
                tx.proofs.push(signature);
                const bytes2 = binary.serializeTx(tx);
                const txb = binary.parseTx(bytes2)
                const jsonString = json.stringifyTx(txb)
                console.log("jsonString: " + jsonString)
                console.log("sign:" + signature)
                this.$dialog.confirm({
                    title: 'Transaction signed successfully',
                    message: '<b>Transaction data:</b> <pre>' + JSON.stringify(tx, null, 2) + '</pre>',
                    cancelText: 'Cancel',
                    confirmText: 'Broadcast transaction',
                    type: 'is-success',
                    onConfirm: async () => {
                        const rawResponse = await fetch('https://nodes.lto.network/transactions/broadcast', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jsonString)
                        });
                        const content = await rawResponse.json();

                        console.log(content);
                        return this.$notification.open({
                            message: `Transaction broadcasted over the network! You can track it here:
                                    <a href="https://explorer.lto.network">https://explorer.lto.network</a>`,
                            position: 'is-bottom-right',
                            duration: 200000,
                            type: 'is-success',
                            hasIcon: true
                        });
                    }

                })
            } catch (e)  {
                this.$notification.open({
                    message: `Transaction cancelled by the user.`,
                    position: 'is-bottom-right',
                    duration: 20000,
                    type: 'is-danger',
                    hasIcon: true
                })
            }
            this.userIsSigning = null;
        }
    }
}