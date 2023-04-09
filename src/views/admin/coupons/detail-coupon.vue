<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" @use-click-index="redirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách khuyến mãi" :item-id="coupon.id">
        <template #title>
          <TitlePage title="Thông tin nhân viên" subTitle="Chào mừng bạn đến với trang thông tin nhân viên!"></TitlePage>
        </template>
        <template #box-item>
          <BoxItem nameLabel="Mã khuyến mãi" :item="coupon.code"/>
          <BoxItem nameLabel="Tên khuyến mãi" :item="coupon.name"/>
          <BoxItem nameLabel="Mô tả" :item="coupon.description"/>
          <BoxItem nameLabel="Số lượng" :item="coupon.stock"/>
          <BoxItem nameLabel="Giảm số phần trăm" :item="coupon.is_percent_value"/>
          <BoxItem nameLabel="Tối thiểu cần đạt" :item="coupon.min_order_total"/>
          <BoxItem nameLabel="Ngày bắt đầu" :item="coupon.started_at"/>
          <BoxItem nameLabel="Ngày hết hạn" :item="coupon.expired_at"/>
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
import BoxAvatarDetail from "@/components/details/BoxAvatarDetail.vue"
import LoadingPage from "@/components/loadings/LoadingPage.vue"

import { ref } from "vue";
import { useRouter } from 'vue-router'
import {useGetCouponInformationApi} from "@/repositories/coupon";
import BoxItemStatusCoupon from "@/components/details/BoxItemStatusCoupon.vue";


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