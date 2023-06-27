<template>
  <ForgotLayout @submit.prevent="submit">
    <template #form-forgot-password>
      <FormForgotPasswordLayout title="Khôi phục mật khẩu" textButton="Xác nhận">
        <template #box-input>
          <BoxInputLayout>
            <template #input>
              <InputEmail type="hidden" v-model:modelEmail="formForgotPassword.email" />
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Email mới" margin="mt-2">
            <template #input>
              <InputNewPassword v-model:modelNewPassword="formForgotPassword.new_password" />
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Xác nhận lại Email mới" margin="mt-4">
            <template #input>
              <InputPasswordConfirmation v-model:modelNewPasswordConfirmation="formForgotPassword.new_password_confirmation" />
            </template>
          </BoxInputLayout>
        </template>
      </FormForgotPasswordLayout>
    </template>
  </ForgotLayout>
</template>

<script setup>
import ForgotLayout from "@/components/layouts/ForgotLayout.vue";
import FormForgotPasswordLayout from "@/components/layouts/FormForgotPasswordLayout.vue";
import BoxInputLayout from "@/components/layouts/BoxInputLayout.vue";
import InputNewPassword from "@/components/inputs/InputNewPassword.vue";
import InputPasswordConfirmation from "@/components/inputs/InputPasswordConfirmation.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {useForgotPasswordApi} from "@/repositories/auth";
import {useToastStore} from "@/stores/toast";

const route = useRoute()
const router = useRouter()

const formForgotPassword = ref({
  email: route.query.email,
  new_password: '',
  new_password_confirmation: ''
})

const tokenOtp = $cookies.get('tokenOtp')

function submit() {
  useForgotPasswordApi(formForgotPassword.value, tokenOtp)
      .then((response) => {
        useToastStore().success('Bạn đã thay đổi mật khẩu thành công', 3000)
        router.push('/')
      })
}

</script>
