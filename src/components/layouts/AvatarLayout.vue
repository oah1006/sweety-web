<template>
  <div :class="`${props.widthBox} ${props.background} ${props.border} ${props.shadow}`">
    <slot name="title-form-field"></slot>
    <div class="flex flex-col items-center justify-center">
      <div class="relative">
        <BoxImage :url="props.url" :border="props.border" :width="props.width" :height="props.height" :shape="props.shape" />
        <slot name="icon-detach-image"></slot>
      </div>
      <div>
        <slot name="input-image"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>

import BoxImage from "@/components/images/BoxImage.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import {ref} from "vue";

const file = ref('')





const emits = defineEmits(['change-image', 'detach-image'])

const props = defineProps({
  url: String,
  name: String,
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

function onImageChange(e) {
  emits('change-image', e)
}

function detachImage() {
  emits('detach-image')
}


</script>