<template>
  <input type="text" name="is_percent_value" placeholder="Phần trăm khuyến mãi" v-model="is_percent_value"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  modelPercentValue: String
})

const emits = defineEmits(['update:modelPercentValue'])

const is_percent_value = computed({
  get: () => props.modelPercentValue,

  set: (value) => emits('update:modelPercentValue', value)
})

</script>