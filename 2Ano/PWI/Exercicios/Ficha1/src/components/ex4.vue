<template>
 <div>
  <h1> {{ computador.productName }} </h1>
  <h2 v-html="computador.productDesc"> </h2>
  <h3 v-if="computador.productPrice < 1000"> {{ computador.productPrice }}</h3>
  <img :src="computador.productImage" alt="Imagem do computador" />
  <button @click="resetPrice"> Reset Price </button>
  <button @click="venderProduto"> Comprar </button>
  <h2 v-if="computador.productAvailable"> Produto Disponível</h2>
  <h2 v-else> Produto Indisponível</h2>
 </div>
</template>

<script>
 export default {
  data(){
   return{
    computador: {
     productName: "Dell XPS",
     productDesc: "Processador i7 <br>Disco SSD 256GB<br> Monitor Samsung 21",
     productImage: "https://tinyurl.com/2p9dnx68",
     productPrice: 800,
     productAvailable: true,
     productStock: 1,
    },
   }
  },
  methods:{
   resetPrice(){
    this.computador.productPrice = 1000
   },
   
   venderProduto(){
    this.computador.productStock -= 1
    if (this.computador.productStock <= 0){
     this.computador.productAvailable = false
    }
   },
  }
 };
</script>

<style lang="scss" scoped>

</style>