<script >
export default {
  data() {
    return {
      message: "Hello world",
      greetings: "My first vue experience!",
      list: "My watchlist",
    };
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
    <input type="text" placeholder="Add a movie to your watchlist" />
    <button>Adicionar</button>
  </div>
  <h2>{{list}}</h2>
  <div class="movie-list">
    <ul>
      <li>
        
      </li>
    </ul>
</template>

<style scoped></style>
