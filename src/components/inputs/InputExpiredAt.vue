<template>
  <input type="date" name="expired_at" v-model="expired_at"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelStartAt'])

const props = defineProps({
  modelExpiredAt: Date
})

const expired_at = computed({
  get: () => props.modelExpiredAt,

  set: (value) => emits('update:modelExpiredAt', value)
})

</script>