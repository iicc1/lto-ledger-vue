<template>
    <section>
        <h4 class="title is-4">Network Switch</h4>
        <br>
        <div class="columns">
            <div class="column is-half">
               <p>You can change the LTO Network:</p>
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