import { createRouter, createWebHistory } from 'vue-router'


import Login from '../views/admin/auth/Login.vue'

import Dashboard from '../views/admin/Dashboard.vue'

import IndexStaff from '../views/admin/staff/index-staff.vue'
import CreateStaff from '../views/admin/staff/create-staff.vue'
import UpdateStaff from '../views/admin/staff/update-staff.vue'

import LoadingTable from '../components/LoadingTable.vue'

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
    {
      path: '/staff',
      name: 'index-staff',
      component: IndexStaff,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-staff',
      name: 'create-staff',
      component: CreateStaff,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-staff/:id',
      name: 'update-staff',
      component: UpdateStaff,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/loadingTable',
      name: 'loading-table',
      component: LoadingTable,
      meta: {
        requiresAuth: true
      }
    }
  ],
  linkActiveClass: 'vue-active-link'
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
