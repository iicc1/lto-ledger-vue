const explorerUrl = {
    mainet: "https://nodes.lto.network/",
    tesnet: "https://testnet.lto.network/"
}


export default {

    methods: {
        async getAddressBalanceWithDetail (network, address, details) {
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
                        url = `${explorerUrl.network}addresses/balance/details/${address}`;
                    } else {
                        url = `${explorerUrl.network}addresses/balance/${address}`;
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

        },

        async getPrice () {
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
    }
}