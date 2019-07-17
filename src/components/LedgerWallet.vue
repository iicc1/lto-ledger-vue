<template>
    <div>
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
                <Panel></Panel>
            </div>
        </div>

    </div>
</template>

<script>
    import Panel from "./Panel";
    export default {
        components: {Panel}
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
