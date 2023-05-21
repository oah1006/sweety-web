<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách Topping" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo Topping" subTitle="Chào mừng bạn đến với trang tạo topping!"></TitlePage>
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
      </FormCreateLayout>
    </template>
  </CreateLayout>
</template>

<script setup>
import CreateLayout from "@/components/layouts/CreateLayout.vue";
import FormCreateLayout from "@/components/layouts/FormCreateLayout.vue";
import TitlePage from "@/components/TitlePage.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import InputName from "@/components/inputs/InputName.vue";
import InputBoxLayout from "@/components/layouts/BoxInputLayout.vue";
import InputPrice from "@/components/inputs/InputPrice.vue";


import {useRouter} from "vue-router";
import {useProfileStore} from "@/stores/getMyProfile";
import {ref} from "vue";
import SelectPublished from "@/components/inputs/SelectPublished.vue";
import {useToastStore} from "@/stores/toast";
import {useCreateToppingApi} from "@/repositories/topping";

const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const topping = ref({
  name: '',
  published: '',
  price: '',
})

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

async function submit() {
  useCreateToppingApi(topping.value)
      .then((response) => {
        useToastStore().success('Tạo thành công', 3000)
        router.push({ name: 'index-topping' })
      })
}

</script>