<template>
  <IndexLayout>
    <template #list-table>
      <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                       v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="products"
                       :name-page="namePage"
      >
        <template #title>
          <TitlePage title="Sản phẩm" subTitle="Chào mừng bạn đến với trang các sản phẩm của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #box-filter>
          <FilterLayout grid="grid grid-cols-3 items-center gap-10">
            <template #filter>
              <InputSearch :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                           v-model:modalSearch="search" label="Tìm kiếm theo từ khóa" />
              <SelectFilterCategory :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                              v-model:modalFilterCategory="category_id" label="Danh mục sản phẩm"
                              :category="category"/>
              <SelectFilterPublished :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                                     v-model:modalFilterPublished="filterPublished" label="Trạng thái"
                                     :selectOptionPublished="selectOptionPublished"></SelectFilterPublished>
            </template>
          </FilterLayout>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text="TÊN SẢN PHẨM" />
              <ListTableColumn text="LOẠI SẢN PHẨM"/>
              <ListTableColumn text="SỐ LƯỢNG"/>
              <ListTableColumn text="GIÁ TIỀN"/>
              <ListTableColumn text="XUẤT BẢN"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in products" :key="item.id">
            <template #table-column>
              <ListTableColumn class="text-orange-500" :text="item.name" />
              <ListTableColumn :text="item.category?.name" />
              <ListTableColumn :text="item.stock"/>
              <ListTableColumn :text="formatPrice(item.price)" unit="đồng" />
              <ListTableColumnPublished :published="item.published" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate" @click-redirect-detail="useClickRedirectDetail"
                                       :item-id="item.id" @show-modal="showModal"/>
            </template>
          </ListTableRow>
        </template>
      </ListTableLayout>
      <LoadingPage v-else />
    </template>
    <template #modal-delete>
      <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteCustomer" :itemId="idProduct" />
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


import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import {useToastStore} from "@/stores/toast";
import {useDeleteProductApi, useIndexProductApi} from "@/repositories/product";
import ListTableColumnPublished from "@/components/table/ListTableColumnPublished.vue";
import {useIndexStaff} from "@/repositories/staff";
import {useIndexCategoryApi} from "@/repositories/category";
import SelectCategory from "@/components/inputs/SelectFilterCategory.vue";
import SelectFilterPublished from "@/components/inputs/SelectFilterPublished.vue";
import SelectFilterCategory from "@/components/inputs/SelectFilterCategory.vue";

const isModal = ref(false)
const idProduct = ref(null)

const router = useRouter()

const products = ref({})
const category = ref({})

const namePage = "Sản phẩm"

const search = ref('')
const category_id = ref('')
const filterPublished = ref('')

const page = ref(1);

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const pagination = ref({
  total: null,
  lastPage: null
});

const selectOptionPublished = ref([
  {
    value: "1",
    label: "Hiển thị"
  },
  {
    value: "0",
    label: "Ẩn"
  }
])

const debounce = ref(0)

function getData() {
  setTimeout(() => {
    useIndexProductApi(page.value)
        .then((response) => {
          pagination.value.lastPage = response.data.data.last_page
          pagination.value.total = response.data.data.total

          products.value = response.data.data.data

          isLoadingPage.value = false
          isLoadingListTable.value = false
        })
  }, 0)
}

onBeforeMount(() => {
  getData()
})

function filterData() {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    isLoadingListTable.value = true

    useIndexProductApi(page.value, category_id.value, filterPublished.value, search.value)
        .then((response) => {
          products.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}

function getCategory() {
  useIndexCategoryApi()
      .then((response) => {
        category.value = response.data.data.data
      })
}

getCategory()

function formatPrice(price) {
  return price.toLocaleString("vi-VN")
}

function useClickRedirectCreate() {
  router.push({ name: 'create-product' })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-product',
    params: {
      id: id
    }
  })
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-product',
    params: {
      id: id
    }
  })
}

function showModal(id) {
  isModal.value = true
  idProduct.value = id
}

function useDeleteCustomer(id) {
  useDeleteProductApi(id)
      .then((response) => {
        useToastStore().success('Xóa thành công', 3000)
        getData()
      })
}



</script>