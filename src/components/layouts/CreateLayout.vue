<template>
  <div class="min-h-screen bg-zinc-50">
    <Header />
    <div class="flex h-full">
      <NavigationBar />
      <div class="lg:ml-64 lg:px-12 px-4 grow mt-28">
        <slot name="form-create"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/home/NavigationBar.vue'
import Header from '@/components/home/Header.vue'

</script>