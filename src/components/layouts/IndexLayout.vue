<template>
  <div class="min-h-screen bg-zinc-50">
    <Header />
    <div class="flex h-full">
      <NavigationBar />
      <slot name="list-table"></slot>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import Header from '@/components/Header.vue'

</script>