import axios from "axios";
import { useRoute } from "vue-router";

export function useIndexToppingApi(page = null, keywords = '') {
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
        .get(process.env.BASE_API + '/private/toppings?', config)
}

export function useCreateToppingApi(topping) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .post(process.env.BASE_API + '/private/toppings', topping, config)
}

export function useUpdateToppingApi(topping, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put(process.env.BASE_API + '/private/toppings/' + id, topping, config)
}

export function useDeleteToppingApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete(process.env.BASE_API + '/private/toppings/' + id, config)
}

export function useGetInformationToppingApi() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/toppings/' + id, config)
}