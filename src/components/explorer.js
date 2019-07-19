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
                    error: "Not a valid addresses el maximo por ",
                    data: null
                }
            }
            else {
                let url;
                if(details) {
                    url = `${explorerUrl.network}addresses/balance/details/${address}`;
                } else {
                    url = `${explorerUrl.network}addresses/balance/${address}`;
                }
                
                fetch(url,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(response) {
                    return {
                        status: response.status,
                        data:  response.json()
                    }
                })
                .then(function(data) {
                    console.log('data = ', data);
                })
                .catch(function(err) {
                    console.error(err);
                    return {
                        status: err.status,
                        data:  response.json()
                    }
                });
            }

        }
    }
}