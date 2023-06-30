<template>
  <td class="lg:px-4 py-4">
    {{ formatPrice(props.totalPrice) }} đồng
  </td>
</template>

<script setup>

const props = defineProps({
  totalPrice: Number
})

function formatPrice(price) {
  return price.toLocaleString("vi-VN")
}

</script>