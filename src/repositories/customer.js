import axios from "axios"
import { useRoute } from 'vue-router'

export function indexCustomer(page = null) {
    const token = $cookies.get('token')

    var config = {
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