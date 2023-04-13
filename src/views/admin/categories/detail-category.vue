<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" listName="Danh sách loại sản phẩm" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        :item-id="category.id">
        <template #title>
          <TitlePage title="Thông tin loại sản phẩm" subTitle="Chào mừng bạn đến với trang thông tin loại sản phẩm!"></TitlePage>
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Tên loại sản phẩm" :item="category.name" />
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Mô tả" :item="category.description"/>
        </template>
      </FormDetailLayout>
      <LoadingPage v-else />
    </template>
  </DetailLayout>
</template>
<script setup>
import DetailLayout from "@/components/layouts/DetailLayout.vue";
import FormDetailLayout from "@/components/layouts/FormDetailLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import BoxItem from "@/components/details/BoxItem.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGetCategoryInformationApi } from "@/repositories/category";



const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)


const category = ref({})

function getData() {
  useGetCategoryInformationApi()
      .then((response) => {
        category.value = response.data.data
        isLoadingPage.value = false
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-category',
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-category',
    params: {
      id: id
    }
  })
}

getData()



</script>