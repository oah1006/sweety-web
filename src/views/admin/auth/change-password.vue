<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" @click-redirect="useClickRedirectProfile" listName="Thông tin cá nhân">
        <template #title>
          <TitlePage title="Đổi mật khẩu" subTitle="Bạn sẽ cần phải nhập lại mật khẩu hiện tại của mình và mật khẩu mới để thay đổi nhé!"></TitlePage>
        </template>
        <template #box-input>
          <InputBox name="Mật khẩu cũ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/6">
            <template #input>
              <InputOldPassword v-model:modelOldPassword="formChangePassword.old_password" />
            </template>
          </InputBox>
          <InputBox name="Mật khẩu mới" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/6">
            <template #input>
              <InputPassword v-model:modelPassword="formChangePassword.password" />
            </template>
          </InputBox>
        </template>
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>
<script setup>
import InputPassword from "@/components/inputs/InputPassword.vue";
import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import TitlePage from "@/components/TitlePage.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import InputOldPassword from "@/components/inputs/InputOldPassword.vue";


import { ref } from "vue";
import { useRouter } from "vue-router";
import { useChangePasswordApi } from "@/repositories/auth";
import {useToastStore} from "@/stores/toast";

const router = useRouter()

const formChangePassword = ref({
  old_password: '',
  password: ''
})

function useClickRedirectProfile() {
  router.push('profile')
}

function submit() {
  useChangePasswordApi(formChangePassword.value)
      .then((response) => {
        useToastStore().success('Cập nhật mật khẩu thành công', 3000)
        router.push('profile')
      })
}

</script>