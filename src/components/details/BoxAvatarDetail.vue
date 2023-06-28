<template>
  <div class="mt-8 flex flex-col items-center justify-center px-10 py-4">
    <img v-if="props.url" :src="urlApi + props.url" class="w-32 h-32 object-cover rounded-full text-center"/>
    <img v-else src="../../images/no-avatar.jpg" class="w-32 h-32 object-cover rounded-full text-center"/>
    <p class="text-zinc-500 font-bold mt-3 text-lg">{{ props.item }}</p>
    <BoxItemRole class="mt-2" :role="props.role"/>
  </div>
</template>

<script setup>

import BoxItemRole from "@/components/details/BoxItemRole.vue";

const urlApi = process.env.VUE_APP_ENV_URL

const props = defineProps({
  nameLabel: String,
  item: String,
  url: String,
  role: String
})

</script>