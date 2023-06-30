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
        <template #avatar>
          <ImageDetailLayout
          >
            <template #box-detail-image>
              <BoxDetailProduct @detach-one-image-in-multiple="clickDeleteItemImage"
                                v-model:modelDetailProducts="detailProducts" />
            </template>
            <template #input-multiple-image>
              <InputMultipleFile class="text-center ml-4 pb-4" @change-multiple-image="onImageChangeDetailProducts" />
            </template>
          </ImageDetailLayout>
        </template>
        <template #box-input>
          <BoxInputLayout name="Tên cửa hàng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="store.store_name" placeholder="Tên cửa hàng" color="text-orange-500" />
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.store_name">
                <p v-if="errors?.errors?.store_name">{{ errors?.errors?.store_name[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Giờ mở cửa" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputOpenStore v-model:modelOpenStore="store.open_store" />
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.open_store">
                <p v-if="errors?.errors?.open_store">{{ errors?.errors?.open_store[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Giờ đóng cửa" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputCloseStore v-model:modelCloseStore="store.close_store" />
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.close_store">
                <p v-if="errors?.errors?.close_store">{{ errors?.errors?.close_store[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
        </template>
        <template #title-box-input-address>
          <TitleFormField name="Địa chỉ" />
        </template>
        <template #box-input-address>
          <BoxInputAddressLayout>
            <template #address>
              <BoxInputAddress name="Thành phố" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
                <template #input>
                  <SelectFilterProvince v-model:modelProvince="store.province" placeholder="Thành phố" />
                </template>
                <template #error>
                  <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3" v-if="errors?.errors?.province_code">
                    <p v-if="errors?.errors?.province_code">{{ errors?.errors?.province_code[0] }}</p>
                  </div>
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Quận" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
                <template #input>
                  <SelectFilterDistrict v-model:modelDistrict="store.district" v-model:modelProvince="store.province.code" placeholder="Quận" />
                </template>
                <template #error>
                  <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3" v-if="errors?.errors?.province_code">
                    <p v-if="errors?.errors?.district_code">{{ errors?.errors?.district_code[0] }}</p>
                  </div>
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Phường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
                <template #input>
                  <SelectFilterWard v-model:modelWard="store.ward" v-model:modelDistrict="store.district.code" placeholder="Phường" />
                </template>
                <template #error>
                  <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3" v-if="errors?.errors?.ward_code">
                    <p v-if="errors?.errors?.ward_code">{{ errors?.errors?.ward_code[0] }}</p>
                  </div>
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Đường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
                <template #input>
                  <InputAddress v-model:modelAddress="store.street" placeholder="Đường" />
                </template>
                <template #error>
                  <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3" v-if="errors?.errors?.street">
                    <p v-if="errors?.errors?.street">{{ errors?.errors?.street[0] }}</p>
                  </div>
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Số nhà" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
                <template #input>
                  <InputAddress v-model:modelAddress="store.street_number" placeholder="Số nhà" />
                </template>
                <template #error>
                  <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3" v-if="errors?.errors?.street_number">
                    <p v-if="errors?.errors?.street_number">{{ errors?.errors?.street_number[0] }}</p>
                  </div>
                </template>
              </BoxInputAddress>
            </template>
            <template #get-coordinates>
              <BoxGetCoordinates name="Tính tọa độ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="lg:flex lg:items-center lg:gap-4" width="lg:w-1/12 w-1/2">
                <template #input-long>
                  <InputLong placeholder="Kinh độ" :placeholder="store.long" v-model:modelLong="store.long" />
                </template>
                <template #input-lat>
                  <InputLat placeholder="Vĩ độ" :placeholder="store.lat" v-model:modelLat="store.lat"/>
                </template>
                <template #button-coordinates>
                  <ButtonLoadCoordinates @get-coordinates="getCoordinates" />
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
import BoxInputLayout from "@/components/layouts/BoxInputLayout.vue"
import InputName from "@/components/inputs/InputName.vue";
import InputOpenStore from "@/components/inputs/InputOpenStore.vue";
import InputCloseStore from "@/components/inputs/InputCloseStore.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";
import SelectFilterProvince from "@/components/inputs/SelectFilterProvince.vue";
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
import InputMultipleFile from "@/components/inputs/InputMultipleFile.vue";
import ImageDetailLayout from "@/components/images/ImageDetailLayout.vue";
import BoxDetailProduct from "@/components/images/BoxDetailProduct.vue";
import {useIndexGetCoodinatesApi} from "@/repositories/get-coordinates";


const router = useRouter();

const detailProducts = ref([])

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
  },
  district: {
    code: '',
  },
  province: {
    code: '',
  },
  long: '',
  lat: ''
})

function getCoordinates() {
  console.log(store.value.district.code)
  useIndexGetCoodinatesApi(store.value.street_number, store.value.street, store.value.district.code, store.value.province.code)
      .then((response) => {
        store.value.lat = response.data.results[0].position.lat
        store.value.long = response.data.results[0].position.lon
      })
}

function clickDeleteItemImage(id, attachment_id = null) {
  detailProducts.value.splice(id, 1)
}

function onImageChangeDetailProducts(e) {
  detailProducts.value = []

  const selectedFiles = e.target.files

  if (!selectedFiles.length) {
    return
  }

  for (let i = 0; i < selectedFiles.length; i++) {
    detailProducts.value.push(selectedFiles[i])
  }
}

const errors = ref({})

async function submit() {
  useCreateStoreApi(detailProducts.value, store.value.store_name, store.value.open_store, store.value.close_store, store.value.street_number,
  store.value.street, store.value.ward.code, store.value.district.code, store.value.province.code,
  store.value.long, store.value.lat)
      .then((response) => {
        useToastStore().success('Tạo thành công', 3000)
        router.push({ name: 'index-stores' })
      })
      .catch((error) => {
        errors.value = error.response.data
        console.log(errors.value)
      })
}

function redirectIndex() {
  router.push({
    name: 'index-stores'
  })
}


</script>