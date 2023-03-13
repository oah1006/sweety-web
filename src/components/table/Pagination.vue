<template>
    <div class="h-12 flex items-center justify-between px-4">
        <a class="text-zinc-400 cursor-pointer" @click="prePage">Trước</a>
        <div class="flex gap-2 items-center">
            <input type="text" class="form-input w-7 px-1 py-0 text-center" v-model="page" ref="input" />
            <p>/ {{ props.lastPage }}</p>
        </div>
        <a class="text-zinc-400 cursor-pointer" @click="nextPage">Sau</a>
    </div>
</template>

<script setup>

import { ref, computed, watch} from 'vue'

const emits = defineEmits(['update:modelValue', 'get-data', 'update:modelBoolean'])

const props = defineProps({
  total: Number,
  modelValue: Number,
  modelBoolean: Boolean,
  lastPage: Number,
})

const input = ref('');

const page = computed({
  get: () => props.modelValue,

  set: (value) => emits('update:modelValue', value)
})

const isShowLoadingListTable = computed({
  get: () => props.modelBoolean,

  set: (value) => emits('update:modelBoolean', value)
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
  if (page.value === 1) {
    return
  } else {
    page.value--
    isShowLoadingListTable.value = true
  }
}

function nextPage() {
  if (page.value === props.lastPage) {
    return
  } else {
    page.value++
    isShowLoadingListTable.value = true
  }
}

</script>

