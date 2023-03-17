<template>
  <div class="bg-zinc-100 py-2 px-4">
    <p class="text-zinc-900 text-lg font-medium">{{ props.name }}</p>
  </div>
</template>


<script setup>

const props = defineProps({
  name: String
})

</script>