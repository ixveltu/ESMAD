<template>
  <form id="form">
    <h3>Escolha o tipo:</h3>
    <label v-for="type in types" :key="type">
      <input type="radio" :value="type" v-model="serie.type" required />
      {{ type }}
    </label>
 
    <br>
    <!-- Name -->
    <label for="itemName">
      <input 
        type="text"
        v-model="serie.name"
        id="itemName"
        minlength="3"
        placeholder="Titulo (min 3 caracteres)"
        required
      />
    </label>
 
    <br>
    <button @click.prevent="changeStatus">Change Status</button>
    <p>User is {{ stat }}</p>
    <br>

    <!-- Categoria -->
    <select v-model="serie.category">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
 
    <!-- Rating -->
    <select v-model="serie.rating">
      <option v-for="rating in ratings" :key="rating" :value="rating">
        {{ rating }}
      </option>
    </select>
 
    <br>
    <!-- Order -->
    <select v-model="order">
      <option v-for="order in orders" :key="order" :value="order">
        {{ order }}
      </option>
    </select>
 
    <!-- BOTÃO DE ORDENAR → label usa sort corretamente -->
    <select v-model="sort" @change="sortBy">
      <option v-for="sort in sorts" :value="sort">
        {{ sort }}
      </option>
    </select>
    <br>
 
    <button @click="addWatchList">Add to Watch List</button>
    <button @click="clearForm">Clear Forms</button>
    <br>
  </form>
 
  <!-- QUANTIDADE  -->
  <p> Titles added: {{ countItems.itemsCount }} </p>
  <p> Series added: {{ countItems.seriesCount }} </p>
  <p> Movies added: {{ countItems.movieCount }} </p>
  <br>
  <label for="item in items"></label>
  <!-- LISTA -->
  <li v-for="item in items" :key="item.id">
    {{ item.id }} - {{ item.name }} - {{ item.category }} - {{ item.rating }} - {{ item.type }}
    <button @click="removeItem(item)">Remover</button>
  </li>
 </template>
 
 <script>
 export default {
  data() {
    return {
      items: [],

      // Objeto da série preenchido pelo utilizador
      serie: {
        id: "",
        type: "Series",
        name: "",
        category: "Action",
        rating: "0",
      },
 
      stat: "active",
      status: ["inactive", "active"],

      // ORDEM
      order: "Alfaphet", 
      sort: "Asc", // Ascendente ou descendente
 
      // LISTAS
      sorts: ["Asc", "Desc"],
      categories: ["Action", "Horror", "Mistery", "Crime", "Comedy"],
      types: ["Series", "Movie"],
      ratings: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      orders: ["Alfaphet", "Ratings"],
    }
  },
 
  methods: {
 
   /* ------------------------------------------
      ADICIONAR ITEM À LISTA
      ------------------------------------------ */
   addWatchList(e) {
     e.preventDefault() // nao da refresh ao form
 
     if (this.serie.name.trim().length < 3) {
       alert("O título precisa de pelo menos 3 caracteres.")
       return
     }
     
     if (this.items.some(item => item.name === this.serie.name)) {  // some retorna true or false
      alert("O título já existe!");
      return;
     }

     // Math.max() não aceita array precisa do spread operator (...)
     const newId =
       this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1 // map cria um array e mapeia cada lista que passa com um id
 
     const content = {
       id: newId, // agora corretamente atribuído
       type: this.serie.type,
       category: this.serie.category,
       name: this.serie.name,
       rating: Number(this.serie.rating), // rating convertido para número
     }
 
     this.items.push(content)
   },
 
   /* ------------------------------------------
      LIMPAR FORMULÁRIO
      ------------------------------------------ */
   clearForm(e) {
     e.preventDefault() // impede refresh
     if (confirm("Are you sure you want to delete it?")) {
       document.getElementById("form").reset()
     }
   },
 
   /* ------------------------------------------
      REMOVER ITEM DA LISTA
      ------------------------------------------ */
   removeItem(item) {
     if (confirm(`Are you sure you want to delete ${item.name}?`)) {
       this.items = this.items.filter(i => i.id !== item.id)
       // filter cria uma nova lista com a condição que indica
       // atribui a lista items uma nova lista onde filtrava as que tinham o mesmo id da que queria apagar
       // a cada i precorre todas as listas pelo id e procura a que tem o id da que queria remover
       // filter cria uma lista mas nao a mostra, igualas a lista existente para haver uma troca
     }
   },
 
   /* ------------------------------------------
      ORDENAR LISTA
      ------------------------------------------ */
   sortBy(e) {
     e.preventDefault() // impede submit do form
 
     const sorted = this.sort 
 
     if (sorted === "Alfaphet") {
       // ordenar por NOME com strings → localeCompare()
       this.items.sort((a, b) => {
         return this.sort === "Asc" ? a.name.localeCompare(b.name) : -a.name.localeCompare(b.name)
       })
     } else {
       // ordenar por número → subtração
       this.items.sort((a, b) => {
         return this.sort === "Asc" ? a.rating - b.rating : b.rating - a.rating  // ? funciona como if, : como else
         // ASC fazemos a - b, se este valor for negativo, a < b logo a vem primeiro
         // DESC fazemos b - a, comparamos o 2 valor ao primeiro, se este valor for negativo, b < a, logo b vem depois de a
       })
     }
   },
   changeStatus(){
    this.stat = this.stat === "active" ? "inactive" : "active";
   }
  },
  computed: {
    /* ------------------------------------------
      COUNT
      ------------------------------------------ */
    countItems(){
      return{
        seriesCount: this.items.filter(item => item.category === "Series").length,
        movieCount: this.items.filter(item => item.category === "Movies").length,
        itemsCount: this.items.filter(item => item.id).length, // retorna um array que correspondem a condição pedida
      }
    },
  },
 /* ------------------------------------------
      TESTE
    ------------------------------------------ */
  watch: {
   "serie.type"() {
     console.log(this.serie.type)
   }
  },
 
 }
 </script>
 