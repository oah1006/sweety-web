<template>
  <select v-model="published" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
    <option disabled value="">Hãy chọn dưới đây</option>
    <option v-for="option in props.selectOptionPublished" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps({
  modalPublished: Number,
  selectOptionPublished: Array
})

const emits = defineEmits(['update:modalPublished'])

const published = computed({
  get: () => props.modalPublished,

  set: (value) => emits('update:modalPublished', value)
})

</script>