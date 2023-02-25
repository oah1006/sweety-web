<template>
    <div class="flex min-h-screen">
        <NavigationBar class="flex-none" />
        <div class="grow bg-zinc-50 py-10 rounded-3xl border-l border-zinc-100 shadow">
            <!-- Title and search -->
            <div class="mx-12 py-6 rounded-lg">
                <p class="text-3xl text-zinc-800">Nhân viên</p>
                <p class="text-zinc-400 text-sm">Chào mừng bạn đến với trang nhân viên</p>
                <div class="flex items-center justify-between w-full mt-4">
                    <div class="w-1/3 relative">
                        <input type="text" placeholder="Tìm kiếm" class="outline-orange-300 mt-2 border border-zinc-300 w-full py-1 rounded-3xl pl-10 text-slate-300" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute top-4 left-2 w-5 h-5 text-zinc-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <router-link :to="{ name: 'create-staff' }" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-orange-500 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p>Tạo mới</p>
                    </router-link>
                </div>
            </div>
            <!-- Title and search -->
            
            <!-- table list staffs -->
            <div class="mt-6 mx-12 shadow-md rounded-md bg-white">
                <div class="py-4 px-4">
                    <input type="checkbox" class="form-checkbox text-orange-500 border-zinc-300 rounded focus:ring-orange-400" />
                </div>
                <table class="w-full bg-white rounded-lg border-t">
                    <thead class="uppercase rounded-lg bg-zinc-100">
                        <tr class="text-xs text-zinc-600 font-bold">
                            <td></td>
                            <td class="lg:px-4 py-4">Mã nhân viên</td>
                            <td class="lg:px-4 py-4">TÊN</td>
                            <td class="lg:px-4 py-4">EMAIL</td>
                            <td class="lg:px-4 py-4">Cửa hàng</td>
                            <td class="lg:px-4 py-4">VAI TRÒ</td>
                            <td class="lg:px-4 py-4 text-center">TRẠNG THÁI</td>
                            <td class="lg:px-2 py-4"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="person in staff" :key="person.id" class="text-zinc-600 border-b text-sm">
                            <td class="px-4 py-4">
                                <input type="checkbox" class="form-checkbox text-orange-500 border-zinc-300 rounded focus:ring-orange-400" />
                            </td>
                            <td class="px-4 py-4 text-orange-400 font-bold">{{ person.code }}</td>
                            <td class="px-4 py-4">{{ person.full_name }}</td>
                            <td class="px-4 py-4">{{ person.user?.email }}</td>
                            <td class="px-4 py-4">Sweety 1</td>
                            <td class="px-4 py-4">
                                <p class="inline-block text-center text-xs text-white px-2 py-0.5 bg-red-400 rounded-lg">Quản lý</p>
                            </td>
                            <td class="px-4 py-4">
                                <div class="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </td>
                            <td class="px-4 py-4 flex">
                                <div class="flex gap-2 ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                        />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="h-12 flex items-center justify-between px-4">
                    <p class="text-zinc-400">Trước</p>
                    <p class="text-zinc-600">1-7 trang</p>
                    <p class="text-zinc-400">Sau</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavigationBar from '../../../components/NavigationBar.vue'

import { indexStaff } from "../../../repositories/staff";

import { useRouter } from 'vue-router'

import { ref } from 'vue'






const staff = ref([])

indexStaff(staff.value)
    .then((response) => {
        staff.value = response.data.data.data
    })




</script>
