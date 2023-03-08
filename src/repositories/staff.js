import axios from "axios"
import { useRoute } from 'vue-router'

export function storeStaff(file, email, password, full_name, phone_number, address, is_admin, is_active) {
    const formData = new FormData();

    if (file != undefined) {
        formData.append('avatar', file)
    }

    formData.append('email', email)
    formData.append('password', password)
    formData.append('full_name', full_name)
    formData.append('phone_number', phone_number)
    formData.append('address', address)
    formData.append('is_admin', is_admin)
    formData.append('is_active', is_active)

    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .postForm('http://127.0.0.1:8000/private/staff', formData, config)
}

export function updateStaff(formStaff, id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/staff/' + id, formStaff, config)
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
        .delete('http://127.0.0.1:8000/private/staff/' + id, config)
}

export function indexStaff(page = null) {
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
        .get('http://127.0.0.1:8000/private/staff?', config)
}


export function getStaffProfile() {
    const token = $cookies.get('token')

    const route = useRoute();
    const id = route.params.id

    var config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/staff/' + id, config)
}



