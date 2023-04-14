<template>
  <input type="text" name="name" :placeholder="props.placeholder" v-model="name"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelName'])

const props = defineProps({
  modelName: String,
  placeholder: String,
})

const name = computed({
  get: () => props.modelName,

  set: (value) => emits('update:modelName', value)
})

</script>