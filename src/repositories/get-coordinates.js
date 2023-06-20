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
        .get(process.env.BASE_API + '/private/get-coordinates?', config)
}