<template>
  <td class="lg:px-4 py-4">
    {{ props.text }}
  </td>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  }
})

</script>