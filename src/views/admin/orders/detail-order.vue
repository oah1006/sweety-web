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
                  <ListTableColumnProductImage :text="item.product?.name" :attachment="item.product.attachment" />
                  <ListTableColumn :text="item.quantity" />
                  <ListTableColumn :text="item.product?.price" />
                  <ListTableColumnTotalProduct :price="item.product?.price" :quantity="item.quantity" />
                </template>
              </ListTableRow>
            </template>
          </BoxListProduct>
        </template>
        <template #order-summary>
          <BoxOrderSummary :items="items"></BoxOrderSummary>
        </template>
        <template #information-order>
          <BoxTitle text="Thông tin hóa đơn" />
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/2" nameLabel="Mã hóa đơn"
                   color="text-orange-500" :item="order.code"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 py-4" width="w-1/2" nameLabel="Tên nhân viên" :item="order.staff.full_name"/>
          <BoxItemHasUnit border="border-b border-solid border-gray-100" padding="px-10 py-4" width="w-1/2" unit="đồng"
                          nameLabel="Giá tạm tính" :item="order.sub_total"/>
          <BoxItemHasUnit border="border-b border-solid border-gray-100" padding="px-10 py-4" width="w-1/2" unit="đồng" nameLabel="Tổng tiền" :item="order.total"/>
          <BoxItemStatusOrder padding="px-10 py-4" width="w-1/2" nameLabel="Trạng thái" :status="order.status" />
        </template>
        <template #address>
          <BoxTitle text="Thông tin khách hàng" />
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 py-4" width="w-1/2" nameLabel="Tên khách hàng" :item="order.delivery_address.name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 py-4" width="w-1/2" nameLabel="Địa chỉ" :item="order.delivery_address?.address"/>
          <BoxItem padding="px-10 py-4" width="w-1/2" nameLabel="Số điện thoại" :item="order.delivery_address?.phone_number"/>
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