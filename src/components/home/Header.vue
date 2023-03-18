<template>
  <div class="flex items-center pl-20 border-b border-zinc-100 shadow w-full z-50 fixed top-0 bg-white">
    <div class="flex justify-between">
      <img src="../../images/logo.png" class="w-20 h-20 object-cover mx-auto" />
    </div>
    <div class="flex-none flex items-center px-4 ml-auto mr-10">
      <div class="flex items-center grow gap-2">
        <img :src="profileStore.profile.profile?.attachment?.url" class="w-16 h-16 object-cover rounded-full"/>
        <div>
          <p class="text-orange-500 text-lg font-medium">{{ profileStore.profile.profile?.full_name }}</p>
          <p v-if="profileStore.profile.profile?.isAdmin === 1" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-red-400 rounded-lg">Quản lý</p>
          <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-400 rounded-lg">Nhân viên</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useProfileStore } from "@/stores/getMyProfile";

const profileStore = useProfileStore()

</script>