<template>
    <form>
      <slot name="title"></slot>
      <div class="bg-white w-full mt-5 rounded-lg shadow-md">
        <slot name="box-input"></slot>
      </div>
      <div class="flex mt-4">
        <div class="flex items-center gap-3">
          <router-link :to="{ name: 'index-customer' }" class="font-medium text-lg inline-flex items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {{ props.listName }}
          </router-link>
        </div>
        <div class="ml-auto">
          <button class="flex items-center gap-2 py-2 px-4 hover:bg-blue-400 bg-blue-500 rounded-lg text-white font-medium text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Xác nhận
          </button>
        </div>
      </div>
    </form>
</template>

<script setup>

const props = defineProps({
  listName: String
})

</script>