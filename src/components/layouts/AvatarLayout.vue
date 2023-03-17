<template>
  <div class="rounded-lg bg-white shadow border border-zinc-100 border-solid w-1/4 relative h-56">
    <TitleFormField name="Ảnh đại diện" />
    <div class="flex flex-col items-center justify-center">
      <BoxImage :url="props.url" @detach-image="detachImage" />
      <div>
        <InputFile class="text-center ml-20 py-4" @change-image="onImageChange" />
      </div>
    </div>
  </div>
</template>
<script setup>
import InputFile from "@/components/inputs/InputFile.vue";
import BoxImage from "@/components/images/BoxImage.vue";
import TitleFormField from "@/components/TitleFormField.vue";

const emits = defineEmits(['change-image', 'detach-image'])

const props = defineProps({
  url: String,
  name: String
})

function onImageChange(e) {
  emits('change-image', e)
}

function detachImage() {
  emits('detach-image')
}

</script>