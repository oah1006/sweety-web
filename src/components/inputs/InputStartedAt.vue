<template>
  <input type="date" name="started_at" v-model="started_at"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelStartAt'])

const props = defineProps({
  modelStartedAt: Date
})

const started_at = computed({
  get: () => props.modelStartedAt,

  set: (value) => emits('update:modelStartedAt', value)
})


</script>