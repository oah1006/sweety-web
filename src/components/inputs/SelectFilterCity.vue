<template>
  <select :class="`${props.absolute}`" name="category_id" v-model="city"
          class="form-select left-7 top-8 mt-2 border border-zinc-300 w-1/4 py-2 rounded-2xl pl-4 text-slate-900">
    <option v-for="option in props.city" :value="option.id" :key="option.id">{{ option.full_name }}</option>
  </select>
</template>

<script setup>

import { computed, watch } from "vue";

const props = defineProps({
  modalFilterCity: String,
  isLoadingListTable: Boolean,
  city: Object,
  absolute: String,
})

const emits = defineEmits(['update:modalFilterCity', 'filter-data'])

const city = computed({
  get: () => props.modalFilterCity,
  set: (value) => emits('update:modalFilterCity', value)
})

function filterData() {
  emits('filter-data')
}

watch(city, () => {
  filterData()
})


</script>