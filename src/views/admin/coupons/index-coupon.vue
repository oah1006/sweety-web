<template>
  <IndexLayout>
    <template #list-table>
      <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                       v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="coupons"
                       @click-redirect-create="useClickRedirectCreate" :name-page="namePage"
      >
        <template #title>
          <TitlePage title="Mã khuyến mãi" subTitle="Chào mừng bạn đến với trang mã khuyến mãi của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #box-filter>
          <FilterLayout grid="grid grid-cols-2 items-center gap-10">
            <template #filter>
              <InputSearch :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                           v-model:modalSearch="search" label="Tìm kiếm theo từ khóa" />
              <SelectFilterStatus :isLoadingListTable="isLoadingListTable" @filter-data="filterData"
                                  v-model:modalFilterStatus="filterStatus" label="Trạng thái"
                                  :selectOptionStatus="selectOptionStatus" />
            </template>
          </FilterLayout>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text="CODE"/>
              <ListTableColumn text="TÊN MÃ KHUYẾN MÃI" />
              <ListTableColumn text="SỐ LƯỢNG"/>
              <ListTableColumn text="GIÁ TRỊ MÃ GIẢM"/>
              <ListTableColumn text="TỔNG HÓA ĐƠN CẦN ĐẠT"/>
              <ListTableColumn text="BẮT ĐẦU"/>
              <ListTableColumn text="HẾT HẠN"/>
              <ListTableColumn text="TRẠNG THÁI"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in coupons" :key="item.id">
            <template #table-column>
              <ListTableColumn class="text-orange-500" :text="item.code" />
              <ListTableColumn :text="item.name" />
              <ListTableColumn :text="item.stock" />
              <ListTableColumn :text="item.is_percent_value" />
              <ListTableColumn :text="item.min_order_total" />
              <ListTableColumn :text="item.started_at" />
              <ListTableColumn :text="item.expired_at" />
              <ListTableColumnStatusCoupon :status="item.status" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate" @click-redirect-detail="useClickRedirectDetail" :item-id="item.id"
                                       @show-modal="showModal" />
            </template>
          </ListTableRow>
        </template>
      </ListTableLayout>
      <LoadingPage v-else />
    </template>
    <template #modal-delete>
      <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteCustomer" :itemId="idCoupon" />
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
import {useIndexCouponApi} from "@/repositories/coupon";
import ListTableColumnStatusCoupon from "@/components/table/ListTableColumnStatusCoupon.vue";
import SelectFilterStatus from "@/components/inputs/SelectFilterStatus.vue";

const isModal = ref(false)
const idCoupon = ref(null)

const router = useRouter()

const coupons = ref([])

const namePage = "Mã khuyến mãi"

const search = ref('')
const filterStatus = ref('')

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
    useIndexCouponApi(page.value)
        .then((response) => {
          pagination.value.lastPage = response.data.data.last_page
          pagination.value.total = response.data.data.total

          coupons.value = response.data.data.data

          isLoadingPage.value = false
          isLoadingListTable.value = false
        })
  }, 0)
}

onBeforeMount(() => {
  getData()
})

const selectOptionStatus = ref([
  {
    value: "active",
    label: "Còn hạn sử dụng"
  },
  {
    value: "expired",
    label: "Hết hạn"
  },
  {
    value: "deactivate",
    label: "Hủy kích hoạt"
  }
])

function useClickRedirectCreate() {
  router.push({ name: 'create-coupon' })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-coupon',
    params: {
      id: id
    }
  })
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-coupon',
    params: {
      id: id
    }
  })
}

function showModal(id) {
  isModal.value = true
  idCoupon.value = id
}

function useDeleteCustomer(id) {
  useDeleteCouponApi(id)
      .then((response) => {
        useToastStore().success('Xóa thành công', 3000)
        getData()
      })
}

function filterData() {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    isLoadingListTable.value = true

    useIndexCouponApi(page.value, search.value, filterStatus.value)
        .then((response) => {
          coupons.value = response.data.data.data

          isLoadingListTable.value = false
        })
  }, 400)
}



</script>