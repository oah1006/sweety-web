<template>
  <input type="text" name="full_name" placeholder="Họ và tên" v-model="full_name"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  modelFullName: String
})

const emits = defineEmits(['update:modelFullName'])

const full_name = computed({
  get: () => props.modelFullName,

  set: (value) => emits('update:modelFullName', value)
})

</script>