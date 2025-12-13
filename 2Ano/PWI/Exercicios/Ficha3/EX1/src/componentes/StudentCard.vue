<template>
 <div class="student-card">
   <p><strong>Nome:</strong> {{ name }}</p>
   <p><strong>Nº Aluno:</strong> {{ studentNumber }}</p>
   <p><strong>Curso:</strong> {{ course }}</p>
   <p><strong>Ano:</strong> {{ year }}</p>
 </div>
</template>

<script>
export default {
 name: "StudentCard",

 props: {
   name: {
     type: String,
     required: true
   },

   studentNumber: {
     type: Number,
     required: true,
     validator(value) {
       return value > 0 // número positivo tem de ser value porque validator recebe valor da prop como argumento
     }
   },

   course: {
     type: String,
     default: "TSIW"
   },

   year: {
     type: Number,
     default: 2,
     validator(value) {
       return value >= 1 && value <= 3 // entre 1 e 3 
     }
   }
 }
}
</script>

<style scoped>
.student-card {
 border: 1px solid #ccc;
 padding: 10px;
 margin-bottom: 10px;
}
</style>
