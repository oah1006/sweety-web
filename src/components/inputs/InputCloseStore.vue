<template>
  <input type="time" name="closeStore" v-model="closeStore"
         class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelCloseStore'])

const props = defineProps({
  modelCloseStore: String
})

const closeStore = computed({
  get: () => props.modelCloseStore,

  set: (value) => emits('update:modelCloseStore', value)
})

</script>