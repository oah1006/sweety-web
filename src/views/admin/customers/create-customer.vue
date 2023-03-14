<template>
  <CreateLayout>
    <template #form-create>
      <FormCreateLayout>
        <template #title>
          <TitlePage title="Tạo khách hàng" subTitle="Chào mừng bạn đến với trang tạo khách hàng!"></TitlePage>
        </template>
        <template #email-input>
          <InputEmail v-model:modelEmail="customers.value.email" />
        </template>
        <template #password-input>
          <InputPassword v-model:modelPassword="customers.value.password" />
        </template>
        <template #fullname-input>
          <InputFullName v-model:modelFullName="customers.value.full_name" />
        </template>
        <template #phone-input>
          <InputPhoneNumber v-model:modelPhoneNumber="customers.value.phone_number" />
        </template>
        <template #address-input>
          <InputAddress v-model:modelAddress="customers.value.address" />
        </template>
      </FormCreateLayout>
    </template>
  </CreateLayout>
</template>

<script setup>

import CreateLayout from "@/components/layouts/CreateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormCreateLayout from "@/components/layouts/FormCreateLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputPassword from "@/components/inputs/InputPassword.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";

import { createCustomer } from "@/repositories/customer"

import { ref } from "vue"

const customers = ref({
  email: '',
  password: '',
  full_name: '',
  phone_number: '',
  address: ''
})

async function submit() {
  await createCustomer()
      .then((response) => {
        router.push({ name: 'index-customer' })
      })
}



</script>