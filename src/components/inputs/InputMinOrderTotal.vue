<template>
  <input type="text" name="stock" v-model="min_order_total"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelStock'])

const props = defineProps({
  modelMinOrderTotal: String
})

const min_order_total = computed({
  get: () => props.modelMinOrderTotal,

  set: (value) => emits('update:modelMinOrderTotal', value)
})

</script>