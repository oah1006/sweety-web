<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" listName="Danh sách cửa hàng" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        :item-id="topping.id">
        <template #title>
          <TitlePage title="Thông tin cửa hàng" subTitle="Chào mừng bạn đến với trang thông tin cửa hàng!"></TitlePage>
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" color="text-orange-500" nameLabel="Tên topping" :item="topping.name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Giá tiền" :item="topping.price"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Còn bán" :item="topping.published"/>
        </template>
      </FormDetailLayout>
    </template>
  </DetailLayout>
</template>

<script setup>
import DetailLayout from "@/components/layouts/DetailLayout.vue";
import FormDetailLayout from "@/components/layouts/FormDetailLayout.vue";
import TitlePage from "@/components/TitlePage.vue";
import BoxItem from "@/components/details/BoxItem.vue";

import { ref } from "vue";
import { useGetInformationToppingApi } from "@/repositories/topping";
import { useRoute, useRouter } from "vue-router";

const topping = ref({})

const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)

function getData() {
  useGetInformationToppingApi()
      .then((response) => {
        console.log(response.data.data)
        topping.value = response.data.data
        isLoadingPage.value = false
      })
}

getData()

function useClickRedirectIndex() {
  router.push({
    name: 'index-topping',
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-topping',
    params: {
      id: id
    }
  })
}


</script>