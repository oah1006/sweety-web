<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" @click-redirect="useClickRedirectIndex" listName="Danh sách nhân viên">
        <template #title>
          <TitlePage title="Cập nhật cửa hàng" subTitle="Chào mừng bạn đến với trang cập nhật thông tin cửa hàng!"></TitlePage>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin cửa hàng" />
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
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>


<script setup>
import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue";
import InputName from "@/components/inputs/InputName.vue";
import InputOpenStore from "@/components/inputs/InputOpenStore.vue";
import InputCloseStore from "@/components/inputs/InputCloseStore.vue";

import {computed, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast";
import { useGetStoreInformationApi, useUpdateStoreApi } from "@/repositories/store";
import {useProfileStore} from "@/stores/getMyProfile";


const router = useRouter();
const route = useRoute();

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

const id = route.params.id

const isLoadingPage = ref(true)

async function submit() {
  useUpdateStoreApi(store.value, id)
      .then((response) => {
        useToastStore().success('Cập nhật thành công', 3000)
        router.push({ name: 'index-stores' })
      })
      .catch((error) => {
        console.log(error)
      })
}
function getInformationStore() {
  useGetStoreInformationApi()
      .then((response) => {
        store.value.name = response.data.data.name
        store.value.address = response.data.data.address
        const openStore = format(response.data.data.open_store)
        const closeStore = format(response.data.data.close_store)
        store.value.open_store = openStore
        store.value.close_store = closeStore

        isLoadingPage.value = false
      })
}

function format(time) {
  const [hours, minutes] = time.split(':').slice(0, 2);
  return `${hours}:${minutes}`;
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-stores',
  })
}

getInformationStore()

</script>