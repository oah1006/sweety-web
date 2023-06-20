<template>
  <div class="min-h-screen bg-zinc-50 ">
    <Header />
    <div class="flex h-full z-50">
      <NavigationBar />
      <div class="lg:ml-64 px-4 lg:px-12 grow mt-28">
        <slot name="list-table"></slot>
      </div>
    </div>

    <slot name="modal-delete"></slot>
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import NavigationBar from "@/components/home/NavigationBar.vue";
import {useNavigationBarStore} from "@/stores/navigationBar";

const navigationBarStore = useNavigationBarStore();


</script>