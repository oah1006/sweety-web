import axios from "axios";

export function useIndexGetRevenueDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/compare-revenue', config)
}

export function useIndexGetTotalProductDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/total-product', config)
}

export function useIndexGetTotalOrderDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/total-order', config)
}

export function useIndexGetBestSellerProductDashboardApi() {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/best-seller-product', config)
}

export function useIndexGetRevenueByDates(store_id = null) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            store_id
        }
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/calculate-revenue-by-dates', config)
}

export function useIndexGetProductByDates(store_id = null) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            store_id
        }
    }

    return axios
        .get(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/get-product-by-dates', config)
}