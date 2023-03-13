<template>
  <div class="min-h-screen">
    <Header />
    <div class="flex">
      <NavigationBar />
      <div>
        <p class="px-12 py-4 text-4xl text-orange-400 font-medium">Bảng điều kiển</p>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import NavigationBar from '../../components/home/NavigationBar.vue'
import Header from '../../components/home/Header.vue'

</script>
