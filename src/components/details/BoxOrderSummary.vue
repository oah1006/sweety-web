<template>
  <div class="my-6 shadow-md rounded-md bg-white w-1/3 px-4 py-3 flex flex-col justify-between h-72">
    <div>
      <p class="font-medium text-xl">Tóm tắt hóa đơn</p>
      <div class="flex justify-between mt-4">
        <p>Ngày tạo</p>
        <p>12/02/2023</p>
      </div>
      <div class="flex justify-between">
        <p>Tạm tính</p>
        <p>500.000</p>
      </div>
      <div class="flex justify-between">
        <p>Phụ thu tiền giao hàng</p>
        <p>20.000</p>
      </div>
    </div>
    <div class="border-t flex justify-between mb-6">
      <p class="mt-2">Tổng</p>
      <p>500.000đ</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  items: Object
})

console.log(props.items)

</script>