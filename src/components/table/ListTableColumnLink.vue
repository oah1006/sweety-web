<template>
  <td class="lg:px-4 py-4 underline text-cyan-500">
    <p>
      {{ props.text }}
    </p>
  </td>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  id: {
    type: Number,
    default: () => null
  }
})

console.log(props.id)

</script>