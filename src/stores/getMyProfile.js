import { defineStore } from 'pinia'
import axios from "axios";

export const useProfileStore = defineStore('useProfileStore', {
    state: () => {
        return {
            profile: {},
            errors: {}
        }
    },
    actions: {
        async getMyProfile() {
            const token = $cookies.get('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            await axios
            .get(process.env.VUE_APP_ENV_VARIABLE + '/private/auth/profile', config)
                .then((response) => {
                    this.profile = response.data.data
                })
                .catch((error) => {
                    $cookies.remove('token')

                    router.push({ name: 'home' })
                })
        }
    }
})