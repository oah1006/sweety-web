import axios from "axios"
import { useRoute } from 'vue-router'

export function useIndexProvinceApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/provinces', config)
}

export function useIndexDistrictApi(provinceCode) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/districts/' + provinceCode, config)
}

export function useIndexWardApi(districtCode) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/wards/' + districtCode, config)
}