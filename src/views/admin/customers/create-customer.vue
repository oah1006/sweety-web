<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách khách hàng" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo khách hàng" subTitle="Chào mừng bạn đến với trang tạo khách hàng!"></TitlePage>
        </template>
        <template #box-input>
          <InputBox name="Email" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputEmail v-model:modelEmail="customers.email" />
            </template>
          </InputBox>
          <InputBox name="Mật khẩu" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPassword v-model:modelPassword="customers.password" />
            </template>
          </InputBox>
          <InputBox name="Họ và tên" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputFullName v-model:modelFullName="customers.full_name" />
            </template>
          </InputBox>
          <InputBox name="Số điện thoại" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPhoneNumber v-model:modelPhoneNumber="customers.phone_number" />
            </template>
          </InputBox>
          <InputBox name="Địa chỉ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputAddress v-model:modelAddress="customers.address" />
            </template>
          </InputBox>
        </template>
      </FormCreateLayout>
    </template>
  </CreateLayout>
</template>

<script setup>

import CreateLayout from "@/components/layouts/CreateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormCreateLayout from "@/components/layouts/FormCreateLayout.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import InputPassword from "@/components/inputs/InputPassword.vue";

import { useToastStore } from '@/stores/toast'
import { useStoreCustomerApi } from "@/repositories/customer"
import { useRouter } from 'vue-router'

import { ref } from "vue"
import {useProfileStore} from "@/stores/getMyProfile";

const router = useRouter();

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

async function submit() {
  useStoreCustomerApi(customers.value)
    .then((response) => {
      useToastStore().success('Tạo thành công', 3000)
      router.push({ name: 'index-customer' })
    })
}

function redirectIndex() {
  router.push({
    name: 'index-customer'
  })
}



</script>