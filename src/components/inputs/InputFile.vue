<template>
  <input type="file"
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
const emits = defineEmits(['change-image'])

function onImageChange(e) {
  emits('change-image', e)
}

</script>