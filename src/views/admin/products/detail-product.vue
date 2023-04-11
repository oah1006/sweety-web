<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" @use-click-index="redirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách nhân viên" :item-id="product.id">
        <template #title>
          <TitlePage title="Thông tin nhân viên" subTitle="Chào mừng bạn đến với trang thông tin nhân viên!"></TitlePage>
        </template>
        <template #title-box-image>
          <TitleFormField name="Ảnh sản phẩm" />
        </template>
        <template #avatar>
          <ImageProductLayout v-model:modelDetailProducts="detailProducts" :isShowDetach="isShowDetach" :url="url"
                              widthBox="w-96" heightBox="h-56" width="w-96" height="h-62" shape=""
          >
          </ImageProductLayout>
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"  nameLabel="Tên sản phẩm" :item="product.name"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"  nameLabel="Mô tả" :item="product.description"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"  nameLabel="Số lượng" :item="product.stock"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"  nameLabel="Giá tiền" :item="product.price"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="w-1/6"  nameLabel="Loại sản phẩm" :item="product.category?.name" />
          <BoxItemPublished class="" nameLabel="Xuất bản" :item="product.published" />
        </template>
      </FormDetailLayout>
      <LoadingPage v-else />
    </template>
  </DetailLayout>
</template>

<script setup>

import DetailLayout from "@/components/layouts/DetailLayout.vue"
import FormDetailLayout from "@/components/layouts/FormDetailLayout.vue"
import TitlePage from "@/components/TitlePage.vue"
import BoxItem from "@/components/details/BoxItem.vue"
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import BoxItemPublished from "@/components/details/BoxItemPublished.vue";

import { ref } from "vue";
import { useRouter } from 'vue-router'

import {useGetProductInformation} from "@/repositories/product";
import ImageProductLayout from "@/components/layouts/ImageProductLayout.vue";
import TitleFormField from "@/components/TitleFormField.vue";


const router = useRouter();

const url = ref('')

const product = ref({})

const thumbnail = ref('');
const detailProducts = ref([])

const isShowDetach = ref(true)



const isLoadingPage = ref(true)

function getInformationProduct() {
  useGetProductInformation()
      .then((response) => {
        console.log(response.data.data)
        product.value = response.data.data
        isLoadingPage.value = false

        if (response.data.data.attachment.length > 0) {
          const attachments = response.data.data.attachment

          const thumbnail = attachments.find(image => image['type'] === 'thumbnails')

          const detail_products = attachments.filter(image => image['type'] === 'detail_products')

          url.value = thumbnail.url

          for (let i = 0; i < detail_products.length; i++) {
            detailProducts.value.push(detail_products[i])
          }
        }
      })
}

getInformationProduct()

function redirectIndex() {
  router.push({
    name: 'index-product'
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-product',
    params: {
      id: id
    }
  })
}


</script>