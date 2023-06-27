<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" listName="Danh sách cửa hàng" @use-click-index="useClickRedirectIndex" @use-click-update="useClickRedirectUpdate"
                        :item-id="store.id">
        <template #title>
          <TitlePage title="Thông tin cửa hàng" subTitle="Chào mừng bạn đến với trang thông tin cửa hàng!"></TitlePage>
        </template>
        <template #avatar>
          <ImageDetailLayout
          >
            <template #box-detail-image>
              <BoxDetailProduct v-model:modelDetailProducts="detailProducts" :isShowDetach="isShowDetach" :url="url"
                                widthBox="w-96" heightBox="h-56" width="w-96" height="h-62" shape=""/>
            </template>
          </ImageDetailLayout>
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" color="text-orange-500" nameLabel="Tên cửa hàng" :item="store.store_name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Số nhà" :item="store.address.street_number"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Đường" :item="store.address.street"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Phường" :item="store.address.ward.full_name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Quận" :item="store.address.district.full_name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Thành phố" :item="store.address.province.full_name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Kinh độ" :item="store.address.long"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Vĩ độ" :item="store.address.lat"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Giờ mở cửa" :item="store.open_store"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Giờ đóng cửa" :item="store.close_store"/>
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
import ImageDetailLayout from "@/components/images/ImageDetailLayout.vue";
import BoxDetailProduct from "@/components/images/BoxDetailProduct.vue";
import InputMultipleFile from "@/components/inputs/InputMultipleFile.vue";

const router = useRouter()
const route = useRoute()

const id = route.params.id

const isLoadingPage = ref(true)

const detailProducts = ref([])

const isShowDetach = ref(true)

const store = ref({})

const debounce = ref(0)

function getData() {
  clearTimeout(debounce.value)

  setTimeout(() => {
    useGetStoreInformationApi(id)
        .then((response) => {
          store.value = response.data.data
          isLoadingPage.value = false

          if (response.data.data.attachment.length > 0) {
            const attachments = response.data.data.attachment

            for (let i = 0; i < attachments.length; i++) {
              detailProducts.value.push(attachments[i])
            }
          }

        })

  }, 1000)
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