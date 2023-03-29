<template>
  <input type="file" ref="multipleInput" multiple
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

const emits = defineEmits(['change-multiple-image', 'update:modalMultipleInput'])

function onImageChange(e) {
  emits('change-multiple-image', e)
}

const multipleInput = computed({
  get: () => props.modalMultipleInput,

  set: (value) => emits('update:modalMultipleInput', value)
})

const props = defineProps({
  modalMultipleInput: String
})

</script>