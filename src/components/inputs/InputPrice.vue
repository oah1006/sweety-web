<template>
  <input type="text" name="price" placeholder="Giá tiền" v-model="price"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelPrice'])

const props = defineProps({
  modelPrice: String
})

const price = computed({
  get: () => props.modelPrice,

  set: (value) => emits('update:modelPrice', value)
})

</script>