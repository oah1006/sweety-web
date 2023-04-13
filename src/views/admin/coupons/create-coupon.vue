<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách mã khuyến mãi" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo mã khuyến mãi" subTitle="Chào mừng bạn đến với trang mã khuyến mãi!"></TitlePage>
        </template>
        <template #box-input>
          <InputBox name="Tên mã giảm giá" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName placeholder="Tên mã giảm giá" v-model:modelName="coupon.name" />
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
              <div class="w-full">
                <InputPercentValue v-model:modelPercentValue="coupon.is_percent_value" />
                <p class="mt-2 text-zinc-500">Đơn vị: {{ coupon.is_percent_value }} %</p>
              </div>
            </template>
          </InputBox>
          <InputBox name="Tổng yêu cầu tối thiểu" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <div class="w-full">
                <InputMinOrderTotal v-model:modelMinOrderTotal="coupon.min_order_total" />
                <p class="mt-2 text-zinc-500">Đơn vị: {{ coupon.min_order_total }} VND</p>
              </div>
            </template>
          </InputBox>
          <InputBox name="Trạng thái" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectStatus v-model:modalSelectStatus="coupon.status" :selectOptionStatus="selectOptionStatus" />
            </template>
          </InputBox>
          <InputBox name="Bắt đầu" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputStartAt v-model:modelStartedAt="coupon.started_at" />
            </template>
          </InputBox>
          <InputBox name="Kết thúc" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputExpiredAt v-model:modelExpiredAt="coupon.expired_at" />
            </template>
          </InputBox>
        </template>
      </FormCreateLayout>
    </template>
  </CreateLayout>
</template>

<script setup>

import CreateLayout from "@/components/layouts/CreateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormCreateLayout from "@/components/layouts/FormCreateLayout.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import InputPercentValue from "@/components/inputs/InputPercentValue.vue";
import InputMinOrderTotal from "@/components/inputs/InputMinOrderTotal.vue";
import SelectStatus from "@/components/inputs/SelectStatus.vue";
import InputStartAt from "@/components/inputs/InputStartedAt.vue";
import InputExpiredAt from "@/components/inputs/InputExpiredAt.vue";
import InputName from "@/components/inputs/InputName.vue";
import InputDescription from "@/components/inputs/InputDescription.vue";
import InputStock from "@/components/inputs/InputStock.vue";

import { useToastStore } from '@/stores/toast'
import { useStoreCouponApi } from "@/repositories/coupon";
import { useRouter } from 'vue-router'

import { ref } from "vue"
import {useProfileStore} from "@/stores/getMyProfile";

const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}


const coupon = ref({
  name: '',
  description: '',
  stock: '',
  is_percent_value: '',
  min_order_total: '',
  status: '',
  started_at: '',
  expired_at: ''
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

async function submit() {
  useStoreCouponApi(coupon.value)
      .then((response) => {
        useToastStore().success('Tạo thành công', 3000)
        router.push({ name: 'index-coupon' })
      })
}

function redirectIndex() {
  router.push({
    name: 'index-coupon'
  })
}



</script>