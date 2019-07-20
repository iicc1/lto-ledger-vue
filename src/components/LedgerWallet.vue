<template>
    <div class="main">
        <Hero class="title"></Hero>

        <div class="container">
            <div class="columns">
                <div class="column is-half">
                    <div class="notification panel text-shadow shadow-effect fixed-heigh-140"> <AddressBalance></AddressBalance></div>
                </div>

                <div class="column is-half">
                    <div class="notification panel text-shadow shadow-effect fixed-heigh-140"> <NetworkSwitch></NetworkSwitch></div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="notification panel text-shadow shadow-effect"> <Panel></Panel></div>
        </div>
         <Footer class="footer"></Footer>
    </div>
</template>

<script>
    import Hero from "./Hero";
    import Panel from "./Panel";
    import Footer from "./Footer";
    import AddressBalance from "./AddressBalance";
    import NetworkSwitch from "./NetworkSwitch";
    export default {
        components: {Hero, Panel, Footer, NetworkSwitch, AddressBalance}
    }
</script>

<style scoped >
    .main{
        background-color: #F9FAFF;
    }
    .title{
        background-color: #7E95EF;

    }
    .panel{
        background-color: #F5F5F5;
        margin-top: 90px;
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
        background-color: #ADC7FB;
        color: white;
        padding-bottom: 0px;
    }
    .text-shadow {
        text-shadow: 0 0 10px rgba(65, 37, 150, 0.25);
    }

    .fixed-heigh-140 {
        height: 140px;
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
</style>
