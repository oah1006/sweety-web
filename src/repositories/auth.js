import axios from "axios"

export function useLogin(employee) {
    return axios
        .post(process.env.BASE_API + '/private/auth/login', employee.value)
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
        .post(process.env.BASE_API + '/private/auth/logout', {}, config)
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
        .put(process.env.BASE_API + '/private/auth/profile', formStaff, config)
}

export function useForgotPasswordApi(formForgotPassword, tokenOtp) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            token: tokenOtp,
            Accept: 'application/json',
        },
    }

    return axios
        .post(process.env.BASE_API + '/private/auth/forgot-password', formForgotPassword, config)
}

export function useChangePasswordApi(formChangePassword) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }

    return axios
        .put(process.env.BASE_API + '/private/auth/change-password', formChangePassword, config)
}