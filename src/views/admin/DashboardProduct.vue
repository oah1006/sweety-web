<template>
  <div class="min-h-screen">
    <Header />
    <div class="flex">
      <NavigationBar />
      <div class="lg:ml-56 ml-0 w-full px-12 grow pt-28 bg-zinc-100 min-h-screen">
        <p class="px-12 py-4 text-4xl text-zinc-600 font-medium">Thống kê số lượng sản phẩm được bán</p>
        <div class="mx-12 px-10 py-5 flex items-center gap-4 bg-white">
          <input type="date" name="start_date" v-model="start_date" class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4"/>
          <input type="date" name="end_date" v-model="end_date" class="form-input mt-1 w-full text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 px-4"/>
        </div>
        <div class="flex ml-14 items-center">
          <div @click="exportExcelProductByInputDate" class="bg-cyan-500 px-2 py-1 rounded-lg text-white">
            Xuất thống kê
          </div>
          <div class="ml-auto flex gap-3 items-center">
            <select v-model="store_id" class="form-select text-gray-700 bg-white border border-solid border-zinc-300 rounded py-2 pr-8">
              <option disabled value="">Hãy chọn dưới đây</option>
              <option v-for="store in stores" :value="store.id" :key="store.id">{{ store.store_name }}</option>
            </select>
            <select class="form-select text-gray-700 bg-white border border-solid border-zinc-300 rounded" v-model="optionRevenue">
              <option value="7 days">7 ngày gần nhất</option>
              <option value="7 months">7 tháng gần nhất</option>
            </select>
          </div>
        </div>
        <div>
          <canvas class="!bg-white !px-10 my-10 ml-10 !w-[1020px]" ref="chartCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from "@/components/home/NavigationBar.vue";
import Header from "@/components/home/Header.vue"
import {onMounted, ref, watch} from 'vue';
import Chart from 'chart.js/auto';
import {exportProductByInputDate, exportRevenueByInputDate, useIndexGetProductByDates} from "@/repositories/dashboard";
import {useIndexStoreApi} from "@/repositories/store";

const chartCanvas = ref(null);

const dataProductSevenDay = ref([])
const dataProductSevenMonth = ref([])
const qty = ref([])
const product = ref([])
const optionRevenue = ref('7 days')

const stores = ref([])
const store_id = ref('')
const start_date = ref('')
const end_date = ref('')

const debounce = ref(0)

function createChart() {
  const ctx = chartCanvas.value.getContext('2d');

  const data = {
    labels: product.value,
    datasets: [
      {
        label: 'Số sản phẩm bán được',
        data: qty.value,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(202, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (chartCanvas.value.chart) {
    chartCanvas.value.chart.destroy();
  }

  chartCanvas.value.chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options,
  });
}

function filterData() {

  clearTimeout(debounce.value)

  debounce.value = setTimeout(() => {
    useIndexGetProductByDates(store_id.value)
        .then((response) => {
          const dataType = response.data

          for (const key in dataType) {
            if (key == '7 days') {
              dataProductSevenDay.value = dataType[key]
            } else if (key == '7 months') {
              dataProductSevenMonth.value = dataType[key]
            }
          }

          product.value = []
          qty.value = []

          if (optionRevenue.value == '7 days') {
            product.value = dataProductSevenDay.value.map(item => item.name)
            qty.value = dataProductSevenDay.value.map(item => item.qty)
          } else if (optionRevenue.value == '7 months') {
            product.value = dataProductSevenMonth.value.map(item => item.name)
            qty.value = dataProductSevenMonth.value.map(item => item.qty)
          }

          console.log(optionRevenue.value)

          createChart()
        })
  }, 400)
}

function getStores() {
  useIndexStoreApi()
      .then((response) => {
        stores.value = response.data.data.data
      })
}

getStores()


watch([store_id, optionRevenue], () => {
  filterData()
}, {immediate: true})


function exportExcelProductByInputDate() {
  exportProductByInputDate(start_date.value, end_date.value, store_id.value)
      .then((response) => {

      })
}

</script>