<template>
  <div class="flex items-center mb-4">
    <div>
      <p class="lg:text-3xl text-2xl text-zinc-800">{{ props.title }}</p>
      <p class="text-zinc-400 text-sm mt-1 w-60 lg:w-full">{{ props.subTitle }}</p>
    </div>
    <slot name="button"></slot>
  </div>
</template>


<script setup>
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