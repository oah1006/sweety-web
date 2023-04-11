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
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Địa chỉ" :item="customers.user?.address"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Số điện thoại" :item="customers.user?.phone_number"/>
        </template>
        <template #list-address>
          <TableListAddress :lengthListAddress="customers.delivery_addresses.length">
            <template #list-table-row-head>
              <ListTableRow>
                <template #table-column>
                  <ListTableColumn text="Tên"/>
                  <ListTableColumn text="ĐỊA CHỈ"/>
                  <ListTableColumn text="Số điện thoại"/>
                </template>
              </ListTableRow>
            </template>
            <template #list-table-row-body>
              <ListTableRow v-for="item in customers.delivery_addresses" :key="item.id">
                <template #table-column>
                  <ListTableColumn :text="item.name" />
                  <ListTableColumn :text="item.address" />
                  <ListTableColumn :text="item.phone_number" />
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
        console.log(response.data.data.delivery_addresses)

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