<template>
  <ForgotLayout @submit.prevent="submit">
    <template #form-forgot-password>
      <FormForgotPasswordLayout textButton="Xác nhận OPT" title="Xác thực mã OTP" subTitle="Vui lòng nhập mã OTP 6 chữ số đã được gửi đến email của bạn. Mã OTP sẽ có hiệu lực trong 1 phút">
        <template #box-input>
          <BoxInputLayout margin="mt-4">
            <template #input>
              <InputOtp v-model:modelOtp="formVerifyOtp.otp" />
            </template>
          </BoxInputLayout>
          <BoxInputLayout>
            <template #input>
              <InputEmail type="hidden" v-model:modelEmail="formVerifyOtp.email" />
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
import InputOtp from "@/components/inputs/InputOtp.vue";

import { ref } from "vue";
import {useVerifyOtpApi} from "@/repositories/otp";
import { useRoute, useRouter } from 'vue-router'
import {useToastStore} from "@/stores/toast";

const route = useRoute()
const router = useRouter()

const formVerifyOtp = ref({
  email: route.query.email,
  otp: ''
})

function submit() {
  useVerifyOtpApi(formVerifyOtp.value)
      .then((response) => {
        $cookies.set('tokenOtp', response.data.token, 60*60*24)

        useToastStore().success('Mã OTP hợp lệ', 3000)

        router.push(`forgot-password?email=${formVerifyOtp.value.email}`)
      })
      .catch((error) => {
        useToastStore().error('Mã OTP của bạn đã hết hạn', 3000)
        router.push('send-otp')
      })
}

</script>