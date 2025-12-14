<template>
 <div>
  <h2>Lista de Produtos</h2>
    <!-- v-for para cada Produto -->
    <ProductCard
      v-for="product in products"
      :product = "product"
    />
 </div>
</template>

<script>
 import ProductCard from './ProductCard.vue';

 export default {
  components: { ProductCard },

  data() {
  return {
    products: [
      {
       name: "Teclado Mecânico",
       price: 79.99,
       image: "https://example.com/teclado.jpg",
       stock: 6,
      },
      {
       name: "Rato Gamer",
       price: 49.99,
       image: "https://example.com/rato.jpg",
       stock: 1,
      },
      {
       name: "Monitor 24''",
       price: 149.99,
       image: "https://example.com/monitor.jpg",
       stock: 4,
      }
    ]
  };
}
 }
</script>

<style lang="sass" scoped>

</style>