<template>
  <div v-if="props.total > 0">
    <div class="mt-6 shadow-md rounded-md bg-white">
      <div class="py-4 px-4">
        <input type="checkbox" class="form-checkbox text-orange-500 border-zinc-300 rounded focus:ring-orange-400" />
      </div>
      <table class="w-full bg-white rounded-lg border-t">
        <thead class="uppercase rounded-lg bg-zinc-100">
          <slot name="header-table-column"></slot>
        </thead>
        <tbody>
        <template v-if="!isShowLoadingListTable">
          <tr v-for="item in props.listItem" :key="item.id" class="text-zinc-600 border-b text-sm">
            <td class="px-4 py-4">
              <input type="checkbox" class="form-checkbox text-orange-500 border-zinc-300 rounded focus:ring-orange-400" />
            </td>
            <td class="px-4 py-4 text-orange-400 font-bold">{{ item.code }}</td>
            <td class="px-4 py-4">{{ item.full_name }}</td>
            <td class="px-4 py-4">{{ item.user?.email }}</td>
            <td class="px-4 py-4">Sweety 1</td>
            <td class="px-4 py-4">
              <p v-if="item.is_admin === 1" class="inline-block text-center text-xs text-white px-2 py-0.5 bg-red-400 rounded-lg">Quản lý</p>
              <p v-else class="inline-block text-center text-xs text-white px-2 py-0.5 bg-blue-400 rounded-lg">Nhân viên</p>
            </td>
            <td class="px-4 py-4">
              <div v-if="item.is_active" class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div v-else class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </td>
            <td class="px-4 py-4 flex">
              <div class="flex gap-2 ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <button @click="useClickRedirectUpdateStaff(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <a class="cursor-pointer" @click="deleteItem(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </a>
              </div>
            </td>
          </tr>
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
import {computed, ref} from 'vue'
import Pagination from '@/components/table/Pagination.vue'
import NoData from '@/components/NoData.vue'
import TitlePage from "@/components/TitlePage.vue";
import Button from "@/components/Button.vue"
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

const emits = defineEmits(['delete-item', 'click-redirect-create', 'click-redirect-update-staff', 'get-data'])

function deleteItem(id) {
  emits('delete-item', id)
}

function useClickRedirectCreate() {
  emits('click-redirect-create')
}

function useClickRedirectUpdateStaff(id) {
  emits('click-redirect-update-staff', id)
}

function getData() {
  emits('get-data')
}

</script>