<template>
  <IndexLayout>
    <template #list-table>
      <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                       v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="orders"
                       :name-page="namePage"
      >
        <template #title>
          <TitlePage title="Đơn hàng" subTitle="Chào mừng bạn đến với trang các đơn hàng của cửa hàng!">
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
              <ListTableColumn text="NHÂN VIÊN BÁN HÀNG" />
              <ListTableColumn text="NHÂN VIÊN GIAO HÀNG" />
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
              <ListTableColumnLink :id="item.sale_staff?.id" :text="item.sale_staff?.full_name" />
              <ListTableColumnLink :id="item.delivery_staff?.id" :text="item.delivery_staff?.full_name" />
              <ListTableColumn :text="item.address.name" />
              <ListTableColumn :text="item.sub_total" />
              <ListTableColumn :text="item.total" />
              <ListTableColumnStatusOrder :status="item.status" />
              <ListTableColumnFunctionOrder @click-redirect-update="useClickRedirectUpdate" @click-redirect-detail="useClickRedirectDetail"
                                       :item-id="item.id" />
            </template>
          </ListTableRow>
        </template>
      </ListTableLayout>
      <LoadingPage v-else />
    </template>

  </IndexLayout>
</template>

<script setup>

import IndexLayout from "@/components/layouts/IndexLayout.vue";
import ListTableLayout from "@/components/layouts/ListTableLayout.vue"
import TitlePage from "@/components/TitlePage.vue";
import ListTableRow from "@/components/table/ListTableRow.vue";
import FilterLayout from "@/components/layouts/FilterLayout.vue";
import InputSearch from "@/components/inputs/InputSearch.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import ListTableColumnStatusOrder from "@/components/table/ListTableColumnStatusOrder.vue";
import ListTableColumnLink from "@/components/table/ListTableColumnLink.vue";
import ListTableColumnFunctionOrder from "@/components/table/ListTableColumnFunctionOrder.vue";

import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";

import { useIndexProductApi } from "@/repositories/product";
import {useIndexOrderApi} from "@/repositories/order";




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

    useIndexProductApi(page.value, search.value)
        .then((response) => {
          products.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-order',
    params: {
      id: id
    }
  })
}



</script>