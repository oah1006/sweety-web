<template>
  <input type="text" name="address" placeholder="Địa chỉ" v-model="address"
         class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  modelAddress: String
})

const emits = defineEmits(['update:modelAddress'])

const address = computed({
  get: () => props.modelAddress,

  set: (value) => emits('update:modelAddress', value)
})

</script>