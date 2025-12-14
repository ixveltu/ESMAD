<template>
 <div class="student-card">
   <p><strong>Nome:</strong> {{ student.name }}</p>
   <p><strong>Nº Aluno:</strong> {{ student.number }}</p>
   <p><strong>Curso:</strong> {{ student.course }}</p>
   <p><strong>Ano:</strong> {{ student.year }}</p>
 </div>
</template>

<script>
export default {

 props: {
  student: [
    {
      type: Object,
      required: true,
      validator(stu) {
        const hasName = typeof stu.name === "string" && stu.name.length > 0;
        const hasNumber = typeof stu.number === "number" && stu.number.length > 8;
        const hasCourse = typeof stu.course === "string";
        const hasYear = typeof stu.year === "number" && stu.number >= 1 && stu.number <= 3;
          return hasName && hasNumber && hasCourse && hasYear;
      },
    },
  ]
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
