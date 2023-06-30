import axios from "axios"
import { useRoute } from 'vue-router'


export function useIndexCustomerApi(page = null, keywords = '') {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page, keywords
        }
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/customers?', config)
}

export function useStoreCustomerApi(email, password, full_name, phone_number, street_number, street, ward_code,
                                    district_code, province_code, long, lat) {
    const customer = {
        email: email,
        password: password,
        full_name: full_name,
        phone_number: phone_number,
        street_number: street_number,
        street: street,
        ward_code: ward_code,
        district_code: district_code,
        province_code: province_code,
        long: long,
        lat: lat,
    }

    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .post(process.env.VUE_APP_ENV_VARIABLE + '/private/customers', customer, config)
}

export function useUpdateCustomer(customer, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/customers/' + id, customer, config)
}

export function useGetCustomerInformation() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/customers/' + id, config)
}

export function useDeleteCustomerApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete(process.env.VUE_APP_ENV_VARIABLE + '/private/customers/' + id, config)
}

