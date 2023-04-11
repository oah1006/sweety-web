<template>
  <div class="flex pt-2 px-4">
    <p class="font-medium text-cyan-500 text-lg underline">{{ props.text }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  text: String
})

</script>