import axios from "axios";

export function useIndexGetCoodinatesApi(streetNumber, street, district, province) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            streetNumber, street, district, province
        }
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/get-coordinates?', config)
}