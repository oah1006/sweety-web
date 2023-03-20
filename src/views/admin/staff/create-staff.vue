<template>
  <CreateLayout @submit.prevent="submit">
    <template #form-create>
      <FormCreateLayout listName="Danh sách nhân viên" @redirect-index="redirectIndex">
        <template #title>
          <TitlePage title="Tạo nhân viên" subTitle="Chào mừng bạn đến với trang tạo nhân viên!"></TitlePage>
        </template>
        <template #avatar>
          <AvatarLayout @change-image="onImageChange" :url="url" border="border border-zinc-100 border-solid"
                        round="rounded-lg" shadow="shadow" width="w-32" height="h-32" shape="rounded-lg"
                        background="bg-white" widthBox="w-1/4"
          >
            <template #input-image>
              <InputFile class="text-center ml-20 py-4" @change-image="onImageChange" />
            </template>
          </AvatarLayout>
        </template>
        <template #select>
          <SelectLayout name="Thông tin nhân viên" nameLabelStatus="Trạng thái" nameLabelRole="Vai trò">
            <template #role>
              <SelectRole v-model:modalSelectRole="formStaff.is_admin" :selectOptionRole="selectOptionRole" >
              </SelectRole>
            </template>
            <template #status>
              <SelectStatus v-model:modalSelectStatus="formStaff.is_active" :selectOptionStatus="selectOptionStatus">
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
              <InputEmail v-model:modelEmail="formStaff.email" />
            </template>
          </InputBox>
          <InputBox name="Mật khẩu">
            <template #input>
              <InputPassword v-model:modelPassword="formStaff.password" />
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
      </FormCreateLayout>
    </template>
  </CreateLayout>
</template>

<script setup>
import TitlePage from '@/components/TitlePage.vue'
import CreateLayout from "@/components/layouts/CreateLayout.vue";
import AvatarLayout from "@/components/layouts/AvatarLayout.vue";
import FormCreateLayout from "@/components/layouts/FormCreateLayout.vue";
import SelectLayout from "@/components/layouts/SelectLayout.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue";
import InputEmail from "@/components/inputs/InputEmail.vue";
import InputPassword from "@/components/inputs/InputPassword.vue";
import InputFullName from "@/components/inputs/InputFullName.vue";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import SelectRole from "@/components/inputs/SelectRole.vue";
import SelectStatus from "@/components/inputs/SelectStatus.vue";
import TitleFormField from "@/components/TitleFormField.vue";

import { useStoreStaffApi } from "@/repositories/staff";
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputFile from "@/components/inputs/InputFile.vue";

const router = useRouter();

const file = ref();
const url = ref('');

const formStaff = ref({
  email: '',
  password: '',
  full_name: '',
  phone_number: '',
  address: '',
  is_admin: '',
  is_active: ''
});

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
}   

async function submit() {
  await useStoreStaffApi(file.value, formStaff.value.email, formStaff.value.password, formStaff.value.full_name,
  formStaff.value.phone_number, formStaff.value.address, formStaff.value.is_admin, formStaff.value.is_active)
    .then((response) => {
      router.push({ name: 'index-staff' })
    })
}

function redirectIndex() {
  router.push({
    name: 'index-staff'
  })
}

</script>
