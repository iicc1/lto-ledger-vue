<template>
    <section>
        <b-field grouped>
            <b-field label="Your Ledger address" expanded custom-class="is-size-5" v-bind:type="addressOk">
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
                    <option value="4">Transfer</option>
                    <option value="8">Start Lease</option>
                    <option value="9">Cancel Lease</option>
                    <option value="15">Anchor</option>
                </b-select>
            </b-field>
            <b-field label="Amount" expanded custom-class="is-size-5">
                <b-input type="number" step=".00000001" min="0" placeholder="0,00 LTO" size="is-medium" @input="amountSelection"></b-input>
            </b-field>
        </b-field>

        <b-field label="To address" custom-class="is-size-5" v-bind:type="recipientOk">
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

    </section>
</template>

<script src="./logic.js"></script>
