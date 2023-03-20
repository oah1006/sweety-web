<template>
  <div :class="`${props.width} ${props.height}`" class="my-4">
    <img v-if="props.url" :class="`${props.width} ${props.height} ${props.shape}`" :src="props.url" class="object-cover"/>
  </div>
</template>

<script setup>

const props = defineProps({
  url: String,
  width: String,
  height: String,
  shape: String,
})

</script>