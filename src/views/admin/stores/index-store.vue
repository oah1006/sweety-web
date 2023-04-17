<template>
  <IndexLayout>
    <template #list-table>
      <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                       v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="stores"
                       @click-redirect-create="useClickRedirectCreate" :name-page="namePage"
      >
        <template #title>
          <TitlePage title="Cửa hàng" subTitle="Chào mừng bạn đến với trang các chi nhánh của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #box-filter>
          <FilterLayout>
            <template #filter>
              <InputSearch :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                           v-model:modalSearch="search" label="Tìm kiếm theo từ khóa" />
            </template>
          </FilterLayout>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text="TÊN CỬA HÀNG" />
              <ListTableColumn text="GIỜ MỞ CỬA"/>
              <ListTableColumn text="GIỜ ĐÓNG CỬA"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in stores" :key="item.id">
            <template #table-column>
              <ListTableColumn class="text-orange-500" :text="item.store_name" />
              <ListTableColumn :text="item.open_store" />
              <ListTableColumn :text="item.close_store" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate" @click-redirect-detail="useClickRedirectDetail" :item-id="item.id"
                                       @show-modal="showModal" />
            </template>
          </ListTableRow>
        </template>
      </ListTableLayout>
      <LoadingPage v-else />
    </template>
    <template #modal-delete>
      <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteCustomer" :itemId="idStore" />
    </template>
  </IndexLayout>
</template>

<script setup>

import IndexLayout from "@/components/layouts/IndexLayout.vue";
import ListTableLayout from "@/components/layouts/ListTableLayout.vue"
import TitlePage from "@/components/TitlePage.vue";
import Button from "@/components/Button/ButtonCreate.vue"
import ListTableRow from "@/components/table/ListTableRow.vue";
import ListTableColumnFunction from "@/components/table/ListTableColumnFunction.vue";
import ListTableColumnCheckbox from "@/components/table/ListTableColumnCheckbox.vue";
import ModalDelete from "@/components/ModalDelete.vue"
import FilterLayout from "@/components/layouts/FilterLayout.vue";
import InputSearch from "@/components/inputs/InputSearch.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";


import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import {useDeleteStoreApi, useIndexStoreApi} from "@/repositories/store";
import {useToastStore} from "@/stores/toast";


const isModal = ref(false)
const idStore = ref(null)

const router = useRouter()

const stores = ref([])

const namePage = "Cửa hàng"

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
    useIndexStoreApi(page.value)
        .then((response) => {

          pagination.value.lastPage = response.data.data.last_page
          pagination.value.total = response.data.data.total

          stores.value = response.data.data.data

          isLoadingPage.value = false
          isLoadingListTable.value = false
        })
  }, 0)
}

onBeforeMount(() => {
  getData()
})

function useClickRedirectCreate() {
  router.push({ name: 'create-stores' })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-stores',
    params: {
      id: id
    }
  })
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-stores',
    params: {
      id: id
    }
  })
}

function showModal(id) {
  isModal.value = true
  idStore.value = id
}

function useDeleteCustomer(id) {
  useDeleteStoreApi(id)
      .then((response) => {
        useToastStore().success('Xóa thành công', 3000)
        getData()
      })
}

function filterData() {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    isLoadingListTable.value = true

    useIndexStoreApi(page.value, search.value)
        .then((response) => {
          stores.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}



</script>