import { createRouter, createWebHistory } from 'vue-router'


import Login from '@/views/admin/auth/Login.vue'

import Dashboard from '@/views/admin/Dashboard.vue'

import IndexStaff from '@/views/admin/staff/index-staff.vue'
import CreateStaff from '@/views/admin/staff/create-staff.vue'
import UpdateStaff from '@/views/admin/staff/update-staff.vue'
import DetailStaff from '@/views/admin/staff/detail-staff.vue'

import IndexCustomer from '@/views/admin/customers/index-customer.vue'
import CreateCustomer from '@/views/admin/customers/create-customer.vue'
import UpdateCustomer from '@/views/admin/customers/update-customer.vue'
import DetailCustomer from '@/views/admin/customers/detail-customer.vue'

import ModalDelete from '@/components/ModalDelete.vue'

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
      path: '/detail-staff/:id',
      name: 'detail-staff',
      component: DetailStaff,
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
      path: '/customers',
      name: 'index-customer',
      component: IndexCustomer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-customer',
      name: 'create-customer',
      component: CreateCustomer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-customer/:id',
      name: 'update-customer',
      component: UpdateCustomer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail-customer/:id',
      name: 'detail-customer',
      component: DetailCustomer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/modalDelete',
      name: 'modal-delete',
      component: ModalDelete,
      meta: {
        requiresAuth: true
      }
    },
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
