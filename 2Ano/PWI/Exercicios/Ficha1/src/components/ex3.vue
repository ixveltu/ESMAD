<template>
 <div>
  <h2>Peso: {{weight}} kgs</h2>
 </div>
</template>

<script>
 export default {
  data(){
   return{
    weight: 67
   }
  },
  
  beforeCreate() {
    console.log('[beforeCreate]');
  },
  created() {
    console.log('[created]');
  },

  beforeMount() {
    console.log('[beforeMount]');
  },
  mounted() {
    console.log('[mounted]');
  },

  beforeUpdate() {
    console.log('[beforeUpdate]');
  },
  updated() {
    console.log('[updated]');
  },

  beforeUnmount() {
    console.log('[beforeUnmount]');
  },

  unmounted() {
    console.log('[unmounted]');
  },

};
</script>

<style lang="scss" scoped>

</style>