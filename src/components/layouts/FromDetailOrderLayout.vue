<template>
  <div class="grow lg:px-10 lg:py-6">
    <div class="flex items-center">
      <slot name="title"></slot>
      <div class="flex gap-3 ml-auto">
        <button @click="useClickRedirectUpdate(props.itemId)" class="text-xl bg-orange-500 text-white py-3 px-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <a method="post" class="flex items-center text-xl bg-white py-3 px-3 rounded-lg text-red-500">
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </a>
      </div>
    </div>

    <div class="flex gap-4 items-start  ">
      <slot class="flex-none" name="list-product"></slot>
      <div class="flex-none w-1/3 my-6 flex flex-col justify-between">
        <div>
          <slot name="order-summary"></slot>
        </div>
        <div class="bg-white w-full rounded-lg shadow-md mt-2">
          <slot name="address"></slot>
        </div>
      </div>
    </div>

    <div class="bg-white w-full mt-5 rounded-lg shadow-md w-2/3">
      <slot name="information-order"></slot>
    </div>


    <div>
      <slot name="list-address"></slot>
    </div>

    <button @click="redirectIndex" class="font-medium text-lg inline-flex mt-3 items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
      {{ props.listName }}
    </button>
  </div>
</template>

<script setup>

const props = defineProps({
  itemId: Number,
  listName: String,
})

const emits = defineEmits(['use-click-index', 'use-click-update'])

function redirectIndex() {
  emits('use-click-index')
}

function useClickRedirectUpdate(id) {
  emits('use-click-update', id)
}

</script>