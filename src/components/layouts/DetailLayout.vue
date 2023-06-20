<template>
  <div class="min-h-screen bg-zinc-50">
    <Header />
    <div class="flex h-full">
      <NavigationBar />
      <div class="lg:ml-64 px-12 grow mt-28">
        <slot name="form-detail"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/home/NavigationBar.vue'
import Header from '@/components/home/Header.vue'

</script>