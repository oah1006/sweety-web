import { defineStore } from 'pinia'

let timer
const DEFAULT_CONTEXT = "error"
const DEFAULT_SECONDS = 3000

export const useToastStore = defineStore('toast', {
    state: () => {
        return {
            message: '',
            context: DEFAULT_CONTEXT,
            shown: false,
            seconds: DEFAULT_SECONDS
        }
    },

    actions: {
        show({ message, context, timeout }) {
            this.message = message
            this.context = context
            this.shown = true
            timeout = timeout ?? DEFAULT_SECONDS

            clearTimeout(timer)
            if (timeout > 0) {
                timer = setTimeout(() => {
                    this.hide()
                }, timeout)
            }
        },

        hide() {
            this.shown = false
        },

        success(message, timeout) {
            this.show({ message, context: "success", timeout })
        },

        error(message, timeout) {
            this.show({ message, context: "error", timeout })
        },

        loading(message, timeout) {
            this.show({ message, context: "loading", timeout })
        },
    }
})