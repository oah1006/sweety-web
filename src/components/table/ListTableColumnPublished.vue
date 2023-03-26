<template>
  <td class="px-4 py-4">
    <p v-if="props.published === 1" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-green-400 rounded-lg">Xuất bản</p>
    <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-zinc-400 rounded-lg">Ẩn</p>
  </td>
</template>

<script setup>

const props = defineProps({
  published: String
})

</script>