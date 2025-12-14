# 📘 Vue.js Sheet (Templates, Forms, Eventos, Componentes, Router e Pinia)

---

## 🧩 Templates & Renderização

### **Interpolação**

```html
<p>{{ mensagem }}</p> <!-- Interpola variáveis do componente no template -->
```

### **Bindings**

```html
<img :src="url" /> <!-- Liga a propriedade src do HTML à variável url do componente -->
<button :disabled="isDisabled">Clique</button> <!-- Desativa o botão dinamicamente conforme a variável -->
```

### **Condições**

```html
<p v-if="condicao">Texto</p> <!-- Renderiza apenas se condicao for true -->
<p v-else-if="outraCondicao">Outro</p> <!-- Alternativa se outraCondicao for true -->
<p v-else>Fallback</p> <!-- Renderiza se nenhuma das anteriores for true -->
```

### **Loops**

```html
<li v-for="item in lista" :key="item.id">{{ item.nome }}</li>
<!-- v-for percorre uma lista, :key ajuda o Vue a identificar elementos para reatividade eficiente -->
```

### **Classes & Estilo**

```html
<div :class="{ ativo: isAtivo }"></div> <!-- Adiciona a classe 'ativo' se isAtivo for true -->
<div :style="{ color: cor, fontSize: tamanho + 'px' }"></div> <!-- Adiciona estilos inline dinamicamente -->
```

---

## 📝 Forms

### **v-model básico**

```html
<input type="text" v-model="texto" /> <!-- Faz two-way binding, sincroniza valor do input (caixa de texto) com a variável 'texto' -->
```

### **v-model em checkbox / radio**

```html
<input type="checkbox" v-model="ativo" /> <!-- true/false dependendo se está marcado -->
<label :for="objeto"> Completed </label> <!-- label para checkbox e radio button -->
<input type="radio" value="A" v-model="opcao" /> <!-- Seleciona o valor A se o radio estiver marcado -->
```

### **v-model em selects**

```html
<select v-model="selecionado">
  <option value="1">Um</option>
</select>
<!-- O valor do select será sincronizado com 'selecionado' automaticamente -->
```

### **Modifiers úteis**

```html
<input v-model.trim="nome" /> <!-- Remove espaços antes/depois automaticamente -->
<input v-model.number="idade" /> <!-- Converte valor do input para número -->
<input v-model.lazy="email" /> <!-- Atualiza a variável apenas ao perder foco -->
```

---

## ⚡ Eventos

### **Listener simples**

```html
<button @click="clicar">OK</button> <!-- @click é atalho para v-on:click, chama a função 'clicar' -->
```

### **Passar argumentos**

```html
<button @click="fazerAlgo(5)">Enviar</button> <!-- Passa o argumento 5 para a função 'fazerAlgo' -->
```

### **Prevent / stop**

```html
<form @submit.prevent="guardar"></form> <!-- .prevent impede o comportamento default do submit -->
<div @click.stop="parar"></div> <!-- .stop impede a propagação do evento para elementos pais -->
```

---

## 🧱 Componentes

### **Criar componente**

```js
<script setup>
const props = defineProps({
  titulo: String, // Define que o componente aceita uma prop 'titulo' do tipo String
  ativo: Boolean // Prop booleana que pode ser usada para alterar aparência ou comportamento
})

const emit = defineEmits(["clicar"]) // Define eventos personalizados que o componente pode emitir
</script>

<template>
  <button @click="emit('clicar')">{{ titulo }}</button> <!-- Emite evento 'clicar' quando clicado -->
</template>
```

### **Usar componente**

```html
<MeuBotao titulo="Enviar" @clicar="acao" /> <!-- Passa props e ouve eventos emitidos pelo componente -->
```

---

## 🧭 Vue Router

### **Definição de rotas**

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import About from './pages/About.vue'

const routes = [
  { path: '/', component: Home }, // Rota para Home
  { path: '/about', component: About } // Rota para About
]

export const router = createRouter({
  history: createWebHistory(), // História baseada em URL padrão do navegador
  routes
})
```

### **Navegar**

```html
<router-link to="/about">Sobre</router-link> <!-- Link reativo, atualiza a URL sem reload -->
```

```js
router.push('/about') // Navega programaticamente para /about
```

### **Aceder a parâmetros**

```js
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id) // Acede ao parâmetro 'id' da rota atual
```

---

## 📦 Pinia (Store)

### **Criar store**

```js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    contador: 0, // valor inicial
    nome: 'João'
  }),

  getters: {
    dobrado: (state) => state.contador * 2 // Computed property baseada no estado
  },

  actions: {
    incrementar() {
      this.contador++ // Atualiza estado de forma reativa
    }
  }
})
```

### **Usar store**

```js
import { useMainStore } from '../stores/main'
const store = useMainStore()

store.incrementar() // Chama ação da store
console.log(store.dobrado) // Usa getter da store
```

### **v-model com Pinia**

```html
<input v-model="store.nome" /> <!-- Dois sentidos: atualiza a store quando o input muda e vice-versa -->
```

---

## 🧰 Funções da Composition API

```js
import { ref, reactive, computed, watch, onMounted } from 'vue'

const nome = ref('') // Cria uma variável reativa simples
const dados = reactive({ idade: 20 }) // Cria objeto reativo com múltiplas propriedades

const mensagem = computed(() => `Olá ${nome.value}`) // Computed property atualiza automaticamente quando 'nome' muda

watch(nome, (novo, antigo) => {
  console.log('mudou!', novo) // Observa mudanças em 'nome' e executa callback
})

onMounted(() => {
  console.log('componente montado') // Executa código quando componente é montado
})
```
