<template>
  <div :class="`${props.padding} ${props.border}`" class="flex">
    <p :class="`${props.width}`" class="break-words flex-none">{{ props.nameLabel }}</p>
    <div>
      <router-link
          class="underline text-cyan-500"
          :to="{
        name: 'detail-stores',
        params: {
          id: props.id
        }
    }">
        {{ props.item }}
      </router-link>
    </div>
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
  id: String,
})

</script>