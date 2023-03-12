<template>
  <IndexLayout>
    <template #list-table>
      <ListTable class="grow z-0" text="Nhân viên" @delete-item="deleteStaff" :list-item="staff" :total="pagination.total" :page="page"
                 @click-redirect-update-staff="useClickRedirectUpdateStaff" @click-redirect-create="useClickRedirectCreate"
                 :is-loading="isLoading" @pre-page="prePage" @next-page="nextPage"/>
    </template>
  </IndexLayout>
</template>

<script setup>
import ListTable from "@/components/ListTable.vue"
import IndexLayout from "@/components/layouts/IndexLayout.vue";

import { indexStaff, useDeleteStaffApi } from "../../../repositories/staff";

import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const staff = ref([])

const page = ref(1);

const isLoading = ref(true)

const pagination = ref({
    total: null,
});

function getData() {
  indexStaff(page.value)
      .then((response) => {
        pagination.value.total = response.data.data.total
        staff.value = response.data.data.data
        isLoading.value = false
      })
}
function deleteStaff(id) {
  useDeleteStaffApi(id)
      .then((response) => {
        getData()
      })
}

onBeforeMount(() => {
  getData()
})


function useClickRedirectCreate() {
  console.log('ho')
  router.push({ name: 'create-staff' })
}

function useClickRedirectUpdateStaff(id) {
  router.push({
    name: 'update-staff',
    params: {
      id: id
    }
  })
}

function prePage() {
  if (page.value === 1) {
    return
  } else {
    page.value--
  }
}

function nextPage() {
  page.value++
}

</script>
