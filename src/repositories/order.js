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
        .get('http://127.0.0.1:8000/private/orders?', config)
}

export function useGetOrderInformationApi() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/orders/' + id, config)
}

export function useUpdateStatusAcceptedOrderApi(id) {
    const token = $cookies.get('token')

    console.log(token)

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/orders/update-status-accepted/' + id, {}, config)
}

export function useUpdateStatusPreparingOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/orders/update-status-preparing/' + id, {}, config)
}

export function useUpdateStatusPreparedOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/orders/update-status-prepared/' + id, {}, config)
}

export function useUpdateStatusDeliveringOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/orders/update-status-delivering/' + id, {}, config)
}

export function useUpdateStatusSucceedOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/orders/update-status-succeed/' + id, {}, config)
}

export function useUpdateStatusFailedOrderApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/orders/update-status-failed/' + id, {}, config)
}