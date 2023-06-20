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
        .get(process.env.BASE_API + '/private/provinces', config)
}

export function useIndexDistrictApi(provinceCode) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/districts/' + provinceCode, config)
}

export function useIndexWardApi(districtCode) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/wards/' + districtCode, config)
}