<template>
  <div>
    <h2>Lista de Alunos</h2>
    <!-- v-for para cada aluno -->
    <StudentCard
      v-for="student in students"
      :key="student.studentNumber"
      :name="student.name"
      :studentNumber="student.studentNumber"
      :course="student.course"
      :year="student.year"
    />
  </div>
</template>

<script>
import StudentCard from './componentes/StudentCard.vue';

export default {
  components: { StudentCard },

  data() {
    return {
      students: [
        { name: "Afonso", studentNumber: 40220467, course: "TSIW", year: 1 },
        { name: "Eduardo", studentNumber: 40230469, course: "TSIW", year: 2 },
        { name: "Bruno", studentNumber: 40240478, course: "TSIW", year: 3 }
      ]
    }
  }
}
</script>
