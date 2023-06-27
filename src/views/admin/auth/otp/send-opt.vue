<template>
  <ForgotLayout @submit.prevent="submit">
    <template #form-forgot-password>
      <FormForgotPasswordLayout textButton="Gửi OTP" title="Bạn quên mật khẩu?" subTitle="Đừng lo lắng, hãy nhập email phía bên dưới để được nhận mã OTP xác thực người dùng và đổi mật khẩu nhé!">
        <template #box-input>
          <BoxInputLayout name="Email" margin="mt-4 mb-1">
            <template #input>
              <InputEmail v-model:modelEmail="email" />
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
import InputEmail from "@/components/inputs/InputEmail.vue";
import BoxInputLayout from "@/components/layouts/BoxInputLayout.vue";

import { ref } from "vue";
import { useSendOtpApi } from "@/repositories/otp";
import { useRouter } from "vue-router";
import {useToastStore} from "@/stores/toast";

const router = useRouter()
const email = ref('')

function submit() {
  useSendOtpApi(email.value)
    .then((response) => {
      useToastStore().success('Gửi mã OTP thành công', 3000)
      router.push(`verify-otp?email=${email.value}`)
    })
}


</script>