import axios from "axios"
import { useRoute } from 'vue-router'


export function useIndexCustomerApi(page = null) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page
        }
    }

    return axios
        .get('http://127.0.0.1:8000/private/customers?', config)
}

export function useStoreCustomerApi(formCusomter) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .post('http://127.0.0.1:8000/private/customers', formCusomter, config)
}

export function useUpdateCustomer(formCusomter, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/customers/' + id, formCusomter, config)
}

export function useGetCustomerInformation() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/customers/' + id, config)
}

export function useDeleteCustomerApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete('http://127.0.0.1:8000/private/customers/' + id, config)
}

