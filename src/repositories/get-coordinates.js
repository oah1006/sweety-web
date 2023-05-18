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
        .get('http://127.0.0.1:8000/public/get-coordinates?', config)
}