<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách khách hàng" :item-id="customers.id">
        <template #title>
          <TitlePage title="Thông tin khách hàng" subTitle="Chào mừng bạn đến với trang thông tin khách hàng!"></TitlePage>
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   color="text-orange-500" nameLabel="Mã khách hàng" :item="customers.code"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Email" :item="customers.user?.email"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Họ và tên" :item="customers.full_name"/>
        </template>
        <template #list-address>
          <TableListAddress :lengthListAddress="customers.address.length">
            <template #list-table-row-head>
              <ListTableRow>
                <template #table-column>
                  <ListTableColumn text="Tên"/>
                  <ListTableColumn text="SỐ ĐIỆN THOẠI"/>
                  <ListTableColumn text="SỐ NHÀ"/>
                  <ListTableColumn text="ĐƯỜNG"/>
                  <ListTableColumn text="Phường"/>
                  <ListTableColumn text="Quận"/>
                  <ListTableColumn text="Thành phố"/>
                </template>
              </ListTableRow>
            </template>
            <template #list-table-row-body>
              <ListTableRow v-for="item in customers.address" :key="item.id">
                <template #table-column>
                  <ListTableColumn :text="item.name" />
                  <ListTableColumn :text="item.phone_number" />
                  <ListTableColumn :text="item.house_number" />
                  <ListTableColumn :text="item.street" />
                  <ListTableColumn :text="item.ward" />
                  <ListTableColumn :text="item.district" />
                  <ListTableColumn :text="item.city" />
                </template>
              </ListTableRow>
            </template>
          </TableListAddress>
        </template>
      </FormDetailLayout>
      <LoadingPage v-else />
    </template>
  </DetailLayout>
</template>
<script setup>
import DetailLayout from "@/components/layouts/DetailLayout.vue";
import FormDetailLayout from "@/components/layouts/FormDetailLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import BoxItem from "@/components/details/BoxItem.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import TableListAddress from "@/components/details/TableListAddress.vue";
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import ListTableRow from "@/components/table/ListTableRow.vue"


import { useGetCustomerInformation } from "@/repositories/customer";
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)


const customers = ref({
  email: '',
  full_name: '',
  phone_number: '',
  address: '',
})

function getInformationCustomer() {
  useGetCustomerInformation()
      .then((response) => {
        customers.value = response.data.data
        isLoadingPage.value = false
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-customer',
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-customer',
    params: {
      id: id
    }
  })
}

getInformationCustomer()

</script>