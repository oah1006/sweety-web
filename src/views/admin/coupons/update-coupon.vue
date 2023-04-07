<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" @click-redirect="useClickRedirectIndex" listName="Danh sách mã khuyến mãi">
        <template #title>
          <TitlePage title="Cập nhật mã khuyến mãi" subTitle="Chào mừng bạn đến với trang cập nhật mã khuyến mãi!"></TitlePage>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin mã khuyến mãi" />
        </template>
        <template #box-input>
          <InputBox name="Tên mã giảm giá" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="coupon.name" />
            </template>
          </InputBox>
          <InputBox name="Mô tả" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputDescription v-model:modelDescription="coupon.description" />
            </template>
          </InputBox>
          <InputBox name="Số lượng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputStock v-model:modelStock="coupon.stock" />
            </template>
          </InputBox>
          <InputBox name="Phần trăm giảm giá" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPercentValue v-model:modelPercentValue="coupon.is_percent_value" />
            </template>
          </InputBox>
          <InputBox name="Tổng yêu cầu tối thiểu" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputMinOrderTotal v-model:modelMinOrderTotal="coupon.min_order_total" />
            </template>
          </InputBox>
          <InputBox name="Trạng thái" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectStatus v-model:modalSelectStatus="coupon.status" :selectOptionStatus="selectOptionStatus" />
            </template>
          </InputBox>
          <InputBox name="Bắt đầu" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputStartedAt v-model:modelStartedAt="coupon.started_at" />
            </template>
          </InputBox>
          <InputBox name="Kết thúc" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputExpiredAt v-model:modelExpiredAt="coupon.expired_at" />
            </template>
          </InputBox>
        </template>
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>

<script setup>

import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue";
import InputName from "@/components/inputs/InputName.vue";
import InputDescription from "@/components/inputs/InputDescription.vue";
import InputStock from "@/components/inputs/InputStock.vue";
import InputPercentValue from "@/components/inputs/InputPercentValue.vue";
import InputMinOrderTotal from "@/components/inputs/InputMinOrderTotal.vue";
import SelectStatus from "@/components/inputs/SelectStatus.vue";
import InputStartedAt from "@/components/inputs/InputStartedAt.vue";
import InputExpiredAt from "@/components/inputs/InputExpiredAt.vue";


import { useRouter, useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast'


const router = useRouter();
const route = useRoute();

import { ref } from "vue"

import {useGetCouponInformationApi, useUpdateCouponApi} from "@/repositories/coupon";


const coupon = ref({
  name: '',
  description: '',
  stock: '',
  is_percent_value: '',
  min_order_total: '',
  status: '',
  started_at: null,
  expired_at: null
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

const id = route.params.id

const isLoadingPage = ref(true)

async function submit() {
  useUpdateCouponApi(coupon.value, id)
      .then((response) => {
        useToastStore().success('Cập nhật thành công', 3000)
        router.push({ name: 'index-coupon' })
      })
}

function getInformationCustomer() {
  useGetCouponInformationApi()
      .then((response) => {
        coupon.value.name = response.data.data.name
        coupon.value.description = response.data.data.description
        coupon.value.stock = response.data.data.stock
        coupon.value.is_percent_value = response.data.data.is_percent_value
        coupon.value.min_order_total = response.data.data.min_order_total
        coupon.value.status = response.data.data.status
        coupon.value.started_at = response.data.data.started_at
        coupon.value.expired_at = response.data.data.expired_at

        coupon.value.started_at = formatDate(response.data.data.started_at)
        coupon.value.expired_at = formatDate(response.data.data.expired_at)


        isLoadingPage.value = false
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-coupon',
  })
}

function formatDate(date) {
  const dateString = date;

  const [day, month, year] = dateString.split("-");

  const dateObj = new Date(`${year}-${month}-${day}`);

  const formattedDate = dateObj.toISOString().slice(0, 10)

  console.log(formattedDate)

  return formattedDate
}

getInformationCustomer()


</script>