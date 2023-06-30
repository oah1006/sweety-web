<template>
  <DetailLayout>
    <template #form-detail>
      <FormDetailLayout v-if="!isLoadingPage" @use-click-index="redirectIndex" @use-click-update="useClickRedirectUpdate"
                        listName="Danh sách nhân viên" :item-id="staff.id">
        <template #title>
          <TitlePage title="Thông tin nhân viên" subTitle="Chào mừng bạn đến với trang thông tin nhân viên!"></TitlePage>
        </template>
        <template #avatar>
          <BoxAvatarDetail nameLabel="Họ và tên" :item="staff.full_name" :url="url" :role="staff.role" width="w-28" height="h-28" />
        </template>
        <template #box-item>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2" color="!text-orange-500"  nameLabel="Mã nhân viên" :item="staff.code"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Email" :item="staff.user?.email"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Địa chỉ" :item="staff.address"/>
          <BoxItem border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Số điện thoại" :item="staff.phone_number"/>
          <BoxItemLink border="border-b border-solid border-gray-100" padding="px-10 pt-3 pb-4" width="lg:w-1/6 w-1/2"  nameLabel="Làm việc tại" location="detail-stores" :id="staff.store.id" :item="staff.store.store_name"/>
          <BoxItemStatus class="py-4 px-10" nameLabel="Trạng thái" :item="staff.is_active"/>
        </template>
      </FormDetailLayout>
      <LoadingPage v-else />
    </template>
  </DetailLayout>
</template>

<script setup>

import DetailLayout from "@/components/layouts/DetailLayout.vue"
import FormDetailLayout from "@/components/layouts/FormDetailLayout.vue"
import TitlePage from "@/components/TitlePage.vue"
import BoxItem from "@/components/details/BoxItem.vue"
import BoxAvatarDetail from "@/components/details/BoxAvatarDetail.vue"
import LoadingPage from "@/components/loadings/LoadingPage.vue"
import BoxItemStatus from "@/components/details/BoxItemStatus.vue";

import { useGetStaffInformation } from "@/repositories/staff"
import { ref } from "vue";
import { useRouter } from 'vue-router'
import BoxItemLink from "@/components/details/BoxItemLink.vue";

const router = useRouter();

const url = ref('')

const staff = ref({})



const isLoadingPage = ref(true)

function getInformationCustomer() {
  useGetStaffInformation()
      .then((response) => {
        staff.value = response.data
        url.value = response.data.attachment?.url

        isLoadingPage.value = false
      })
}

getInformationCustomer()

function redirectIndex() {
  router.push({
    name: 'index-staff'
  })
}

function useClickRedirectUpdate(id) {
  router.push({
    name: 'update-staff',
    params: {
      id: id
    }
  })
}


</script>