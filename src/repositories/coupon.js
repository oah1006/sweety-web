import axios from "axios"
import { useRoute } from 'vue-router'


export function useIndexCouponApi(page = null, keywords = '', status = '') {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page, keywords, status
        }
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/coupons?', config)
}

export function useStoreCouponApi(coupon) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .post(process.env.VUE_APP_ENV_VARIABLE + '/private/coupons', coupon, config)
}

export function useUpdateCouponApi(coupon, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/coupons/' + id, coupon, config)
}

export function useGetCouponInformationApi() {
    const token = $cookies.get('token')


    const route = useRoute()
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/coupons/' + id, config)
}

export function useDeleteCouponApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete(process.env.VUE_APP_ENV_VARIABLE + '/private/coupons/' + id, config)
}