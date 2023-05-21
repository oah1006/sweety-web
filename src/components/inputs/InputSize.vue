<template>
  <input type="text" name="size" :placeholder="props.placeholder" v-model="size"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelSize'])

const props = defineProps({
  modelSize: String,
  placeholder: String,
})

const size = computed({
  get: () => props.modelSize,

  set: (value) => emits('update:modelSize', value)
})

</script>