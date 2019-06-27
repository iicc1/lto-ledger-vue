import AsyncLock from 'async-lock'
import TransportU2F from '@ledgerhq/hw-transport-u2f'
import { WavesLedger } from '@waves/ledger'
// import BigNumber from 'bignumber.js'

const LOCK = 'LedgerDevice'

class LedgerDevice {
  constructor () {
    this.lock = new AsyncLock()
  }

  async getAddressInfo (userId, networkCode = 76) {
    return this._safeExec(
      async () => {
        // const transport = await TransportU2F.create()
        const app = new WavesLedger({
          transport: TransportU2F,
          exchangeTimeout: 10000,
          networkCode,
          debug: false
        })
        const data = await app.getUserDataById(userId)
        // eslint-disable-next-line
        // console.log('data', data)
        return data
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

const device = new LedgerDevice()

export default {
  data () {
    return {
      userId: 0,
      userInfo: null
    }
  },
  methods: {
    async handleReset () {
      this.userInfo = null
    },
    async handleConnect () {
      // this.userInfo =
      this.userInfo = await device.getAddressInfo(this.userId, 76 /*lto network mainnet code*/)
    }
  }
}
