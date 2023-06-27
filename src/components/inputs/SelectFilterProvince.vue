<template>
  <select name="cities" v-model="province.code"
          class="form-select left-0 top-10 mt-2 border border-zinc-300 w-full py-2 pl-4 text-slate-900 lg:text-base text-sm">
    <option disabled value="">Vui lòng chọn dưới đây!</option>
    <option v-for="option in provinces" :value="option.code" :key="option.id">{{ option.full_name }}</option>
  </select>
</template>

<script setup>
import {useIndexProvinceApi} from "@/repositories/province";

import {computed, ref, watch} from "vue";

const props = defineProps({
  modelProvince: Object,
})

const emits = defineEmits(['update:modelProvince'])

const province = computed({
  get: () => props.modelProvince,

  set: (value) => emits('update:modelProvince', value)
})

const provinces = ref('')

function filterData() {
  useIndexProvinceApi()
      .then((response) => {
        provinces.value = response.data.data
      })
}

watch(province, () => {
  const cityFind = provinces.value.find((item) =>
    item.code === province.value.code
  )

  province.value.full_name = cityFind.full_name
}, { deep: true })

filterData()

</script>