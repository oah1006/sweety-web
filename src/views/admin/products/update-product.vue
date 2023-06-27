<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateProductLayout v-if="!isLoadingPage" listName="Danh sách sản phẩm" @click-redirect="redirectIndex">
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
          <BoxInputLayoutLayout name="Tên sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputName v-model:modelName="product.name" placeholder="Tên sản phẩm" />
            </template>
          </BoxInputLayoutLayout>
          <BoxInputLayoutLayout name="Mô tả" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputDescription v-model:modelDescription="product.description" />
            </template>
          </BoxInputLayoutLayout>
          <BoxInputLayoutLayout name="Số lượng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputStock v-model:modelStock="product.stock" />
            </template>
          </BoxInputLayoutLayout>
          <BoxInputLayoutLayout name="Giá tiền" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputPrice v-model:modelPrice="product.price" />
            </template>
          </BoxInputLayoutLayout>
          <BoxInputLayoutLayout name="Loại sản phẩm" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <SelectCategory v-model:modalSelectCategory="product.category_id" :category="categories" />
            </template>
          </BoxInputLayoutLayout>
          <BoxInputLayoutLayout name="Xuất bản" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <SelectPublished v-model:modalPublished="product.published" :selectOptionPublished="selectOptionPublished">
              </SelectPublished>
            </template>
          </BoxInputLayoutLayout>
          <BoxInputLayoutLayout name="Topping" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <div class="lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
                <div v-for="topping in toppings" :key="topping.id">
                  <InputCheckboxTopping :idTopping="topping.id" v-model:modalTopping="checkNames" :name="topping.name" :price="topping.price"></InputCheckboxTopping>
                </div>
              </div>
            </template>
          </BoxInputLayoutLayout>
        </template>
        <div class="my-6 shadow-md rounded-md bg-white py-6">

        </div>
        <template #title-variant>
          <TitleFormField name="Tạo biến thể của sản phâm" />
        </template>
        <template #list-table-row-head>
          <ListTableRow>
            <template #table-column>
              <ListTableColumn text="TÊN SIZE" />
              <ListTableColumn text="TỔNG TIỀN"/>
              <ListTableColumn />
            </template>
          </ListTableRow>
        </template>
        <template #list-table-row-body>
          <ListTableRow v-for="variant in variants" :key="variant">
            <template #table-column>
              <td class="lg:px-4 py-4">
                <InputSize placeholder="Tên size" v-model:modelSize="variant.size"></InputSize>
              </td>
              <td class="lg:px-4 py-4">
                <InputPrice v-model:modelPrice="variant.unit_price"></InputPrice>
              </td>
              <td class="px-4 py-4">
                  <a @click="useDeleteProductVariant(variant)" class="flex items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 mx-auto">
                          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                      </svg>
                  </a>
              </td>
            </template>
          </ListTableRow>
        </template>
        <template #button-add-element>
          <div class="flex items-center">
            <a @click="addVariantObject()" class="cursor-pointer mx-auto flex items-center gap-2 py-1 px-2 hover:bg-zinc-400 bg-zinc-300 rounded-lg border border-zinc-300 font-medium text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Thêm mới
            </a>
          </div>
        </template>
      </FormUpdateProductLayout>
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
import BoxInputLayoutLayout from "@/components/layouts/BoxInputLayout.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import InputFile from "@/components/inputs/InputFile.vue";
import ImageProductLayout from "@/components/layouts/ImageProductLayout.vue";
import InputMultipleFile from "@/components/inputs/InputMultipleFile.vue";
import InputCheckboxTopping from "@/components/inputs/InputCheckboxTopping.vue";
import InputSize from "@/components/inputs/InputSize.vue";

import { detach, storeAttachment } from '@/repositories/attachment'
import { useToastStore } from "@/stores/toast";
import {useRoute, useRouter} from 'vue-router'
import { ref } from 'vue'
import {useGetProductInformation, useUpdateProductApi} from "@/repositories/product";
import {useIndexCategoryApi} from "@/repositories/category";
import {useProfileStore} from "@/stores/getMyProfile";
import { useIndexToppingApi } from "@/repositories/topping";
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import ListTableRow from "@/components/table/ListTableRow.vue";
import FormUpdateProductLayout from "@/components/layouts/FormUpdateProductLayout.vue";

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
  productTopping: [],
});

const variants = ref([
    {
        size: null,
        unit_price: null
    }
])

function addVariantObject() {
    variants.value.push({
        size: '',
        unit_price: ''
    })

    console.log(variants.value)
}

function useDeleteProductVariant(id) {
  variants.value.splice(id, 1)
}

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

const categories = ref({})

const toppings  = ref({})
const checkNames = ref([])

function getToppings() {
  useIndexToppingApi()
      .then((response) => {
        toppings.value = response.data.data.data
      })
}

getToppings()

function getProductInformation() {
  useGetProductInformation()
      .then((response) => {
        variants.value = response.data.data.product_variants
        product.value.productTopping = response.data.data.product_toppings
        product.value.id = response.data.data.id
        product.value.name = response.data.data.name
        product.value.description = response.data.data.description
        product.value.stock = response.data.data.stock
        product.value.price = response.data.data.price
        product.value.category_id = response.data.data.category_id
        product.value.published = response.data.data.published

        if (product.value.productTopping) {
          for (let i = 0; i < product.value.productTopping.length; i++) {
            checkNames.value.push(product.value.productTopping[i]?.topping_id)
          }
        }

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
  useUpdateProductApi(id, product.value.name, product.value.description, product.value.stock,
      product.value.price, product.value.category_id, product.value.published, checkNames.value, variants.value)
      .then((response) => {
        router.push({ name: 'index-product' })
        useToastStore().success('Cập nhật thành công', 3000)
      })
}

function getCategory() {
  useIndexCategoryApi()
      .then((response) => {
        console.log(response.data.data.data)
        categories.value = response.data.data.data
      })
}

getCategory()

getProductInformation()

function onImageChangeThumbnail(e) {
  thumbnail.value = e.target.files[0]

  url.value = URL.createObjectURL(thumbnail.value)

  storeAttachment('product', product.value.id, thumbnail.value, 'thumbnails')
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

  storeAttachment('product', product.value.id, files, 'detail_products')
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
