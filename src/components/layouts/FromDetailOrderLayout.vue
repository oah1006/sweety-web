<template>
  <div class="grow lg:px-10 lg:py-6">
    <div class="flex items-center justify-between">
      <slot name="title"></slot>
      <slot name="button-status"></slot>
    </div>

    <div class="flex flex-col xl:flex-row lg:gap-4">
      <slot name="list-product" class="lg:w-3/4"></slot>
      <div class="lg:w-1/4 grow">
        <div>
          <slot name="order-summary"></slot>
        </div>
      </div>
    </div>

    <div class="bg-white w-full rounded-lg shadow-md mt-2">
      <slot name="address"></slot>
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

import ButtonStatusAcceptedOrder from "@/components/Button/ButtonStatusAcceptedOrder.vue";

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