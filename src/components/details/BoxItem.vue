<template>
  <div class="flex py-4 border-b border-solid border-gray-100 px-10">
    <p class="w-1/6 break-words flex-none">{{ props.nameLabel }}</p>
    <p class="grow text-zinc-500 font-medium break-words">{{ props.item }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  nameLabel: String,
  item: String
})

</script>