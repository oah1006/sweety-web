<template>
  <button type="button" @click="getCoordinates" class="flex gap-3 items-center mt-3 px-4 py-1 text-white text-center bg-green-500 rounded-xl ml-auto">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
    <p>Tạo tọa độ</p>
  </button>
</template>

<script setup>

const emits = defineEmits(['get-coordinates'])

function getCoordinates() {
  emits('get-coordinates')
}

</script>