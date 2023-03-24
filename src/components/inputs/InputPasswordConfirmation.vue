<template>
  <input type="text" name="new_password_confirmation" placeholder="Mật khẩu" v-model="new_password_confirmation"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelNewPasswordConfirmation: String
})

const emits = defineEmits(['update:modelNewPasswordConfirmation'])

const new_password_confirmation = computed({
  get: () => props.modelNewPasswordConfirmation,

  set: (value) => emits('update:modelNewPasswordConfirmation', value)
})

</script>