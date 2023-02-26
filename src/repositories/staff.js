import axios from "axios"

export function storeStaff(form, config) {
    return axios
        .postForm('http://127.0.0.1:8000/private/staff', form, config)
}

export function indexStaff(page) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/staff?', config)
}



