<template>
  <div class="min-h-screen bg-zinc-50">
    <Header @show-navigation="showNavigation" />
    <div class="flex h-full">
      <NavigationBar @isNavigation="isNavigation" />
      <div class="ml-64 px-12 grow mt-28">
        <slot name="list-table"></slot>
      </div>
    </div>
    <slot name="modal-delete"></slot>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/home/NavigationBar.vue'
import Header from '@/components/home/Header.vue'

const props = defineProps({
  isNavigation: Boolean
})

const emits = defineEmits(['show-navigation'])

function showNavigation() {
  emits('show-navigation')
}

</script>