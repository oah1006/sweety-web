<template>
    <div class="flex flex-col items-center justify-center w-full min-h-screen bg-slate-200">
        <div class="flex rounded-lg">
            <div class="rounded-lg">
                <img src="../../../images/milktea.jpg" alt="" class="h-[620px] w-96 object-cover">
            </div>
            <div class="border border-solid shadow-md h-[620px] w-96 bg-white rounded-lg pt-10">
                <div class="flex justify-center">
                    <img src="../../../images/logo.png" alt="" class="w-40 h-40 object-cover text-center">
                </div>
                <p class="text-center font-medium text-3xl">Chào mừng quay lại.</p>
                <p class="text-zinc-600 mt-1 text-center">Hãy điền đầy đủ thông tin bên dưới.</p>
                <form class="px-6" @submit.prevent="submit">
                    <div class="mt-3">
                        <p>Email</p>
                        <input type="text" name="email" placeholder="Email" v-model="employee.email" class="outline-orange-500/[.55] mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                    </div>
                    <div class="mt-3">
                        <p>Mật khẩu</p>
                        <input type="password" name="password" placeholder="Mật khẩu" v-model="employee.password" class="outline-orange-500/[.55] mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
                    </div>
                    <div class="flex">
                        <a class="ml-auto text-orange-500 font-medium mt-2">Quên mật khẩu</a>
                    </div>
                    <button type="submit" class="px-4 py-2 bg-orange-400 w-full mt-4 rounded-md text-white font-bold">Đăng nhập</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useToastStore } from '@/stores/toast'

import axios from 'axios'

export default {
    setup() {
        const employee = ref({ email: '', password: '' })
        const errors = ref([]);

        const router = useRouter()
        const useToast = useToastStore() 

        const submit = async () => {
            await axios
            .post('http://127.0.0.1:8000/api/admin/auth/login', employee.value)
            .then((response) => {
                // set token staff
                $cookies.set('token', response.data.token, 60*60*24)

                // show toast login successfully
                useToast.success('Đăng nhập thành công', 3000)

                // redirect to dashboard when login is successful
                const redirectPath = '/dashboard'
                router.push(redirectPath)
            })
            .catch((error) => {
                this.error = errors.value.response.data
            })
        }
        
        return {
            employee,
            submit
        }
    }
}
</script>
