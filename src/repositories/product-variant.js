import axios from "axios";

export function useDeleteProductVariantApi(id) {
    const token = $cookies.get('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    }

    return axios
        .delete(process.env.BASE_API + '/private/productVariants/' + id, config)
}