<template>
  <td class="px-4 py-4">
    <p v-if="props.status === 'active'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-500 rounded-lg">Kích hoạt</p>
    <p v-else-if="props.status === 'expired'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-zinc-400 rounded-lg">Hết hạn</p>
    <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-black rounded-lg">Vô hiệu hóa</p>
  </td>
</template>

<script setup>

const props = defineProps({
  status: String
})

</script>