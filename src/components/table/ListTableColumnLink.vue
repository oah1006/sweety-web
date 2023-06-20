<template>
  <td v-if="props.id != null" class="lg:px-4 py-4 text-cyan-500">
    <router-link :to="{
      name: props.location,
      params: {
        id: props.id
      }
    }">
      {{ props.text }}
    </router-link>
  </td>
  <td v-else class="lg:px-4 py-4 underline text-cyan-500">
    <p>
      {{ props.text }}
    </p>
  </td>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  id: {
    type: Number,
    default: () => null
  },
  location: {
    type: String,
    default: () => ''
  }
})

</script>