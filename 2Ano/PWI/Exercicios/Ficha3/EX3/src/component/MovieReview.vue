<template>
 <div>
  <h1><strong> Title: </strong> {{ title }}</h1>
  <p><strong> Description: </strong> {{ description }} </p>
  <RatingStars @rating-changed="ratingChanged" />
 </div>
</template>

<script>
import RatingStars from '@/component/RatingStars.vue';

 export default {

  data() {
   movies: [
    {
    title: "Dune",
    description: "Uma saga épica de poder, destino e sobrevivência num planeta desértico chamado Arrakis."
   }
  ]
  },
  
  methods: {
   ratingChanged(rat) {
    console.log('Classificação escolhida:', rat);
   }
  } 
 }
</script>

<style lang="scss" scoped>

</style>