<template>
  <div>
    <h2>Lista de Alunos</h2>
    <!-- v-for para cada aluno -->
    <StudentCard
      v-for="student in students"
      :student = "student"
    />
  </div>
</template>

<script>
import StudentCard from '@/componentes/StudentCard.vue';

export default {
  components: { StudentCard },

  data() {
    return {
      students: [
        { name: "Afonso", number: 40220467, course: "TSIW", year: 1 },
        { name: "Eduardo", number: 40230469, course: "TSIW", year: 2 },
        { name: "Bruno", number: 40240478, course: "TSIW", year: 3 }
      ]
    }
  }
}
</script>
