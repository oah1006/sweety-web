<template>
  <input type="password" name="new_password" placeholder="Mật khẩu" v-model="new_password"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  modelNewPassword: String
})

const emits = defineEmits(['update:modelNewPassword'])

const new_password = computed({
  get: () => props.modelNewPassword,

  set: (value) => emits('update:modelNewPassword', value)
})

</script>