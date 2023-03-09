<template>
  <div class="px-12">
    <p class="text-3xl text-zinc-800">{{ props.title }}</p>
    <p class="text-zinc-400 text-sm">{{ props.subTitle }}</p>
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
  }
})

</script>