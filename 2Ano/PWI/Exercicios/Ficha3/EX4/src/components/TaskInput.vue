<template>
 <div>
  <input type="text" placeholder="Description" required v-model="task.description">
  <button @click="() => console.log(task.description) ">Add task</button>
 </div>
</template>

<script>
 export default {
  data() {
   return {
    
   }
  }
 }
</script>

<style lang="scss" scoped>

</style>