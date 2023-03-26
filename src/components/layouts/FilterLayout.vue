<template>
  <div class="border border-zinc-50 shadow bg-white mt-4 px-4 py-6 rounded-lg">
    <div :class="`${props.grid}`">
      <slot name="filter"></slot>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  grid: String
})

</script>
