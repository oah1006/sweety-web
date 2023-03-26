<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" listName="Danh sách nhân viên" @click-redirect="redirectIndex">
        <template #title>
          <TitlePage title="Cập nhật nhân viên" subTitle="Chào mừng bạn đến với trang cập nhật nhân viên!"></TitlePage>
        </template>
        <template #avatar>
          <AvatarLayout :url="url" width="w-48" height="h-48" shape="rounded-full">
            <template #icon-detach-image>
              <IconDetachImage :url="url"  @detach-image="detachAttachment" top="top-0" right="right-0"/>
            </template>
            <template #input-image>
              <InputFile v-model:modalInput="input" class="text-center ml-20 py-4" @change-image="onImageChange" />
            </template>
          </AvatarLayout>
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
import AvatarLayout from "@/components/layouts/AvatarLayout.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import InputFile from "@/components/inputs/InputFile.vue";
import IconDetachImage from "@/components/IconDetachImage.vue";

import { sync, detach } from '@/repositories/attachment'
import { useToastStore } from "@/stores/toast";


import {useRoute, useRouter} from 'vue-router'
import { ref } from 'vue'



import {useGetProductInformation, useUpdateProductApi} from "@/repositories/product";
import {useIndexCategoryApi} from "@/repositories/category";

const router = useRouter()

const file = ref('')

const input = ref('')

const url = ref('')

const route = useRoute();

const id = route.params.id

const product = ref({
  attachment_id: '',
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

function onImageChange(e) {
  file.value = e.target.files[0]
  url.value = URL.createObjectURL(file.value)

  sync('product', product.value.id, file.value, 'thumbnails')
      .then((response) => {
        product.value.attachment_id = response.data[0][0].id
        input.value.value = ''
      })
}

function detachAttachment() {
  detach(product.value.attachment_id)
      .then((response) => {
        url.value = ''
      })
}

function getProductInformation() {
  useGetProductInformation()
      .then((response) => {

        product.value.attachment_id = response.data.data.attachment?.id

        product.value.id = response.data.data.id
        product.value.name = response.data.data.name
        product.value.description = response.data.data.description
        product.value.stock = response.data.data.stock
        product.value.price = response.data.data.price
        product.value.category_id = response.data.data.category_id
        product.value.published = response.data.data.published


        if (response.data.data.attachment != null) {
          url.value = response.data.data.attachment?.url
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

function redirectIndex() {
  router.push({
    name: 'index-product'
  })
}

</script>
