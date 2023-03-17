<template>
  <div class="px-10 py-4 flex flex-col justify-center items-center ">
    <img :src="props.url" class="w-20 h-20 object-cover rounded-full text-center"/>
    <p class="text-zinc-500 font-bold mt-3">{{ props.item }}</p>
    <BoxItemRole class="mt-3" :item="props.role"/>
  </div>
</template>

<script setup>

import BoxItemRole from "@/components/details/BoxItemRole.vue";

const props = defineProps({
  nameLabel: String,
  item: String,
  url: String,
  role: String
})

console.log(props.url)

</script>