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
                  <SelectFilterProvice v-model:modelProvice="store.province" placeholder="Thành phố" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Quận" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterDistrict v-model:modelDistrict="store.district" v-model:modelCity="store.province.code" placeholder="Quận" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Phường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterWard v-model:modelWard="store.ward" v-model:modelDistrict="store.district.code" placeholder="Phường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Đường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.street" placeholder="Đường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Số nhà" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.street_number" placeholder="Số nhà" />
                </template>
              </BoxInputAddress>
            </template>
            <template #get-coordinates>
              <BoxGetCoordinates name="Tính tọa độ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input-long>
                  <InputLong placeholder="Kinh độ" :placeholder="store.long" v-model:modelLong="store.long" />
                </template>
                <template #input-lat>
                  <InputLat placeholder="Vĩ độ" :placeholder="store.lat" v-model:modelLat="store.lat"/>
                </template>
                <template #button-coordinates>
                  <ButtonLoadCoordinates :streetNumber="store.house_number" :street="store.street"
                                         :district="store.district.full_name" :province="store.province.full_name"
                                         v-model:modelPosition="store" />

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
import InputName from "@/components/inputs/InputName.vue";
import InputOpenStore from "@/components/inputs/InputOpenStore.vue";
import InputCloseStore from "@/components/inputs/InputCloseStore.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";
import SelectFilterProvice from "@/components/inputs/SelectFilterProvince.vue";
import SelectFilterDistrict from "@/components/inputs/SelectFilterDistrict.vue";
import SelectFilterWard from "@/components/inputs/SelectFilterWard.vue";
import BoxGetCoordinates from "@/components/inputs/BoxGetCoordinates.vue";
import InputLong from "@/components/inputs/InputLong.vue";
import InputLat from "@/components/inputs/InputLat.vue";
import ButtonLoadCoordinates from "@/components/Button/ButtonLoadCoordinates.vue";

import {useRouter} from "vue-router";
import {ref} from "vue";
import { useToastStore } from "@/stores/toast";
import { useCreateStoreApi } from "@/repositories/store";
import { useProfileStore } from "@/stores/getMyProfile";


const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const store = ref({
  store_name: '',
  open_store: '',
  close_store: '',
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

const position = ref({
  lat: '',
  long: '',
})

const cities = ref({});

async function submit() {
  useCreateStoreApi(store.value.store_name, store.value.open_store, store.value.close_store, store.value.street_number,
  store.value.street, store.value.ward.code, store.value.district.code, store.value.province.code,
  store.value.long, store.value.lat)
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


</script>