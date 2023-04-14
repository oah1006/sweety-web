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
        <template #title-box-input-address>
          <TitleFormField name="Địa chỉ" />
        </template>
        <template #box-input-address>
          <BoxInputAddressLayout border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center justify-between gap-4" width="w-1/12">
            <template #address>
              <BoxInputAddress name="Số nhà" >
                <template #input>
                  <InputAddress v-model:modelAddress="customers.house_number" placeholder="Số nhà" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Đường" >
                <template #input>
                  <InputAddress v-model:modelAddress="customers.street" placeholder="Đường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Phường" >
                <template #input>
                  <InputAddress v-model:modelAddress="customers.ward" placeholder="Phường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Quận" >
                <template #input>
                  <InputAddress v-model:modelAddress="customers.district" placeholder="Quận" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Thành phố" >
                <template #input>
                  <InputAddress v-model:modelAddress="customers.city" placeholder="Thành phố" />
                </template>
              </BoxInputAddress>
            </template>
          </BoxInputAddressLayout>
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
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue";


import {useGetCustomerInformation, useUpdateCustomer} from "@/repositories/customer"
import { useRouter, useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import { ref } from "vue"
import {useProfileStore} from "@/stores/getMyProfile";
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";

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
        console.log(response.data.data)

        customers.value.email = response.data.data.user?.email
        customers.value.full_name = response.data.data.full_name
        customers.value.phone_number = response.data.data.user?.phone_number
        customers.value.address = response.data.data.user?.address
        customers.value.house_number = response.data.data.address.house_number
        customers.value.street = response.data.data.address.street
        customers.value.ward = response.data.data.address.ward
        customers.value.district = response.data.data.address.district
        customers.value.city = response.data.data.address.city

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