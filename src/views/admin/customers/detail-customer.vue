<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate" :item-id="customers.id">
        <template #title>
          <TitlePage title="Thông tin khách hàng" subTitle="Chào mừng bạn đến với trang thông tin khách hàng!"></TitlePage>
        </template>
        <template #box-item>
          <BoxItem nameLabel="Email" :item="customers.user?.email"/>
          <BoxItem nameLabel="Họ và tên" :item="customers.full_name"/>
          <BoxItem nameLabel="địa chỉ" :item="customers.user?.address"/>
          <BoxItem nameLabel="Số điện thoại" :item="customers.user?.phone_number"/>
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