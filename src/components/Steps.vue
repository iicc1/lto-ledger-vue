<template>
    <section>
        <b-steps v-model="activeStep" :animated="isAnimated" :has-navigation="hasNavigation">
            <b-step-item label="Connect your Ledger device" completed="true">
                <div class="container">
                    <div class="notification">
                        <label>Make sure you have your Ledger device connected, no other apps are using it and you are using Chrome or Brave browsers.</label>
                            <b-button icon-left="github-circle" type="is-primary">Test connection</b-button>
                            <b-icon pack="fas" icon="tachometer-alt" size="is-large" type="is-primary"></b-icon>
                    </div>
                </div>
            </b-step-item>

            <b-step-item label="Select your wallet">
                <div class="container">
                    <div class="notification">
                        <b-field label="Choose a LTO Network wallet from your Ledger device">
                            <b-select size="is-medium" placeholder="Choose one" rounded required>
                                <option value="0">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                                <option value="1">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                                <option value="2">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                                <option value="3">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                                <option value="4">3Jn8EFisiWfiW1E9a4a1SLJepPN7bqGTvQs</option>
                            </b-select>
                        </b-field>
                    </div>
                </div>
            </b-step-item>

            <b-step-item label="Choose the transaction type" >
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
            </b-step-item>

            <b-step-item label="Sign transaction" disabled>
                <div class="container">
                <div class="notification">
                    <b-field label="Enter the recipient address">
                        <b-input placeholder="Address" rounded></b-input>
                    </b-field>
                </div>
                </div>
            </b-step-item>
            <b-step-item label="Broadcast" disabled>
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.
            </b-step-item>
        </b-steps>
    </section>
</template>

<script>
    export default {
        name: 'Steps',
        data() {
            return {
                activeStep: 0,
                showSocial: false,
                isAnimated: true,
                hasNavigation: true,
                isStepsClickable: false,
                isProfileSuccess: false
            }
        }
    }
</script>
