<template>
  <DetailLayout>
    <template #form-detail>
      <FromDetailOrderLayout v-if="!isLoadingPage" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách đơn hàng" :item-id="order.id">
        <template #title>
          <TitlePage title="Thông tin đơn hàng" subTitle="Chào mừng bạn đến với trang thông tin dơn hàng!"></TitlePage>
          <button @click="changeStatusAcceptedOrder" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-blue-500 rounded-xl" v-if="order.status === 'pending'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
            <p>Xác nhận</p>
          </button>
          <button @click="changeStatusPreparingOrder" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-yellow-700 rounded-xl" v-else-if="order.status === 'accepted'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
            <p>Đang chuẩn bị</p>
          </button>
          <button @click="changeStatusPreparedOrder" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-yellow-400 rounded-xl" v-else-if="order.status === 'preparing'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
            <p>Chuẩn bị xong</p>
          </button>
          <button @click="changeStatusDeliveringOrder" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-violet-500 rounded-xl" v-else-if="order.status === 'prepared'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
            <p>Đang vận chuyển</p>
          </button>
          <div class="flex gap-4 items-center" v-else-if="order.status === 'delivering'" >
            <button @click="changeStatusSucceedOrder" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-green-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <p>Thành công</p>
            </button>
            <button @click="changeStatusFailedOrder" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-black rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <p>Bị hủy bỏ</p>
            </button>
          </div>
        </template>
        <template #list-product>
          <BoxListProduct>
            <template #list-table-row-head>
              <ListTableRow color="text-zinc-600" border="border-b" fontSize="text-lg">
                <template #table-column>
                  <ListTableColumn text="Sản phẩm" />
                  <ListTableColumn text="Số lượng" />
                  <ListTableColumn text="Tổng giá tiền" />
                </template>
              </ListTableRow>
            </template>
            <template #list-table-row-body>
              <ListTableRow color="text-zinc-600" border="border-b" fontSize="text-sm" v-for="item in order.items" :key="item.id">
                <template #table-column>
                  <ListTableColumnProductImage :orderItemOptions="item.order_item_options" :id="item.product.id" :nameProduct="item.product?.name" :priceProduct="item.product?.price" :attachment="item.product.attachment" />
                  <ListTableColumn class="text-center" :text="item.qty"/>
                  <ListTableColumnTotalProduct :totalPrice="item.totalPrice" />
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
import BoxListProduct from "@/components/details/BoxListProduct.vue"
import ListTableRow from "@/components/table/ListTableRow.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import BoxOrderSummary from "@/components/details/BoxOrderSummary.vue"

import {ref, watch} from 'vue'
import { useRouter, useRoute } from 'vue-router'

import {
  useGetOrderInformationApi, useUpdateStatusAcceptedOrderApi,
  useUpdateStatusDeliveringOrderApi, useUpdateStatusFailedOrderApi,
  useUpdateStatusPreparedOrderApi, useUpdateStatusPreparingOrderApi, useUpdateStatusSucceedOrderApi
} from "@/repositories/order";

import {database, onValueFireBase, refFireBase, setFireBase} from "@/stores/firebase";

import {useToastStore} from "@/stores/toast";


const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)

const order = ref({
  status: '',
})

const items = ref()

function getInformationOrder() {
  useGetOrderInformationApi(id)
      .then((response) => {
        order.value = response.data.data

        const totalObject = order.value.items.map(item => {
          const optionsPrice = item.order_item_options.reduce((acc, option) => acc + (option.topping.price * option.qty), 0);
          const totalPrice = optionsPrice + item.product_variant.unit_price;
          return {...item, totalPrice}
        });

        order.value.items = totalObject


        isLoadingPage.value = false

        items.value = response.data.data.items
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-order',
  })
}


getInformationOrder()

function changeStatusAcceptedOrder() {
  useUpdateStatusAcceptedOrderApi(id)
      .then((response) => {
        order.value.status = 'accepted'

        useToastStore().success('Cập nhật trạng thái thành công', 3000)

        setFireBase(refFireBase(database, 'order_checking/' + id), {
          accepted: response.data.data
        });
      })
      .catch((error) => {
        useToastStore().error('Bạn không có quyền cập nhật trạng thái', 3000)
        router.push({ name: 'index-order' })
      })
}

function changeStatusPreparingOrder() {
  useUpdateStatusPreparingOrderApi(id)
      .then((response) => {
        order.value.status = 'preparing'

        useToastStore().success('Cập nhật trạng thái thành công', 3000)
        setFireBase(refFireBase(database, 'order_checking/' + id), {
          preparing: response.data.data
        });
      })
      .catch((error) => {
        useToastStore().error('Bạn không có quyền cập nhật trạng thái', 3000)
        router.push({ name: 'index-order' })
      })
}

function changeStatusPreparedOrder() {
  useUpdateStatusPreparedOrderApi(id)
      .then((response) => {
        order.value.status = 'prepared'

        useToastStore().success('Cập nhật trạng thái thành công', 3000)
        setFireBase(refFireBase(database, 'order_checking/' + id), {
          prepared: response.data.data
        });
      })
      .catch((error) => {
        useToastStore().error('Bạn không có quyền cập nhật trạng thái', 3000)
        router.push({ name: 'index-order' })
      })
}

function changeStatusDeliveringOrder() {
  useUpdateStatusDeliveringOrderApi(id)
      .then((response) => {
        order.value.status = 'delivering'

        useToastStore().success('Cập nhật trạng thái thành công', 3000)

        setFireBase(refFireBase(database, 'order_checking/' + id), {
          delivering: response.data.data
        });
      })
      .catch((error) => {
        useToastStore().error('Bạn không có quyền cập nhật trạng thái', 3000)
        router.push({ name: 'index-order' })
      })
}

function changeStatusSucceedOrder() {
  useUpdateStatusSucceedOrderApi(id)
      .then((response) => {
        order.value.status = 'succeed'

        useToastStore().success('Cập nhật trạng thái thành công', 3000)

        setFireBase(refFireBase(database, 'order_checking/' + id), {
          succeed: response.data.data
        });
      })
      .catch((error) => {
        useToastStore().error('Bạn không có quyền cập nhật trạng thái', 3000)
        router.push({ name: 'index-order' })
      })
}

function changeStatusFailedOrder() {
  useUpdateStatusFailedOrderApi(id)
      .then((response) => {
        order.value.status = 'failed'

        useToastStore().success('Cập nhật trạng thái thành công', 3000)

        setFireBase(refFireBase(database, 'order_checking/' + id), {
          failed: response.data.data
        });
      })
      .catch((error) => {
        useToastStore().error('Bạn không có quyền cập nhật trạng thái', 3000)
        router.push({ name: 'index-order' })
      })
}

const statusRef = refFireBase(database, 'order_checking/');
onValueFireBase(statusRef, (snapshot) => {
  getInformationOrder()
});

watch(order.value, () => {
  getInformationOrder()
}, { deep: true })

</script>