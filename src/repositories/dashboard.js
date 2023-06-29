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

export function exportRevenueByInputDate(start_date, end_date, store_id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            start_date, end_date, store_id
        },
        responseType: 'blob',
    }

    return axios
        .post(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/export-revenue-by-input-date', {}, config)
        .then((response) => {
            const href = URL.createObjectURL(response.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'revenue.xlsx');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
}

export function exportProductByInputDate(start_date, end_date, store_id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            start_date, end_date, store_id
        },
        responseType: 'blob',
    }

    return axios
        .post(process.env.VUE_APP_ENV_VARIABLE + '/private/dashboard/export-product-by-input-date', {}, config)
        .then((response) => {
            const href = URL.createObjectURL(response.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'product.xlsx');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
}