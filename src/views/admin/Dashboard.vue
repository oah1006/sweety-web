<template>
  <div class="min-h-screen">
    <Header />
    <div class="lg:flex">
      <NavigationBar />
      <div class="lg:ml-64 ml-0 lg:px-12 px-2 lg:grow pt-28 bg-zinc-100 min-h-screen">
        <p class="lg:px-12 py-4 text-4xl text-zinc-600 font-medium">Dashboard</p>
        <div class="lg:px-12 lg:grid lg:grid-cols-3 lg:gap-4">
          <div class="px-4 py-3 rounded-lg bg-white mb-4 lg:mb-0">
            <div class="flex">
              <div class="relative ml-auto px-3 py-1 border border-zinc-300 ml-auto">
                <div @click="showPopup" class="flex gap-2 items-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                  <p class="text-sm">{{ label }}</p>
                </div>
                <div v-if="isPopup" class="text-sm bg-white border border-zinc-300 absolute top-8 left-0 w-28 px-4 py-1">
                  <p @click="filterRevenue('day now')" class="cursor-pointer">Hôm nay</p>
                  <p @click="filterRevenue('month now')" class="mt-1 cursor-pointer">Tháng này</p>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="mx-auto bg-red-500 w-20 h-20 flex items-center justify-center rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" w-10 h-10 text-white">
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd" />
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <p class="text-3xl mt-4 font-medium">{{ formatPrice(parseInt(labelRevenue)) }} đồng</p>
              <p class="font-medium text-lg text-zinc-600">Tổng doanh thu</p>
            </div>
            <div class="flex">
              <div class="ml-auto mt-5 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-400">
                  <path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z" clip-rule="evenodd" />
                </svg>
                <p class="text-red-400">Tăng {{ labelPercentRevenue }} %</p>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 rounded-lg bg-white mb-4 lg:mb-0">
            <div class="lg:flex">
              <div class="relative w-28 ml-auto px-3 py-1 border border-zinc-300">
                <div @click="showPopupOrder" class="flex gap-2 items-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                  <p class="text-sm">{{ labelFilterOrder }}</p>
                </div>
                <div v-if="isPopupOrder" class="text-sm bg-white border border-zinc-300 absolute top-8 left-0 w-28 px-4 py-1">
                  <p @click="filterOrder('day now')" class="cursor-pointer">Hôm nay</p>
                  <p @click="filterOrder('month now')" class="mt-1 cursor-pointer">Tháng này</p>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="bg-cyan-500 w-20 h-20 flex items-center justify-center rounded-full mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white">
                  <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <p class="text-3xl mt-4 font-medium">{{ totalOrder.totalOrder }}</p>
              <p class="font-medium text-lg text-zinc-600">Tổng hóa đơn</p>
            </div>
          </div>
          <div class="rounded-lg bg-white flex flex-col items-center justify-center mb-4 lg:mb-0 py-4 lg:py-0">
            <div class="flex">
              <div class="bg-cyan-500 w-20 h-20 flex items-center justify-center rounded-full mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white">
                  <path fill-rule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="text-center">
              <p class="text-3xl mt-2 font-medium">{{ totalProduct }}</p>
              <p class="font-medium text-lg text-zinc-600">Tổng sản phẩm</p>
            </div>
          </div>
        </div>
        <div class="lg:flex gap-10 mt-10 lg:ml-12 lg:mr-12">
          <div class="bg-white lg:w-1/3 px-4 py-5 mb-4 lg:mb-0">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500">
                <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
              </svg>
              <p class="font-medium text-lg">Các sản phẩm bán chạy</p>
            </div>
            <div v-for="product in bestSellerProduct" :key="product.id" class="mt-4">
              <div class="flex items-center gap-3">
                <img :src="product.attachment[0].url" class="rounded-lg w-20 h-20 object-cover"/>
                <div>
                  <p class="text-zinc-700 font-medium text-lg">{{ product.name }}</p>
                  <p class="text-red-500">{{ formatPrice(product.price) }} đồng</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-2/3 lg:flex lg:items-center lg:gap-20 bg-white px-10 lg:ml-auto">
            <div class="py-5">
              <p class="font-medium text-lg">Các trạng thái đơn hàng</p>
              <div class="mt-4">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-orange-500"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng đang xác nhận <span>({{ countStatus[0] }})</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-red-400"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng đã từ chối <span>({{ countStatus[1] }})</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-cyan-500"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng đã xác nhận <span>({{ countStatus[2] }})</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-yellow-700"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng đang chuẩn bị <span>({{ countStatus[3] }})</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-yellow-500"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng chuẩn bị xong <span>({{ countStatus[4] }})</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-purple-500"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng đang vận chuyển <span>({{ countStatus[5] }})</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-cyan-500"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng thành công <span>({{ countStatus[6] }})</span></p>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-black"></div>
                  <p class="mt-1 text-zinc-600">Đơn hàng thất bại <span>({{ countStatus[7] }})</span></p>
                </div>
              </div>
            </div>
            <canvas ref="myChart" class="!w-56 !h-56"></canvas>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import NavigationBar from '../../components/home/NavigationBar.vue'
