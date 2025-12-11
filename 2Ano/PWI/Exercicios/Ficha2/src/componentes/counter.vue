<template>
 <div>
  <h1>{{ this.number }}</h1>

  <button @click="plus"> + </button>
  <button @click="minus"> - </button>
  <button @click="reset"> Reset </button>
  <button @click="increment(5)"> +5 </button>
  <button @click="increment(10)"> +10 </button>
  <button @click="increment(50)"> +50 </button>

  <h2>Atalhos:</h2>
  <h3> + -> Adiciona 1 </h3>
  <h3> - -> Decrementa 1 </h3>
  <h3> R -> Reseta o valor </h3>

 </div>
</template>

<script>
 export default {
  data(){
   return{
    number: 0,
   }
  },

  methods:{
   plus() {
    this.number += 1
   },
   reset() {
    this.number = 0
   },
   minus() {
    if (this.number > 0) {
     this.number -= 1
    }
    else{ 
     this.mensagemErro()
    }
   },
   increment(value){
    this.number += value
   },
   // plus5() {
   //  this.number += 5
   // },
   // plus10() {
   //  this.number += 10
   // },
   // plus50() {
   //  this.number += 50
   // },
   handlekey(e) {
    if (e.key === "+"){
     this.plus();
    }
    if (e.key === "-"){
     this.minus();
    }
    if (e.key.toLowerCase() === "r"){
     this.reset();
    }
   },
   mensagemErro() {
    alert("Não consegues filho");
   }
  },

  mounted(){
   window.addEventListener("keydown", this.handlekey);
  },
 };
</script>

<style lang="scss" scoped>

</style>