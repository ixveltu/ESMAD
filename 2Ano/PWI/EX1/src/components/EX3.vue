<template>
    <div>
        <h2>Peso: {{ weight }} kgs</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                weight: 72,
            }
        },
        created(){
            console.log("Evento create", this.weight);
        },
        beforeCreate(){
            console.log('Evento beforeCreate',this.weight);
        },
        mounted(){
            console.log('Evento mounted', this.weight);
        },
        beforeMounted(){
            console.log('Evento beforeMounted', this.weight);
        },
        updated(){
            console.log('Evento updated', this.weight);
        },
        beforeUpdate(){
            console.log('Evento beforeUpdate', this.weight);
        },
        unmounted(){
            console.log('Evento unmounted', this.weight);
        },  
        beforeUnmounted(){
            console.log('Evento beforeUnmounted', this.weight);
        },
    }
</script>

<style lang="scss" scoped>

</style>