<script setup>
import ToastNotification from '@/components/ToastNotification.vue'
import LoadingPage from '@/components/loadings/LoadingPage.vue'


import { useRoute } from 'vue-router'
import { ref } from "vue";

const route = useRoute();
const isLoadingPage = ref(true)

if (route.name == "login") {
  isLoadingPage.value = false
} else {
  isLoadingPage.value = false
}

</script>

<template>
  <ToastNotification />
  <LoadingPage v-if="isLoadingPage" />
  <RouterView v-else />
</template>

<style>

</style>