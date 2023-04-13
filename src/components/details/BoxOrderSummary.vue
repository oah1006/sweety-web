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
      <div class="flex justify-between mt-3">
        <p>Ngày tạo</p>
        <p>{{ props.createdAt }}</p>
      </div>
      <div class="flex justify-between mt-1">
        <p>Nhân viên tạo đơn</p>
        <router-link :to="{
          name: 'detail-staff',
          params: {
            id: props.id
          }
        }" class="underline text-cyan-500">{{ props.staff }}</router-link>
      </div>
      <div class="flex justify-between mt-1">
        <p>Tạm tính</p>
        <p>{{ props.subTotal }} đồng</p>
      </div>
      <div class="flex justify-between mt-1">
        <p>Phí vận chuyển</p>
        <p>+ 20000 đồng</p>
      </div>
      <div class="flex justify-between mt-1">
        <p>Áp dụng mã giảm giá</p>
        <p>- {{ props.isPercentValue }} %</p>
      </div>
    </div>
    <div class="border-t flex items-center justify-between mb-6 mt-4">
      <p class="font-bold">Tổng</p>
      <p>{{ props.total }} đồng</p>
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
  staff: String,
  id: Number,
  isPercentValue: String,
})

console.log(props.items)

</script>