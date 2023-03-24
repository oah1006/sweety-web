<template>
  <td class="lg:px-4 py-4">
    <a @click="useClickRedirectDetail(props.idStore)" class="cursor-pointer hover:text-sky-500 hover:underline">
      {{ props.nameStore }}
    </a>
  </td>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

const props = defineProps({
  nameStore: String,
  idStore: String,
})

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-store',
    params: {
      id: id
    }
  })
}

</script>