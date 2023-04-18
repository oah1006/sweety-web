<template>
  <div>
    <ul v-for="item in props.cities" :key="item.id">
      <li class="border-b border-gray-100 border-solid">{{ item.full_name }}</li>
    </ul>
  </div>
</template>


<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  cities: Object,
})

const emits = defineEmits(['filter-data'])

function filterData() {
  emits('filter-data')
}

watch(props.cities, () => {
  filterData()
})

</script>