<template>
 <form id="form">
   <h3>Escolha o tipo:</h3>
   <label v-for="type in types" :key="type">
     <input type="radio" :value="type" v-model="serie.type" required/>
     {{ type }}
   </label>
  <br>

  <label for="itemName">
   <input type="text"
   v-model="serie.name" 
   name="name" 
   id="itemName"
   minlength= 3
   placeholder="Titulo (min 3 caracteres)"
   required
   />
  </label> 
  <br>

  <select name="category" id="categoryId" v-model="serie.category">
   <option v-for="category in categories" :key="category" :value="category">
    {{ category }}
   </option>
  </select>

  <select name="rating" id="ratingId" v-model="serie.rating">
   <option v-for="rating in ratings" :key="rating" :value="rating">
    {{ rating }}
   </option>
  </select>
  <br>

  <button @click="addWatchList"> Adicionar a Watch List</button>
  <button @click="clearForm"> Limpar Forms</button>
  <br>

  <li v-for="item in items">
   {{ item.name }}
   {{ item.category }}
   {{ item.rating }}
   {{ item.type }}
   <button @click="removeItem"></button>
  </li>

 </form>
</template>

<script>
export default {
 data() {
   return {
     items: [],

     serie: {
       id: "",
       type: "Series",
       name: "",
       category: "Action",
       rating: "0",
     },

     newItem: {
       type: "",
       name: "",
       category: "",
       rating: "",
     },

     sortBy: "",
     sortOrder: "Asc",
     categories: ["Action", "Horror", "Mistery", "Crime", "Comedy"],
     types: ["Series", "Movie"],
     ratings: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
   }
 },
 methods: {
  addWatchList(e) {
   e.preventDefault()
   const content = {
    type: this.serie.type,
    category: this.serie.category,
    name: this.serie.name,
    rating: this.serie.rating,
   }
  this.items.push(content)
  },

  clearForm(e){
   e.preventDefault()
   if (confirm("Are you sure you want to delete it?")){ 
   document.getElementById("form").reset()
  }
  },
  removeItem(e){
  e.preventDefault()
  if (confirm("Are you sure you want to delete ${item.name}?" )){ 

  }
  },
 },

 watch: {
  "serie.type"() {
   console.log(this.serie.type)
  }
 },

};
</script>
