<template>
  <IndexLayout>
      <template #list-table>
          <ListTableLayout v-if="!isLoadingPage" :total="pagination.total" :last-page="pagination.lastPage" v-model:modelValue="page"
                           v-model:modelBoolean="isLoadingListTable" @get-data="getData" :listName="toppings"
                           name-page="namePage" @click-redirect-create="useClickRedirectCreate">
              <template #title>
                  <TitlePage title="Topping" subTitle="Chào mừng bạn đến với trang các Topping của cửa hàng!">
                      <template #button>
                          <Button textButton="Tạo mới" class="ml-auto" @click-redirect-create="useClickRedirectCreate" />
                      </template>
                  </TitlePage>
              </template>
              <template #box-filter>
                  <FilterLayout>
                      <template #filter>
                          <InputSearch :isLoadingListTable="isLoadingListTable"
                                       v-model:modalSearch="search" label="Tìm kiếm theo từ khóa" />
                      </template>
                  </FilterLayout>
              </template>
              <template #list-table-row-head>
                  <ListTableRow>
                      <template #table-column>
                          <ListTableColumn text="TÊN TOPPING" />
                          <ListTableColumn text="GIÁ TIỀN"/>
                          <ListTableColumn text="Xuất bản"/>
                          <ListTableColumn />
                      </template>
                  </ListTableRow>
              </template>
              <template #list-table-row-body>
                  <ListTableRow v-for="item in toppings" :key="item.id">
                      <template #table-column>
                          <ListTableColumn class="text-orange-500" :text="item.name" />
                          <ListTableColumn :text="formatPrice(item.price)" unit="đồng"  />
                          <ListTableColumnPublished :published="item.published" />
                          <ListTableColumnFunction @click-redirect-update="useClickRedirectUpdate" @click-redirect-detail="useClickRedirectDetail" :item-id="item.id"
                                                   @show-modal="showModal" />
                      </template>
                  </ListTableRow>
              </template>
          </ListTableLayout>
          <LoadingPage v-else />
      </template>
      <template #modal-delete>
          <ModalDelete v-if="isModal" @close="isModal = false" @delete-item="useDeleteTopping" :itemId="idTopping" />
      </template>
  </IndexLayout>
</template>

<script setup>
import IndexLayout from "@/components/layouts/IndexLayout.vue";
import TitlePage from "@/components/TitlePage.vue";
import InputSearch from "@/components/inputs/InputSearch.vue";
import FilterLayout from "@/components/layouts/FilterLayout.vue";
import SelectFilterPublished from "@/components/inputs/SelectFilterPublished.vue";
import ListTableLayout from "@/components/layouts/ListTableLayout.vue";
import ListTableColumnPublished from "@/components/table/ListTableColumnPublished.vue";
import Button from "@/components/Button/ButtonCreate.vue";
import ListTableColumn from "@/components/table/ListTableColumn.vue";
import ListTableRow from "@/components/table/ListTableRow.vue";
import ListTableColumnFunction from "@/components/table/ListTableColumnFunction.vue";


import {ref} from "vue";
import {useRouter} from "vue-router";
import {useDeleteToppingApi, useIndexToppingApi} from "@/repositories/topping";
import LoadingPage from "@/components/loadings/LoadingPage.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import {useDeleteStoreApi, useIndexStoreApi} from "@/repositories/store";
import {useToastStore} from "@/stores/toast";

const isModal = ref(false)
const idTopping = ref(null)

const router = useRouter()

const toppings = ref({})

const search = ref('')

const page = ref(1);

const isLoadingPage = ref(true)
const isLoadingListTable = ref(false)

const pagination = ref({
    total: null,
    lastPage: null
});

function getData() {
    useIndexToppingApi(page.value)
        .then((response) => {
            pagination.value.lastPage = response.data.data.last_page
            pagination.value.total = response.data.data.total

            toppings.value = response.data.data.data

            isLoadingPage.value = false
            isLoadingListTable.value = false
        })
}

getData()

function useClickRedirectCreate() {
    router.push({ name: 'create-topping' })
}

function useClickRedirectUpdate(id) {
    router.push({
        name: 'update-topping',
        params: {
            id: id
        }
    })
}

function useClickRedirectDetail(id) {
  router.push({
    name: 'detail-topping',
    params: {
      id: id
    }
  })
}

function formatPrice(price) {
    return price.toLocaleString("vi-VN")
}

function showModal(id) {
    isModal.value = true
    idTopping.value = id
}

function useDeleteTopping(id) {
  useDeleteToppingApi(id)
        .then((response) => {
            useToastStore().success('Xóa thành công', 3000)
            getData()
        })
}

const debounce = ref(0)

function filterData() {
    clearTimeout(debounce.value)

    debounce.value = setTimeout(() => {
        isLoadingListTable.value = true

        useIndexStoreApi(page.value, search.value)
            .then((response) => {
                toppings.value = response.data.data.data

                isLoadingListTable.value = false
            })
    }, 400)
}


</script>