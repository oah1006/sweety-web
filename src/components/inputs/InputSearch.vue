<template>
 <div>
   <p>{{ props.label }}</p>
   <input v-model="search" type="text" placeholder="Tra cứu ..."
          class="form-input w-full block mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900" />
 </div>
</template>

<script setup>

import {computed, watch} from "vue";

const props = defineProps({
  label: String,
  modalSearch: String,
  isLoadingListTable: Boolean
})

const emits = defineEmits(['update:modalSearch', 'filter-data'])

const search = computed({
  get: () => props.modalSearch,

  set: (value) => emits('update:modalSearch', value)
})

function filterData() {
  emits('filter-data')
}

watch(search, () => {
  props.isLoadingListTable = true

  filterData()
})

</script>