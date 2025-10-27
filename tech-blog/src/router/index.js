import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import ArticleListView from '../view/ArticleListView.vue'
import ArticleView from '../view/ArticleView.vue'

const routes = [
  {path: '/' , name: 'Home' , component: HomeView},
  {path: '/articlelist/:id' , name: 'Article List' , component: ArticleListView},
  {path: '/article/:id' , name: 'Articles' , component: ArticleView},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
