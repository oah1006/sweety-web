<template>
  <Header />
  <div class="flex min-h-screen">
    <NavigationBar />
    <div>
      <p class="px-4 py-4">This is Dasboard</p>
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
