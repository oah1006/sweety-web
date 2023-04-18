import axios from "axios"
import { useRoute } from 'vue-router'

export function useIndexProvinceApi(keywords = '') {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            keywords
        }
    }

    return axios
        .get('http://127.0.0.1:8000/private/provinces?', config)
}