<template>
    <section>
        <div class="columns">
            <div class="column is-full">
                <h4 class="title is-4">Network Switch</h4>
            </div>
        </div>

        <div class="columns">
            <div class="column is-half">
                <h5 v-if="isSwitchedCustom == 'Mainet'" class="title is-5">LTO Mainet Network</h5>
                <h5 v-else  class="title is-5">LTO Tesnet Network</h5>
            </div>

            <div class="column is-half">
                <div class="field">
                    <b-switch v-model="isSwitchedCustom"
                        true-value="Mainet"
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
                isSwitchedCustom: 'Mainet'
            }
        }
    }
</script>