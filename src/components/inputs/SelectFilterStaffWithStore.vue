<template>
  <div>
    <p>{{ props.label }}</p>
    <select name="filterRole" v-model="filterStoreId" class="form-select mt-2 border border-zinc-300 w-full py-2 rounded-2xl pl-4 text-slate-900">
      <option value="">Tất cả</option>
      <option v-for="store in stores" :value="store.id">{{ store.store_name }}</option>
    </select>
  </div>
</template>

<script setup>

import {computed, ref, watch} from "vue";
import {useIndexStoreApi} from "@/repositories/store";

const props = defineProps({
  label: String,
  modalFilterStoreId: String,
  isLoadingListTable: Boolean
})

const emits = defineEmits(['update:modalFilterStoreId', 'filter-data'])

const filterStoreId = computed({
  get: () => props.modalFilterStoreId,
  set: (value) => emits('update:modalFilterStoreId', value)
})

function filterData() {
  emits('filter-data')
}

watch(filterStoreId, () => {
  props.isLoadingListTable = true

  filterData()
})

const stores = ref([])

function getStores() {
  useIndexStoreApi()
      .then((response) => {
        stores.value = response.data.data.data
      })
}

getStores()



</script>