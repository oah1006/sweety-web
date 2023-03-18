<template>
  <div class="flex flex-col items-center justify-between my-10">
    <img src="../../images/nodata.png" class="w-32 object-cover h-32"/>
    <p class="text-zinc-400 text-xl">Không có dữ liệu {{ props.listName }} mà bạn tìm kiếm</p>
    <p class="text-zinc-600 text-md">Vui lòng chọn lại thông tin chính xác bạn muốn tìm kiếm</p>
  </div>
</template>

<script setup>

const props = defineProps({
  listName: String
})

</script>