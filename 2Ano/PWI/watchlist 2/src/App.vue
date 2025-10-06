<script >
export default {
  data() {
    return {
      message: "Hello world",
      greetings: "My first vue experience!",
      list: "My watchlist",
      movieInput: "",
      movieArray: [], 
    };
  },
  methods: {
    addMovie() {
      this.movieArray.push(this.movieInput)
      console.log((this.movieArray))
      this.movieInput =""
    },
  },
}
</script>

<template>
  <header>
    <h1>{{message}}</h1>
    <p>
      {{greetings}}
    </p>
  </header>
  <div class="app">
    <input type="text" placeholder="Add a movie to your watchlist" v-model="movieInput" @keyup.enter="movieInput"></input>
    <button id="addButton" v-on:click="addMovie">Adicionar</button>
  </div>
  <h2 id="movieList">{{list}}</h2>
  <div class="movie-list">
    <ul>
      <li v-for="(movie, index) in movieArray" :key="index"> {{ movie }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.app{
    display: flex;
    gap: 10px;
}
</style>

