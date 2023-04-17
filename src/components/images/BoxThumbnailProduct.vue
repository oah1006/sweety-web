<template>
  <div class="my-4 mx-4">
    <p>Ảnh mô tả</p>
    <div class="w-full flex gap-10" v-if="!url">
      <div class="border-dashed border-2 border-zinc-300 w-48 h-48 mt-2">
      </div>
    </div>
    <div class="relative w-48 h-48" v-else>
      <img :src="props.url" class="object-cover w-48 h-48" />
      <a :class="{ hidden: props.isShowDetach }" @click="detachThumbnail(props.idAttachment)" class="cursor-pointer absolute rounded-full bg-amber-600 -top-3 -right-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  url: String,
  width: String,
  height: String,
  shape: String,
  border: String,
  idAttachment: String,
  isShowDetach: Boolean
})

const emits = defineEmits(['detach-thumbnail'])

function detachThumbnail(attachment_id) {
  emits('detach-thumbnail', attachment_id)
}

</script>