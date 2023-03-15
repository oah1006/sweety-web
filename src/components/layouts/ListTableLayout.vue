<template>
  <div v-if="props.total > 0">
    <slot name="title"></slot>
    <div class="mt-6 shadow-md rounded-md bg-white">
      <div class="py-4 px-4">
        <input type="checkbox" class="form-checkbox text-orange-500 border-zinc-300 rounded focus:ring-orange-400" />
      </div>
      <table class="w-full bg-white rounded-lg border-t">
        <thead class="uppercase rounded-lg bg-zinc-100">
          <slot name="list-table-row-head"></slot>
        </thead>
        <tbody>
        <template v-if="!isShowLoadingListTable">
          <slot name="list-table-row-body"></slot>
        </template>
        <tr v-else>
          <td colspan="8">
            <LoadingTable />
          </td>
        </tr>
        </tbody>
      </table>
      <Pagination v-model:modelValue="page" v-model:modelBoolean="isShowLoadingListTable" :total="props.total"
                  :last-page="props.lastPage" @get-data="getData"/>
    </div>
  </div>

  <NoData v-else class="ml-64 grow z-0" @click-redirect="useClickRedirectCreate" text="nhân viên"/>
</template>

<script setup>
import { computed } from 'vue'

import Pagination from '@/components/table/Pagination.vue'
import NoData from '@/components/NoData.vue'
import LoadingTable from "@/components/loadings/LoadingTable.vue"

const props = defineProps({
  listItem: Object,
  total: Number,
  lastPage: Number,
  text: String,
  modelValue: Number,
  modelBoolean: Boolean
})

const page = computed({
  get: () => props.modelValue,

  set: (value) => emits('update:modelValue', value)
})

const isShowLoadingListTable = computed({
  get: () => props.modelBoolean,

  set: (value) => emits('update:modelBoolean', value)
})

const emits = defineEmits(['get-data', 'update:modelValue', 'update:modelBoolean'])

function getData() {
  emits('get-data')
}

</script>