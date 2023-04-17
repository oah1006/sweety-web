<template>
  <td class="lg:px-4 py-4">
    <div class="flex items-center" v-if="props.attachment.length > 0">
      <BoxThumbnailProductOrder :url="props.attachment[0].url" />
      <router-link class="text-cyan-500 underline" :to="{
          name: 'detail-product',
          params: {
            id: props.id
          }
        }">
        {{ props.text }}
      </router-link>
    </div>
    <div v-else>
      <router-link class="text-cyan-500 underline" :to="{
          name: 'detail-product',
          params: {
            id: props.id
          }
        }">
        {{ props.text }}
      </router-link>
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
  attachment: Object,
  id: Number
})


</script>