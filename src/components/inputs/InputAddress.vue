<template>
  <input type="text" name="address" :placeholder="`${props.placeholder}`" v-model="address"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import {computed, watch} from "vue";

const props = defineProps({
  modelAddress: String,
  placeholder: String,
})

const emits = defineEmits(['update:modelAddress'])

const address = computed({
  get: () => props.modelAddress,

  set: (value) => emits('update:modelAddress', value)
})

watch(address, () => {
  console.log(address.value)
})

</script>