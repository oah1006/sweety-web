<template>
  <select v-model="store_id" class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
    <option disabled value="">Hãy chọn dưới đây</option>
    <option v-for="option in props.stores" :value="option.id" :key="option.id">{{ option.name }}</option>
  </select>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps({
  modalSelectStore: Number,
  stores: Object
})

const emits = defineEmits(['update:modalSelectStore'])

const store_id = computed({
  get: () => props.modalSelectStore,

  set: (value) => emits('update:modalSelectStore', value)
})


</script>