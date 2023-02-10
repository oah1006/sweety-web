<template>
  <Header />
  <div class="flex min-h-screen">
    <NavigationBar />
    <div>
      <p class="px-12 py-4 text-4xl text-orange-400 font-medium">Bảng điều kiển</p>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import NavigationBar from '../../components/NavigationBar.vue'

export default {
  components: {
    NavigationBar,
    Header
  }
}
</script>
