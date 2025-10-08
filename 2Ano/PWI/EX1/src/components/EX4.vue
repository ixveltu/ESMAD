<template>
    <div>
        <h1>Product Name: {{ productName }}</h1>
        <img :src="productImage" alt="Product Image" width="200">
        <p v-html="productDesc"></p>
        <h2 v-if="productPrice < 1000">Price: {{ productPrice }}</h2>
        <button @click="resetPrice">Reset</button>
        <h2 v-else>Price: {{ productPrice }}</h2>
        <p v-if="productAvailable">Available</p>
        <p v-else>Not Available</p>
        <button @click="productAvailable = !productAvailable">Toggle Availability</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                productName: 'Dell XPS',
                productDesc: 'Processador i7 <br> 16GB RAM 512GB SSD<br> Monitor Samsung 27',
                productImage: 'https://tinyurl.com/2p9dnx68',
                productPrice: 1200,
                originalPrice: 1200,
                productAvailable: true,
            }
        },
        methods:{
            resetPrice(){
                this.productPrice = this.originalPrice;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>