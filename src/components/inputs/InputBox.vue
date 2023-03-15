<template>
  <div class="border-b border-gray-100 border-solid py-6 flex items-center gap-4 px-10">
    <p class="w-1/12">{{ props.name }}</p>
    <slot name="input"></slot>
  </div>
</template>

<script setup>

const props = defineProps({
  name: String
})

</script>