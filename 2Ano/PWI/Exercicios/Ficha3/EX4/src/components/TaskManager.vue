<template>
 <div>
  <ul>
    <TaskItem 
      v-for="task in tasks"
      :key = "task.id"
      :task = "task"
      @toggle-task = "toggleTask"
      @delete-task = "deleteTask"
    />
  </ul>
  <p><strong> Total Tasks: </strong> {{ tasks.length }} </p>
  <p><strong> Tasks Completed: </strong> {{ completedTasks }} </p>
 </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue';
import TaskInput from '@/components/TaskInput.vue';

 export default {

 components:{
   TaskItem,
   TaskInput,
 },

  data() {
   return {
    tasks: [ 
     {
      id: 1,
      title: "Estudar",
     },
     {
      id: 2,
      title: "Projeto",
     },
    ]
   }
  },

  methods: {
    addTask(description) {
      if (!description.trim()) return;
      this.tasks.push({
        id: crypto.randomUUID(), // ID único
        description,
        completed: false
      });
    },

    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  },

  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.completed).length
    }
  }
 }
</script>

<style lang="scss" scoped>

</style>