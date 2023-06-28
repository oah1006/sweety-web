<template>
  <div class="bg-white w-full rounded-lg shadow-md lg:flex">
    <div>
      <div class="relative">
        <BoxThumbnailProduct :isShowDetach="props.isShowDetach" :idAttachment="idAttachment" @detach-thumbnail="detachThumbnail"
                             :url="props.url" :border="props.border" :shape="props.shape" />
        <slot name="icon-detach-image"></slot>
      </div>
      <div>
        <slot name="input-image-thumbnail"></slot>
      </div>
    </div>
    <div>
      <div class="relative">
        <BoxDetailProduct :isShowDetach="props.isShowDetach" @detach-one-image-in-multiple="detachAndDeleteDetailProduct"
                          v-model:modelDetailProducts="detailProducts" :border="props.border" :shape="props.shape" />
      </div>
      <div>
        <slot name="input-multiple-image"></slot>
      </div>
    </div>
  </div>

</template>
<script setup>

import BoxThumbnailProduct from "@/components/images/BoxThumbnailProduct.vue";
import BoxDetailProduct from "@/components/images/BoxDetailProduct.vue";
import {computed} from "vue";

const props = defineProps({
  idAttachment: String,
  isShowDetach: Boolean,
  url: String,
  modelDetailProducts: Array,
  detailProducts: Array,
  name: String,
  heightBox: {
    type: String,
    default: () => ''
  },
  widthBox: {
    type: String,
    default: () => ''
  },
  width: {
    type: String,
    default: () => ''
  },
  height: {
    type: String,
    default: () => ''
  },
  shape: {
    type: String,
    default: () => ''
  },
  background: {
    type: String,
    default: () => ''
  },
  border: {
    type: String,
    default: () => ''
  },
  shadow: {
    type: String,
    default: () => ''
  },
})

const urlApi = process.env.VUE_APP_ENV_URL

const emits = defineEmits(['update:modelDetailProducts', 'detach-one-image-in-multiple', 'detach-thumbnail'])

const detailProducts = computed({
  get: () => props.modelDetailProducts,

  set: (value) => emits('update:modelDetailProducts', value)
})

function detachAndDeleteDetailProduct(id, attachment_id = null) {
  emits('detach-one-image-in-multiple', id, attachment_id)
}

function detachThumbnail(attachment_id) {
  emits('detach-thumbnail', attachment_id)
}
</script>