<template>
  <input type="text" name="email" placeholder="Email" v-model="email"
         class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelEmail'])

const props = defineProps({
  modelEmail: String
})

const email = computed({
  get: () => props.modelEmail,

  set: (value) => emits('update:modelEmail', value)
})

</script>