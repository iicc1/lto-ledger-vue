const explorerUrl = {
    mainet: "https://nodes.lto.network/",
    tesnet: "https://testnet.lto.network/"
}

const response = {
    status,
    error,
    data
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

        }
    }
}