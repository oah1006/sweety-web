<template>
  <input type="file" ref="input"
     class="block w-full text-sm text-slate-500
            file:mr-4 file:py-1 file:px-3
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-400 file:text-white
            hover:file:bg-orange-500"
         @change="onImageChange"
  />
</template>

<script setup>
import {computed} from "vue";

const emits = defineEmits(['change-image', 'update:modalInput'])

function onImageChange(e) {
  emits('change-image', e)
}

const input = computed({
  get: () => props.modalInput,

  set: (value) => emits('update:modalInput', value)
})

const props = defineProps({
  modalInput: String
})

</script>