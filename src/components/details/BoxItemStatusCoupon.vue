<template>
  <div class="flex border-b border-solid border-gray-100 px-10">
    <p class="w-1/6">{{ props.nameLabel }}</p>

    <div>
      <p v-if="props.status === 'active'" class=" text-center text-xs text-white px-2 py-0.5 bg-blue-500 rounded-lg">Còn hạn sử dụng</p>
      <p v-else-if="props.status === 'expired'" class="itext-center text-xs text-white px-2 py-0.5 bg-zinc-400 rounded-lg">Hết hạn</p>
      <p v-else class="text-center text-xs text-white px-2 py-0.5 bg-black rounded-lg">Hủy kích hoạt</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  status: Number
})

console.log(props.status)

</script>