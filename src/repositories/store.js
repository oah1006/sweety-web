import axios from "axios"
import { useRoute } from 'vue-router'


export function useIndexStoreApi(page = null, keywords = '') {
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
        .get('http://127.0.0.1:8000/private/stores?', config)
}

export function useCreateStoreApi(store_name, open_store, close_store, house_number, street, ward, district, city, long, lat) {
    const token = $cookies.get('token')

    const store = {
        store_name: store_name,
        open_store: open_store,
        close_store: close_store,
        house_number: house_number,
        street: street,
        ward: ward,
        district: district,
        city: city,
        long: long,
        lat: lat,
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .post('http://127.0.0.1:8000/private/stores', store, config)
}

export function useDeleteStoreApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete('http://127.0.0.1:8000/private/stores/' + id, config)
}

export function useUpdateStoreApi(store, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/stores/' + id, store, config)
}

export function useGetStoreInformationApi() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/stores/' + id, config)
}
