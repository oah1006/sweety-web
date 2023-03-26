<template>
  <select v-model="category_id" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
    <option disabled value="">Hãy chọn dưới đây</option>
    <option v-for="option in props.category" :value="option.id" :key="option.id">{{ option.name }}</option>
  </select>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps({
  category: Object,
  modalSelectCategory: Number,
  selectOptionStatus: Array
})

const emits = defineEmits(['update:modalSelectCategory'])

const category_id = computed({
  get: () => props.modalSelectCategory,

  set: (value) => emits('update:modalSelectCategory', value)
})

</script>