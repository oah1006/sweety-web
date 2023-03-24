<template>
  <input type="text" name="old_password" placeholder="Mật khẩu cũ" v-model="old_password"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  modelOldPassword: String
})

const emits = defineEmits(['update:modelOldPassword'])

const old_password = computed({
  get: () => props.modelOldPassword,

  set: (value) => emits('update:modelOldPassword', value)
})

</script>