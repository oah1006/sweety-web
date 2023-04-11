<template>
  <div class="flex py-4 border-b border-solid border-gray-100 px-10">
    <p class="w-1/6">{{ props.nameLabel }}</p>
    <div>
      <p v-if="props.status === 'active'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-500 rounded-lg">Kích hoạt</p>
      <p v-else-if="props.status === 'expired'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-zinc-400 rounded-lg">Hết hạn</p>
      <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-black rounded-lg">Vô hiệu hóa</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  status: Number
})

</script>