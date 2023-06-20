import axios from "axios"

export function useSendOtpApi(email) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Accept: 'application/json',
        },
    }

    return axios
        .post(process.env.BASE_API + '/private/auth/send-otp', { email } , config)
}

export function useVerifyOtpApi(formVerifyOtp) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Accept: 'application/json'
        }
    }

    return axios
        .post(process.env.BASE_API + '/private/auth/verify-otp', formVerifyOtp, config)
}