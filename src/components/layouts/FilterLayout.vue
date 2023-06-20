<template>
  <div >
    <div :class="`${props.grid}`">
      <slot name="filter"></slot>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  grid: String
})

</script>