import Header from '../../components/home/Header.vue'
import {
  useIndexGetBestSellerProductDashboardApi,
  useIndexGetRevenueDashboardApi,
  useIndexGetTotalOrderDashboardApi,
  useIndexGetTotalProductDashboardApi
} from "@/repositories/dashboard";

import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';


const label = ref('Hôm nay')

const labelRevenue = ref('');
const labelPercentRevenue = ref('')

const dataRevenue = ref({
  revenueToday: '',
  revenueYesterday: '',
  revenueNowMonth: '',
  revenuePreviousMonth: '',
  percentChangeDay: '',
  percentChangeMonth: ''
})

const totalOrder = ref({

})

const countStatus = ref([])

const labelFilterOrder = ref('Hôm nay')

const labelOrder = ref('');

const totalProduct = ref('')

const bestSellerProduct = ref({})

const isPopup = ref(false)
const isPopupOrder = ref(false)

function showPopup() {
  isPopup.value = !isPopup.value
}

function formatPrice(price) {
  return price?.toLocaleString("vi-VN")
}

function getRevenue() {
  useIndexGetRevenueDashboardApi()
      .then((response) => {
        dataRevenue.value = response.data
        labelRevenue.value = dataRevenue.value.revenueToday
        labelPercentRevenue.value = dataRevenue.value.percentChangeDay
      })
}

function filterRevenue(filter = 'day now') {
  if (filter === 'day now') {
    labelRevenue.value = dataRevenue.value.revenueToday
    labelPercentRevenue.value = dataRevenue.value.percentChangeDay
    isPopup.value = false
    label.value = 'hôm nay'
  } else if (filter === 'month now') {
    labelRevenue.value = dataRevenue.value.revenueNowMonth
    labelPercentRevenue.value = dataRevenue.value.percentChangeMonth
    isPopup.value = false
    label.value = 'tháng này'
  }
}

getRevenue()

function getTotalProduct() {
  useIndexGetTotalProductDashboardApi()
      .then((response) => {
        totalProduct.value = response.data.totalProducts
      })
}

getTotalProduct()


Chart.register(...registerables);

const chartData = ref({})
const myChart = ref(null);



function getTotalOrder() {
  useIndexGetTotalOrderDashboardApi()
      .then((response) => {
        totalOrder.value = response.data

        countStatus.value = response.data.countStatus

        chartData.value = {
          datasets: [{
            data: response.data.countStatus,
            backgroundColor: [
              '#f97316',
              '#dc2626',
              '#06b6d4',
              '#a16207',
              '#eab308',
              '#8b5cf6',
              '#22c55e',
              '#030712',
            ],
            hoverOffset: 4
          }],
        }

        const chartOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        };

        const ctx = myChart.value.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: chartData.value,
          options: chartOptions,
        });
      })
}

getTotalOrder()

function showPopupOrder() {
  isPopupOrder.value = !isPopupOrder.value
}

function filterOrder(filter = 'day now') {
  if (filter === 'day now') {
    labelOrder.value = totalOrder.value.totalOrderToday
    isPopupOrder.value = false
    labelFilterOrder.value = 'hôm nay'
  } else if (filter === 'month now') {
    labelOrder.value = totalOrder.value.totalOrderMonth
    isPopupOrder.value = false
    labelFilterOrder.value = 'tháng này'
  }
}

function getBestSellerProduct() {
  useIndexGetBestSellerProductDashboardApi()
      .then((response) => {
        bestSellerProduct.value = response.data.data
      })
}

getBestSellerProduct()

console.log(process.env.VUE_APP_ENV_VARIABLE, process.env.BASE_URL)
</script>
