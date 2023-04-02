<template>
  <div class="flex">
    <p class="w-1/3">{{ props.nameLabel }}</p>
    <div class="flex-none">
      <p v-if="props.role === 'administrator'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-black rounded-lg">Quản trị viên</p>
      <p v-else-if="props.role === 'manager'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-red-400 rounded-lg">Quản lý</p>
      <p v-else-if="props.role === 'shipper'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-green-400 rounded-lg">Shipper</p>
      <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-400 rounded-lg">Nhân viên</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  role: String,
})

</script>