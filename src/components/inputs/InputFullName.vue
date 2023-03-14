<template>
  <input type="text" name="full_name" placeholder="Họ và tên"
         class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

const props = defineProps({
  nameInput: String
})

</script>