<template>
  <div class="bg-white w-1/3 rounded-lg shadow-md mt-8 flex flex-col items-center justify-center px-10 py-4">
    <img :src="props.url" class="w-32 h-32 object-cover rounded-full text-center"/>
    <p class="text-zinc-500 font-bold mt-3 text-lg">{{ props.item }}</p>
    <BoxItemRole class="mt-2" :item="props.role"/>
  </div>
</template>

<script setup>

import BoxItemRole from "@/components/details/BoxItemRole.vue";

const props = defineProps({
  nameLabel: String,
  item: String,
  url: String,
  role: Number
})


</script>