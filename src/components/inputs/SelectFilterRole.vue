<template>
  <p>{{ props.label }}</p>
  <select name="filterRole" v-model="filterRole" class="mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
    <option value="">Tất cả</option>
    <option v-for="option in props.selectOptionRole" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup>

import {computed, watch} from "vue";

const props = defineProps({
  selectOptionRole: Array,
  label: String,
  modalFilterRole: Array,
  isLoadingListTable: Boolean
})

const emits = defineEmits(['update:modalFilterRole', 'filter-data'])

const filterRole = computed({
  get: () => props.modalFilterRole,
  set: (value) => emits('update:modalFilterRole', value)
})

function filterData() {
  emits('filter-data')
}

watch(filterRole, () => {
  props.isLoadingListTable = true

  filterData()
})



</script>