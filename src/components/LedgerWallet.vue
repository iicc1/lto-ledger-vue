<template>
    <div class="main">
        <div class="hero-title">
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
                        <b-button size="is-small" type="is-primary" icon-pack="fas" icon-left="external-link-alt" @click="testAddress">Test get address</b-button>
                        <div class="column is-half">
                            <div class="buttons">
                                <!-- external-link-alt -->
                                <b-button size="is-small" type="is-primary" icon-pack="fas" icon-left="external-link-alt" @click="addressInExplorer">See in explorer</b-button>
                            </div>
                            <!-- <b-tag type="is-primary">3JdURovWYftJPohw5s93VQT23wvxtLPsiFg</b-tag>          -->
                        </div>
                    </div>
                    <span v-if="!isLoading && addressData">
                    <strong> Total: </strong> <i>{{(addressData.regular / 1000000).toFixed(2)}}</i> LTO |  <i>{{composedData[usd].regular}}</i> $
                    <br>
                    <strong> Available: </strong> <i>{{(addressData.available / 1000000).toFixed(2)}}</i> LTO |  <i>{{composedData[usd].available}}</i> $
                    </span>


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
                                <h5 v-if="isSwitchedCustom == 'Mainnet'" class="title is-5">LTO Mainnet Network</h5>
                                <h5 v-else  class="title is-5">LTO Testnet Network</h5>
                            </div>

                            <div class="column is-half">
                                <div class="field">
                                    <b-switch @input="networkChange" size="is-medium" v-model="isSwitchedCustom"
                                        true-value="Mainnet"
                                        false-value="Testnet">
                                        {{ isSwitchedCustom }}
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

        <footer class="footer">
            <div class="content has-text-centered">
            <p>
                Made by <a href="https://t.me/iicc1">@iicc1</a> with help of <a href="https://t.me/unai93">@unai93</a> using <a href="https://github.com/vuejs/vue">Vue.js</a> and <a href="https://buefy.org">Buefy</a>
                <p>
                    Hosted by <a href="https://www.netlify.com/">Netlify</a>
                </p>
                <p>
                    Do you need help? Join <a href="https://t.me/ltonetwork/">LTO Network Tech chat</a>
                </p>
            <!-- <p> -->
                <iframe class="iframe-custom" src="https://ghbtns.com/github-btn.html?user=iicc1&repo=lto-ledger-vue&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
            <!-- </p> -->
            </div>
        </footer>
    </div>
</template>

<script>
    // import Hero from "./Hero";
    // import Panel from "./Panel";
    // import Footer from "./Footer";
    // import AddressBalance from "./AddressBalance";
    // import NetworkSwitch from "./NetworkSwitch";
    // export default {
    //     components: {Hero, Panel, Footer, NetworkSwitch, AddressBalance}
    // }
</script>

<style scoped >
    .main{
        background-color: #F9FAFF;
        margin-bottom:240px;
    }
    .hero-title{
        background-color: #7E95EF;
    }
    .panel{
        background-color: #F5F5F5;
        margin-top: 20px;
    }
    .panel-address{
        background-color: rgb(86, 16, 143);
        margin-top: 90px;
    }
    .panel-network{
        background-color: rgb(130, 95, 211);
        margin-top: 90px;
    }
    .footer{
        margin-top: 90px;
        height: 210px;
        background-color: #ADC7FB;
        color: white;
        padding-bottom: 0px;
        position: fixed;
        /* bottom: 0; */
        width: 100%;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin-bottom: 0px;
    }
    .text-shadow {
        text-shadow: 0 0 10px rgba(65, 37, 150, 0.25);
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
