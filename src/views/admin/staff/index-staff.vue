<template>
  <IndexLayout>
    <template #title>
      <TitlePage title="Nhân viên" subTitle="Chào mừng bạn đến với trang nhân viên của cửa hàng!" :text-button="textButton"/>
    </template>
    <template #list-table>
      <ListTable v-if="!isLoadingPage" class="grow z-0" text="Nhân viên" :list-item="staff" :total="pagination.total" :last-page="pagination.lastPage"
                 v-model:modelValue="page" v-model:modelBoolean="isLoadingListTable"
                 @click-redirect-update-staff="useClickRedirectUpdateStaff" @click-redirect-create="useClickRedirectCreate"
                 @delete-item="deleteStaff" @get-data="getData"
      >
        <template #header-table-column>
          <HeaderTableColumn text="ID" />
        </template>
      </ListTable>

      <LoadingPage v-else />
    </template>
  </IndexLayout>
</template>

<script setup>
import ListTable from "@/components/layouts/ListTableLayout.vue"
import IndexLayout from "@/components/layouts/IndexLayout.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import TitlePage from "@/components/TitlePage.vue"
import HeaderTableColumn from "@/components/table/HeaderTableColumn.vue";


import { indexStaff, useDeleteStaffApi } from "../../../repositories/staff";

import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const textButton = 'Tạo mới'

const staff = ref([])

const page = ref(1);

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const pagination = ref({
    total: null,
    lastPage: null
});

function getData() {
  setTimeout(() => {
    indexStaff(page.value)
      .then((response) => {
        pagination.value.lastPage = response.data.data.last_page
        pagination.value.total = response.data.data.total

        staff.value = response.data.data.data

        isLoadingPage.value = false
        isLoadingListTable.value = false
      })
  }, 0)
}
function deleteStaff(id) {
  useDeleteStaffApi(id)
      .then((response) => {
        getData()
      })
}

onBeforeMount(() => {
  getData()
})


function useClickRedirectCreate() {
  router.push({ name: 'create-staff' })
}

function useClickRedirectUpdateStaff(id) {
  router.push({
    name: 'update-staff',
    params: {
      id: id
    }
  })
}
</script>
