<template>
    <div class="hello">
        <div>
            <div>
                <b>User ID:</b>
            </div>
            <div>
                <label>
                    <input type="text" v-model="userId" @input="handleReset" />
                </label>
            </div>
        </div>
        <div v-if="userInfo">
            <div><b>User Info:</b></div>
            <div>
                <pre>{{userInfo}}</pre>
            </div>
        </div>
        <div>
            <button @click="handleConnect">Connect</button>
        </div>
    </div>
</template>

<script src="./logic.js">

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
