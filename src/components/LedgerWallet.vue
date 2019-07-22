<template>
    <div class="main">
        <div class="hero-title title">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title" style="color: white; font-weight: bold; font-size: 1.25em">
                        LTO Network
                    </h1>
                    <h2 class="subtitle" style="color: white">
                        Ledger Hardware Wallet Interface
                    </h2>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="columns">
                <div class="column is-half">
                    <div class="notification panel text-shadow shadow-effect min-height-140"> 
                    <div class="columns">
                        <div class="column is-half">
                        <h4 class="title is-4">Balance</h4>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-half">
                            <span v-if="!isLoading && composedData">
                            <strong> Total: </strong> <i>{{(composedData["addressData"].regular / 100000000).toFixed(2)}}</i> LTO |  <i>{{composedData["composedData"]["usd"].regular.toFixed(2)}}</i> $
                            <br>
                            <strong> Available: </strong> <i>{{(composedData["addressData"].available / 100000000).toFixed(2)}}</i> LTO |  <i>{{composedData["composedData"]["usd"].available.toFixed(2)}}</i> $
                            </span>
                        </div>
                        <div class="column is-half" v-if="address">
                            <div class="buttons is-pulled-right">
                                <!-- external-link-alt -->
                                <b-button type="is-primary" @click="addressInExplorer">Check in explorer</b-button>
                            </div>
                        </div>
                    </div>


                    <b-loading :is-full-page="false" :active="isLoading"></b-loading>
                    </div>
                </div>

                <div class="column is-half">
                    <div class="notification panel text-shadow shadow-effect min-height-140"> 
                        <div class="columns">
                            <div class="column is-full">
                                <h4 class="title is-4">Network Switch</h4>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column is-half">
                                <h5 v-if="network == 'Mainnet'" class="title is-5">LTO Functional Network</h5>
                                <h5 v-else  class="title is-5">LTO Testing Environment</h5>
                            </div>

                            <div class="column is-half">
                                <div class="field right">
                                    <b-switch @input="networkChange" size="is-medium" v-model="network"
                                        true-value="Mainnet"
                                        false-value="Testnet">
                                        {{ network }}
                                    </b-switch>
                                </div>              
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="notification panel text-shadow shadow-effect">
                <b-field grouped>
                    <b-field label="Your Ledger address" expanded custom-class="is-size-5" v-bind:type="ledgerAddressIsOk">
                        <b-input v-if=address icon-pack="fas" size="is-medium" v-bind:value="address" disabled></b-input>
                        <b-input v-else icon-pack="fas" size="is-medium" placeholder="Loading address from Ledger device" loading></b-input>
                    </b-field>
                    <b-field label="Address ID" custom-class="is-size-5">
                        <b-select placeholder="0" size="is-medium" @input="handleConnect">
                            <option v-for="n in 11" >{{ n - 1 }}</option>
                        </b-select>
                    </b-field>
                </b-field>

                <b-field grouped>
                    <b-field label="Transaction type" custom-class="is-size-5">
                        <b-select placeholder="Select a type" size="is-medium" @input="transactionTypeSelection">
                            <option value=4>Transfer</option>
                            <option value=8>Start Lease</option>
                            <option value=9>Cancel Lease</option>
                            <option value=15>Anchor</option>
                        </b-select>
                    </b-field>
                    <b-field label="Amount" expanded custom-class="is-size-5">
                        <b-input type="number" step=".00000001" min="0" placeholder="0,00 LTO" size="is-medium" @input="amountSelection"></b-input>
                    </b-field>
                </b-field>

                <b-field label="To address" custom-class="is-size-5" v-bind:type="recipientIsOk">
                    <b-input name="LTO Network address" expanded size="is-medium" @input="recipientSelection"></b-input>
                </b-field>

                <b-field label="Transaction Fee" custom-class="is-size-5">
                    <b-input type="number" step=".00000001" min="0.5" placeholder="1,00 LTO" size="is-medium" @input="feeSelection"></b-input>
                </b-field>

                <div class="has-text-centered">
                    <br>
                    <b-button v-if="userIsSigning" type="is-primary" size="is-medium" loading>Sign transaction</b-button>
                    <b-button v-else type="is-primary" size="is-medium" @click="signTransaction">Sign transaction</b-button>
                    <br><br>
                </div>
            </div>
        </div>


        <footer class="footer" >
            <div class="content has-text-centered">

                Made by <a href="https://t.me/iicc1">@iicc1</a> & <a href="https://t.me/unai93">@unai93</a> using <a href="https://github.com/vuejs/vue">Vue.js</a> and <a href="https://buefy.org">Buefy</a>
                <br><br>
                Price data by <a href="https://www.coingecko.com">Coingecko</a>
                    <!-- Hosted by <a href="https://www.netlify.com/">Netlify</a> -->
                <br><br>
                Do you need help? Join <a href="https://t.me/ltonetwork/">LTO Network Tech chat</a>
                <br><br>
                <iframe class="iframe-custom" src="https://ghbtns.com/github-btn.html?user=iicc1&repo=lto-ledger-vue&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

            </div>
        </footer>
    </div>
</template>

<script src="./logic.js">

</script>

<style scoped >
    .main{
        background-color: #F9FAFF;
        height: 100%;
        /* margin-bottom:240px; */
    }
    .hero-title{
        background-color: #7E95EF;
    }
    .panel{
        background-color: #F5F5F5;
        margin-top: 40px;
    }
    .footer{
        background-color: #ADC7FB;
        color: white;
        padding-bottom: 0px;
        margin-top: 70px;
        bottom: 0px;
        width: 100%;
        left: 0px;
        right: 0px;
    }
    .text-shadow {
        text-shadow: 0 0 10px rgba(65, 37, 150, 0.25);
    }
    .right {
        text-align: right
    }
    .min-height-140 {
        min-height: 140px;
    }
    .shadow-effect {
        border: 1px solid rgba(65, 37, 150, 0.1);
        box-shadow: 0px 0px 45px 0px rgba(65, 37, 150, 0.18);
    }

    .shadow-effect:hover, .shadow-effect:focus, .shadow-effect:active {
        border: 1px solid rgba(65, 37, 150, 0.1);
        box-shadow: 0px 0px 55px 0px rgba(65, 37, 150, 0.25);
    }

    .text-shadow:hover, .text-shadow:focus, .text-shadow:active {
        text-shadow: 0 0 25px rgba(65, 37, 150, 0.35);
    }
    .iframe-custom{
        height: 35px !important;
    }
</style>
