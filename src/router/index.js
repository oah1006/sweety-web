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
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },  
  ]
})

router.beforeEach((to, from, next) => {
  const token = $cookies.get('token')

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else { 
      next({
        name: 'login'
      })
    }
  } 
  else if (to.meta.guest) { 
    if (token) {
      next({
        name: 'dashboard'
      })
    } else {
      next();
    }
  }
})

export default router
