<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" @click-redirect="useClickRedirectIndex" listName="Danh sách khách hàng">
        <template #title>
          <TitlePage title="Cập nhật khách hàng" subTitle="Chào mừng bạn đến với trang cập nhật khách hàng!"></TitlePage>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin nhân viên" />
        </template>
        <template #box-input>
          <InputBox name="Email" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputEmail v-model:modelEmail="customers.email" />
            </template>
          </InputBox>
          <InputBox name="Họ và tên" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputFullName v-model:modelFullName="customers.full_name" />
            </template>
          </InputBox>
        </template>
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>

<script setup>

import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue";


import {useGetCustomerInformation, useUpdateCustomer} from "@/repositories/customer"
import { useRouter, useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import { ref } from "vue"
import {useProfileStore} from "@/stores/getMyProfile"

const router = useRouter();
const route = useRoute();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}


const customers = ref({
  email: '',
  full_name: '',
  phone_number: '',
  address: ''
})

const id = route.params.id

const isLoadingPage = ref(true)

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

        isLoadingPage.value = false
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-customer',
  })
}

getInformationCustomer()


</script>