<template>
  <ProfileLayout>
    <template #form-profile>
      <FormProfile>
        <template #title>
          <TitlePage title="Thông tin cá nhân" subTitle="Chào mừng bạn đến với trang thông nhân viên!"></TitlePage>
        </template>
        <template #avatar>
          <AvatarLayout :url="profileStore.profile.profile?.attachment?.url" width="w-32" height="h-32" shape="rounded-full">
            <template #icon-detach-image>
              <IconDetachImage :url="profileStore.profile.profile?.attachment?.url"  @detach-image="detachAttachment"/>
            </template>
            <template #input-image>
              <InputFile class="text-center ml-20 py-4" @change-image="onImageChange" />
            </template>
          </AvatarLayout>
        </template>
        <template #select>
          <SelectLayout name="Thông tin nhân viên" nameLabelStatus="Trạng thái" nameLabelRole="Vai trò">
            <template #role>
              <SelectRole >
              </SelectRole>
            </template>
            <template #status>
              <SelectStatus >
              </SelectStatus>
            </template>
          </SelectLayout>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin nhân viên" />
        </template>
        <template #box-input>
          <InputBox name="Email">
            <template #input>
              <InputEmail v-model:modelEmail="formStaff.email"/>
            </template>
          </InputBox>
          <InputBox name="Họ và tên">
            <template #input>
              <InputFullName v-model:modelFullName="formStaff.full_name" />
            </template>
          </InputBox>
          <InputBox name="Số điện thoại">
            <template #input>
              <InputPhoneNumber v-model:modelPhoneNumber="formStaff.phone_number" />
            </template>
          </InputBox>
          <InputBox name="Địa chỉ">
            <template #input>
              <InputAddress v-model:modelAddress="formStaff.address" />
            </template>
          </InputBox>
        </template>
      </FormProfile>
    </template>
  </ProfileLayout>
</template>
<script setup>
import ProfileLayout from "@/components/layouts/ProfileLayout.vue";
import FormProfile from "@/components/layouts/FormProfile.vue";
import TitlePage from "@/components/TitlePage.vue";
import AvatarLayout from "@/components/layouts/AvatarLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import SelectStatus from "@/components/inputs/SelectStatus.vue";
import SelectRole from "@/components/inputs/SelectRole.vue";
import SelectLayout from "@/components/layouts/SelectLayout.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";


import { useProfileStore } from "@/stores/getMyProfile"

import {detach, sync} from "@/repositories/attachment";
import {ref} from "vue";


const profileStore = useProfileStore()

const formStaff = ref({
  id: '',
  attachment_id: '',
  email: profileStore.profile.email,
  full_name: '',
  phone_number: '',
  address: '',
  is_admin: '',
  is_active: ''
})
function detachAttachment() {
  detach(formStaff.value.attachment_id)
      .then((response) => {
        url.value = ''
      })
}

function onImageChange(e) {
  file.value = e.target.files[0]
  console.log(file.value)

  sync('staff', formStaff.value.id, file.value, 'avatars')
      .then((response) => {
        console.log(response)
        url.value = URL.createObjectURL(file.value)
      })
}

</script>