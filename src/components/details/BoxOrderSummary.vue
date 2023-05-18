<template>
  <div class="shadow-md rounded-md bg-white px-4 py-3 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between">
        <p class="font-medium text-xl">Tóm tắt hóa đơn</p>
        <div>
          <p class="text-orange-500 font-bold">{{ props.code }}</p>
          <BoxItemStatusOrder :status="props.status" />
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <p>Ngày tạo</p>
        <p>{{ props.createdAt }}</p>
      </div>
      <div v-if="props.idSaleStaff" class="flex justify-between mt-2">
        <p>Nhân viên tạo đơn</p>
        <router-link :to="{
          name: 'detail-staff',
          params: {
            id: props.idSaleStaff
          }
        }"
         class="underline text-cyan-500">{{ props.nameSaleStaff }}</router-link>
      </div>
      <div v-else class="flex justify-between mt-2">
        <p>Nhân viên tạo đơn</p>
        <p>{{ props.nameSaleStaff }}</p>
      </div>
      <div v-if="props.idDeliveryStaff" class="flex justify-between mt-2">
        <p>Nhân viên vận chuyển</p>
        <router-link :to="{
          name: 'detail-staff',
          params: {
            id: props.idDeliveryStaff
          }
        }" class="underline text-cyan-500">{{ props.nameDeliveryStaff }}</router-link>
      </div>
      <div v-else class="flex justify-between mt-2">
        <p>Nhân viên vận chuyển</p>
        <p>{{ props.nameDeliveryStaff }}</p>
      </div>
      <div class="flex justify-between mt-2">
        <p>Tạm tính</p>
        <p>{{ formatPrice(props.subTotal) }} đồng</p>
      </div>
      <div class="flex justify-between mt-2">
        <p>Phí vận chuyển</p>
        <p>+ 20000 đồng</p>
      </div>
      <div class="flex justify-between mt-2">
        <p>Áp dụng mã giảm giá</p>
        <p>- {{ props.isPercentValue }} %</p>
      </div>
    </div>
    <div class="border-t flex items-center justify-between mb-6 mt-4">
      <p class="font-bold">Tổng</p>
      <p>{{ formatPrice(props.total) }} đồng</p>
    </div>
  </div>
</template>

<script setup>

import BoxItemStatusOrder from "@/components/details/BoxItemStatusOrder.vue";

const props = defineProps({
  items: Object,
  code: String,
  total: String,
  subTotal: String,
  status: String,
  createdAt: String,
  nameSaleStaff: {
    type: String,
    default: () => null
  },
  nameDeliveryStaff: {
    type: String,
    default: () => null
  },
  idSaleStaff: {
    type: Number,
    default: () => null
  },
  idDeliveryStaff: {
    type: Number,
    default: () => null
  },
  isPercentValue: String,
})

function formatPrice(price) {
  return price.toLocaleString("vi-VN")
}

</script>