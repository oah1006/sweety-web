<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout @click-redirect-index="useClickRedirectIndex">
        <template #title>
          <TitlePage title="Cập nhật khách hàng" subTitle="Ở đây, bạn có thể cập nhật thông tin cho khách hàng!"></TitlePage>
        </template>
        <template #email-input>
          <InputEmail v-model:modelEmail="customers.email" />
        </template>
        <template #fullname-input>
          <InputFullName v-model:modelFullName="customers.full_name" />
        </template>
        <template #phone-input>
          <InputPhoneNumber v-model:modelPhoneNumber="customers.phone_number" />
        </template>
        <template #address-input>
          <InputAddress v-model:modelAddress="customers.address" />
        </template>
      </FormUpdateLayout>
    </template>
  </UpdateLayout>
</template>

<script setup>

import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";


import {useGetCustomerInformation, useUpdateCustomer} from "@/repositories/customer"
import { useRouter, useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast'


const router = useRouter();
const route = useRoute();

import { ref } from "vue"

const customers = ref({
  email: '',
  full_name: '',
  phone_number: '',
  address: ''
})

const id = route.params.id

async function submit() {
  useUpdateCustomer(customers.value, id)
      .then((response) => {
        useToastStore().success('Cập nhật thành công', 3000)
        router.push({ name: 'index-customer' })
      })
}

function getInformationCustomer() {
  useGetCustomerInformation()
      .then((response) => {
        customers.value.email = response.data.data.user?.email
        customers.value.full_name = response.data.data.full_name
        customers.value.phone_number = response.data.data.user?.phone_number
        customers.value.address = response.data.data.user?.address
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-customer',
  })
}

getInformationCustomer()


</script>