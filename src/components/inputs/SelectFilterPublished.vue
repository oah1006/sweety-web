<template>
  <div>
    <p>{{ props.label }}</p>
    <select name="filterPublished" v-model="filterPublished" class="form-select mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
      <option value="">Tất cả</option>
      <option v-for="option in props.selectOptionPublished" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup>

import { computed, watch } from "vue";

const props = defineProps({
  selectOptionPublished: Array,
  label: String,
  modalFilterPublished: String,
  isLoadingListTable: Boolean
})

const emits = defineEmits(['update:modalFilterPublished', 'filter-data'])

const filterPublished = computed({
  get: () => props.modalFilterPublished,
  set: (value) => emits('update:modalFilterPublished', value)
})

function filterData() {
  emits('filter-data')
}

watch(filterPublished, () => {
  props.isLoadingListTable = true

  filterData()
})



</script>