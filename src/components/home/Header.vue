<template>
  <div class="flex items-center pl-20 border-b border-zinc-100 shadow w-full z-50 fixed top-0 bg-white">
    <div class="flex justify-between">
      <img src="../../images/logo.png" class="w-20 h-20 object-cover mx-auto" />
    </div>
    <div class="flex-none flex items-center px-4 ml-auto mr-10">
      <div class="flex items-center grow gap-2">
        <div class="relative">
          <BoxImage @click="showPopup" :url="profileStore.profile.profile?.attachment?.url" :key="profileStore.profile.profile?.attachment?.id" width="w-12" height="h-12" :shape="rounded-full"/>
          <div v-if="isPopup" class="absolute w-60 py-3 bg-white rounded-lg shadow top-20 right-0 px-4">
            <a @click="redirectProfile" class="flex items-center gap-2 hover:bg-zinc-100 hover:rounded-lg px-2 py-3 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="font-medium text-lg">Thông tin cá nhân</p>
            </a>
            <a @click="logout" class="flex items-center gap-2 hover:bg-zinc-100 hover:rounded-lg px-2 py-3 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="font-medium text-lg">Đăng xuất</p>
            </a>
          </div>
        </div>
        <div>
          <p class="text-orange-500 text-lg font-medium">{{ profileStore.profile.profile?.full_name }}</p>
          <p v-if="profileStore.profile.profile?.is_admin == 1" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-red-400 rounded-lg">Quản lý</p>
          <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-400 rounded-lg">Nhân viên</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BoxImage from "@/components/images/BoxImage.vue";


import { useProfileStore } from "@/stores/getMyProfile";
import { ref } from "vue";
import { useLogoutApi } from "@/repositories/auth";
import { useRouter } from "vue-router";


const profileStore = useProfileStore()

const isPopup = ref(false)

const router = useRouter();

function showPopup() {
  isPopup.value = !isPopup.value
}

function redirectProfile() {
  router.push({
    name: 'my-profile'
  })
}

async function logout() {
  await useLogoutApi()
    .then((response) => {
      $cookies.remove('token')
      router.push('/')
    })
}


</script>