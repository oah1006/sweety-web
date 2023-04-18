<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách nhân viên" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo nhân viên" subTitle="Chào mừng bạn đến với trang tạo nhân viên!"></TitlePage>
        </template>
        <template #avatar>
          <AvatarLayout :url="url" width="w-48" height="h-48" shape="rounded-full"
          >
            <template #input-image>
              <InputFile class="text-center ml-4 py-4" @change-image="onImageChange" />
            </template>
          </AvatarLayout>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin nhân viên" />
        </template>
        <template #box-input>
          <InputBox name="Email" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputEmail v-model:modelEmail="formStaff.email" />
            </template>
          </InputBox>
          <InputBox name="Mật khẩu" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPassword v-model:modelPassword="formStaff.password" />
            </template>
          </InputBox>
          <InputBox name="Họ và tên" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputFullName v-model:modelFullName="formStaff.full_name" />
            </template>
          </InputBox>
          <InputBox name="Địa chỉ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputAddress v-model:modelAddress="formStaff.address" placeholder="Địa chỉ" />
            </template>
          </InputBox>
          <InputBox name="Số điện thoại" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputPhoneNumber v-model:modelPhoneNumber="formStaff.phone_number" />
            </template>
          </InputBox>
          <InputBox name="Vai trò" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectRole v-model:modalSelectRole="formStaff.role" :selectOptionRole="selectOptionRole">
              </SelectRole>
            </template>
          </InputBox>
          <InputBox name="Trạng thái" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectStatus v-model:modalSelectStatus="formStaff.is_active" :selectOptionStatus="selectOptionStatus">
              </SelectStatus>
            </template>
          </InputBox>
          <InputBox name="Cửa hàng chi nhánh" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <SelectStore v-model:modalSelectStore="formStaff.store_id" :stores="stores">
              </SelectStore>
            </template>
          </InputBox>
        </template>
      </FormCreateLayout>
    </template>
  </CreateLayout>
</template>

<script setup>
import TitlePage from '@/components/TitlePage.vue'
import CreateLayout from "@/components/layouts/CreateLayout.vue"
import AvatarLayout from "@/components/layouts/AvatarLayout.vue"
import FormCreateLayout from "@/components/layouts/FormCreateLayout.vue"
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import InputEmail from "@/components/inputs/InputEmail.vue"
import InputPassword from "@/components/inputs/InputPassword.vue"
import InputFullName from "@/components/inputs/InputFullName.vue"
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue"
import InputAddress from "@/components/inputs/InputAddress.vue"
import SelectRole from "@/components/inputs/SelectRole.vue"
import SelectStatus from "@/components/inputs/SelectStatus.vue"
import TitleFormField from "@/components/TitleFormField.vue"

import { useStoreStaffApi } from "@/repositories/staff";
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputFile from "@/components/inputs/InputFile.vue";
import {useToastStore} from "@/stores/toast";
import SelectStore from "@/components/inputs/SelectStore.vue";
import {useIndexStoreApi} from "@/repositories/store";
import {useProfileStore} from "@/stores/getMyProfile";
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";

const router = useRouter();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const file = ref();
const url = ref('');

const formStaff = ref({
  email: '',
  password: '',
  full_name: '',
  address: '',
  phone_number: '',
  role: '',
  is_active: '',
  store_id: '',
});

const stores = ref({});

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


function getStore() {
  useIndexStoreApi()
      .then((response) => {
        stores.value = response.data.data.data
      })
}

getStore()

function onImageChange(e) {
  file.value = e.target.files[0]
  url.value = URL.createObjectURL(file.value)
}   

async function submit() {
  await useStoreStaffApi(file.value, formStaff.value.email, formStaff.value.password, formStaff.value.full_name,
      formStaff.value.phone_number, formStaff.value.address, formStaff.value.role, formStaff.value.is_active, formStaff.value.store_id)
        .then((response) => {
          useToastStore().success('Tạo nhân viên thành công', 3000)
          router.push({ name: 'index-staff' })
        })
        .catch((error) => {
          if (error.response.status === 403) {
            throw new Error('Access denied')
          }
        })
}

function redirectIndex() {
  router.push({
    name: 'index-staff'
  })
}

</script>
