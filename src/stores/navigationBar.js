import { defineStore } from 'pinia'
import axios from "axios";

export const useNavigationBarStore = defineStore('navigationBarStore', {
    state: () => {
        return {
            isShown: false
        }
    },
    actions: {
        open() {
            this.isShown = true
        },

        close() {
            this.isShown = false
        }
    }
})