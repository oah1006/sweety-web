<template>
  <a v-if="props.url" @click="detachAttachment" class="cursor-pointer absolute top-16 right-28 rounded-full bg-zinc-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
    </svg>
  </a>
</template>


<script setup>

const props = defineProps({
  url: String
})

const emits = defineEmits(['detach-image'])

function detachAttachment() {
  emits('detachImage')
}

</script>