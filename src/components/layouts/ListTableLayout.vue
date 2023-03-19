<template>
  <div v-if="props.total > 0">
    <slot name="title"></slot>
    <slot name="box-filter"></slot>
    <div class="mt-6 shadow-md rounded-md bg-white">
      <div class="py-4 px-4">
        <input type="checkbox" class="form-checkbox text-orange-500 border-zinc-300 rounded focus:ring-orange-400" />
      </div>
      <table class="w-full bg-white rounded-lg border-t">
        <thead class="uppercase rounded-lg bg-zinc-100">
          <slot name="list-table-row-head"></slot>
        </thead>
        <tbody>
        <template v-if="!isShowLoadingListTable && props.listName.length > 0">
          <slot name="list-table-row-body"></slot>
        </template>
        <tr v-else-if="isShowLoadingListTable">
          <td colspan="8">
            <LoadingTable />
          </td>
        </tr>
        <tr v-else-if="!isShowLoadingListTable && props.listName.length == 0">
          <td colspan="8">
            <NoDataListTable namePage="lọc theo ý bạn" />
          </td>
        </tr>
        </tbody>
      </table>
      <Pagination v-model:modelValue="page" v-model:modelBoolean="isShowLoadingListTable" :total="props.total"
                  :last-page="props.lastPage" @get-data="getData"/>
    </div>
  </div>

  <NoDataTable v-else class="ml-64 grow z-0" namePage="Nhân viên" @click-redirect-create="useClickRedirectCreate">
  </NoDataTable>
</template>

<script setup>
import { computed } from 'vue'

import Pagination from '@/components/table/Pagination.vue'
import NoDataTable from '@/components/nodata/NoDataTable.vue'
import LoadingTable from "@/components/loadings/LoadingTable.vue"
import Button from "@/components/Button.vue"
import NoDataListTable from "@/components/nodata/NoDataListTable.vue";

const props = defineProps({
  listItem: Object,
  total: Number,
  lastPage: Number,
  text: String,
  modelValue: Number,
  modelBoolean: Boolean,
  namePage: String,
  listName: Object
})

const page = computed({
  get: () => props.modelValue,

  set: (value) => emits('update:modelValue', value)
})

const isShowLoadingListTable = computed({
  get: () => props.modelBoolean,

  set: (value) => emits('update:modelBoolean', value)
})

const emits = defineEmits(['get-data', 'click-redirect-create', 'update:modelValue', 'update:modelBoolean'])

function getData() {
  emits('get-data')
}

function useClickRedirectCreate() {
  emits('click-redirect-create')
}

</script>