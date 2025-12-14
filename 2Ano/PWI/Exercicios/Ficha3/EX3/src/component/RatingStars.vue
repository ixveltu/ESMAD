<template>
 <div class="stars">
   <svg
     v-for="star in 5"
     :key="star"
     xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     width="24"
     height="24"
     :class="{ active: star <= rating }"
     @click="setRating(star)"
   >
     <path
       d="M12 17.3L18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2l5.4 4.8L5.8 21z"
     />
   </svg>
 </div>
</template>

<script>
export default {
 name: "RatingStars",

 data() {
   return {
     rating: 0
   };
 },

 methods: {
   setRating(rat) {
     this.rating = rat;
     this.$emit("ratingChanged", rat);
   }
 }
};
</script>

<style scoped>
.stars {
 display: flex;
 gap: 6px;
 cursor: pointer;
}

svg {
 fill: #ccc;
}

svg.active {
 fill: gold;
}
</style>
