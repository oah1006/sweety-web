<template>
  <IndexLayout>
    <template #list-table>
      <ListTable v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                 v-model:modelBoolean="isLoadingListTable" @get-data="getData"
      >
        <template #title>
          <TitlePage title="Khách hàng" subTitle="Chào mừng bạn đến với trang khách hàng của cửa hàng!">
            <template #button>
              <Button textButton="Tạo mới" class="ml-auto" @click-redirect-create="useClickRedirectCreate" />
            </template>
          </TitlePage>
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text=""/>
              <ListTableColumn text="MÃ KHÁCH HÀNG" />
              <ListTableColumn text="Tên"/>
              <ListTableColumn text="EMAIL"/>
              <ListTableColumn text="ĐỊA CHỈ"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="item in customers" :key="item.id">
            <template #table-column>
              <ListTableColumnCheckbox />
              <ListTableColumn class="text-orange-500" :text="item.code" />
              <ListTableColumn :text="item.full_name" />
              <ListTableColumn :text="item.user?.email" />
              <ListTableColumn :text="item.user?.address" />
              <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate" @click-redirect-detail="useClickRedirectDetail" :item-id="item.id" />
            </template>
          </ListTableRow>
        </template>
      </ListTable>
      <LoadingPage v-else />
    </template>
  </IndexLayout>
</template>

<script setup>
import ListTable from "@/components/layouts/ListTableLayout.vue"
import IndexLayout from "@/components/layouts/IndexLayout.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import TitlePage from "@/components/TitlePage.vue"
import Button from "@/components/Button.vue"
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import ListTableRow from "@/components/table/ListTableRow.vue";
import ListTableColumnFunction from "@/components/table/ListTableColumnFunction.vue";
import ListTableColumnCheckbox from "@/components/table/ListTableColumnCheckbox.vue";

import { useIndexCustomerApi } from "@/repositories/customer";

import { ref, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const customers = ref([])

const page = ref(1);

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const pagination = ref({
  total: null,
  lastPage: null
});

function getData() {
  setTimeout(() => {
    useIndexCustomerApi(page.value)
        .then((response) => {
          pagination.value.lastPage = response.data.data.last_page
          pagination.value.total = response.data.data.total

          customers.value = response.data.data.data

          isLoadingPage.value = false
          isLoadingListTable.value = false
        })
  }, 0)
}

onBeforeMount(() => {
  getData()
})

function useClickRedirectCreate() {
  router.push({ name: 'create-customer' })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-customer',
    params: {
      id: id
    }
  })
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-customer',
    params: {
      id: id
    }
  })
}

</script>
