<template>
  <form>
    <slot name="title"></slot>
    <div>
      <slot name="title-box-avatar"></slot>
      <slot name="avatar"></slot>
    </div>
    <div class="bg-white w-full mt-5 rounded-lg shadow-md">
      <slot name="title-box-input"></slot>
      <slot name="box-input"></slot>
      <slot name="select"></slot>
    </div>
    <div class="bg-white w-full mt-5 rounded-lg shadow-md">
      <slot name="title-box-input-address"></slot>
      <slot name="box-input-address"></slot>
    </div>
    <div class="my-6 shadow-md rounded-md bg-white py-6">
      <slot name="title-variant"></slot>
      <table class="w-full bg-white rounded-lg border-t">
        <thead class="uppercase">
          <slot name="list-table-row-head"></slot>
        </thead>
        <tbody>
          <slot name="list-table-row-body"></slot>
        </tbody>
      </table>
        <slot name="button-add-element"></slot>
    </div>
    <div class="flex my-8">
      <div class="flex items-center gap-3">
        <a type="button" @click="redirect" class="cursor-pointer font-medium text-lg inline-flex items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          {{ props.listName }}
        </a>
      </div>
      <div class="ml-auto">
        <button class="flex items-center gap-2 py-2 px-4 hover:bg-orange-400 bg-orange-500 rounded-lg text-white font-medium text-lg">
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

const emits = defineEmits(['click-redirect'])

function redirect() {
  emits('click-redirect')
}

</script>