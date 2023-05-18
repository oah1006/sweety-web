<template>
  <input type="text" name="lat" disabled :placeholder="`${props.placeholder}`" v-model="lat"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  modelLat: Number,
  placeholder: String,
})

const emits = defineEmits(['update:modelLat'])

const lat = computed({
  get: () => props.modelLat,

  set: (value) => emits('update:modelLat', value)
})


</script>