<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" @use-click-index="redirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách mã khuyến mãi" :item-id="coupon.id">
        <template #title>
          <TitlePage title="Thông tin mã khuyến mãi" subTitle="Chào mừng bạn đến với trang thông tin mã khuyến mãi!"></TitlePage>
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" color="!text-orange-500" nameLabel="Mã khuyến mãi" :item="coupon.code"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" nameLabel="Tên khuyến mãi" :item="coupon.name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" nameLabel="Mô tả" :item="coupon.description"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" nameLabel="Số lượng" :item="coupon.stock"/>
          <BoxItemHasUnit border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" nameLabel="Giảm số phần trăm" :item="coupon.is_percent_value" unit="%"/>
          <BoxItemHasUnit border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" nameLabel="Tối thiểu cần đạt" :item="coupon.min_order_total" unit="đồng"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" nameLabel="Ngày bắt đầu" :item="coupon.started_at"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" nameLabel="Ngày hết hạn" :item="coupon.expired_at"/>
          <BoxItemStatusCoupon class="py-4 px-10" nameLabel="Trạng thái" :status="coupon.status"/>
        </template>
      </FormDetailLayout>
      <LoadingPage v-else />
    </template>
  </DetailLayout>
</template>

<script setup>

import DetailLayout from "@/components/layouts/DetailLayout.vue"
import FormDetailLayout from "@/components/layouts/FormDetailLayout.vue"
import TitlePage from "@/components/TitlePage.vue"
import BoxItem from "@/components/details/BoxItem.vue"
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import BoxItemStatusCoupon from "@/components/details/BoxItemStatusCoupon.vue";
import BoxItemHasUnit from "@/components/details/BoxItemHasUnit.vue";

import { ref } from "vue";
import { useRouter } from 'vue-router'
import {useGetCouponInformationApi} from "@/repositories/coupon";



const router = useRouter();

const url = ref('')

const coupon = ref({
  code: '',
  name: '',
  description: '',
  stock: '',
  is_percent_value: '',
  min_order_total: '',
  status: '',
  started_at: '',
  expired_at: ''
})



const isLoadingPage = ref(true)

function getInformationCoupon() {
  useGetCouponInformationApi()
      .then((response) => {
        coupon.value = response.data.data

        isLoadingPage.value = false
      })
}

getInformationCoupon()

function redirectIndex() {
  router.push({
    name: 'index-coupon'
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-coupon',
    params: {
      id: id
    }
  })
}


</script>