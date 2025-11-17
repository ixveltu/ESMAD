import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('counter', {
  state: () => ({
    tasks: [],
  }),

  getters: {
    taskDone: (state) => state.tasks.complete == true,  // tarefas concluída
    taskNotDone: (state) => state.tasks.complete == false,  // tarefas não concluída
    taskNotDoneHighPriority: (state) => state.tasks.filter(task => task.complete == false && task.priority == 'high'),  // tarefas não concluída com alta prioridade
    numTask: (state) => state.tasks.length, // número total de tarefas
    numTaskDone: (state) => state.tasks.filter(task => task.complete == true).length, // número de tarefas concluídas
    numTasNotDone: (state) => state.tasks.filter(task => task.completed == false).length, // número de tarefas não concluídas
    percentageDoneTasks: (state) => taskDone / numTask * 100, // percentagem de tarefas concluídas
  },

  actions : {
    addTodo(text, priority){
      if (text == '' && text.length == 3) 
        return  // não adiciona tarefas vazias

      this.tasks.push({text: text, priority: priority,})  // adiciona a tarefa ao array
    },

    removeTodo(id) {
      this.tasks.splice(id)
    },

    toggleTodo(id){
      this.tasks[id].complete = this.task[id].complete 
    },

    updateTodoPriority(id, priority) {
      this.tasks[id].priority = priority  // atualiza a prioridade da tarefa
    }
  }
})
