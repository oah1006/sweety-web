import { createRouter, createWebHistory } from 'vue-router'

// import auth/ login view
import Login from '../views/admin/auth/Login.vue'

import Dashboard from '../views/admin/Dashboard.vue'

import ToastNotification from '../components/ToastNotification.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
  ]
})

export default router
