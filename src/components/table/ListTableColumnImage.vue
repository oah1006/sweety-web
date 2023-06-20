<template>
  <td class="lg:px-4 py-3">
    <img :src="props.url" class="w-14 h-14 object-cover rounded-full" />
  </td>
</template>

<script setup>

const props = defineProps({
  url: String
})

</script>