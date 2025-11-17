import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0, 
    min: -10, 
    max: 100, 
    history: []
  }), // tudo que guardar fica no state

  getters: {
    isMax: (state) => state.count >= 100,
    isMin: (state) => state.count == -10,
    percentagem: (state) => ((state + 10 ) / 110 * 100),
    operationCount: (state) => state.history.length,

    progressPercentage: (state) => {
     const range = state.max - state.min
     const currentPosition = state.count - state.min

      return (currentPosition / range) * 100
    }

    
  },
  
  actions: {
    increment(){
      if (!this.isMax){
      this.count ++
      this.addHistory('increment', 1)
    }
    },

    decrement(){
      if (!this.isMin){
      this.count --
      this.addHistory('decrement', -1)
    }
    },

    incrementByAmount(amount){
      this.count += amount  // adiciona primeiro 
      if (this.isMax){ // verifica se apos a adição o valor é menor que o maximo
      this.count -= amount  // se for retira o adicionado

      return  // da return ao valor e acaba a função
    }
    // caso a adição seja possível, chama addHistory e adiciona ao array
    this.addHistory('increment', amount)
    },

    reset(){
      this.$reset()
      this.addHistory('reset')
    },

    addHistory(operation, amount){
      this.history.push({operation: operation, value: amount, timestamp: Date.now()})
    }

  }
})
