<template>
  <div :class="`${props.padding} ${props.border} ${props.margin}`">
    <div :class="`${props.flex}`">
      <p :class="`${props.width}`">{{ props.name }}</p>
      <div class="w-full relative">
        <slot name="input"></slot>
        <slot name="select-filter"></slot>
      </div>
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
  margin: String,
})

</script>