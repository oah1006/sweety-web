<template>
  <div :class="`${props.padding} ${props.flex} ${props.border} ${props.margin}`">
    <p :class="`${props.width}`">{{ props.name }}</p>
    <div class="w-full flex items-center justify-between">
      <div class="flex gap-10">
        <slot name="input-long"></slot>
        <slot name="input-lat"></slot>
      </div>
      <slot name="button-coordinates"></slot>
    </div>
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