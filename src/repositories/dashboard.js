import axios from "axios";

export function useIndexGetRevenueDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/dashboard/compare-revenue', config)
}

export function useIndexGetTotalProductDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/dashboard/total-product', config)
}

export function useIndexGetTotalOrderDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/dashboard/total-order', config)
}

export function useIndexGetBestSellerProductDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get('http://127.0.0.1:8000/private/dashboard/best-seller-product', config)
}