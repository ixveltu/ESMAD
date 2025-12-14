<template>
 <div class="product-card">
  <p><strong>Nome:</strong> {{ product.name }}</p>
  <p><strong>Price:</strong> {{ product.price }}</p>
  <img :src="product.image" :alt="product.name">
  <p v-if="product.stock >= 1"><strong>Stock: </strong> Disponivel </p>
  <p v-else><strong> Stock: </strong> Indisponivel </p>
  <button @click="addToCart">Add to cart</button>
  <p><strong></strong></p>
 </div>
</template>

<script>
 export default {

  props: {
   product:{
    type: Object,
    required: true,
    validator(prod) { // valida as propriedades internas do objeto
     const hasName = typeof prod.name === 'string' && prod.name.length > 0;
     const hasPrice = typeof prod.price === 'number';
     const hasImage = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(prod.image);
     const hasInStock = typeof prod.inStock === 'boolean';
      return hasName && hasPrice && hasImage && hasInStock;
    }
   },
  },

  methods:{
   addToCart(){
    if (this.product.stock >= 1 ) {
     if (confirm(`Deseja comprar ${this.product.name}`)) {
      this.product.stock -= 1
     }
    }
    else {
     alert(`${this.product.name} não tem stock`)

    }
    console.log(this.product.name , this.product.stock)
    },
   },
 }
</script>

<style lang="scss" scoped>

</style>