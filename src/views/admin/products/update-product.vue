<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" listName="Danh sách sản phẩm" @click-redirect="redirectIndex">
        <template #title>
          <TitlePage title="Cập nhật sản phẩm" subTitle="Chào mừng bạn đến với trang cập nhật sản phẩm!"></TitlePage>
        </template>
        <template #title-box-image>
          <TitleFormField name="Ảnh sản phẩm" />
        </template>
        <template #avatar>
          <ImageProductLayout :idAttachment="idAttachment" @detach-thumbnail="detachThumbnail" @detach-one-image-in-multiple="detachAndDeleteDetailProduct" v-model:modelDetailProducts="detailProducts" :url="url" widthBox="w-96" heightBox="h-56" width="w-96" height="h-62" shape=""
          >
            <template #input-image-thumbnail>
              <InputFile v-model:modalInput="input" class="text-center ml-4 pb-4" @change-image="onImageChangeThumbnail" />
            </template>
            <template #input-multiple-image>
              <InputMultipleFile class="text-center ml-4 pb-4" @change-multiple-image="onImageChangeDetailProducts" />
            </template>
          </ImageProductLayout>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin nhân viên" />
        </template>
        <template #box-input>
          <InputBox name="Tên sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="product.name" placeholder="Tên sản phẩm" />
            </template>
          </InputBox>
          <InputBox name="Mô tả" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputDescription v-model:modelDescription="product.description" />
            </template>
          </InputBox>
          <InputBox name="Số lượng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputStock v-model:modelStock="product.stock" />
            </template>
          </InputBox>
          <InputBox name="Giá tiền" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPrice v-model:modelPrice="product.price" />
            </template>
          </InputBox>
          <InputBox name="Loại sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectCategory v-model:modalSelectCategory="product.category_id" :category="category" />
            </template>
          </InputBox>
          <InputBox name="Xuất bản" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectPublished v-model:modalPublished="product.published" :selectOptionPublished="selectOptionPublished">
              </SelectPublished>
            </template>
          </InputBox>
        </template>
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>

<script setup>

import TitlePage from '@/components/TitlePage.vue'
import InputName from "@/components/inputs/InputName.vue";
import InputDescription from "@/components/inputs/InputDescription.vue";
import InputStock from "@/components/inputs/InputStock.vue";
import InputPrice from "@/components/inputs/InputPrice.vue";
import SelectCategory from "@/components/inputs/SelectCategory.vue";
import SelectPublished from "@/components/inputs/SelectPublished.vue";
import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import InputFile from "@/components/inputs/InputFile.vue";

import { detach, store } from '@/repositories/attachment'
import { useToastStore } from "@/stores/toast";

import {useRoute, useRouter} from 'vue-router'
import { ref } from 'vue'



import {useGetProductInformation, useUpdateProductApi} from "@/repositories/product";
import {useIndexCategoryApi} from "@/repositories/category";
import ImageProductLayout from "@/components/layouts/ImageProductLayout.vue";
import InputMultipleFile from "@/components/inputs/InputMultipleFile.vue";
import {useProfileStore} from "@/stores/getMyProfile";

const router = useRouter()

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const input = ref('')
const thumbnail = ref('');
const detailProducts = ref([])
const idAttachment = ref('')

const url = ref('')

const route = useRoute();

const id = route.params.id

const product = ref({
  id: '',
  name: '',
  description: '',
  stock: '',
  price: '',
  category_id: '',
  published: '',
});

const isLoadingPage = ref(true)

const selectOptionPublished = ref([
  {
    value: "1",
    label: "Xuất bản"
  },
  {
    value: "0",
    label: "Ẩn"
  }
])

const category = ref({})

function getProductInformation() {
  useGetProductInformation()
      .then((response) => {
        product.value.id = response.data.data.id
        product.value.name = response.data.data.name
        product.value.description = response.data.data.description
        product.value.stock = response.data.data.stock
        product.value.price = response.data.data.price
        product.value.category_id = response.data.data.category_id
        product.value.published = response.data.data.published

        if (response.data.data.attachment.length > 0) {
          const attachments = response.data.data.attachment

          const thumbnail = attachments.find(image => image['type'] === 'thumbnails')

          const detail_products = attachments.filter(image => image['type'] === 'detail_products')

          if (thumbnail !== undefined) {
            url.value = thumbnail.url
            idAttachment.value = thumbnail.id
          }

          for (let i = 0; i < detail_products.length; i++) {
            detailProducts.value.push(detail_products[i])
          }
        }


        isLoadingPage.value = false
      })
}
async function submit() {
  useUpdateProductApi(product.value, id)
      .then((response) => {
        router.push({ name: 'index-product' })
        useToastStore().success('Cập nhật thành công', 3000)
      })
}

function getCategory() {
  useIndexCategoryApi()
      .then((response) => {
        category.value = response.data.data.data
      })
}

getCategory()

getProductInformation()

function onImageChangeThumbnail(e) {
  thumbnail.value = e.target.files[0]

  url.value = URL.createObjectURL(thumbnail.value)

  store('product', product.value.id, thumbnail.value, 'thumbnails')
      .then((response) => {
        idAttachment.value = response.data.data[0].id

        input.value.value = ''
      })
}

function onImageChangeDetailProducts(e) {
  const files = e.target.files

  if (!files.length) {
    return
  }

  store('product', product.value.id, files, 'detail_products')
      .then((response) => {
        const detail_products = response.data.data

        for (let i = 0; i < detail_products.length; i++) {
          detailProducts.value.push(detail_products[i])
        }
      })
}

function detachAndDeleteDetailProduct(id, attachment_id) {
  detailProducts.value.splice(id, 1)
  detach(attachment_id)
      .then((response) => {
      })
}

function detachThumbnail(attachment_id) {
  detach(attachment_id)
      .then((response) => {
        idAttachment.value = null
        url.value = ''
      })
}

function redirectIndex() {
  router.push({
    name: 'index-product'
  })
}

</script>
