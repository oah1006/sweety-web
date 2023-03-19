<template>
  <select v-model="role" class="form-select w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4 mt-1">
    <option disabled value="">Hãy chọn dưới đây</option>
    <option v-for="option in props.selectOptionRole" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps({
  modalSelectRole: Number,
  selectOptionRole: Array
})

const emits = defineEmits(['update:modalSelectRole'])

const role = computed({
  get: () => props.modalSelectRole,

  set: (value) => emits('update:modalSelectRole', value)
})


</script>