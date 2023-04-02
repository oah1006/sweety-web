<template>
  <select v-model="status" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
    <option disabled value="">Hãy chọn dưới đây</option>
    <option v-for="option in props.selectOptionStatus" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps({
  modalSelectStatus: Object,
  selectOptionStatus: Array
})

const emits = defineEmits(['update:modalSelectStatus'])

const status = computed({
  get: () => props.modalSelectStatus,

  set: (value) => emits('update:modalSelectStatus', value)
})

</script>