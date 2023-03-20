<template>
  <div class="bg-white rounded-lg shadow-md h-56 w-full">
    <div class="border-zinc-100 border-b-0 px-6 pb-3 pt-3">
      <p class="text-zinc-600">{{ props.nameLabelRole }}</p>
      <slot name="role"></slot>
    </div>
    <div class="border-zinc-100 border-b-0 px-6 pb-8">
      <p class="text-zinc-600">{{ props.nameLabelStatus }}</p>
      <slot name="status"></slot>
    </div>
  </div>
</template>

<script setup>

import TitleFormField from "@/components/TitleFormField.vue";

const props = defineProps({
  name: String,
  nameLabelRole: String,
  nameLabelStatus: String,
})

</script>