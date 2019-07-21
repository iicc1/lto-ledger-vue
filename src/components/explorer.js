const explorerUrl = {
    mainnet: "https://nodes.lto.network/",
    testnet: "https://testnet.lto.network/"
};

let address;
let composedData;
let addressData;
let priceData;
let loading = false;

async function getData (address) {
    loading = true;
    let addressData = await getAddressBalanceWithDetail('mainnet', address, true);
    let priceData = await getPrice();
    composedData = {};
    if (priceData.hasOwnProperty("lto-network")) {
        let keys = Object.keys(priceData["lto-network"]);
        keys.forEach(key => {
            if (key == 'eur' || key == 'usd') {
                composedData[key] = {
                    "available": (addressData.available * priceData["lto-network"][key]) / 100000000,
                    "regular": (addressData.regular * priceData["lto-network"][key]) / 100000000
                }
            }
            else {
                composedData[key] = {
                    "available": ((addressData.available * priceData["lto-network"][key]) / 100000000).toFixed(2),
                    "regular": ((addressData.regular * priceData["lto-network"][key]) / 100000000).toFixed(2)
                }
            }
        });
    }
    // this.composedData = composedData
    console.log("======")
    console.log(composedData)
    console.log("======")
    loading = false;
}

async function getPrice () {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=lto-network&vs_currencies=usd%2Ceur%2Cbtc%2Ceth",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const content = await res.json();

        return content;
    }
    catch (err) {
        return {
            status: 500,
            error: err.toString(),
            data: null
        }
    }
}

async function getAddressBalanceWithDetail (network, address, details) {
    if (!explorerUrl.hasOwnProperty(network)) {
        return {
            status: 500,
            error: "Not a valid network",
            data: null
        }
    }
    else if (!address || address == '') {
        return {
            status: 500,
            error: "Not a valid address",
            data: null
        }
    }
    else {
        try {
            let url;
            if(details) {
                url = `${explorerUrl[network]}addresses/balance/details/${address}`;
            } else {
                url = `${explorerUrl[network]}addresses/balance/${address}`;
            }
            const res = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const content = await res.json();

            return content;
        }
        catch (err) {
            return {
                status: 500,
                error: err.toString(),
                data: null
            }
        }
    }

}

export default {
    methods: {
        data() {
            return {
                addressData: null,
                priceData: null,
                composedData: null,
                isLoading: null,
                address: null
            }
        },
        async testAddress() {
            console.log(this.$root.address)
        },
        async addressInExplorer() {
            let url;
            // if (testnet) {
            //     url = `https://testnet-explorer/${address}`
            // }
            // else {
            //     url = `https://explorer.lto.network/${address}`
            // }

            var win = window.open(url, '_blank');
            win.focus();
        }

    }
}