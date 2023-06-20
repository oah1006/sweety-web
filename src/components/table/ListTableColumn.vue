<template>
  <td class="lg:px-4 px-2 py-4 text-sm lg:text-md">
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