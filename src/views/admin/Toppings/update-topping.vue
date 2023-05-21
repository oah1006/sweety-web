<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" @click-redirect="useClickRedirectIndex" listName="Danh sách Topping">
        <template #title>
          <TitlePage title="Cập nhật Topping" subTitle="Chào mừng bạn đến với trang cập nhật Topping cửa hàng!"></TitlePage>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin Topping" />
        </template>
        <template #box-input>
          <InputBoxLayout name="Tên Topping" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="topping.name" placeholder="Tên topping" />
            </template>
          </InputBoxLayout>
          <InputBoxLayout name="Giá tiền" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPrice v-model:modelPrice="topping.price" />
            </template>
          </InputBoxLayout>
          <InputBoxLayout name="Xuất bản" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectPublished v-model:modalPublished="topping.published" :selectOptionPublished="selectOptionPublished">
              </SelectPublished>
            </template>
          </InputBoxLayout>
        </template>
      </FormUpdateLayout>

    </template>
  </UpdateLayout>
</template>


<script setup>
import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import TitlePage from "@/components/TitlePage.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import InputBoxLayout from "@/components/layouts/BoxInputLayout.vue";
import SelectPublished from "@/components/inputs/SelectPublished.vue";
import InputPrice from "@/components/inputs/InputPrice.vue";
import InputName from "@/components/inputs/InputName.vue";

import {ref} from "vue";
import {useGetInformationToppingApi, useUpdateToppingApi} from "@/repositories/topping";
import {useToastStore} from "@/stores/toast";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const topping = ref({
  name: '',
  published: '',
  price: '',
})

const id = route.params.id

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

const isLoadingPage = ref(true)

function useClickRedirectIndex() {
  router.push({
    name: 'index-topping',
  })
}

function getInformationTopping() {
  useGetInformationToppingApi()
      .then((response) => {
        topping.value.name = response.data.data.name
        topping.value.price = response.data.data.price
        topping.value.published = response.data.data.published

        isLoadingPage.value = false
      })
}


getInformationTopping()

async function submit() {
  useUpdateToppingApi(topping.value, id)
      .then((response) => {
        router.push({ name: 'index-topping' })
        useToastStore().success('Cập nhật thành công', 3000)
      })
}

</script>