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
          <BoxInputAddressLayout>
            <template #address>
              <BoxInputAddress name="Thành phố" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterProvince v-model:modelProvince="store.province" placeholder="Thành phố" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Quận" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterDistrict v-model:modelDistrict="store.district" v-model:modelProvince="store.province.code" placeholder="Quận" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Tên Phường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <SelectFilterWard v-model:modelWard="store.ward" v-model:modelDistrict="store.district.code" placeholder="Phường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Đường" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.street" placeholder="Đường" />
                </template>
              </BoxInputAddress>
              <BoxInputAddress name="Số nhà" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input>
                  <InputAddress v-model:modelAddress="store.house_number" placeholder="Số nhà" />
                </template>
              </BoxInputAddress>
            </template>
            <template #get-coordinates>
              <BoxGetCoordinates name="Tính tọa độ" border="border-b border-gray-100 border-solid" padding="py-6 px-10" flex="flex items-center gap-4" width="w-1/12">
                <template #input-long>
                  <InputLong placeholder="Kinh độ" :placeholder="store.long" v-model:modelLong="store.long" />
                </template>
                <template #input-lat>
                  <InputLat placeholder="Vĩ độ" :placeholder="store.lat" v-model:modelLat="store.lat"/>
                </template>
                <template #button-coordinates>
                  <ButtonLoadCoordinates :streetNumber="store.house_number" :street="store.street"
                                         :district="store.district.full_name" :province="store.province.full_name"
                                         v-model:modelPosition="store" />
                </template>
              </BoxGetCoordinates>
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
import BoxInputAddressLayout from "@/components/layouts/BoxInputAddressLayout.vue";
import BoxInputAddress from "@/components/layouts/BoxInputAddress.vue";
import BoxGetCoordinates from "@/components/inputs/BoxGetCoordinates.vue";
import InputLong from "@/components/inputs/InputLong.vue";
import InputLat from "@/components/inputs/InputLat.vue";
import ButtonLoadCoordinates from "@/components/Button/ButtonLoadCoordinates.vue";
import SelectFilterWard from "@/components/inputs/SelectFilterWard.vue";
import SelectFilterDistrict from "@/components/inputs/SelectFilterDistrict.vue";
import SelectFilterProvince from "@/components/inputs/SelectFilterProvince.vue";

import {ref} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast";
import { useGetStoreInformationApi, useUpdateStoreApi } from "@/repositories/store";
import {useProfileStore} from "@/stores/getMyProfile";


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
  ward: {
    code: '',
    full_name: ''
  },
  district: {
    code: '',
    full_name: ''
  },
  province: {
    code: '',
    full_name: ''
  },
  long: '',
  lat: ''
})

const id = route.params.id

const isLoadingPage = ref(true)

async function submit() {
  useUpdateStoreApi(store.value.store_name, store.value.open_store, store.value.close_store, store.value.street_number,
      store.value.street, store.value.ward.code, store.value.district.code, store.value.province.code,
      store.value.long, store.value.lat, id)
      .then((response) => {
        useToastStore().success('Cập nhật thành công', 3000)
        router.push({ name: 'index-stores' })
      })
      .catch((error) => {
      })
}
function getInformationStore() {
  useGetStoreInformationApi()
      .then((response) => {
        store.value.store_name = response.data.data.store_name
        store.value.house_number = response.data.data.address.street_number
        store.value.street = response.data.data.address.street

        store.value.ward.full_name = response.data.data.address.ward.full_name
        store.value.ward.code = response.data.data.address.ward.code

        store.value.district.full_name = response.data.data.address.district.full_name
        store.value.district.code = response.data.data.address.district.code

        store.value.province.full_name = response.data.data.address.province.full_name
        store.value.province.code = response.data.data.address.province.code
        store.value.long = response.data.data.address.long
        store.value.lat = response.data.data.address.lat

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