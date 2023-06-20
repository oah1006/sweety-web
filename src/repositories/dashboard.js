import axios from "axios";

export function useIndexGetRevenueDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/dashboard/compare-revenue', config)
}

export function useIndexGetTotalProductDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/dashboard/total-product', config)
}

export function useIndexGetTotalOrderDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/dashboard/total-order', config)
}

export function useIndexGetBestSellerProductDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.BASE_API + '/private/dashboard/best-seller-product', config)
}