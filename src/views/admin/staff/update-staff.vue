<template>
    <div class="min-h-screen">
      <Header />
      <div class="flex">
        <NavigationBar class="flex-none" />
        <div class="grow bg-zinc-100 py-24">
          <div class="px-12">
            <p class="text-2xl font-medium text-zinc-800">Cập nhật nhân viên</p>
            <p class="text-zinc-400 text-sm">Bạn sẽ cập nhật nhân viên mới ở đây nhé!</p>
          </div>
          <form @submit.prevent="submit" class="mt-8">
            <div class="flex mx-10 gap-20">
              <div class="w-1/4">
                <div class="rounded-lg bg-white shadow border border-zinc-100 border-solid">
                  <div class="bg-zinc-50 py-3 px-4">
                    <p class="text-zinc-900 text-lg font-medium">Ảnh đại diện</p>
                  </div>
                  <div class="flex flex-col items-center justify-center relative">
                    <div class="w-52 h-52 my-4">
                      <img v-if="url" :src="url" class="w-48 h-48 object-cover rounded-full"/>
                      <a v-if="url" @click="detachAttachment" class="cursor-pointer absolute top-6 right-14 rounded-full bg-zinc-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </a>
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
                <div class="bg-white mt-4 rounded-lg shadow-md">
                  <div class="bg-zinc-50 py-3 px-4">
                    <p class="text-zinc-900 text-lg font-medium">Thông tin nhân viên</p>
                  </div>
                  <div class="border-zinc-100 border-b-0 px-6 pb-3 pt-3">
                    <p class="text-zinc-600">Chức vụ</p>
                    <select v-model="formStaff.is_admin" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
                      <option>Hãy chọn dưới đây</option>
                      <option :value="1">Quản lý</option>
                      <option :value="0">Nhân viên</option>
                    </select>
                  </div>
                  <div class="border-zinc-100 border-b-0 px-6 pb-8">
                    <p class="text-zinc-600">Trạng thái</p>
                    <select v-model="formStaff.is_active" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
                      <option disabled value="">Hãy chọn dưới đây</option>
                      <option :value="1">Hoạt động</option>
                      <option :value="0">Vô hiệu hóa</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="grow my-auto">
                <div class="grow shadow rounded-lg bg-white border border-zinc-100 border-solid">
                  <div class="bg-zinc-50 py-6 px-4">
                    <p class="text-zinc-900 text-lg font-medium">Thông tin nhân viên</p>
                  </div>
                  <div class="border-b-2 border-zinc-100 flex items-center px-6 py-6">
                    <p class="text-zinc-600 w-1/3 font-semibold text-sm">Họ và tên</p>
                    <input type="text" placeholder="Tên của bạn" name="full_name" v-model="formStaff.full_name" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                  </div>
                  <div class="border-b-2 border-zinc-100 flex items-center px-6 py-6">
                    <p class="text-zinc-600 w-1/3 font-semibold text-sm">Địa chỉ Email</p>
                    <input type="text" v-model="formStaff.email" name="email" placeholder="Email của bạn" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                  </div>
                  <div class="border-b-2 border-zinc-100 flex items-center px-6 py-6">
                    <p class="text-zinc-600 w-1/3 font-semibold text-sm">Số điện thoại</p>
                    <input type="text" v-model="formStaff.phone_number" name="phone_number" placeholder="Số điện thoại của bạn" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                  </div>
                  <div class="flex items-center px-6 py-6">
                    <p class="text-zinc-600 w-1/3 font-semibold text-sm">Địa chỉ</p>
                    <input type="text" v-model="formStaff.address" name="address" placeholder="Địa chỉ của bạn" class="form-input text-md placeholder:text-zinc-400 mt-1 w-full bg-white border border-solid border-zinc-300 rounded py-2 px-4" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex my-4 mx-10">
              <div class="ml-auto flex gap-4">
                <button class="flex items-center gap-2 py-1 px-4 hover:bg-orange-600 bg-orange-500 rounded-lg text-white font-medium text-lg">
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
    </div>
</template>

<script setup>
import NavigationBar from '../../../components/NavigationBar.vue'
import Header from '../../../components/Header.vue'

import { getStaffProfile, updateStaff } from "../../../repositories/staff"
import { detach, sync } from '../../../repositories/attachment'

import {useRoute, useRouter} from 'vue-router'

import { ref } from 'vue'

const router = useRouter()

const file = ref()

const url = ref('')

const route = useRoute();

const id = route.params.id

const formStaff = ref({
    id: '',
    attachment_id: '',
    email: '',
    full_name: '',
    phone_number: '',
    address: '',
    is_admin: '',
    is_active: ''
})

function onImageChange(e) {
    file.value = e.target.files[0]

    sync('staff', formStaff.value.id, file.value, 'avatars') 
        .then((response) => {
            url.value = URL.createObjectURL(file.value)
        })
}

function detachAttachment() {
    detach(formStaff.value.attachment_id)
        .then((response) => {
            url.value = ''
        }) 
}

function getStaffInformation() {
    getStaffProfile() 
        .then((response) => {
            formStaff.value.id = response.data.id
            formStaff.value.attachment_id = response.data.attachment?.id
            formStaff.value.email = response.data.user?.email
            formStaff.value.full_name = response.data.full_name
            formStaff.value.phone_number = response.data.user?.phone_number
            formStaff.value.address = response.data.user?.address
            formStaff.value.is_admin = response.data.is_admin
            formStaff.value.is_active = response.data.is_active


            if (response.data.attachment != null) {
                url.value = response.data.attachment.url
            }
        })
}

async function submit() {
  console.log(formStaff)
   updateStaff(formStaff.value, id)
    .then((response) => {
      router.push({ name: 'index-staff' })
    })
}

getStaffInformation()



</script>
