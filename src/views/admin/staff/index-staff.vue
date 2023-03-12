<template>
  <div class="min-h-screen bg-zinc-50">
    <Header />
    <div class="flex h-full">
      <NavigationBar class="flex-none py-8" />
      <ListTable v-if="pagination.total > 0" class="ml-64 grow z-0" text="Nhân viên" @delete-item="deleteStaff" :list-item="staff" :total="pagination.total" :page="page"/>
      <NoData v-else class="ml-64 grow z-0" @click-redirect="useClickRedirect" text="nhân viên"/>
<!--      Bỏ no data vào list table, tạo layout bỏ slot -->
    </div>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import Header from '@/components/Header.vue'
import TitlePage from '@/components/TitlePage.vue'
import SearchBar from '@/components/SearchBar.vue'
import Button from "@/components/Button.vue";
import ListTable from "@/components/ListTable.vue"
import NoData from "@/components/NoData.vue"

import { indexStaff, useDeleteStaffApi } from "../../../repositories/staff";

import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'


const router = useRouter()

const staff = ref([])

const page = ref(1);

const pagination = ref({
    total: null,
});

function getData() {
  indexStaff(page.value)
      .then((response) => {
        pagination.value.total = response.data.data.total

        staff.value = response.data.data.data
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


function useClickRedirect() {
  console.log('hi')
  router.push({ name: 'create-staff' })
}

</script>
