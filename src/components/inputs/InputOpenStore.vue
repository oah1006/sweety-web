<template>
  <input type="time" name="openStore" v-model="openStore"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelOpenStore'])

const props = defineProps({
  modelOpenStore: String
})

const openStore = computed({
  get: () => props.modelOpenStore,

  set: (value) => emits('update:modelOpenStore', value)
})

</script>