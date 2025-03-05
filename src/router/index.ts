import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Admin/HomeView.vue'
import LoginView from '@/views/Admin/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})
export default router
