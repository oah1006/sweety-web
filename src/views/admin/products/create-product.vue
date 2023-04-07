<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout setBackground="bg-white w-full mt-5 rounded-lg shadow-md" listName="Danh sách sản phẩm" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo sản phẩm" subTitle="Chào mừng bạn đến với trang tạo sản phẩm!"></TitlePage>
        </template>
        <template #title-box-image>
          <TitleFormField name="Ảnh sản phẩm" />
        </template>
        <template #avatar>
          <ImageProductLayout @detach-one-image-in-multiple="clickDeleteItemImage" v-model:modelDetailProducts="detailProducts" :url="url" widthBox="w-96" heightBox="h-56" width="w-96" height="h-62" shape=""
          >
            <template #input-image-thumbnail>
              <InputFile class="text-center ml-4 pb-4" @change-image="onImageChangeThumbnail" />
            </template>
            <template #input-multiple-image>
              <InputMultipleFile class="text-center ml-4 pb-4" @change-multiple-image="onImageChangeDetailProducts" />
            </template>
          </ImageProductLayout>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin sản phẩm" />
        </template>
        <template #box-input>
          <InputBox name="Tên sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="formProduct.name" placeholder="Tên sản phẩm" />
            </template>
          </InputBox>
          <InputBox name="Mô tả" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputDescription v-model:modelDescription="formProduct.description" />
            </template>
          </InputBox>
          <InputBox name="Số lượng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputStock v-model:modelStock="formProduct.stock" />
            </template>
          </InputBox>
          <InputBox name="Giá tiền" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPrice v-model:modelPrice="formProduct.price" />
            </template>
          </InputBox>
          <InputBox name="Loại sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectCategory v-model:modalSelectCategory="formProduct.category_id" :category="category" />
            </template>
          </InputBox>
          <InputBox name="Xuất bản" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectPublished v-model:modalPublished="formProduct.published" :selectOptionPublished="selectOptionPublished">
              </SelectPublished>
            </template>
          </InputBox>
        </template>
      </FormCreateLayout>
    </template>
  </CreateLayout>
</template>

<script setup>
import TitlePage from '@/components/TitlePage.vue'
import CreateLayout from "@/components/layouts/CreateLayout.vue";
import FormCreateLayout from "@/components/layouts/FormCreateLayout.vue";
import InputName from "@/components/inputs/InputName.vue";
import InputDescription from "@/components/inputs/InputDescription.vue";
import InputStock from "@/components/inputs/InputStock.vue";
import InputPrice from "@/components/inputs/InputPrice.vue";
import SelectCategory from "@/components/inputs/SelectCategory.vue";
import SelectPublished from "@/components/inputs/SelectPublished.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue";
import TitleFormField from "@/components/TitleFormField.vue";


import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputFile from "@/components/inputs/InputFile.vue";
import { useToastStore } from "@/stores/toast";
import { useIndexCategoryApi } from "@/repositories/category";
import {useStoreProductApi} from "@/repositories/product";
import ImageProductLayout from "@/components/layouts/ImageProductLayout.vue";
import InputMultipleFile from "@/components/inputs/InputMultipleFile.vue";
import IconDetachImage from "@/components/IconDetachImage.vue";
import {detach} from "@/repositories/attachment";

const router = useRouter();

const thumbnail = ref();

const detailProducts = ref([])

const url = ref('');

const formProduct = ref({
  name: '',
  description: '',
  stock: '',
  price: '',
  category_id: '',
  published: '',
});

const category = ref({})

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

function onImageChangeThumbnail(e) {
  thumbnail.value = e.target.files[0]
  url.value = URL.createObjectURL(thumbnail.value)
}

function onImageChangeDetailProducts(e) {
  detailProducts.value = []

  const selectedFiles = e.target.files

  if (!selectedFiles.length) {
    return
  }

  for (let i = 0; i < selectedFiles.length; i++) {
    detailProducts.value.push(selectedFiles[i])
  }
}

function clickDeleteItemImage(id, attachment_id = null) {
  detailProducts.value.splice(id, 1)
}

async function submit() {
  await useStoreProductApi(thumbnail.value, detailProducts.value, formProduct.value.name, formProduct.value.description, formProduct.value.stock,
      formProduct.value.price, formProduct.value.category_id, formProduct.value.published)
      .then((response) => {
        useToastStore().success('Tạo sản phẩm thành công', 3000)
        router.push({ name: 'index-product' })
      })
}

function getCategory() {
  useIndexCategoryApi()
      .then((response) => {
        category.value = response.data.data.data
      })
}

getCategory()

function redirectIndex() {
  router.push({
    name: 'index-product'
  })
}

</script>