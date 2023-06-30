<template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" listName="Danh sách nhân viên" @click-redirect="redirectIndex">
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
          <BoxInputLayout name="Email" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputEmail v-model:modelEmail="formStaff.email" />
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.email">
                <p v-if="errors?.errors?.email">{{ errors?.errors?.email[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Họ và tên" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputFullName v-model:modelFullName="formStaff.full_name" />
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.full_name">
                <p v-if="errors?.errors?.full_name">{{ errors?.errors?.full_name[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Địa chỉ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputAddress v-model:modelAddress="formStaff.address" placeholder="Địa chỉ" />
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.address">
                <p v-if="errors?.errors?.address">{{ errors?.errors?.address[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Số điện thoại" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <InputPhoneNumber v-model:modelPhoneNumber="formStaff.phone_number" />
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.phone_number">
                <p v-if="errors?.errors?.phone_number">{{ errors?.errors?.phone_number[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Vai trò" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <SelectRole v-model:modalSelectRole="formStaff.role" :selectOptionRole="selectOptionRole">
              </SelectRole>
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.role">
                <p v-if="errors?.errors?.role">{{ errors?.errors?.role[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Trạng thái" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <SelectStatus v-model:modalSelectStatus="formStaff.is_active" :selectOptionStatus="selectOptionStatus">
              </SelectStatus>
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.is_active">
                <p v-if="errors?.errors?.is_active">{{ errors?.errors?.is_active[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
          <BoxInputLayout name="Cửa hàng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="lg:w-1/12 w-1/2">
            <template #input>
              <SelectStore v-model:modalSelectStore="formStaff.store_id" :stores="stores">
              </SelectStore>
            </template>
            <template #error>
              <div class="text-red-900 mt-2 text-md px-4 py-2 bg-red-100 rounded-md h-26 px-10 my-3 mx-10" v-if="errors?.errors?.store_id">
                <p v-if="errors?.errors?.store_id">{{ errors?.errors?.store_id[0] }}</p>
              </div>
            </template>
          </BoxInputLayout>
        </template>
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>

<script setup>

import TitlePage from '@/components/TitlePage.vue'

import {useGetStaffInformation, useUpdateStaffApi} from "@/repositories/staff"

import { storeAttachment, detach } from '@/repositories/attachment'
import { useToastStore } from "@/stores/toast";


import {useRoute, useRouter} from 'vue-router'
import { ref } from 'vue'


import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import AvatarLayout from "@/components/layouts/AvatarLayout.vue";
import SelectRole from "@/components/inputs/SelectRole.vue";
import SelectStatus from "@/components/inputs/SelectStatus.vue";
import BoxInputLayout from "@/components/layouts/BoxInputLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import InputFile from "@/components/inputs/InputFile.vue";
import IconDetachImage from "@/components/IconDetachImage.vue";
import {useProfileStore} from "@/stores/getMyProfile";
import SelectStore from "@/components/inputs/SelectStore.vue";
import {useIndexStoreApi} from "@/repositories/store";

const router = useRouter()

const file = ref('')

const input = ref('')

const url = ref( + '')

const route = useRoute();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const id = route.params.id

const stores = ref({});

const formStaff = ref({
    id: '',
    attachment_id: '',
    email: '',
    full_name: '',
    phone_number: '',
    address: '',
    role: '',
    is_active: '',
    store_id: '',
})

const isLoadingPage = ref(true)

const selectOptionRole = ref([
  {
    value: "administrator",
    label: "Quản trị viên"
  },
  {
    value: "manager",
    label: "Quản lý"
  },
  {
    value: "employee",
    label: "Nhân viên"
  },
  {
    value: "shipper",
    label: "Shipper"
  },
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

    storeAttachment('staff', formStaff.value.id, file.value, 'avatars')
      .then((response) => {
        console.log(response.data)
        formStaff.value.attachment_id = response.data.id
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
      formStaff.value.phone_number = response.data.phone_number
      formStaff.value.role = response.data.role
      formStaff.value.is_active = response.data.is_active
      formStaff.value.store_id = response.data.store.id
      formStaff.value.address = response.data.address

      if (response.data.attachment != null) {
          url.value = response.data.attachment.url
      }

      isLoadingPage.value = false
    })
}

function getStore() {
  useIndexStoreApi()
      .then((response) => {
        stores.value = response.data.data.data
      })
}

const errors = ref({})

getStore();
async function submit() {
  useUpdateStaffApi(formStaff.value, id)
    .then((response) => {
      router.push({ name: 'index-staff' })
      useToastStore().success('Cập nhật thành công', 3000)
    })
    .catch((error) => {
      errors.value = error.response.data
      console.log(errors.value)
    })
}

getStaffInformation()

function redirectIndex() {
  router.push({
    name: 'index-staff'
  })
}

</script>
