<template>
  <div>
    <p><strong>Task: </strong> {{ task.title }}</p>

    <input @change="taskCompleted" :id="task.completed" type="checkbox" v-model="completed" />
    <label :for="task.completed"> Completed </label>

    <button @click="deleteTask" >Delete task</button>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
      validator(t) {
        const hasId = typeof t.id === 'number' && t.id > 0
        const hasTitle = typeof t.title === 'string' && t.title.length > 0
        const isCompleted = typeof t.completed === 'boolean'
        return hasId && hasTitle && isCompleted
      },
    },
  },

  methods: {
    deleteTask(){
      this.$emit("delete-task", this.task.id)
    },

    taskCompleted(){
      this.$emit("task-completed", this.task.id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
