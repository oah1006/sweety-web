<template>
  <div class="flex py-4 px-10">
    <p class="w-1/6">{{ props.nameLabel }}</p>
    <div class="flex-none">
      <p v-if="props.item == 1" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-green-400 rounded-lg">Xuất bản</p>
      <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-zinc-400 rounded-lg">Ẩn</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  item: Number
})

</script>