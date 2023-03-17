<template>
    <div class="lg:flex lg:flex-col lg:items-center lg:justify-center w-full h-full lg:min-h-screen lg:bg-slate-200">
        <div class="lg:flex rounded-lg overflow-hidden">
            <div class="lg:rounded-lg lg:block hidden">
                <img src="../../../images/milktea.jpg" alt="" class="h-[620px] w-96 object-cover">
            </div>
            <div class="lg:border lg:border-solid lg:shadow-md h-full lg:h-[620px] lg:w-96 bg-white py-24 lg:py-10">
                <div class="flex justify-center">
                    <img src="../../../images/logo.png" alt="" class="w-32 h-32 object-cover text-center">
                </div>
                <p class="text-center font-medium text-3xl">Chào mừng quay lại.</p>
                <p class="text-zinc-600 mt-1 text-center">Hãy điền đầy đủ thông tin bên dưới.</p>
                <div class="text-red-900 mt-2 text-md mx-4 px-4 py-4 bg-red-100 rounded-md h-26" v-if="errors?.message">
                    <p>{{ errors?.message }}</p>
                </div>
                <form class="px-6 mt-3" @submit.prevent="submit">
                    <div class="mt-2">
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

<script setup>
import { ref } from 'vue'
import useLogin from '@/repositories/login'

import { useToastStore } from '@/stores/toast'

import { useRouter } from 'vue-router'

const router = useRouter();

const employee = ref({
  email: '',
  password: ''
})

const errors = ref({});

async function submit() {
  await useLogin(employee)
      .then((response) => {
        $cookies.set('token', response.data.data.token, 60*60*24)

        useToastStore().success('Đăng nhập thành công', 3000)

        router.push({ path: '/dashboard' })
      })
      .catch((error) => {
        errors.value = error.response.data
      })
}

</script>

