<template>
  <IndexLayout>
    <template #list-table>
      <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                 v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="customers"
                 @click-redirect-create="useClickRedirectCreate" :name-page="namePage"
      >
        <template #title>
          <TitlePage title="Khách hàng" subTitle="Chào mừng bạn đến với trang khách hàng của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #box-filter>
          <FilterLayout>
            <template #input-search>
              <InputSearch :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                           v-model:modalSearch="search" label="Tìm kiếm theo từ khóa" />
            </template>
          </FilterLayout>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text="MÃ KHÁCH HÀNG" />
              <ListTableColumn text="Tên"/>
              <ListTableColumn text="EMAIL"/>
              <ListTableColumn text="ĐỊA CHỈ"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in customers" :key="item.id">
            <template #table-column>
              <ListTableColumn class="text-orange-500" :text="item.code" />
              <ListTableColumn :text="item.full_name" />
              <ListTableColumn :text="item.user?.email" />
              <ListTableColumn :text="item.user?.address" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate" @click-redirect-detail="useClickRedirectDetail" :item-id="item.id"
                                       @show-modal="showModal" />
            </template>
          </ListTableRow>
        </template>
      </ListTableLayout>
      <LoadingPage v-else />
    </template>
    <template #modal-delete>
      <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteCustomer" :itemId="idCustomer" />
    </template>
  </IndexLayout>

</template>

<script setup>
import ListTableLayout from "@/components/layouts/ListTableLayout.vue"
import IndexLayout from "@/components/layouts/IndexLayout.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import TitlePage from "@/components/TitlePage.vue"
import Button from "@/components/Button/ButtonCreate.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import ListTableRow from "@/components/table/ListTableRow.vue";
import ListTableColumnFunction from "@/components/table/ListTableColumnFunction.vue";
import ListTableColumnCheckbox from "@/components/table/ListTableColumnCheckbox.vue";
import ModalDelete from "@/components/ModalDelete.vue"
import FilterLayout from "@/components/layouts/FilterLayout.vue";
import InputSearch from "@/components/inputs/InputSearch.vue";

import {useDeleteCustomerApi, useIndexCustomerApi} from "@/repositories/customer";

import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'
import { useToastStore } from "@/stores/toast";



const isModal = ref(false)
const idCustomer = ref(null)

const router = useRouter()

const customers = ref([])

const namePage = "Khách hàng"

const search = ref('')

const page = ref(1);

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const pagination = ref({
  total: null,
  lastPage: null
});

const debounce = ref(0)

function getData() {
  setTimeout(() => {
    useIndexCustomerApi(page.value)
        .then((response) => {
          pagination.value.lastPage = response.data.data.last_page
          pagination.value.total = response.data.data.total

          customers.value = response.data.data.data

          isLoadingPage.value = false
          isLoadingListTable.value = false
        })
  }, 0)
}

onBeforeMount(() => {
  getData()
})

function useClickRedirectCreate() {
  router.push({ name: 'create-customer' })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-customer',
    params: {
      id: id
    }
  })
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-customer',
    params: {
      id: id
    }
  })
}

function showModal(id) {
  isModal.value = true
  idCustomer.value = id
}

function useDeleteCustomer(id) {
  useDeleteCustomerApi(id)
      .then((response) => {
        useToastStore().success('Xóa thành công', 3000)
        getData()
      })
}
function filterData() {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    isLoadingListTable.value = true

    useIndexCustomerApi(page.value, search.value)
        .then((response) => {
          customers.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}


</script>
