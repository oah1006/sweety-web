import axios from "axios"
import { useRoute } from 'vue-router'

export function storeStaff(form) {
    const token = $cookies.get('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .postForm('http://127.0.0.1:8000/private/staff', form, config)
}

export function updateStaff(form) {
    const token = $cookies.get('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const route = useRoute();
    const id = route.params.id

    return axios
        .putForm('http://127.0.0.1:8000/private/staff' + id, form, config)
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



