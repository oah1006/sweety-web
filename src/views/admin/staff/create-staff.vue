<template>
    <div class="flex min-h-screen">
        <NavigationBar class="flex-none" />
        <div class="grow bg-zinc-100 py-6 rounded-l-[40px] border-l border-zinc-100 shadow">
            <div class="px-12">
                <p class="text-xl font-medium text-zinc-800">Tạo nhân viên</p>
                <p class="text-zinc-400 text-sm">Bạn sẽ tạo nhân viên mới ở đây nhé!</p>
            </div>
            <form @submit.prevent="submit" class="mt-8">
                <div class="flex mx-10 gap-20">
                    <div class="w-1/4">
                        <div class="rounded-lg bg-white shadow border border-zinc-100 border-solid">
                            <div class="bg-zinc-50 py-3 px-4">
                                <p class="text-zinc-900 text-lg font-medium">Ảnh đại diện</p>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <div class="w-52 h-52 bg-zinc-100 my-4">
            
                                </div>
                                <div class="ml-12 pb-4">
                                    <input type="file"
                                    class="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-1 file:px-3
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-orange-400 file:text-white
                                        hover:file:bg-orange-500" 
                                    @change="onImageChange"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="bg-white mt-9 rounded-lg shadow-md">
                            <div class="bg-zinc-50 py-3 px-4">
                                <p class="text-zinc-900 text-lg font-medium">Thông tin nhân viên</p>
                            </div>
                            <div class="border-zinc-100 border-b-0 px-6 pb-8 pt-6">
                                <p class="text-zinc-600">Chức vụ</p>
                                <select v-model="formStaff.position" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
                                    <option disabled value="">Hãy chọn dưới đây</option>
                                    <option value="manager">Quản lý</option>
                                    <option value="employee">Nhân viên</option>
                                </select>
                            </div>
                            <div class="border-zinc-100 border-b-0 px-6 pb-8">
                                <p class="text-zinc-600">Trạng thái</p>
                                <select v-model="formStaff.status" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
                                    <option disabled value="">Hãy chọn dưới đây</option>
                                    <option value="active">Active</option>
                                    <option value="disable">Disable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="grow">
                        <div class="grow shadow rounded-lg bg-white border border-zinc-100 border-solid">
                            <div class="bg-zinc-50 py-6 px-4">
                                <p class="text-zinc-900 text-lg font-medium">Thông tin nhân viên</p>
                            </div>
                            <div class="border-b-2 py-6 border-zinc-100 flex items-center px-6">
                                <p class="text-zinc-600 w-1/3">Họ</p>
                                <input type="text" placeholder="Họ của bạn" name="last_name" v-model="formStaff.last_name" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                            </div>
                            <div class="border-b-2 py-6 border-zinc-100 flex items-center px-6">
                                <p class="text-zinc-600 w-1/3">Tên</p>
                                <input type="text" placeholder="Tên của bạn" name="first_name" v-model="formStaff.first_name" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                            </div>
                            <div class="border-b-2 py-6 border-zinc-100 flex items-center px-6">
                                <p class="text-zinc-600 w-1/3">Địa chỉ Email</p>
                                <input type="text" v-model="formStaff.email" name="email" placeholder="Email của bạn" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                            </div>
                            <div class="border-b-2 py-6 border-zinc-100 flex items-center px-6">
                                <p class="text-zinc-600 w-1/3">Mật khẩu</p>
                                <input type="text" placeholder="Mật khẩu của bạn" name="password" v-model="formStaff.password" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                            </div>
                            <div class="border-b-2 py-6 border-zinc-100 flex items-center px-6">
                                <p class="text-zinc-600 w-1/3">Số điện thoại</p>
                                <input type="text" v-model="formStaff.phone_number" name="phone_number" placeholder="Số điện thoại của bạn" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                            </div>
                            <div class="py-6 flex items-center px-6">
                                <p class="text-zinc-600 w-1/3">Địa chỉ</p>
                                <input type="text" v-model="formStaff.address" name="address" placeholder="Địa chỉ của bạn" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex my-4 mx-10">
                    <div class="ml-auto flex gap-4">
                        <button class="flex items-center gap-2 py-1 px-4 hover:bg-orange-500 bg-orange-400 rounded-lg text-white font-medium text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Xác nhận</p>
                        </button>
                        <router-link :to="{ name: 'index-staff' }" class="flex items-center hover:bg-zinc-500 bg-black gap-2 py-1 px-4 text-white rounded-lg font-medium text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                            <p>Quay lại</p>
                        </router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import NavigationBar from '../../../components/NavigationBar.vue'

import { storeStaff } from "../../../repositories/staff";

import { useRouter } from 'vue-router'

import { ref } from 'vue'

const router = useRouter();

const formData = new FormData();

const token = $cookies.get('token')

const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
}

const file = ref('');

const formStaff = ref({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  address: '',
  position: '',
  status: ''
});

function onImageChange(e) {
  file.value = e.target.files[0];
}

async function submit() {
    formData.append('avatar', file.value)

    formData.append('email', formStaff.value.email)
    formData.append('password', formStaff.value.password)
    formData.append('first_name', formStaff.value.first_name)
    formData.append('last_name', formStaff.value.last_name)
    formData.append('phone_number', formStaff.value.phone_number)
    formData.append('address', formStaff.value.address)
    formData.append('position', formStaff.value.position)
    formData.append('status', formStaff.value.status)

    await storeStaff(formData, config)
      .then((response) => {
        router.push({ path: 'staffs' })
      })
}
</script>
