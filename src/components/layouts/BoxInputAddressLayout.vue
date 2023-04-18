<template>
  <div :class="`${props.padding} ${props.flex} ${props.border} ${props.margin}`">
    <slot name="address"></slot>
    <slot name="get-coordinates"></slot>
  </div>
</template>

<script setup>

const props = defineProps({
  border: String,
  padding: String,
  flex: String,
  width: String,
  margin: String
})

</script>