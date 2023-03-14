<template>
  <td class="px-4 py-4">
    <p v-if="props.isAdmin === 1" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-red-400 rounded-lg">Quản lý</p>
    <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-400 rounded-lg">Nhân viên</p>
  </td>
</template>

<script setup>

const props = defineProps({
  isAdmin: Boolean
})

</script>