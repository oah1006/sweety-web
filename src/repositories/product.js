import axios from "axios";
import {useRoute} from "vue-router";

export function useIndexProductApi(page = null,  category_id = '', published = '', keywords = '') {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            category_id,
            keywords,
            published
        }
    }

    return axios
        .get('http://127.0.0.1:8000/private/products?', config)
}

export function useStoreProductApi(file, name, description, stock, price, category_id, published) {
    const formData = new FormData();

    if (file != undefined) {
        formData.append('thumbnail', file)
    }

    formData.append('name', name)
    formData.append('description', description)
    formData.append('stock', stock)
    formData.append('price', price)
    formData.append('category_id', category_id)
    formData.append('published', published)



    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .postForm('http://127.0.0.1:8000/private/products', formData, config)
}

export function useUpdateProductApi(product, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/products/' + id, product, config)
}

export function useGetProductInformation() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/products/' + id, config)
}