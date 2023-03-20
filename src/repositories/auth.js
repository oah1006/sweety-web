import axios from "axios"

export function useLogin(employee) {
    return axios
        .post('http://127.0.0.1:8000/private/auth/login', employee.value)
}

export async function useLogoutApi() {
    const token = await $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .post('http://127.0.0.1:8000/private/auth/logout', {}, config)
}

export function useUpdateProfileApi(formStaff) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .put('http://127.0.0.1:8000/private/auth/profile', formStaff, config)
}