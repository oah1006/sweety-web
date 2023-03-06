<template>
    <div class="h-12 flex items-center justify-between px-4">
        <a class="text-zinc-400 cursor-pointer" @click="prePage">Trước</a>
        <div class="flex gap-2 items-center">
            <input type="text" class="form-input w-7 px-1 py-0 text-center" v-model="page" ref="input" />
            <p>/ {{ props.total }}</p>
        </div>
        <a class="text-zinc-400 cursor-pointer" @click="nextPage">Sau</a>
    </div>
</template>

<script setup>

import { ref, computed, watch} from 'vue'

const emits = defineEmits(['pre-page', 'next-page', 'update:modelValue', 'get-data'])

const props = defineProps({
    total: Number,
    modelValue: Number
})

const input = ref('');

const page = computed({
  get: () => props.modelValue,

  set: (value) => emits('update:modelValue', value)
})


watch(page, () => {
  const regex = /^[0-9]+$/;

  if (regex.test(page.value)) {
    emits('get-data')
  } else {
    input.value.value = 1
    page.value = 1
  }
})

function prePage() {
    emits('pre-page')
}

function nextPage() {
    emits('next-page')
}







</script>

