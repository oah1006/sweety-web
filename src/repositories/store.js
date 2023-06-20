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
        .get(process.env.BASE_API + '/private/stores?', config)
}

export function useCreateStoreApi(detailProducts, store_name, open_store, close_store, street_number, street, ward_code, district_code, province_code, long, lat) {
    const formData = new FormData();

    if (detailProducts != undefined) {
        for (let i = 0; i < detailProducts.length; i++) {
            formData.append('detail_stores[]', detailProducts[i])
        }
    }

    const token = $cookies.get('token')

    formData.append('store_name', store_name)
    formData.append('open_store', open_store)
    formData.append('close_store', close_store)
    formData.append('street_number', street_number)
    formData.append('street', street)
    formData.append('ward_code', ward_code)
    formData.append('district_code', district_code)
    formData.append('province_code', province_code)
    formData.append('long', long)
    formData.append('lat', lat)

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .postForm(process.env.BASE_API + '/private/stores', formData, config)
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
        .delete(process.env.BASE_API + '/private/stores/' + id, config)
}

export function useUpdateStoreApi(store_name, open_store, close_store, street_number, street, ward_code, district_code, province_code, long, lat, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    const store = {
        store_name: store_name,
        open_store: open_store,
        close_store: close_store,
        street_number: street_number,
        street: street,
        ward_code: ward_code,
        district_code: district_code,
        province_code: province_code,
        long: long,
        lat: lat,
    }

    return axios
        .put(process.env.BASE_API + '/private/stores/' + id, store, config)
}

export function useGetStoreInformationApi(id) {
    const token = $cookies.get('token')



    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/stores/' + id, config)
}
