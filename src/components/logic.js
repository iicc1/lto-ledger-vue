import AsyncLock from 'async-lock'
import TransportU2F from '@ledgerhq/hw-transport-u2f'
import {WavesLedger} from '@waves/ledger'

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
  data () {
    return {
      userId: 1,
      userInfo: null
    }
  },
  methods: {
    async handleReset () {
      this.userInfo = null
    },
    async handleConnect () {
      this.userInfo = await device.getAddressInfo(this.userId, 76)
    }
  }
}
