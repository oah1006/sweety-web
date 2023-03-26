<template>
  <input type="number" name="stock" v-model="stock"
         class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelStock'])

const props = defineProps({
  modelStock: Number
})

const stock = computed({
  get: () => props.modelStock,

  set: (value) => emits('update:modelStock', value)
})

</script>