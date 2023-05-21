<template>
  <div>
    <div class="flex flex-col items-center justify-between mt-20">
      <img src="../../images/nodata.png" class="w-72 object-cover h-72"/>
      <p class="text-zinc-400 text-xl">Không có dữ liệu {{ props.namePage }} </p>
      <p class="text-zinc-400 text-md">Bạn có thể tạo nhanh {{ props.namePage }} với nút tạo dưới đây!</p>
      <Button class="mt-4" textButton="Tạo mới" @click="clickRedirect" />
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button/ButtonCreate.vue'

const emits = defineEmits(['click-redirect-create'])

const props = defineProps({
  namePage: String
})

function clickRedirect() {
  console.log('hello')
  emits('click-redirect-create')
}

</script>