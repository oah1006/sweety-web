<template>
  <input type="text" name="description" placeholder="Mô tả" v-model="description"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelDescription'])

const props = defineProps({
  modelDescription: String
})

const description = computed({
  get: () => props.modelDescription,

  set: (value) => emits('update:modelDescription', value)
})

</script>