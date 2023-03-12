<template>
  <div>
    <div class="flex flex-col items-center justify-between mt-20">
      <img src="../images/nodata.png" class="w-72 object-cover h-72"/>
      <p class="text-zinc-400 text-xl">Không có dữ liệu {{ props.text }} </p>
      <p class="text-zinc-400 text-md">Bạn có thể tạo nhanh {{ props.text }} với nút tạo dưới đây!</p>
      <Button class="mt-4" name-button="Tạo mới" @click-redirect="clickRedirect" />
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'

const emits = defineEmits(['click-redirect'])

const props = defineProps({
  text: String
})

function clickRedirect() {
  emits('click-redirect')
}

</script>