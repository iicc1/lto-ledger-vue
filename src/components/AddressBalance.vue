<template>
    <section>
        <div class="columns">
            <div class="column is-half">
               <h4 class="title is-4">Balance</h4>
            </div>

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
        <!-- <b-field grouped>
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
        </b-field> -->

    </section>

     <!-- <div class="column is-four-fifths">is-four-fifths</div> -->
</template>

<script src="./explorer.js"></script>