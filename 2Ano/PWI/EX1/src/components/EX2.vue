<template>
    <div id="intro">
        <h2>First Name: {{ firstName }}</h2>
        <h2>Last Name: {{ lastName }}</h2>
        <h2>Age: {{ age }}</h2>
        <h2>Full Name: {{ fullName }}</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                age: 21,
                firstName: 'Joao',
                lastName: 'Carvalho',
            }
        },
        computed: {
            fullName() {
                return this.firstName + ' ' + this.lastName;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>