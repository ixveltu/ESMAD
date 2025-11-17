<script>
import { mapStores } from 'pinia';
import { useCounterStore } from './stores/counter.js';

export default {
  name: 'counterApp',
  data() {
    return {
      counterStore: useCounterStore()
    };
  },
  // computed: {
  //   ...mapStores(useCounterStore),
  // },

  methods: {
   incrementByAmount(amount) {
      const newAmount = number(amount) // string to number 
      this.counterStore.incrementByAmount(newAmount);
    },

    formateDate(timestamp) {
      const newDate = new Date(timestamp);
      return newDate.toLocaleString();
    }
  }
};

</script>

<template>
  <h1>Counter App</h1>
  <h2>Count</h2>
  <span>{{counterStore.count}}</span>
  <div>
    <button @click="counterStore.increment()" :disabled="counterStore.isMax">+1</button>
    <button @click="counterStore.decrement()" :disabled="counterStore.isMin">-1</button>
    <button @click="counterStore.incrementByAmount()" :disabled="counterStore.isMax">+5</button>
    <button @click="counterStore.reset">Reset</button>
  </div>
  <div class="progressBar"></div>
  <div class="progressBarFill"></div>
  <div>
    <span>Total de Operações {{ counterStore.operationsCount }}</span>
    <ul>
      <li v-for="hist in history" :key="hist">
        {{hist}}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1{
  text-align: center;
}

h2{
  display: inline-block;
  margin-right: 2rem;
}

.progressBar{
  height: 30px;
  width: 100%;
  border: 1px solid black;
  margin-top: 1rem;
}

.progressBarFill{
  content: '';
  display: block;
  height: 100%;
  background-color: red;
  transition: width 0.3s ease-in-out;
}
</style>