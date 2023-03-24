<template>
  <input type="text" name="phone_number" placeholder="Số điện thoại" v-model="phone_number"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  modelPhoneNumber: String
})

const emits = defineEmits(['update:modelPhoneNumber'])

const phone_number = computed({
  get: () => props.modelPhoneNumber,

  set: (value) => emits('update:modelPhoneNumber', value)
})

</script>