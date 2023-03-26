import axios from "axios";

export function useIndexProductApi(page = null,  category = '', keywords = '') {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            category,
            keywords
        }
    }

    return axios
        .get('http://127.0.0.1:8000/private/products?', config)
}