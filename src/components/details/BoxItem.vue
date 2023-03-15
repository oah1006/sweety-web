<template>
  <div class="flex py-4 border-b border-solid border-gray-100 px-10">
    <p class="w-1/3">{{ props.nameLabel }}</p>
    <p class="grow text-zinc-500 font-medium">{{ props.item }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  item: String
})

</script>