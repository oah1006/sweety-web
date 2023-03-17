<template>
  <div class="flex items-center mb-4">
    <div>
      <p class="text-3xl text-zinc-800">{{ props.title }}</p>
      <p class="text-zinc-400 text-sm">{{ props.subTitle }}</p>
    </div>
    <slot name="button"></slot>
  </div>
</template>


<script setup>
import Button from "@/components/Button.vue"

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },
  subTitle: {
    type: String,
    default: () => ''
  },
  textButton: String
})

const emits = defineEmits(['click-redirect'])

function useClickRedirectCreate() {
  emits('click-redirect')
}

</script>