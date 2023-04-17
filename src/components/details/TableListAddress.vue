<template>
  <div class="my-6 shadow-md rounded-md bg-white">
    <div class="py-4 px-4 text-lg text-cyan-500 underline">
      Địa chỉ nhận hàng
    </div>
    <table class="w-full bg-white rounded-lg border-t">
      <thead class="uppercase rounded-lg bg-zinc-100">
        <slot name="list-table-row-head"></slot>
      </thead>
      <tbody>
        <template v-if="props.lengthListAddress > 0">
          <slot name="list-table-row-body"></slot>
        </template>
        <tr v-else>
          <td colspan="3">
            <NoDataListAddressesTable />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

import NoDataListAddressesTable from "@/components/nodata/NoDataListAddressesTable.vue";

const props = defineProps({
  lengthListAddress: Number
})


</script>