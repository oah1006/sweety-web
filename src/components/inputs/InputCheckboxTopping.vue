<template>
  <form class="w-full relative mt-2">
    <div :class="[checkNames.includes(props.idTopping) ? 'bg-orange-50' : '']" class="w-full text-orange-900 rounded-lg border border-orange-300 py-2 flex items-center gap-10 grow px-4">
      <input type="checkbox" :value="props.idTopping" v-model="checkNames" class="form-checkbox absolute top-0 left-0 opacity-0 !h-full rounded-full w-5 h-5 !w-full">
      <div class="flex items-center gap-2">
        <svg v-if="checkNames.includes(props.idTopping)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 bg-white text-orange-500 rounded-full">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        <p class="text-md text-center flex-none">{{ props.name }}</p>
      </div>
      <p class="text-right text-lg ml-auto flex-none">+ {{ props.price }} đồng</p>
    </div>
  </form>
</template>


<script setup>

import {computed, ref, watch} from "vue";

const props = defineProps({
  name: String,
  price: Number,
  modalTopping: Array,
  idTopping: String
})


const emits = defineEmits(['update:modalTopping'])

const checkNames = computed({
  get: () => props.modalTopping,

  set: (value) => emits('update:modalTopping', value)
})

watch(checkNames, () => {
  console.log(checkNames.value)
})

</script>