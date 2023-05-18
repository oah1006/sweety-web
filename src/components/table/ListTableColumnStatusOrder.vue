<template>
  <td class="px-4 py-4">
    <p v-if="props.status === 'pending'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-amber-500 rounded-lg">Hàng chờ</p>
    <p v-else-if="props.status === 'accepted'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-500 rounded-lg">Xác nhận</p>
    <p v-else-if="props.status === 'succeed'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-green-500 rounded-lg">Thành công</p>
    <p v-else-if="props.status === 'preparing'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-yellow-700 rounded-lg">Đang chuẩn bị</p>
    <p v-else-if="props.status === 'prepared'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-yellow-400 rounded-lg">Chuẩn bị xong</p>
    <p v-else-if="props.status === 'delivering'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-violet-500 rounded-lg">Đang giao</p>
    <p v-else-if="props.status === 'canceled'" class="inline-block text-center text-xs text-black px-2 py-0.5 bg-red-400 rounded-lg">Từ chối</p>
    <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-black rounded-lg">Bị hủy bỏ</p>
  </td>
</template>

<script setup>

const props = defineProps({
  status: String
})

</script>