<template>
    <div>
        <h1> {{ msg }}</h1>
        <p> {{ name }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "Hello Vue!",
                name: 'EX1 Component'
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>