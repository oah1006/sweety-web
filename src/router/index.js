import { createRouter, createWebHistory } from 'vue-router'


import Login from '@/views/admin/auth/Login.vue'
import Profile from '@/views/admin/auth/Profile.vue'
import SendOtp from '@/views/admin/auth/otp/SendOtp.vue'
import VerifyOtp from '@/views/admin/auth/otp/VerifyOtp.vue'
import ForgotPassword from '@/views/admin/auth/ForgotPassword.vue'

import Dashboard from '@/views/admin/Dashboard.vue'

import IndexStaff from '@/views/admin/staff/index-staff.vue'
import CreateStaff from '@/views/admin/staff/create-staff.vue'
import UpdateStaff from '@/views/admin/staff/update-staff.vue'
import DetailStaff from '@/views/admin/staff/detail-staff.vue'

import IndexCustomer from '@/views/admin/customers/index-customer.vue'
import CreateCustomer from '@/views/admin/customers/create-customer.vue'
import UpdateCustomer from '@/views/admin/customers/update-customer.vue'
import DetailCustomer from '@/views/admin/customers/detail-customer.vue'

import IndexStore from '@/views/admin/store/index-store.vue'
import CreateStore from '@/views/admin/store/create-store.vue'
import UpdateStore from '@/views/admin/store/update-store.vue'


import { useProfileStore } from "@/stores/getMyProfile";


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
      path: '/send-otp',
      name: 'sendOtp',
      component: SendOtp,
      meta: {
        guest: true
      }
    },
    {
      path: '/verify-otp',
      name: 'verifyOtp',
      component: VerifyOtp,
      meta: {
        guest: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword,
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
      path: '/profile',
      name: 'my-profile',
      component: Profile,
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
      path: '/stores',
      name: 'index-store',
      component: IndexStore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-store',
      name: 'create-store',
      component: CreateStore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-store/:id',
      name: 'update-store',
      component: UpdateStore,
      meta: {
        requiresAuth: true
      }
    },
  ],
  linkActiveClass: 'vue-active-link'
})

router.beforeEach(async(to, from, next) => {
  const token = $cookies.get('token')

  if (to.meta.requiresAuth) {
    if (token) {
      await useProfileStore().getMyProfile()
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
