<template>
  <form @submit.prevent="handleSubmit" class="w-2/5 px-20 py-8 bg-white rounded-lg">
    <p class="text-center font-medium text-3xl">{{ props.title }}</p>
    <p class="text-center text-base font-thin mt-1">{{ props.subTitle }}</p>
    <slot name="box-input"></slot>
    <button class="px-4 py-2 bg-orange-500 w-full mt-4 rounded-sm text-white">{{ props.textButton }}</button>
  </form>
</template>

<script setup>
  const props = defineProps({
    title: String,
    subTitle: String,
    textButton: String
  })
</script>