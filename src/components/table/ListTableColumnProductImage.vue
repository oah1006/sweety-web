<template>
  <td class="py-4">
    <div class="flex items-center">
      <BoxThumbnailProductOrder :url="props.attachment[0].url" />
      <div>
        <div>
          <router-link class="text-cyan-500 underline" :to="{
          name: 'detail-product',
          params: {
            id: props.id
          }
        }">
            {{ props.nameProduct }}
          </router-link>
          <div>
            <p>{{ formatPrice(props.priceProduct) }} đồng </p>
          </div>
        </div>
        <div>
          <div v-for="item_option in props.orderItemOptions">
            <div>
              <p>{{ item_option.topping?.name }} x {{ item_option.qty }}</p>
              <p>{{ formatPrice(item_option.topping?.price) }} đồng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </td>
</template>

<script setup>

import BoxThumbnailProductOrder from "@/components/details/BoxThumbnailProductOrder.vue";

const props = defineProps({
  nameProduct: {
    type: String,
    default: () => ''
  },
  attachment: Object,
  id: Number,
  priceProduct: '',
  orderItemOptions: Object
})

function formatPrice(price) {
  return price.toLocaleString("vi-VN")
}


</script>