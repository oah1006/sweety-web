<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách loại sản phẩm" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo cửa hàng" subTitle="Chào mừng bạn đến với trang tạo cửa hàng!"></TitlePage>
        </template>
        <template #box-input>
          <InputBox name="Tên loại sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="category.name" placeholder="Tên loại sản phẩm" />
            </template>
          </InputBox>
          <InputBox name="Mô tả" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputDescription v-model:modelDescription="category.description" />
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
import InputDescription from "@/components/inputs/InputDescription.vue";
import InputName from "@/components/inputs/InputName.vue";


import { useRouter } from "vue-router";
import { ref } from "vue";
import { useToastStore } from "@/stores/toast";
import {useStoreCategoryApi} from "@/repositories/category";
import {useProfileStore} from "@/stores/getMyProfile";
import LoadingPage from "@/App.vue";

const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}




const category = ref({
  name: '',
  description: ''
})

function submit() {
  useStoreCategoryApi(category.value)
      .then((response) => {
        useToastStore().success('Tạo thành công', 3000)
        router.push({ name: 'index-category' })
      })
}

function redirectIndex() {
  router.push({
    name: 'index-category'
  })
}

</script>