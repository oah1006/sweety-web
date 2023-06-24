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
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/products?', config)
}

export function useStoreProductApi(thumbnail, detailProduct, name, description, stock, price, category_id, published, checkNames) {
    const formData = new FormData();

    if (detailProduct != undefined) {
        for (let i = 0; i < detailProduct.length; i++) {
            formData.append('detail_products[]', detailProduct[i])
        }
    }

    if (thumbnail != undefined) {
        formData.append('thumbnail', thumbnail)
    }

    formData.append('name', name)
    formData.append('description', description)
    formData.append('stock', stock)
    formData.append('price', price)
    formData.append('category_id', category_id)
    formData.append('published', published)

    for (let i = 0; i < checkNames.length; i++) {
        formData.append('toppings[]', checkNames[i])
    }

    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .postForm(process.env.VUE_APP_ENV_VARIABLE + '/private/products', formData, config)
}

export function useUpdateProductApi(id, name, description, stock, price, category_id, published, checkNames, variants) {

    const token = $cookies.get('token')

    const product = {
        'name': name,
        'description': description,
        'stock': stock,
        'price': price,
        'category_id': category_id,
        'published': published,
        'toppings': checkNames,
        'variants': variants
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/products/' + id, product, config)
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
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/products/' + id, config)
}

export function useDeleteProductApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete(process.env.VUE_APP_ENV_VARIABLE + '/private/products/' + id, config)
}