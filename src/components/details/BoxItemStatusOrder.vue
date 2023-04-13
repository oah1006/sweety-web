<template>
  <div>
    <p v-if="props.status === 'pending'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-amber-500 rounded-lg">Hàng chờ</p>
    <p v-else-if="props.status === 'succeed'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-green-500 rounded-lg">Xác nhận</p>
    <p v-else-if="props.status === 'delivering'" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-500 rounded-lg">Đang giao hàng</p>
    <p v-else-if="props.status === 'canceled'" class="inline-block text-center text-xs text-black px-2 py-0.5 bg-zinc-200 rounded-lg">Hủy bỏ</p>
    <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-black rounded-lg">Thất bại</p>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  status: Number,
  width: String
})
</script>