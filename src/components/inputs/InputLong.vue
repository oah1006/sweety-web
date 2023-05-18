<template>
  <input type="text" name="long" disabled :placeholder="`${props.placeholder}`" v-model="long"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  modelLong: Number,
  placeholder: String,
})

const emits = defineEmits(['update:modelLong'])

const long = computed({
  get: () => props.modelLong,

  set: (value) => emits('update:modelLong', value)
})


</script>