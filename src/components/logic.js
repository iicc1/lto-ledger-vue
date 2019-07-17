import AsyncLock from 'async-lock'
import TransportU2F from '@ledgerhq/hw-transport-u2f'
import {WavesLedger} from 'iicc1/lto-ledger-js-unofficial'

const LOCK = 'LedgerDevice';

class LedgerDevice {
    constructor () {
        this.lock = new AsyncLock()
    }

    async getAddressInfo (userId, networkCode = 76) {
        return this._safeExec(
            async () => {
                const app = new WavesLedger({
                    transport: TransportU2F,
                    exchangeTimeout: 10000,
                    networkCode,
                    debug: true
                });
                return await app.getUserDataById(userId)
            }
        )
    }

    async _safeExec (callable) {
        return this.lock.acquire(
            LOCK,
            callable
        )
    }
}

const device = new LedgerDevice();

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
            transactionData: {
                type: null,
                amount: null,
                recipient: null,
                fee: null
            }
        }
    },
    methods: {
        async handleReset() {
            this.userInfo = null
        },
        async handleConnect(id) {
            console.log(id);
            this.userId = id;
            this.userInfo = await device.getAddressInfo(this.userId, 76);
            if (this.userInfo.address) {
                this.address = this.userInfo.address;
                this.publicKey = this.userInfo.publicKey;
                this.addressOk = "is-success";
            }
        },
        async transactionTypeSelection(type) {
            this.transactionData.type = type;
        },
        async amountSelection(amount) {
            this.transactionData.amount = amount * 10000000;
        },
        async recipientSelection(recipient) {
            if (/^(3[jJ]\w{33})$/.test(recipient)) {
                this.transactionData.recipient = recipient;
                this.recipientOk = "is-success";
            } else {
                this.recipientOk = "is-danger";
            }
        },
        async feeSelection(fee) {
            this.transactionData.fee = fee * 10000000;
        },
        async signTransaction() {
            console.log(this.transactionData)
        }
    }
}