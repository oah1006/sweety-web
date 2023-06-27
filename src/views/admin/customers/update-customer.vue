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
          <BoxInputLayout name="Email" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputEmail v-model:modelEmail="customer.email" />
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Họ và tên" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputFullName v-model:modelFullName="customer.full_name" />
            </template>
          </BoxInputLayout>
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
import BoxInputLayout from "@/components/layouts/BoxInputLayout.vue"
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue";


import {useGetCustomerInformation, useUpdateCustomer} from "@/repositories/customer"
import { useRouter, useRoute } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import { ref } from "vue"
import {useProfileStore} from "@/stores/getMyProfile"
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";
import SelectFilterProvince from "@/components/inputs/SelectFilterProvince.vue";
import SelectFilterDistrict from "@/components/inputs/SelectFilterDistrict.vue";
import SelectFilterWard from "@/components/inputs/SelectFilterWard.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import BoxGetCoordinates from "@/components/inputs/BoxGetCoordinates.vue";
import InputLong from "@/components/inputs/InputLong.vue";
import InputLat from "@/components/inputs/InputLat.vue";
import ButtonLoadCoordinates from "@/components/Button/ButtonLoadCoordinates.vue";

const router = useRouter();
const route = useRoute();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}


const customer = ref({
  email: '',
  full_name: '',
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

        customer.value.email = response.data.data.user?.email
        customer.value.full_name = response.data.data.full_name
        customer.value.phone_number = response.data.data.phone_number


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