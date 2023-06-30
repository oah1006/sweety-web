import axios from "axios"
import { useRoute } from 'vue-router'


export function useIndexOrderApi(page = null, keywords = '') {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page, keywords
        }
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/orders?', config)
}

export function useGetOrderInformationApi(id) {
    const token = $cookies.get('token')

    const route = useRoute();


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/orders/' + id, config)
}

export function useUpdateStatusAcceptedOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/orders/update-status-accepted/' + id, {}, config)
}

export function useUpdateStatusPreparingOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/orders/update-status-preparing/' + id, {}, config)
}

export function useUpdateStatusPreparedOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/orders/update-status-prepared/' + id, {}, config)
}

export function useUpdateStatusDeliveringOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/orders/update-status-delivering/' + id, {}, config)
}

export function useUpdateStatusSucceedOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/orders/update-status-succeed/' + id, {}, config)
}

export function useUpdateStatusFailedOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/orders/update-status-failed/' + id, {}, config)
}