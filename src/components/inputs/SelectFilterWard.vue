<template>
  <select name="district" v-model="ward.code"
          class="form-select left-0 top-10 mt-2 border border-zinc-300 w-full py-2 pl-4 text-slate-900">
    <option disabled value="">Vui lòng chọn dưới đây!</option>
    <option v-for="option in wards" :value="option.code" :key="option.code">{{ option.full_name }}</option>
  </select>
</template>

<script setup>
import {useIndexWardApi} from "@/repositories/province";

import {computed, ref, watch} from "vue";

const props = defineProps({
  modelWard: Object,
  modelDistrict: String
})

const emits = defineEmits(['update:modelWard', 'update:modelDistrict'])

const ward = computed({
  get: () => props.modelWard,

  set: (value) => emits('update:modelWard', value)
})

const districtCode = computed({
  get: () => props.modelDistrict,

  set: (value) => emits('update:modelDistrict', value)
})

const wards = ref('')

function filterData() {
  useIndexWardApi(districtCode.value)
      .then((response) => {
        wards.value = response.data
      })
}

watch(districtCode, () => {
  filterData()
})

watch(ward, () => {
  const wardFind = wards.value.find((item) =>
      item.code === ward.value.code
  )

  ward.value.full_name = wardFind.full_name
}, { deep: true })

</script>