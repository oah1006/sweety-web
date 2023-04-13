<template>
  <IndexLayout>
    <template #list-table>
      <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                       v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="categories"
                       @click-redirect-create="useClickRedirectCreate" :name-page="namePage"
      >
        <template #title>
          <TitlePage title="Loại sản phẩm" subTitle="Chào mừng bạn đến với trang các loại sản phẩm của cửa hàng!">
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
              <ListTableColumn text="Tên loại" />
              <ListTableColumn text="Mô tả"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in categories" :key="item.id">
            <template #table-column>
              <ListTableColumn :text="item.name" />
              <ListTableColumn :text="item.description" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate"
                                       @click-redirect-detail="useClickRedirectDetail" :item-id="item.id"
                                       @show-modal="showModal"/>
            </template>
          </ListTableRow>
        </template>
      </ListTableLayout>
      <LoadingPage v-else />
    </template>
    <template #modal-delete>
      <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteCustomer" :itemId="idCategory" />
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
import ModalDelete from "@/components/ModalDelete.vue"
import FilterLayout from "@/components/layouts/FilterLayout.vue";
import InputSearch from "@/components/inputs/InputSearch.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";

import { useDeleteCategoryApi, useIndexCategoryApi } from "@/repositories/category";
import { onBeforeMount, ref } from "vue";
import { useToastStore } from "@/stores/toast";
import {useRouter} from "vue-router";

const router = useRouter()

const categories = ref({})

const namePage = "Loại sản phẩm"

const search = ref('')

const page = ref(1);

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const isModal = ref(false)
const idCategory = ref(null)

const pagination = ref({
  total: null,
  lastPage: null
});

const debounce = ref(0)


function getData() {
  setTimeout(() => {
    useIndexCategoryApi(page.value)
        .then((response) => {
          pagination.value.lastPage = response.data.data.last_page
          pagination.value.total = response.data.data.total

          categories.value = response.data.data.data

          isLoadingPage.value = false
          isLoadingListTable.value = false
        })
  }, 0)
}

onBeforeMount(() => {
  getData()
})

function useClickRedirectCreate() {
  router.push({ name: 'create-category' })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-category',
    params: {
      id: id
    }
  })
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-category',
    params: {
      id: id
    }
  })
}

function showModal(id) {
  isModal.value = true
  idCategory.value = id
}

function useDeleteCustomer(id) {
  useDeleteCategoryApi(id)
      .then((response) => {
        useToastStore().success('Xóa thành công', 3000)
        getData()
      })
}

function filterData() {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    isLoadingListTable.value = true

    useIndexCategoryApi(page.value, search.value)
        .then((response) => {
          categories.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}

</script>