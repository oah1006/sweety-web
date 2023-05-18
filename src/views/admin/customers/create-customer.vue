<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách khách hàng" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo khách hàng" subTitle="Chào mừng bạn đến với trang tạo khách hàng!"></TitlePage>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin Khách hàng" />
        </template>
        <template #box-input>
          <InputBox name="Email" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputEmail v-model:modelEmail="customer.email" />
            </template>
          </InputBox>
          <InputBox name="Mật khẩu" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPassword v-model:modelPassword="customer.password" />
            </template>
          </InputBox>
          <InputBox name="Họ và tên" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputFullName v-model:modelFullName="customer.full_name" />
            </template>
          </InputBox>
          <InputBox name="Số điện thoại" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPhoneNumber v-model:modelPhoneNumber="customer.phone_number" />
            </template>
          </InputBox>
        </template>
        <template #title-box-input-address>
          <TitleFormField name="Địa chỉ" />
        </template>
        <template #box-input-address>
          <BoxInputAddressLayout>
            <template #address>
              <BoxInputAddress name="Thành phố" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterProvince v-model:modelProvince="customer.province" placeholder="Thành phố" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Quận" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterDistrict v-model:modelDistrict="customer.district" v-model:modelProvince="customer.province.code" placeholder="Quận" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Phường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterWard v-model:modelWard="customer.ward" v-model:modelDistrict="customer.district.code" placeholder="Phường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Đường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="customer.street" placeholder="Đường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Số nhà" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="customer.street_number" placeholder="Số nhà" />
                </template>
              </BoxInputAddress>
            </template>
            <template #get-coordinates>
              <BoxGetCoordinates name="Tính tọa độ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input-long>
                  <InputLong placeholder="Kinh độ" :placeholder="customer.long" v-model:modelLong="customer.long" />
                </template>
                <template #input-lat>
                  <InputLat placeholder="Vĩ độ" :placeholder="customer.lat" v-model:modelLat="customer.lat"/>
                </template>
                <template #button-coordinates>
                  <ButtonLoadCoordinates :streetNumber="customer.house_number" :street="customer.street"
                                         :district="customer.district.full_name" :province="customer.province.full_name"
                                         v-model:modelPosition="customer" />
                </template>
              </BoxGetCoordinates>
            </template>
          </BoxInputAddressLayout>
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
import TitleFormField from "@/components/TitleFormField.vue";
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";
import SelectFilterWard from "@/components/inputs/SelectFilterWard.vue";
import SelectFilterDistrict from "@/components/inputs/SelectFilterDistrict.vue";
import SelectFilterProvince from "@/components/inputs/SelectFilterProvince.vue";
import BoxGetCoordinates from "@/components/inputs/BoxGetCoordinates.vue";
import InputLong from "@/components/inputs/InputLong.vue";
import InputLat from "@/components/inputs/InputLat.vue";
import ButtonLoadCoordinates from "@/components/Button/ButtonLoadCoordinates.vue";

import { useToastStore } from '@/stores/toast'
import { useProfileStore } from "@/stores/getMyProfile";
import { useStoreCustomerApi } from "@/repositories/customer"
import { useRouter } from 'vue-router'
import { ref } from "vue"


const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const customer = ref({
  email: '',
  password: '',
  full_name: '',
  phone_number: '',
  street_number: '',
  street: '',
  ward: {
    code: '',
    full_name: ''
  },
  district: {
    code: '',
    full_name: ''
  },
  province: {
    code: '',
    full_name: ''
  },
  long: '',
  lat: ''
})

async function submit() {
  useStoreCustomerApi(customer.value.email, customer.value.password, customer.value.full_name,
      customer.value.phone_number, customer.value.street_number, customer.value.street, customer.value.ward.code,
      customer.value.district.code, customer.value.province.code, customer.value.long, customer.value.lat)
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