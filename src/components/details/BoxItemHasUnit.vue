<template>
  <div :class="`${props.padding} ${props.border}`" class="flex">
    <p :class="`${props.width}`" class="break-words flex-none">{{ props.nameLabel }}</p>
    <div>
      <p class="grow text-zinc-500 font-medium">{{ props.item }} {{ props.unit }}</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  item: String,
  color: String,
  unit: String,
  width: String,
  padding: String,
  border: String,
})

</script>