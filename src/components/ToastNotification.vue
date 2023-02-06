<template>
    <div class="fixed inline-flex top-10 right-4 z-50 max-w-md animate-bounce" v-if="useToast.shown">
        <div class="flex gap-4 relative items-center w-64 px-4 py-3 font-semibold leading-6 text-sm shadow rounded-md text-sky-500 bg-white dark:bg-slate-800 transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-none w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="grow text-medium text-base text-center">{{ useToast.message }}</p>
        </div>
        <span class="flex absolute h-4 w-4 -top-1 -right-1">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
        </span>
    </div>
</template>

<script>
import { useToastStore } from '@/stores/toast'



export default {
    setup() {
        const useToast = useToastStore()
        
        return {
            useToast
        }
    }
}
</script>