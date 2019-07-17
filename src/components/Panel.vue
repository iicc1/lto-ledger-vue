<template>
    <section>
        <b-field grouped>
            <b-field label="Select your wallet" expanded custom-class="is-size-5">
                <b-input placeholder="Loading wallets from Ledger" loading icon-pack="fas" size="is-medium"></b-input>
            </b-field>
            <b-field label="Wallet ID" custom-class="is-size-5" v-model="userId" v-on:change="handleConnect">
                <b-select placeholder="0" size="is-medium" >
                    <option v-for="n in 10" >{{ n - 1 }}</option>
                </b-select>
            </b-field>
        </b-field>

        <b-field grouped>
            <b-field label="Transaction type" custom-class="is-size-5">
                <b-select placeholder="Select a type" size="is-medium">
                    <option value="4">Transfer</option>
                    <option value="8">Start Lease</option>
                    <option value="9">Cancel Lease</option>
                    <option value="15">Anchor</option>
                </b-select>
            </b-field>
            <b-field label="Amount" expanded custom-class="is-size-5">
                <b-input type="number" step=".00000001" placeholder="0,00" size="is-medium"></b-input>
            </b-field>
        </b-field>

        <b-field label="To address" custom-class="is-size-5">
            <b-input name="LTO Network address" expanded size="is-medium"></b-input>
        </b-field>

        <b-field label="Transaction Fee" custom-class="is-size-5">
            <b-input type="number" step=".00000001" placeholder="1,00" size="is-medium"></b-input>
        </b-field>

        <div class="has-text-centered">
            <br>
            <b-button type="is-primary" size="is-medium">Sign transaction</b-button>
            <br><br>
        </div>

    </section>
</template>

<script src="./logic.js">


</script>
