<template>
  <ProfileLayout>
    <template #form-profile>
      <FormProfile @submit.prevent="submit" :isLoadingButton="isLoadingButton">
        <template #title>
          <TitlePage title="Thông tin cá nhân" subTitle="Chào mừng bạn đến với trang thông nhân viên!"></TitlePage>
        </template>
        <template #avatar>
          <AvatarLayout :url="url" width="w-48" height="h-48" shape="rounded-full">
            <template #icon-detach-image>
              <IconDetachImage :url="url"  @detach-image="detachAttachment" top="top-0" right="right-0"/>
            </template>
            <template #input-image>
              <InputFile class="text-center ml-20 py-4" @change-image="onImageChange" />
            </template>
          </AvatarLayout>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin nhân viên" />
        </template>
        <template #box-input>
          <InputBox name="Email">
            <template #input>
              <InputEmail v-model:modelEmail="formStaff.email" />
            </template>
          </InputBox>
          <InputBox name="Họ và tên">
            <template #input>
              <InputFullName v-model:modelFullName="formStaff.full_name"/>
            </template>
          </InputBox>
          <InputBox name="Số điện thoại">
            <template #input>
              <InputPhoneNumber v-model:modelPhoneNumber="formStaff.phone_number"/>
            </template>
          </InputBox>
          <InputBox name="Địa chỉ">
            <template #input>
              <InputAddress v-model:modelAddress="formStaff.address" />
            </template>
          </InputBox>
          <InputBox name="vai trò">
            <template #input>
              <SelectRole v-model:modalSelectRole="formStaff.is_admin" :selectOptionRole="selectOptionRole">
              </SelectRole>
            </template>
          </InputBox>
          <InputBox name="Trạng thái">
            <template #input>
              <SelectStatus v-model:modalSelectStatus="formStaff.is_active" :selectOptionStatus="selectOptionStatus">
              </SelectStatus>
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
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import IconDetachImage from "@/components/IconDetachImage.vue";
import InputFile from "@/components/inputs/InputFile.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"

import { useProfileStore } from "@/stores/getMyProfile"
import { ref } from "vue";
import { detach, sync } from "@/repositories/attachment";
import { useUpdateProfileApi } from "@/repositories/auth";

const profileStore = useProfileStore()

const file = ref('')

const url = ref('')

const isLoadingButton = ref(false)

if (profileStore.profile.profile?.attachment != null) {
  url.value = profileStore.profile.profile?.attachment?.url
}

const formStaff = ref({
  id: profileStore.profile.profile?.id,
  email: profileStore.profile.email,
  full_name: profileStore.profile.profile?.full_name,
  phone_number: profileStore.profile.phone_number,
  address: profileStore.profile.address,
  is_admin: profileStore.profile.profile?.is_admin,
  is_active: profileStore.profile.profile?.is_active
})

const selectOptionRole = ref([
  {
    value: "1",
    label: "Quản lý"
  },
  {
    value: "0",
    label: "Nhân viên"
  }
])

const selectOptionStatus = ref([
  {
    value: "1",
    label: "Hoạt động"
  },
  {
    value: "0",
    label: "Không hoạt động"
  }
])


function detachAttachment() {
  detach(profileStore.profile.profile?.attachment.id)
      .then((response) => {
        profileStore.getMyProfile()
        url.value = ''
      })
}

function onImageChange(e) {
  file.value = e.target.files[0]

  sync('staff', formStaff.value.id, file.value, 'avatars')
      .then((response) => {
        profileStore.getMyProfile()
        url.value = URL.createObjectURL(file.value)
      })
}

async function submit() {
  isLoadingButton.value = true

  setTimeout(() => {
    useUpdateProfileApi(formStaff.value)
        .then((response) => {
          profileStore.getMyProfile()
          isLoadingButton.value = false
        })
  }, 1000)

}

</script>