<template>
    <div class="min-h-screen">
      <Header />
      <div class="flex">
        <NavigationBar class="flex-none" />
        <div class="grow bg-zinc-50 py-24 z-0">
          <div class="py-6 rounded-lg">
            <TitlePage title="Nhân viên" sub-title="Chào mừng bạn đến với trang quản lý nhân viên!" />
            <div class="flex items-center justify-between w-full mt-4">
              <SearchBar />
              <Button name-button="Tạo mới" @click-redirect="useClickRedirect" />
            </div>
          </div>

          <div class="mt-6 mx-12 shadow-md rounded-md bg-white">
            <ListTable @delete-item="deleteStaff" :list-item="staff"/>
            <Pagination v-model="page" @pre-page="prePage" @get-data="getData" @next-page="nextPage" :total="pagination.total"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import Header from '@/components/Header.vue'
import Pagination from '@/components/Pagination.vue'
import TitlePage from '@/components/TitlePage.vue'
import SearchBar from '@/components/SearchBar.vue'
import Button from "@/components/Button.vue";
import ListTable from "@/components/ListTable.vue"

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

function prePage() {
  if (page.value === 1) {
    return
  } else {
    page.value--
  }
}

function nextPage() {
    console.log('hi')
    page.value++
}

function useClickRedirect() {
  router.push({ name: 'create-staff' })
}

</script>
