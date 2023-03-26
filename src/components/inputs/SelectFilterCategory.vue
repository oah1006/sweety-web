<template>
  <p>{{ props.label }}</p>
  <select name="filterRole" v-model="filterCategory" class="form-select mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
    <option value="">Tất cả</option>
    <option v-for="option in props.category" :value="option.id">{{ option.name }}</option>
  </select>
</template>

<script setup>

import {computed, watch} from "vue";

const props = defineProps({
  category: Object,
  label: String,
  modalFilterCategory: String,
  isLoadingListTable: Boolean
})

const emits = defineEmits(['update:modalFilterCategory', 'filter-data'])

const filterCategory = computed({
  get: () => props.modalFilterCategory,
  set: (value) => emits('update:modalFilterCategory', value)
})

function filterData() {
  emits('filter-data')
}

watch(filterCategory, () => {
  props.isLoadingListTable = true

  filterData()
})



</script>