import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({count: 0, min: -10, max: 100, history: []}), // tudo que guardar fica no state
  getters: {
    verMax: (state) => state.count >= 100,
    verMin: (state) => state.count == -10,
    percentagem: (state) => ((state + 10 ) / 110 * 100),
    operacao: (state) => state.history.length,
  },
  
  actions: {
    increment(){
      if (!this.verMax){
      this.count ++
      this.addHistory('increment', 1)
    }
    },

    decrement(){
      if (!this.verMin){
      this.count --
      this.addHistory('decrement', -1)
    }
    },

    incrementBy(amount = 5){
      this.count += amount  // adiciona primeiro 
      if (this.verMax){ // verifica se apos a adição o valor é menor que o maximo
      this.count -= amount  // se for retira o adicionado
      return  // da return ao valor e acaba a função
    }
    // caso a adição seja possível, chama addHistory e adiciona ao array
    this.addHistory('increment', amount)
    },

    reset(){
      this.count = 0
    },

    addHistory(operation, amount){
      this.history.push({operation: operation, value: amount, timestamp: Date.now()})
    }

  }
})
