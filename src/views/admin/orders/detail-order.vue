<template>
  <DetailLayout>
    <template #form-detail>
      <FromDetailOrderLayout v-if="!isLoadingPage" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách đơn hàng" :item-id="order.id">
        <template #title>
          <TitlePage title="Thông tin đơn hàng" subTitle="Chào mừng bạn đến với trang thông tin dơn hàng!"></TitlePage>
          <ButtonStatusAcceptedOrder :id="id" v-if="order.status === 'pending'" />
          <ButtonStatusPreparingOrder :id="id" v-else-if="order.status === 'accepted'" />
          <ButtonStatusPreparedOrder :id="id" v-else-if="order.status === 'preparing'" />
          <ButtonStatusDeliveringOrder :id="id" v-else-if="order.status === 'prepared'" />
          <div class="flex gap-4 items-center" v-else-if="order.status === 'delivering'" >
            <ButtonStatusSucceedOrder :id="id" />
            <ButtonStatusFailedOrder :id="id" />
          </div>
        </template>
        <template #list-product>
          <BoxListProduct>
            <template #list-table-row-head>
              <ListTableRow color="text-zinc-600" border="border-b" fontSize="text-lg">
                <template #table-column>
                  <ListTableColumn text="Sản phẩm" />
                  <ListTableColumn text="Số lượng" />
                  <ListTableColumn text="Giá tiền" />
                  <ListTableColumn text="Tổng giá tiền" />
                </template>
              </ListTableRow>
            </template>
            <template #list-table-row-body>
              <ListTableRow color="text-zinc-600" border="border-b" fontSize="text-sm" v-for="item in order.items" :key="item.id">
                <template #table-column>
                  <ListTableColumnProductImage :id="item.product.id" :text="item.product?.name" :attachment="item.product.attachment" />
                  <ListTableColumn :text="item.qty"/>
                  <ListTableColumn :text="formatPrice(item.product?.price)" unit="đồng"/>
                  <ListTableColumnTotalProduct :price="item?.unit_price" :quantity="item?.qty" />
                </template>
              </ListTableRow>
            </template>
          </BoxListProduct>
        </template>
        <template #order-summary>
          <BoxOrderSummary :createdAt="order.created_at" :status="order.status" :code="order.code"
                           :subTotal="order.sub_total"
                           :idSaleStaff="order.sale_staff?.id" :total="order.total" :items="items"
                           :nameSaleStaff="order.sale_staff?.full_name" :isPercentValue="order.coupon?.is_percent_value"
                           :nameDeliveryStaff="order.delivery_staff?.full_name" :idDeliveryStaff="order.delivery_staff?.id"
          >
          </BoxOrderSummary>
        </template>
        <template #address>
          <BoxTitle class="mb-4" text="Thông tin khách hàng" />
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Tên khách hàng" :item="order.address?.name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Số nhà" :item="order.address?.street_number"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Đường" :item="order.address?.street"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Phường" :item="order.address?.ward.full_name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Quận" :item="order.address?.district.full_name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Thành phố" :item="order.address?.province.full_name"/>
          <BoxItem padding="px-4 py-4" width="w-1/2" nameLabel="Số điện thoại" :item="order.address?.phone_number"/>
        </template>
      </FromDetailOrderLayout>
      <LoadingPage v-else />
    </template>
  </DetailLayout>
</template>
<script setup>
import DetailLayout from "@/components/layouts/DetailLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import BoxItem from "@/components/details/BoxItem.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import FromDetailOrderLayout from "@/components/layouts/FromDetailOrderLayout.vue";
import ListTableColumnProductImage from "@/components/table/ListTableColumnProductImage.vue";
import ListTableColumnTotalProduct from "@/components/table/ListTableColumnTotalProduct.vue";
import BoxTitle from "@/components/details/BoxTitle.vue";
import ButtonStatusAcceptedOrder from "@/components/Button/ButtonStatusAcceptedOrder.vue";
import ButtonStatusPreparingOrder from "@/components/Button/ButtonStatusPreparingOrder.vue";
import ButtonStatusPreparedOrder from "@/components/Button/ButtonStatusPreparedOrder.vue";
import ButtonStatusDeliveringOrder from "@/components/Button/ButtonStatusDeliveringOrder.vue";
import ButtonStatusSucceedOrder from "@/components/Button/ButtonStatusSucceedOrder.vue";
import BoxListProduct from "@/components/details/BoxListProduct.vue"
import ListTableRow from "@/components/table/ListTableRow.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import BoxOrderSummary from "@/components/details/BoxOrderSummary.vue"

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useGetOrderInformationApi} from "@/repositories/order";
import ButtonStatusFailedOrder from "@/components/Button/ButtonStatusFailedOrder.vue";
import { database, refFireBase, setFireBase, onValueFireBase} from "@/stores/firebase";

const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)

const order = ref({
  status: '',
})

const items = ref()

function getInformationOrder() {
  useGetOrderInformationApi()
      .then((response) => {
        order.value = response.data.data
        console.log(order.value)
        isLoadingPage.value = false

        items.value = response.data.data.items
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-order',
  })
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN")
}


getInformationOrder()

</script>