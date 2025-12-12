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
  
  <select name="order" id="orderId" v-model="this.order">
    <option v-for="order in orders" :key="order" :value="order">
      {{ order }}
    </option>
    <label v-for="sort in sorts" :key="sort">
      <input type="radio" :value="sort" v-model="this.sort" required/>
    {{ sort }}
    </label>
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
   <button @click="removeItem(item)"> Remover</button>
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

     sorts: ["Asc", "Desc"],
     categories: ["Action", "Horror", "Mistery", "Crime", "Comedy"],
     types: ["Series", "Movie"],
     ratings: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
     orders: ["Alfaphet", "Ratings"],
   }
 },
 methods: {
  addWatchList(e) {
   if (this.serie.name.trim().length < 3) {
    alert("O título precisa de pelo menos 3 caracteres.");
    return;
  }
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

  removeItem(item, e) {
   e.preventDefault()
      if (confirm('Are you sure you want to delete ${item.name}?')) {
      //  this.items.filter()
    }
  }
 },

 watch: {
  "serie.type"() {
   console.log(this.serie.type)
  }
 },

};
</script>
