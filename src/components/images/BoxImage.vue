<template>
  <div :class="`${props.width} ${props.height}`" class="my-4 ">
    <img v-if="props.url" :class="`${props.width} ${props.height} ${props.shape} ${props.border}`" :src="props.url" class="object-cover"/>
    <img v-else :class="`${props.width} ${props.height} ${props.shape} ${props.border}`" src="../../images/no-avatar.jpg" class="object-cover"/>
  </div>
</template>

<script setup>

const props = defineProps({
  url: String,
  width: String,
  height: String,
  shape: String,
  border: String,
})

console.log(props.shape)

</script>