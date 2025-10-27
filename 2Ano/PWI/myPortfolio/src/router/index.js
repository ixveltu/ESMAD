import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactsView from '../views/ContactsView.vue'

const routes = [
  {path: "/" , name: "Home", component: HomeView},
  {path: "/projects" , name: "Projects", component: ProjectsView},
  {path: "/contact" , name: "Contacts", component: ContactsView},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router
