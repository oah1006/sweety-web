<template>
  <select name="cities" v-model="city.full_name"
          class="form-select left-0 top-10 mt-2 border border-zinc-300 w-full py-2 pl-4 text-slate-900">
    <option disabled value="">Vui lòng chọn dưới đây!</option>
    <option v-for="option in cities" :value="option.code" :key="option.id">{{ option.full_name }}</option>
  </select>
</template>

<script setup>
import {useIndexProvinceApi} from "@/repositories/province";

import {computed, ref, watch} from "vue";

const props = defineProps({
  modelCity: Object,
})

const emits = defineEmits(['update:modelCity'])

const city = computed({
  get: () => props.modelCity,

  set: (value) => emits('update:modelCity', value)
})

const cities = ref('')

function filterData() {
  useIndexProvinceApi()
      .then((response) => {
        cities.value = response.data.data
      })
}

watch(city, () => {
  const cityFind = cities.value.find((item) =>
    item.code === city.value.code
  )

  city.value.full_name = cityFind.full_name
}, { deep: true })

filterData()

</script>