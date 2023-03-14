<template>
  <IndexLayout>
    <template #list-table>
      <ListTable v-if="!isLoadingPage" class="grow z-0" text="Nhân viên" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                 v-model:modelBoolean="isLoadingListTable" @get-data="getData"
      >
        <template #title>
          <TitlePage title="Nhân viên" subTitle="Chào mừng bạn đến với trang nhân viên của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect-create="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text=""/>
              <ListTableColumn text="MÃ NHÂN VIÊN" />
              <ListTableColumn text="Tên"/>
              <ListTableColumn text="EMAIL"/>
              <ListTableColumn text="CỬA HÀNG"/>
              <ListTableColumn text="VAI TRÒ"/>
              <ListTableColumn class="text-center" text="TRẠNG THÁI"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in staff" :key="item.id">
            <template #table-column>
              <ListTableColumnCheckbox />
              <ListTableColumn :text="item.id" />
              <ListTableColumn :text="item.full_name" />
              <ListTableColumn :text="item.user?.email" />
              <ListTableColumn text="Cửa hàng" />
              <ListTableColumnBadge :is-admin="item.is_admin" />
              <ListTableColumnBoolean :is-active="item.is_active" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate" @delete-item="deleteItem" :item-id="item.id" />
            </template>
          </ListTableRow>
        </template>
      </ListTable>
      <LoadingPage v-else />
    </template>
  </IndexLayout>
</template>

<script setup>
import ListTable from "@/components/layouts/ListTableLayout.vue"
import IndexLayout from "@/components/layouts/IndexLayout.vue"
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import TitlePage from "@/components/TitlePage.vue"
import Button from "@/components/Button.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue"
import ListTableRow from "@/components/table/ListTableRow.vue"
import ListTableColumnBoolean from "@/components/table/ListTableColumnBoolean.vue"
import ListTableColumnBadge from "@/components/table/ListTableColumnBadge.vue"
import ListTableColumnFunction from "@/components/table/ListTableColumnFunction.vue"
import ListTableColumnCheckbox from "@/components/table/ListTableColumnCheckbox.vue"

import { indexStaff, useDeleteStaffApi } from "@/repositories/staff"

import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

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
function deleteItem(id) {
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

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-staff',
    params: {
      id: id
    }
  })
}
</script>
