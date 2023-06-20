import axios from "axios"
import { useRoute } from 'vue-router'


export function useIndexCategoryApi(page = null, keywords = '') {
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
        .get(process.env.BASE_API + '/private/categories?', config)
}

export function useStoreCategoryApi(formCategory) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .post(process.env.BASE_API + '/private/categories', formCategory, config)
}

export function useUpdateCategoryApi(formCategory, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put(process.env.BASE_API + '/private/categories/' + id, formCategory, config)
}

export function useDeleteCategoryApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete(process.env.BASE_API + '/private/categories/' + id, config)
}

export function useGetCategoryInformationApi() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/categories/' + id, config)
}

