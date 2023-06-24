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
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/provinces', config)
}

export function useIndexDistrictApi(provinceCode) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/districts/' + provinceCode, config)
}

export function useIndexWardApi(districtCode) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/wards/' + districtCode, config)
}