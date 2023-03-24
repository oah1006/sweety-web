<template>
  <p>{{ props.label }}</p>
  <select name="filterStatus" v-model="filterStatus" class="form-select mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
    <option value="">Tất cả</option>
    <option v-for="option in props.selectOptionStatus" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup>

import {computed, watch} from "vue";

const props = defineProps({
  selectOptionStatus: Array,
  label: String,
  modalFilterStatus: String
})

const emits = defineEmits(['update:modalFilterStatus'])

const filterStatus = computed({
  get: () => props.modalFilterStatus,
  set: (value) => emits('update:modalFilterStatus', value)
})

function filterData() {
  emits('filter-data')
}

watch(filterStatus, () => {
  props.isLoadingListTable = true
  filterData()
})

</script>