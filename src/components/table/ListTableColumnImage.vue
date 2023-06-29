<template>
  <td class="lg:px-4 py-3">
    <img v-if="props.url" :src="props.url" class="w-14 h-14 object-cover rounded-full" />
    <img v-else src="../../images/no-avatar.jpg" class="w-14 h-14 object-cover rounded-full"/>
  </td>
</template>

<script setup>

const props = defineProps({
  url: String
})

</script>