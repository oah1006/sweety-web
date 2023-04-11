<template>
  <tr :class="`${props.color} ${props.border} ${props.fontSize}`">
    <slot name="table-column"></slot>
  </tr>
</template>

<script setup>

const props = defineProps({
  color: String,
  border: String,
  fontSize: String,
})

</script>