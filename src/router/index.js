import { createRouter, createWebHistory } from 'vue-router'


import Login from '@/views/admin/auth/login.vue'
import Profile from '@/views/admin/auth/profile.vue'
import SendOtp from '@/views/admin/auth/otp/send-opt.vue'
import VerifyOtp from '@/views/admin/auth/otp/verify-otp.vue'
import ForgotPassword from '@/views/admin/auth/forgot-password.vue'
import ChangePassword from "@/views/admin/auth/change-password.vue";

import Dashboard from '@/views/admin/Dashboard.vue'

import IndexStaff from '@/views/admin/staff/index-staff.vue'
import CreateStaff from '@/views/admin/staff/create-staff.vue'
import UpdateStaff from '@/views/admin/staff/update-staff.vue'
import DetailStaff from '@/views/admin/staff/detail-staff.vue'

import IndexCustomer from '@/views/admin/customers/index-customer.vue'
import CreateCustomer from '@/views/admin/customers/create-customer.vue'
import UpdateCustomer from '@/views/admin/customers/update-customer.vue'
import DetailCustomer from '@/views/admin/customers/detail-customer.vue'

import IndexStore from '@/views/admin/stores/index-store.vue'
import CreateStore from '@/views/admin/stores/create-store.vue'
import UpdateStore from '@/views/admin/stores/update-store.vue'
import DetailStore from '@/views/admin/stores/detail-store.vue'

import IndexCategory from '@/views/admin/categories/index-category.vue'
import CreateCategory from '@/views/admin/categories/store-category.vue'
import UpdateCategory from '@/views/admin/categories/update-category.vue'
import DetailCategory from "@/views/admin/categories/detail-category.vue";

import IndexProduct from '@/views/admin/products/index-product.vue'
import CreateProduct from '@/views/admin/products/create-product.vue'
import UpdateProduct from "@/views/admin/products/update-product.vue";
import DetailProduct from "@/views/admin/products/detail-product.vue";

import IndexCoupon from "@/views/admin/coupons/index-coupon.vue";
import CreateCoupon from "@/views/admin/coupons/create-coupon.vue";
import UpdateCoupon from "@/views/admin/coupons/update-coupon.vue";
import DetailCoupon from "@/views/admin/coupons/detail-coupon.vue";

import IndexTopping from "@/views/admin/Toppings/index-topping.vue";
import CreateTopping from "@/views/admin/Toppings/create_topping.vue"
import UpdateTopping from "@/views/admin/Toppings/update-topping.vue";
import DetailTopping from "@/views/admin/Toppings/detail-topping.vue"

import IndexOrder from "@/views/admin/orders/index-order.vue";
import DetailOrder from "@/views/admin/orders/detail-order.vue";

import { useProfileStore } from "@/stores/getMyProfile";
import Unauthorized from "@/components/Unauthorized.vue";


import ButtonClickListProvince from "@/components/Button/ButtonClickListProvince.vue";



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
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword,
      meta: {
        requiresAuth: true
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
      path: '/profile',
      name: 'my-profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stores',
      name: 'index-stores',
      component: IndexStore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-stores',
      name: 'create-stores',
      component: CreateStore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-stores/:id',
      name: 'update-stores',
      component: UpdateStore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail-stores/:id',
      name: 'detail-stores',
      component: DetailStore,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/categories',
      name: 'index-category',
      component: IndexCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-category',
      name: 'create-category',
      component: CreateCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-category/:id',
      name: 'update-category',
      component: UpdateCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail-category/:id',
      name: 'detail-category',
      component: DetailCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/toppings',
      name: 'index-topping',
      component: IndexTopping,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-topping',
      name: 'create-topping',
      component: CreateTopping,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-topping/:id',
      name: 'update-topping',
      component: UpdateTopping,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail-topping/:id',
      name: 'detail-topping',
      component: DetailTopping,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'index-product',
      component: IndexProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-product',
      name: 'create-product',
      component: CreateProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-product/:id',
      name: 'update-product',
      component: UpdateProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail-product/:id',
      name: 'detail-product',
      component: DetailProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/coupons',
      name: 'index-coupon',
      component: IndexCoupon,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-coupon',
      name: 'create-coupon',
      component: CreateCoupon,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-coupon/:id',
      name: 'update-coupon',
      component: UpdateCoupon,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail-coupon/:id',
      name: 'detail-coupon',
      component: DetailCoupon,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'index-order',
      component: IndexOrder,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail-order/:id',
      name: 'detail-order',
      component: DetailOrder,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/unauth',
      name: '403',
      component: Unauthorized,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/button',
      name: 'button',
      component: ButtonClickListProvince,
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
      await useProfileStore().getMyProfile().catch(() => {
        $cookies.remove('token')
        next({
          name: 'login'
        })
      })
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
  } else {
    next()
  }
})

export default router
