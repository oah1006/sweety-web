<template>
  <IndexLayout>
    <template #list-table>
      <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                       v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="orders"
                       :name-page="namePage"
      >
        <template #title>
          <TitlePage title="Đơn hàng" subTitle="Chào mừng bạn đến với trang các đơn hàng của cửa hàng!">
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
            </template>
          </FilterLayout>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text="MÃ HÓA ĐƠN" />
              <ListTableColumn text="ĐỊA CHỈ GIAO HÀNG" />
              <ListTableColumn text="NHÂN VIÊN" />
              <ListTableColumn text="KHÁCH HÀNG" />
              <ListTableColumn text="TẠM TÍNH"/>
              <ListTableColumn text="TỔNG TIỀN"/>
              <ListTableColumn text="TRẠNG THÁI"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in orders" :key="item.id">
            <template #table-column>
              <ListTableColumn class="text-orange-500" :text="item.code" />
              <ListTableColumn :text="item.delivery_address?.address" />
              <ListTableColumn :text="item.staff.full_name" />
              <ListTableColumn :text="item.delivery_address.name" />
              <ListTableColumn :text="item.sub_total" />
              <ListTableColumn :text="item.total" />
            </template>
          </ListTableRow>
        </template>
      </ListTableLayout>
      <LoadingPage v-else />
    </template>
    <!--    <template #modal-delete>-->
    <!--      <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteCustomer" :itemId="idProduct" />-->
    <!--    </template>-->
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
import { useIndexProductApi } from "@/repositories/product";
import ListTableColumnPublished from "@/components/table/ListTableColumnPublished.vue";
import {useIndexStaff} from "@/repositories/staff";
import {useIndexCategoryApi} from "@/repositories/category";
import SelectCategory from "@/components/inputs/SelectFilterCategory.vue";
import SelectFilterPublished from "@/components/inputs/SelectFilterPublished.vue";
import SelectFilterCategory from "@/components/inputs/SelectFilterCategory.vue";
import {useIndexOrderApi} from "@/repositories/order";

const isModal = ref(false)
const idOrder = ref(null)

const router = useRouter()

const orders = ref({})

const namePage = "Hóa Đơn"

const search = ref('')


const page = ref(1);

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const pagination = ref({
  total: null,
  lastPage: null
});

const selectOptionStatus = ref([
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
    useIndexOrderApi(page.value)
        .then((response) => {
          console.log(response.data.data)

          pagination.value.lastPage = response.data.data.last_page
          pagination.value.total = response.data.data.total

          orders.value = response.data.data.data

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

// function showModal(id) {
//   isModal.value = true
//   idProduct.value = id
// }

// function useDeleteCustomer(id) {
//   useDeleteStoreApi(id)
//       .then((response) => {
//         useToastStore().success('Xóa thành công', 3000)
//         getData()
//       })
// }



</script>