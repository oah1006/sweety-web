<template>
  <div :class="`${props.padding} ${props.border}`" class="flex">
    <p :class="`${props.width}`" class="flex-none">{{ props.nameLabel }}</p>
    <p :class="`${props.color}`" class="grow text-zinc-500 font-medium">{{ props.item }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  item: String,
  color: String,
  width: String,
  padding: String,
  border: String,
})

</script>