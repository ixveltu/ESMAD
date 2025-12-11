<template>
    <div>
        <h1 id="msg">Mensagem: {{ msg }}</h1>
        <h1 id="reverseMsg">Mensagem revertida: {{ reverseMsg }}</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "joao",
            };
        },
    computed: {
        reverseMsg(){
            return this.msg.split("").reverse().join("");
        },
        },
    };
</script>

<style lang="scss" scoped>

</style>