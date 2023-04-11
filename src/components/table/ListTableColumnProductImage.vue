<template>
  <td class="lg:px-4 py-4">
    <div class="flex items-center">
      <BoxThumbnailProductOrder :url="props.attachment[0].url" />
      <p>{{ props.text }}</p>
    </div>
  </td>
</template>

<script setup>

import BoxThumbnailProductOrder from "@/components/details/BoxThumbnailProductOrder.vue";

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  attachment: Object
})

</script>