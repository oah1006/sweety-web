<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" listName="Danh sách nhân viên" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Cập nhật nhân viên" subTitle="Chào mừng bạn đến với trang cập nhật nhân viên!"></TitlePage>
        </template>
        <template #avatar>
          <AvatarLayout :url="url" width="w-48" height="h-48" shape="rounded-full">
            <template #icon-detach-image>
              <IconDetachImage :url="url"  @detach-image="detachAttachment" top="top-0" right="right-0"/>
            </template>
            <template #input-image>
              <InputFile v-model:modalInput="input" class="text-center ml-20 py-4" @change-image="onImageChange" />
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
          <InputBox name="Vai trò">
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
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>

<script setup>

import TitlePage from '@/components/TitlePage.vue'

import {useGetStaffInformation, useUpdateStaffApi} from "@/repositories/staff"

import { sync, detach } from '@/repositories/attachment'
import { useToastStore } from "@/stores/toast";


import {useRoute, useRouter} from 'vue-router'
import { ref } from 'vue'


import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import AvatarLayout from "@/components/layouts/AvatarLayout.vue";
import SelectRole from "@/components/inputs/SelectRole.vue";
import SelectStatus from "@/components/inputs/SelectStatus.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import InputFile from "@/components/inputs/InputFile.vue";
import IconDetachImage from "@/components/IconDetachImage.vue";

const router = useRouter()

const file = ref('')

const input = ref('')

const url = ref('')

const route = useRoute();

const id = route.params.id

const formStaff = ref({
    id: '',
    attachment_id: '',
    email: '',
    full_name: '',
    phone_number: '',
    address: '',
    is_admin: '',
    is_active: ''
})

const isLoadingPage = ref(true)

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

function onImageChange(e) {
    file.value = e.target.files[0]
    url.value = URL.createObjectURL(file.value)

    sync('staff', formStaff.value.id, file.value, 'avatars') 
      .then((response) => {
        formStaff.value.attachment_id = response.data[0][0].id
        input.value.value = ''
      })
}

function detachAttachment() {
  detach(formStaff.value.attachment_id)
    .then((response) => {
      url.value = ''
    })
}

function getStaffInformation() {
  useGetStaffInformation()
    .then((response) => {
      formStaff.value.id = response.data.id
      formStaff.value.attachment_id = response.data.attachment?.id
      formStaff.value.email = response.data.user?.email
      formStaff.value.full_name = response.data.full_name
      formStaff.value.phone_number = response.data.user?.phone_number
      formStaff.value.address = response.data.user?.address
      formStaff.value.is_admin = response.data.is_admin
      formStaff.value.is_active = response.data.is_active

      if (response.data.attachment != null) {
          url.value = response.data.attachment.url
      }

      isLoadingPage.value = false
    })
}
async function submit() {
  useUpdateStaffApi(formStaff.value, id)
    .then((response) => {
      router.push({ name: 'index-staff' })
      useToastStore().success('Cập nhật thành công', 3000)
    })
}

getStaffInformation()

function redirectIndex() {
  router.push({
    name: 'index-staff'
  })
}

</script>
