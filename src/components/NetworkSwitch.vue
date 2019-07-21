<template>
    <section>
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
    </section>
</template>

<script>

    export default {
        name: 'NetworkSwitch',
        data() {
            return {
                isSwitched: false,
                isSwitchedCustom: 'Mainnet'
            }
        },
        methods: {
            async networkChange(selector) {
                this.$root.network = selector;
            },
        }
    }
</script>