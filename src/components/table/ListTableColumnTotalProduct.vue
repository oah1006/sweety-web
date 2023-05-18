<template>
  <td class="lg:px-4 py-4">
    {{ formatPrice(props.price * props.quantity) }} đồng
  </td>
</template>

<script setup>

const props = defineProps({
  price: Number,
  quantity: Number
})

console.log(props.price)

function formatPrice(price) {
  return price.toLocaleString("vi-VN")
}

</script>