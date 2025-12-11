<template>
<div id="intro">
 <h2>First name: {{firstName}}</h2> 
 <h2>Last name: {{lastName}}</h2> 
 <h2>Age: {{age}}</h2>
 <h2>Full name: {{fullName }}</h2> 
</div>
</template>

<script>
 export default {
  data(){
   return{
    firstName: "Joao Pedro",
    lastName: "Pereira Oliveira",
    age: 21,
   }
  },
 computed: {
  fullName() {
   return this.firstName + " " + this.lastName;
  },
 }
 };
</script>

<style lang="scss" scoped>

</style>