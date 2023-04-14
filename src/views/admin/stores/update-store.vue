 <template>
  <UpdateLayout @submit.prevent="submit">
    <template #form-create>
      <FormUpdateLayout v-if="!isLoadingPage" @click-redirect="useClickRedirectIndex" listName="Danh sách nhân viên">
        <template #title>
          <TitlePage title="Cập nhật cửa hàng" subTitle="Chào mừng bạn đến với trang cập nhật thông tin cửa hàng!"></TitlePage>
        </template>
        <template #title-box-input>
          <TitleFormField name="Thông tin cửa hàng" />
        </template>
        <template #box-input>
          <InputBox name="Tên cửa hàng" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputName v-model:modelName="store.store_name" placeholder="Tên cửa hàng"/>
            </template>
          </InputBox>
          <InputBox name="Giờ mở cửa" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputOpenStore v-model:modelOpenStore="store.open_store" />
            </template>
          </InputBox>
          <InputBox name="Giờ đóng cửa" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
            <template #input>
              <InputCloseStore v-model:modelCloseStore="store.close_store" />
            </template>
          </InputBox>
        </template>
        <template #title-box-input-address>
          <TitleFormField name="Địa chỉ" />
        </template>
        <template #box-input-address>
          <BoxInputAddressLayout border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center justify-between gap-4" width="w-1/12">
            <template #address>
              <BoxInputAddress name="Số nhà" >
                <template #input>
                  <InputAddress v-model:modelAddress="store.house_number" placeholder="Số nhà" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Đường" >
                <template #input>
                  <InputAddress v-model:modelAddress="store.street" placeholder="Đường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Phường" >
                <template #input>
                  <InputAddress v-model:modelAddress="store.ward" placeholder="Phường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Quận" >
                <template #input>
                  <InputAddress v-model:modelAddress="store.district" placeholder="Quận" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Thành phố" >
                <template #input>
                  <InputAddress v-model:modelAddress="store.city" placeholder="Thành phố" />
                </template>
              </BoxInputAddress>
            </template>
          </BoxInputAddressLayout>
        </template>
      </FormUpdateLayout>
      <LoadingPage v-else />
    </template>
  </UpdateLayout>
</template>


<script setup>
import UpdateLayout from "@/components/layouts/UpdateLayout.vue";
import TitlePage from "@/components/TitlePage.vue"
import FormUpdateLayout from "@/components/layouts/FormUpdateLayout.vue";
import InputAddress from "@/components/inputs/InputAddress.vue";
import InputBox from "@/components/layouts/BoxInputLayout.vue"
import TitleFormField from "@/components/TitleFormField.vue";
import LoadingPage from "@/components/loadings/LoadingPage.vue";
import InputName from "@/components/inputs/InputName.vue";
import InputOpenStore from "@/components/inputs/InputOpenStore.vue";
import InputCloseStore from "@/components/inputs/InputCloseStore.vue";

import {computed, ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast";
import { useGetStoreInformationApi, useUpdateStoreApi } from "@/repositories/store";
import {useProfileStore} from "@/stores/getMyProfile";
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";


const router = useRouter();
const route = useRoute();

const profileStore = useProfileStore()

if (profileStore.profile.profile?.role !== 'administrator') {
  router.push({ name: '403' })
}

const store = ref({
  store_name: '',
  open_store: '',
  close_store: '',
  house_number: '',
  street: '',
  ward: '',
  district: '',
  city: ''
})

const id = route.params.id

const isLoadingPage = ref(true)

async function submit() {
  useUpdateStoreApi(store.value, id)
      .then((response) => {
        useToastStore().success('Cập nhật thành công', 3000)
        router.push({ name: 'index-stores' })
      })
      .catch((error) => {
        console.log(error)
      })
}
function getInformationStore() {
  useGetStoreInformationApi()
      .then((response) => {
        store.value.store_name = response.data.data.store_name
        store.value.house_number = response.data.data.address.house_number
        store.value.street = response.data.data.address.street
        store.value.ward = response.data.data.address.ward
        store.value.district = response.data.data.address.district
        store.value.city = response.data.data.address.city

        const openStore = format(response.data.data.open_store)
        const closeStore = format(response.data.data.close_store)
        store.value.open_store = openStore
        store.value.close_store = closeStore

        isLoadingPage.value = false
      })
}

function format(time) {
  const [hours, minutes] = time.split(':').slice(0, 2);
  return `${hours}:${minutes}`;
}

function useClickRedirectIndex() {
  router.push({
    name: 'index-stores',
  })
}

getInformationStore()

</script>