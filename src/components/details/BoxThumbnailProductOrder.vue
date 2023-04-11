<template>
  <div class="my-4 mx-4">
    <div v-if="!url">
      <div class="border-dashed border-2 border-zinc-300 w-12 h-12 mt-2">
      </div>
    </div>
    <div class="relative w-12 h-12" v-else>
      <img :src="props.url" class="object-cover w-12 h-12" />
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
})

</script>