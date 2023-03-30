<template>
  <div>
    <p>{{ props.label }}</p>
    <select name="category_id" v-model="category_id" class="form-select mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
      <option value="">Tất cả</option>
      <option v-for="option in props.category" :value="option.id" :key="option.id">{{ option.name }}</option>
    </select>
  </div>
</template>

<script setup>

import { computed, watch } from "vue";

const props = defineProps({
  category: Object,
  label: String,
  modalFilterCategory: String,
  isLoadingListTable: Boolean
})

const emits = defineEmits(['update:modalFilterCategory', 'filter-data'])

const category_id = computed({
  get: () => props.modalFilterCategory,
  set: (value) => emits('update:modalFilterCategory', value)
})

function filterData() {
  emits('filter-data')
}

watch(category_id, () => {
  props.isLoadingListTable = true

  filterData()
})



</script>