<template>
  <input type="text" name="otp" placeholder="OTP của bạn" v-model="otp"
         class="form-select mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import { computed } from 'vue'

const emits = defineEmits(['update:modelOtp'])

const props = defineProps({
  modelOtp: String
})

const otp = computed({
  get: () => props.modelOtp,

  set: (value) => emits('update:modelOtp', value)
})

</script>