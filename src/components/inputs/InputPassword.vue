<template>
  <input type="text" name="password" placeholder="Mật khẩu" v-model="password"
         class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4">
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  modelPassword: String
})

const emits = defineEmits(['update:modelPassword'])

const password = computed({
  get: () => props.modelPassword,

  set: (value) => emits('update:modelPassword', value)
})

</script>