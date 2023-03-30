<template>
  <div class="my-4 mx-4">
    <p>Ảnh chi tiết sản phẩm</p>
    <div class="w-full grid grid-cols-4 gap-4" v-if="!detailProducts.length">
      <div class="border-dashed border-2 border-zinc-300 w-48 h-48 mt-2">

      </div>
      <div class="border-dashed border-2 border-zinc-300 w-48 h-48 mt-2">

      </div>
      <div class="border-dashed border-2 border-zinc-300 w-48 h-48 mt-2">

      </div>
      <div class="border-dashed border-2 border-zinc-300 w-48 h-48 mt-2">

      </div>
    </div>
    <div class="w-full grid grid-cols-4 gap-4" v-else>
      <div v-for="(item, index) in url" :key="index" class="w-48 h-48 mt-2">
        <div class="relative w-48 h-48">
          <img class="object-cover w-48 h-48" :src="item.url" />
          <a :class="{ hidden: props.isShowDetach }" @click="detachAndDeleteDetailProduct(index, item.idAttachment)" class="cursor-pointer absolute rounded-full bg-amber-600 -top-3 -right-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {computed, ref, watch} from "vue";

const props = defineProps({
  width: String,
  height: String,
  shape: String,
  border: String,
  modelDetailProducts: Array,
  isShowDetach: Boolean
})


const emits = defineEmits(['update:modelDetailProducts', 'detach-one-image-in-multiple'])

const detailProducts = computed({
  get: () => props.modelDetailProducts,

  set: (value) => emits('update:modelDetailProducts', value)
})

const url = ref([]);

watch(detailProducts, () => {
  url.value = []

  for(let i = 0; i < detailProducts.value.length; i++) {
    if (typeof detailProducts.value[i]['url'] === 'string') {
      url.value.push({ url: detailProducts.value[i]['url'], idAttachment: detailProducts.value[i]['id'] })
    } else {
      url.value.push({ url: URL.createObjectURL(detailProducts.value[i])})
    }
  }

}, { deep: true, immediate: true })


function detachAndDeleteDetailProduct(id, attachment_id = null) {
  emits('detach-one-image-in-multiple', id, attachment_id)
}




</script>