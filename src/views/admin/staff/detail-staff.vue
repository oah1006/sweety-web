<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout @use-click-index="useClickRedirectIndex" :item-id="staff.id">
        <template #title>
          <TitlePage title="Thông tin nhân viên" subTitle="Chào mừng bạn đến với trang thông tin nhân viên!"></TitlePage>
        </template>
        <template #box-image>
          <BoxAvatarDetail class="" nameLabel="Họ và tên" :item="staff.full_name" :url="staff.attachment?.url" :role="staff.is_admin" />
        </template>
        <template #box-item>
          <BoxItem nameLabel="Mã nhân viên" :item="staff.code"/>
          <BoxItem nameLabel="Email" :item="staff.user?.email"/>
          <BoxItem nameLabel="địa chỉ" :item="staff.user?.address"/>
          <BoxItem nameLabel="Số điện thoại" :item="staff.user?.phone_number"/>
          <BoxItemRole class="py-4 px-10" nameLabel="Vai trò" :item="staff.is_admin"/>
        </template>
      </FormDetailLayout>
    </template>
  </DetailLayout>
</template>

<script setup>

import { useGetStaffInformation } from "@/repositories/staff";
import DetailLayout from "@/components/layouts/DetailLayout.vue";
import FormDetailLayout from "@/components/layouts/FormDetailLayout.vue";
import TitlePage from "@/components/TitlePage.vue";
import BoxItem from "@/components/details/BoxItem.vue";
import { ref } from "vue";
import BoxItemRole from "@/components/details/BoxItemRole.vue";
import BoxItemStatus from "@/components/details/BoxItemStatus.vue";
import BoxAvatarDetail from "@/components/details/BoxAvatarDetail.vue";

const staff = ref({
  code: '',
  email: '',
  full_name: '',
  address: '',
  phone_number: '',
  is_active: '',
  is_admin: '',
  src: ''
})

function getInformationCustomer() {
  useGetStaffInformation()
      .then((response) => {
        console.log(response.data)
        staff.value = response.data
      })
}

getInformationCustomer()
</script>