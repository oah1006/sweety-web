<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" listName="Danh sách cửa hàng" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        :item-id="store.id">
        <template #title>
          <TitlePage title="Thông tin khách hàng" subTitle="Chào mừng bạn đến với trang thông tin khách hàng!"></TitlePage>
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Tên cửa hàng" :item="store.name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Địa chỉ" :item="store.address"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Giờ mở cửa" :item="store.open_store"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"   nameLabel="Giờ đóng cửa" :item="store.close_store"/>
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
import {useGetStoreInformationApi} from "@/repositories/store";

const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)


const store = ref({
  name: '',
  address: '',
  open_store: '',
  close_store: '',
})

function getData() {
  useGetStoreInformationApi()
      .then((response) => {
        store.value = response.data.data
        isLoadingPage.value = false
      })
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-stores',
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-stores',
    params: {
      id: id
    }
  })
}

getData()



</script>