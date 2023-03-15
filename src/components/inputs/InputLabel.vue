<template>
  <p class="w-1/12">{{ props.name }}</p>
</template>

<script setup>

const props = defineProps({
  name: String
})

</script>