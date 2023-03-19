<template>
  <div class="rounded-lg bg-white shadow border border-zinc-100 border-solid w-1/4 relative">
    <TitleFormField name="Ảnh đại diện" />
    <div class="flex flex-col items-center justify-center">
      <div>
        <BoxImage :url="props.url"  :width="props.width" :height="props.height" :shape="props.shape" />
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

const url = ref('')


const emits = defineEmits(['change-image', 'detach-image'])

const props = defineProps({
  url: String,
  name: String,
  width: String,
  height: String,
  shape: String
})

function onImageChange(e) {
  emits('change-image', e)
}

function detachImage() {
  emits('detach-image')
}


</script>