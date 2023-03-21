<template>
  <ForgotLayout>
    <template #form-forgot-password>
      <FormForgotPasswordLayout textButton="Gửi OTP" title="Bạn quên mật khẩu?" subTitle="Đừng lo lắng, hãy nhập email phía bên dưới để được nhận mã OTP xác thực người dùng và đổi mật khẩu nhé!">
        <template #box-input>
          <InputBox name="Email" margin="mt-4 mb-1">
            <template #input>
              <InputEmail v-model:modelEmail="email" />
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

import { ref } from "vue";

const email = ref('')
</script>