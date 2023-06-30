<template>
  <div :class="`${props.border} ${props.margin}`">
    <div :class="`${props.padding} ${props.flex}`">
      <p :class="`${props.width}`">{{ props.name }}</p>
      <slot name="input"></slot>
    </div>
    <slot name="error"></slot>
  </div>
</template>

<script setup>

const props = defineProps({
  name: String,
  border: String,
  padding: String,
  flex: String,
  width: String,
  margin: String
})

</script>