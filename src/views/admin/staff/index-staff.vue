<template>
  <IndexLayout >
    <template #list-table>
      <ListTable v-if="!isLoadingPage" class="grow z-0" text="Nhân viên" :listName="staff" :total="pagination.total"
                 :last-page="pagination.lastPage" @click-redirect-create="useClickRedirectCreate"
                 v-model:modelValue="page" v-model:modelBoolean="isLoadingListTable" @get-data="getData">
        <template #title>
          <TitlePage title="Nhân viên" subTitle="Chào mừng bạn đến với trang nhân viên của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #box-filter>
          <FilterLayout grid="grid grid-cols-3 items-center gap-10">
            <template #filter>
              <InputSearch :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                           v-model:modalSearch="filters.search" label="Tìm kiếm theo từ khóa" />
              <SelectFilterRole :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                                v-model:modalFilterRole="filters.filterRole" label="Vai trò"
                                :selectOptionRole="selectOptionRole"/>
              <SelectFilterStatus :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                                  v-model:modalFilterStatus="filters.filterStatus" label="Trạng thái"
                                  :selectOptionStatus="selectOptionStatus" />
            </template>
          </FilterLayout>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
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
              <ListTableColumn class="text-orange-500" :text="item.code" />
              <ListTableColumn :text="item.full_name" />
              <ListTableColumn :text="item.user?.email" />
              <ListTableColumnLink :text="item.store?.store_name" :id="item.store?.id" location="detail-stores"/>
              <ListTableColumnBadge :role="item.role" />
              <ListTableColumnBoolean :isActive="item.is_active" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate"
                                       @click-redirect-detail="useClickRedirectDetail" @delete-item="deleteItem"
                                       @show-modal="showModal" :item-id="item.id" />
            </template>
          </ListTableRow>
        </template>
      </ListTable>
      <LoadingPage v-else />
    </template>
    <template #modal-delete>
      <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteStaff" :itemId="idStaff" />
    </template>
  </IndexLayout>
</template>

<script setup>
import ListTable from "@/components/layouts/ListTableLayout.vue"
import IndexLayout from "@/components/layouts/IndexLayout.vue"
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import TitlePage from "@/components/TitlePage.vue"
import Button from "@/components/Button/ButtonCreate.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue"
import ListTableRow from "@/components/table/ListTableRow.vue"
import ListTableColumnBoolean from "@/components/table/ListTableColumnBoolean.vue"
import ListTableColumnBadge from "@/components/table/ListTableColumnBadge.vue"
import ListTableColumnFunction from "@/components/table/ListTableColumnFunction.vue"
import ListTableColumnCheckbox from "@/components/table/ListTableColumnCheckbox.vue"
import ListTableColumnStore from "@/components/table/ListTableColumnStore.vue"
import ModalDelete from "@/components/ModalDelete.vue";
import FilterLayout from "@/components/layouts/FilterLayout.vue";


import {useIndexStaff, useDeleteStaffApi} from "@/repositories/staff"

import { ref, watch, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'
import { useToastStore } from "@/stores/toast";
import InputSearch from "@/components/inputs/InputSearch.vue";
import SelectFilterRole from "@/components/inputs/SelectFilterRole.vue";
import SelectFilterStatus from "@/components/inputs/SelectFilterStatus.vue";
import ListTableColumnLink from "@/components/table/ListTableColumnLink.vue";

const router = useRouter()

const staff = ref([])

const page = ref(1);

const isModal = ref(false)
const idStaff = ref(null)

const isNavigation = ref(false)

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const pagination = ref({
    total: null,
    lastPage: null
})

const filters = ref({
  filterStatus: '',
  filterRole: '',
  search: '',
})

const debounce = ref(0)

const selectOptionRole = ref([
  {
    value: "administrator",
    label: "Quản trị viên"
  },
  {
    value: "manager",
    label: "Quản lý"
  },
  {
    value: "employee",
    label: "Nhân viên"
  },
  {
    value: "shipper",
    label: "Shipper"
  },
])

const selectOptionStatus = ref([
  {
    value: "1",
    label: "Hoạt động"
  },
  {
    value: "0",
    label: "Không hoạt động"
  }
])

function showNavigation() {
  isNavigation.value = true
}

function getData() {
  setTimeout(() => {
    isLoadingListTable.value = true

    useIndexStaff(page.value)
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

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-staff',
    params: {
      id: id
    }
  })
}

function showModal(id) {
  isModal.value = true
  idStaff.value = id
}

function useDeleteStaff(id) {
  useDeleteStaffApi(id)
      .then((response) => {
        useToastStore().success('Xóa thành công', 3000)
        getData()
      })
}

function filterData() {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    isLoadingListTable.value = true

    useIndexStaff(page.value, filters.value.filterStatus, filters.value.filterRole, filters.value.search)
        .then((response) => {
          staff.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}


</script>
