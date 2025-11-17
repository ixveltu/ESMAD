<template>
  <div>
    <h1>Lista de Artigos</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <h2>{{ article.title }}</h2>
        <p><strong>Autor:</strong> {{ article.author }}</p>
        <p>{{ article.excerpt }}</p>
        <router-link :to="`/article/${article.id}`">Leia mais</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ArticleListView',
  data() {
    return {
      articles: [
        {
          id: '1e7b1d4e-8c3a-4b2f-9a6e-1c2d3e4f5a6b',
          title: 'Introdução ao Vue.js',
          author: 'João Silva',
          excerpt: 'Aprenda os conceitos básicos do Vue.js e como começar a usá-lo.',
          content: 'Vue.js é um framework progressivo para construção de interfaces de usuário. Ele é projetado para ser incrementável e pode ser adotado gradualmente em projetos existentes.'
        },
        {
          id: '2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p',
          title: 'Boas práticas em JavaScript',
          author: 'Maria Oliveira',
          excerpt: 'Descubra as melhores práticas para escrever código JavaScript limpo e eficiente.',
          content: 'Escrever código limpo em JavaScript envolve seguir padrões de nomenclatura, evitar duplicação de código e utilizar ferramentas como ESLint para manter a qualidade do código.'
        },
        {
          id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
          title: 'Guia de CSS para Iniciantes',
          author: 'Carlos Santos',
          excerpt: 'Aprenda os fundamentos do CSS e como estilizar suas páginas web.',
          content: 'CSS é uma linguagem de estilo usada para descrever a apresentação de um documento escrito em HTML. Ele permite controlar cores, fontes, espaçamento e layout de elementos.'
        },
        {
          id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
          title: 'O Futuro do Desenvolvimento Web',
          author: 'Ana Costa',
          excerpt: 'Uma visão sobre as tendências e tecnologias que estão moldando o futuro da web.',
          content: 'O desenvolvimento web está evoluindo rapidamente com tecnologias como WebAssembly, Progressive Web Apps (PWAs) e frameworks modernos como Svelte e SolidJS.'
        }
      ]
    };
  }
}
</script>