<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" @click-redirect="useClickRedirectIndex" listName="Danh sách loại sản phẩm">
        <template #title>
          <TitlePage title="Cập nhật loại sản phẩm" subTitle="Chào mừng bạn đến với trang cập nhật loại sản phẩm!"></TitlePage>
        </template>
        <template #box-input>
          <BoxInputLayout name="Tên loại sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputName v-model:modelName="category.name" placeholder="Tên loại sản phẩm" />
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Mô tả" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputDescription v-model:modelDescription="category.description" />
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
import BoxInputLayout from "@/components/layouts/BoxInputLayout.vue"
import LoadingPage from "@/components/loadings/LoadingPage.vue";
import InputName from "@/components/inputs/InputName.vue";
import InputDescription from "@/components/inputs/InputDescription.vue";


import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast";
import { useGetCategoryInformationApi, useUpdateCategoryApi } from "@/repositories/category";
import {useProfileStore} from "@/stores/getMyProfile";


const router = useRouter();
const route = useRoute();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}


const category = ref({
  name: '',
  description: ''
})

const id = route.params.id

const isLoadingPage = ref(true)

async function submit() {
  useUpdateCategoryApi(category.value, id)
      .then((response) => {
        useToastStore().success('Cập nhật thành công', 3000)
        router.push({ name: 'index-category' })
      })
}

function getInformationCategory() {
  useGetCategoryInformationApi()
      .then((response) => {
        category.value.name = response.data.data.name
        category.value.description = response.data.data.description

        isLoadingPage.value = false
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-category',
  })
}

getInformationCategory()

</script>