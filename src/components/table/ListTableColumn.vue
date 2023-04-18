<template>
  <td class="lg:px-4 py-4">
    {{ props.text }} {{ props.unit }}
  </td>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  unit: {
    type: String,
    default: () => ''
  },
})

</script>