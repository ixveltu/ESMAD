<template>
  <div>
    <h1>Title: {{ article.title }}</h1>
    <p>Autor: {{ article.author }}</p>
    <p>Content: {{ article.content }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArticleView',
  data() {
    return {
      articles: [
        {
          id: '1e7b1d4e-8c3a-4b2f-9a6e-1c2d3e4f5a6b',
          title: 'Introdução ao Vue.js',
          author: 'João Silva',
          content: 'Vue.js é um framework progressivo para construção de interfaces de usuário. Ele é projetado para ser incrementável e pode ser adotado gradualmente em projetos existentes.'
        },
        {
          id: '2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p',
          title: 'Boas práticas em JavaScript',
          author: 'Maria Oliveira',
          content: 'Escrever código limpo em JavaScript envolve seguir padrões de nomenclatura, evitar duplicação de código e utilizar ferramentas como ESLint para manter a qualidade do código.'
        },
        {
          id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
          title: 'Guia de CSS para Iniciantes',
          author: 'Carlos Santos',
          content: 'CSS é uma linguagem de estilo usada para descrever a apresentação de um documento escrito em HTML. Ele permite controlar cores, fontes, espaçamento e layout de elementos.'
        },
        {
          id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
          title: 'O Futuro do Desenvolvimento Web',
          author: 'Ana Costa',
          content: 'O desenvolvimento web está evoluindo rapidamente com tecnologias como WebAssembly, Progressive Web Apps (PWAs) e frameworks modernos como Svelte e SolidJS.'
        }
      ],
      article: null
    };
  },
  created() {
    const articleId = this.$route.params.id; // Obtém o ID do artigo da URL
    this.article = this.articles.find(article => article.id === articleId); // Busca o artigo correspondente
  }
}
</script>