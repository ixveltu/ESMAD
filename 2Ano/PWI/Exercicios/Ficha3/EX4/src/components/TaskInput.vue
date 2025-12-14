<template>
 <div class="task-input">
   <input
     type="text" v-model="text" placeholder="Nova tarefa" @keyup.enter="addTask"/>
   <button @click="addTask">Adicionar</button>
 </div>
</template>

<script>
export default {
 name: "TaskInput",

 data() {
   return {
     text: "" // estado local do input
   };
 },

 methods: {
   addTask() {
     if (!this.text.trim()) return; // evita enviar vazio
     this.$emit("add-task", this.text); // envia para o pai
     this.text = ""; // limpa input
   }
 }
};
</script>

<style>

</style>
