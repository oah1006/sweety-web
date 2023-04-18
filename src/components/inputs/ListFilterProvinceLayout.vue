<template>
  <div :class="`${props.padding} ${props.flex} ${props.border} ${props.margin}`">
    <p :class="`${props.width}`">{{ props.name }}</p>
    <div class="w-full">
      <slot name="button-click-list"></slot>
      <div>
        <slot name="input-list"></slot>
        <slot name="list"></slot>
      </div>
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