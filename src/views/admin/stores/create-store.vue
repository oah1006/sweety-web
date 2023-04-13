<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách cửa hàng" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo cửa hàng" subTitle="Chào mừng bạn đến với trang tạo cửa hàng!"></TitlePage>
        </template>
        <template #box-input>
          <InputBox name="Tên cửa hàng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="store.name" placeholder="Tên cửa hàng"/>
            </template>
          </InputBox>
          <InputBox name="Địa chỉ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputAddress v-model:modelAddress="store.address" />
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
import {useCreateStoreApi} from "@/repositories/store";
import {useProfileStore} from "@/stores/getMyProfile";


const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const store = ref({
  name: '',
  address: '',
  open_store: '',
  close_store: ''
})

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

</script>