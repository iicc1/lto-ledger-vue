<template>
    <div class="hello">
        <section class="hero is-primary is-medium">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        LTO Network
                    </h1>
                    <h2 class="subtitle">
                        Ledger Wallet Interface
                    </h2>
                </div>
            </div>
        </section>

        <div class="container">
            <div class="notification">
                <b-field label="Choose a LTO Network wallet from your Ledger device">
                    <b-select size="is-medium" placeholder="Choose one" rounded required>
                        <option value="0">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                        <option value="1">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                        <option value="2">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                        <option value="3">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                        <option value="4">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                        <option value="5">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                    </b-select>
                </b-field>
            </div>
        </div>

        <div class="container">
            <div class="notification">
                <b-field label="Select the transaction type">
                    <b-select size="is-medium" placeholder="Choose one" rounded required>
                        <option value="4">Transfer</option>
                        <option value="8">Lease Start</option>
                        <option value="9">Lease Cancel</option>
                        <option value="11">Mass transfer</option>
                        <option value="15">Anchor</option>
                    </b-select>
                </b-field>
            </div>
        </div>

        <div class="container">
            <div class="notification">
                <b-field label="Enter the recipient address">
                    <b-input placeholder="Address" rounded></b-input>
                </b-field>
            </div>
        </div>

        <div class="container">
            <div class="notification">
                <b-button type="is-primary">Sign transaction with Ledger</b-button>
            </div>
        </div>


    </div>
</template>

<script src="./logic.js">

    export default {
        components: {}
    }

</script>

<style scoped >
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
