<template>
    <div class="main">
        <Hero class="title"></Hero>
        <div class="container">
            <div class="notification panel text-shadow shadow-effect"> <Address></Address></div>
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
    import Footer from "./Footer"
    export default {
        components: {Hero, Panel, Footer}
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
    .footer{
        margin-top: 90px;
        background-color: #ADC7FB;
        color: white;
        padding-bottom: 0px;
    }
    .text-shadow {
        text-shadow: 0 0 10px rgba(65, 37, 150, 0.25);
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
