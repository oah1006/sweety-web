<template>
  <td class="lg:px-4 py-4 underline text-cyan-500">
    <router-link
        :to="{
        name: 'detail-staff',
        params: {
          id: props.id
        }
    }">
      {{ props.text }}
    </router-link>
  </td>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  id: String
})

</script>