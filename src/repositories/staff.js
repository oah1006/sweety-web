import axios from "axios"
import { useRoute } from 'vue-router'

export function useStoreStaffApi(file, email, password, full_name, phone_number, address, role, is_active, store_id) {
    const formData = new FormData();

    if (file != undefined) {
        formData.append('avatar', file)
    }

    formData.append('email', email)
    formData.append('password', password)
    formData.append('full_name', full_name)
    formData.append('address', address)
    formData.append('phone_number', phone_number)
    formData.append('role', role)
    formData.append('is_active', is_active)
    formData.append('store_id', store_id)


    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .postForm(process.env.VUE_APP_ENV_VARIABLE + '/private/staff', formData, config)
}

export function useUpdateStaffApi(formStaff, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put(process.env.VUE_APP_ENV_VARIABLE + '/private/staff/' + id, formStaff, config)
}

export function useDeleteStaffApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete(process.env.VUE_APP_ENV_VARIABLE + '/private/staff/' + id, config)
}

export function useIndexStaff(page = null, status = '', role = '', store_id = '', keywords = '') {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
            status,
            role,
            store_id,
            keywords
        }
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/staff?', config)
}


export function useGetStaffInformation() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/staff/' + id, config)
}



