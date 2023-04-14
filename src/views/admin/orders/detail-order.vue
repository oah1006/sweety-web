<template>
  <DetailLayout>
    <template #form-detail>
      <FromDetailOrderLayout v-if="!isLoadingPage" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách đơn hàng" :item-id="order.id">
        <template #title>
          <TitlePage title="Thông tin đơn hàng" subTitle="Chào mừng bạn đến với trang thông tin dơn hàng!"></TitlePage>
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
                  <ListTableColumn :text="item.quantity" />
                  <ListTableColumn :text="item.product?.price" />
                  <ListTableColumnTotalProduct :price="item.product?.price" :quantity="item.quantity" />
                </template>
              </ListTableRow>
            </template>
          </BoxListProduct>
        </template>
        <template #order-summary>
          <BoxOrderSummary :createdAt="order.created_at" :status="order.status" :code="order.code" :subTotal="order.sub_total"
                           :id="order.staff.id" :total="order.total" :items="items" :staff="order.staff.full_name"
                           :isPercentValue="order.coupon.is_percent_value"
          >

          </BoxOrderSummary>
        </template>
        <template #address>
          <BoxTitle text="Thông tin khách hàng" />
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Tên khách hàng" :item="order.address.name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Số nhà" :item="order.address?.house_number"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Đường" :item="order.address?.street"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Phường" :item="order.address?.ward"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Quận" :item="order.address?.district"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-4 py-2" width="w-1/2" nameLabel="Thành phố" :item="order.address?.city"/>
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
import BoxItemStatusOrder from "@/components/details/BoxItemStatusOrder.vue";
import BoxItemHasUnit from "@/components/details/BoxItemHasUnit.vue";
import BoxListProduct from "@/components/details/BoxListProduct.vue"
import ListTableRow from "@/components/table/ListTableRow.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import BoxOrderSummary from "@/components/details/BoxOrderSummary.vue"

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useGetOrderInformationApi} from "@/repositories/order";
import FromDetailOrderLayout from "@/components/layouts/FromDetailOrderLayout.vue";
import ListTableColumnProductImage from "@/components/table/ListTableColumnProductImage.vue";
import ListTableColumnTotalProduct from "@/components/table/ListTableColumnTotalProduct.vue";
import BoxTitle from "@/components/details/BoxTitle.vue";



const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)


const order = ref({

})

const items = ref()

function getInformationOrder() {
  useGetOrderInformationApi()
      .then((response) => {
        console.log(response.data.data)
        order.value = response.data.data
        isLoadingPage.value = false

        items.value = response.data.data.items
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-order',
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-order',
    params: {
      id: id
    }
  })
}


getInformationOrder()

</script>