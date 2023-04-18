<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách cửa hàng" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo cửa hàng" subTitle="Chào mừng bạn đến với trang tạo cửa hàng!"></TitlePage>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin cửa hàng" />
        </template>
        <template #box-input>
          <InputBox name="Tên cửa hàng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="store.store_name" placeholder="Tên cửa hàng" color="text-orange-500" />
            </template>
          </InputBox>
          <InputBox name="Giờ mở cửa" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputOpenStore v-model:modelOpenStore="store.open_store" />
            </template>
          </InputBox>
          <InputBox name="Giờ đóng cửa" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputCloseStore v-model:modelCloseStore="store.close_store" />
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
                  <InputAddress v-model:modelAddress="store.city" placeholder="Thành phố" @filter-city="filterCity"/>
                </template>
                <template #select-filter>
                  <SelectFilterCity absolute="absolute" v-model:modalFilterCity="store.city" :city="city" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Quận" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.district" placeholder="Quận" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Phường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.ward" placeholder="Phường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Đường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.street" placeholder="Đường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Số nhà" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.house_number" placeholder="Số nhà" />
                </template>
              </BoxInputAddress>
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
import InputName from "@/components/inputs/InputName.vue";
import InputOpenStore from "@/components/inputs/InputOpenStore.vue";
import InputCloseStore from "@/components/inputs/InputCloseStore.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";

import {useRouter} from "vue-router";
import {ref} from "vue";
import { useToastStore } from "@/stores/toast";
import {useCreateStoreApi, useIndexStoreApi} from "@/repositories/store";
import {useProfileStore} from "@/stores/getMyProfile";
import TitleFormField from "@/components/TitleFormField.vue";
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";
import SelectFilterCity from "@/components/inputs/SelectFilterCity.vue";
import {useIndexProvinceApi} from "@/repositories/province";


const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const store = ref({
  store_name: '',
  open_store: '',
  close_store: '',
  house_number: '',
  street: '',
  ward: '',
  district: '',
  city: ''
})

const city = ref({});

async function submit() {
  useCreateStoreApi(store.value)
      .then((response) => {
        useToastStore().success('Tạo thành công', 3000)
        router.push({ name: 'index-stores' })
      })
}

function redirectIndex() {
  router.push({
    name: 'index-stores'
  })
}

const debounce = ref(0)

function filterCity() {
  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    useIndexProvinceApi(store.value.city)
        .then((response) => {
          city.value = response.data.data
        })
  }, 400)
}

</script>