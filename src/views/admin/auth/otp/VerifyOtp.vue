<template>
  <ForgotLayout>
    <template #form-forgot-password>
      <FormForgotPasswordLayout textButton="Xác nhận OPT" title="Xác thực mã OTP" subTitle="Vui lòng nhập mã OTP 6 chữ số đã được gửi đến email của bạn. Mã OTP sẽ có hiệu lực trong 1 phút">
        <template #box-input>
          <InputBox margin="mt-4">
            <template #input>
              <InputOtp v-model:modelOtp="otp" />
            </template>
          </InputBox>
          <InputBox>
            <template #input>
              <InputEmail type="hidden" v-model:modelEmail="email" />
            </template>
          </InputBox>
        </template>
      </FormForgotPasswordLayout>
    </template>
  </ForgotLayout>
</template>

<script setup>

import ForgotLayout from "@/components/layouts/ForgotLayout.vue";
import FormForgotPasswordLayout from "@/components/layouts/FormForgotPasswordLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue";
import InputOtp from "@/components/inputs/InputOtp.vue";

import { ref } from "vue";

const otp = ref('')
const email = ref('')

</script>