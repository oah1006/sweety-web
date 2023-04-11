<template>
  <td class="lg:px-4 py-4">
    {{ props.price * props.quantity }}
  </td>
</template>

<script setup>

const props = defineProps({
  price: Number,
  quantity: Number
})

</script>