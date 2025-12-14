<template>
 <div>
  <h1><strong> Title: </strong> {{ title }}</h1>
  <p><strong> Description: </strong> {{ description }} </p>
  <p><strong>Rating: </strong> {{ rating }} </p>
  <RatingStars @rating-changed="ratingChanged" />
 </div>
</template>

<script>
import RatingStars from '@/component/RatingStars.vue';

 export default {
  components: {
   RatingStars,
  },

  data() {
   return {
    title: "Dune",
    description: "O esdekid perde-se em marrocos, 2 filmes e ainda ta la, acho que no 3º vai se meter na ganza.",
    rating: "",
   }
  },
  
  methods: {
   ratingChanged(rat) {
    this.rating = rat
    console.log('Classificação escolhida:', rat);
   }
  } 
 }
</script>

<style lang="scss" scoped>

</style>