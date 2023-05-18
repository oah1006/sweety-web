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
            .get('http://127.0.0.1:8000/private/auth/profile', config)
                .then((response) => {
                    console.log(response.data.data)
                    this.profile = response.data.data
                })
                .catch((error) => {
                    $cookies.remove('token')

                    router.push({ name: 'home' })
                })
        }
    }
})