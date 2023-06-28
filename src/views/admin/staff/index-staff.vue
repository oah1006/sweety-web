<template>
  <IndexLayout>
    <template #list-table>
      <ListTable v-if="!isLoadingPage" class="grow z-0" text="Nhân viên" :listName="staff" :total="pagination.total"
                 :last-page="pagination.lastPage" @click-redirect-create="useClickRedirectCreate"
                 v-model:modelValue="page" v-model:modelBoolean="isLoadingListTable" @get-data="getData">
        <template #title>
          <TitlePage title="Nhân viên" subTitle="Chào mừng bạn đến với trang nhân viên của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect-create="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #box-filter>
          <div class="border border-zinc-50 shadow bg-white mt-4 px-4 py-3 rounded-lg">
            <FilterLayout grid="grid lg:grid-cols-4 grid-cols-2 items-center gap-10">
              <template #filter>
                <InputSearch :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                             v-model:modalSearch="filters.search" label="Tìm kiếm theo từ khóa" />
                <SelectFilterRole :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                                  v-model:modalFilterRole="filters.filterRole" label="Vai trò"
                                  :selectOptionRole="selectOptionRole"/>
                <SelectFilterStatus :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                                    v-model:modalFilterStatus="filters.filterStatus" label="Trạng thái"
                                    :selectOptionStatus="selectOptionStatus" />
                <SelectFilterStaffWithStore :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                                            v-model:modalFilterStoreId="filters.filterStoreId" label="Chi nhánh"/>
              </template>
            </FilterLayout>
          </div>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn class="hidden lg:block" />
              <ListTableColumn text="Tên"/>
              <ListTableColumn class="hidden lg:block" text="CỬA HÀNG"/>
              <ListTableColumn text="VAI TRÒ"/>
              <ListTableColumn class="text-center" text="TRẠNG THÁI"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in staff" :key="item.id">
            <template #table-column>
              <ListTableColumnImage class="hidden lg:block" :url="item.attachment?.url"  />
              <ListTableColumn :text="item.full_name" class="text-lg text-orange-500" />
              <ListTableColumnLink class="hidden lg:block" :text="item.store?.store_name" :id="item.store?.id" location="detail-stores"/>
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
import ModalDelete from "@/components/ModalDelete.vue";
import FilterLayout from "@/components/layouts/FilterLayout.vue";


import {useIndexStaff, useDeleteStaffApi} from "@/repositories/staff"

import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'
import { useToastStore } from "@/stores/toast";
import InputSearch from "@/components/inputs/InputSearch.vue";
import SelectFilterRole from "@/components/inputs/SelectFilterRole.vue";
import SelectFilterStatus from "@/components/inputs/SelectFilterStatus.vue";
import ListTableColumnLink from "@/components/table/ListTableColumnLink.vue";
import ListTableColumnImage from "@/components/table/ListTableColumnImage.vue";
import ListTableColumnFilterWithStore from "@/components/inputs/SelectFilterStaffWithStore.vue";
import FilterStaffWithStore from "@/components/inputs/SelectFilterStaffWithStore.vue";
import SelectFilterStaffWithStore from "@/components/inputs/SelectFilterStaffWithStore.vue";

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
  filterStoreId: '',
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

    useIndexStaff(page.value, filters.value.filterStatus, filters.value.filterRole, filters.value.filterStoreId ,filters.value.search)
        .then((response) => {
          staff.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}

console.log(process.env.VUE_APP_ENV_URL)

</script>
