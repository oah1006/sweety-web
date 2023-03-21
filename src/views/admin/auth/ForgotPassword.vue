<template>
  <ForgotLayout>
    <template #form-forgot-password>
      <FormForgotPasswordLayout title="Khôi phục mật khẩu" textButton="Xác nhận">
        <template #box-input>
          <InputBox name="Email mới" margin="mt-2">
            <template #input>
              <InputNewPassword v-model:modelNewPassword="new_password" />
            </template>
          </InputBox>
          <InputBox name="Xác nhận lại Email mới" margin="mt-4">
            <template #input>
              <InputPasswordConfirmation v-model:modelNewPasswordConfirmation="new_password_confirmation" />
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
import InputBox from "@/components/layouts/BoxInputLayout.vue";
import InputNewPassword from "@/components/inputs/InputNewPassword.vue";
import InputPasswordConfirmation from "@/components/inputs/InputPasswordConfirmation.vue";

import {ref} from "vue";

const new_password = ref('')
const new_password_confirmation = ref('')

</script>
