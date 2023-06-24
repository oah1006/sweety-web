<template>
  <div class="min-h-screen">
    <Header />
    <div class="flex">
      <NavigationBar />
      <div class="ml-56 px-12 grow pt-28 bg-zinc-100 min-h-screen">
        <p class="px-12 py-4 text-4xl text-zinc-600 font-medium">Thống kê Doanh thu</p>
        <div class="flex ml-14 items-center">
          <div class="bg-cyan-500 px-2 py-1 rounded-lg text-white">
            Xuất thống kê
          </div>
          <div class="ml-auto flex gap-3 items-center">
            <div class="px-4 py-2 bg-white rounded-lg border border-zinc-300">
              Tất cả chi nhánh
            </div>
            <select class="form-select text-gray-700 bg-white border border-solid border-zinc-300 rounded" v-model="optionRevenue">
              <option value="7 days">7 ngày gần nhất</option>
              <option value="7 months">7 tháng gần nhất</option>
            </select>
          </div>
        </div>
        <div>
          <canvas class="!bg-white !px-10 my-10 ml-12" ref="chartCanvas"></canvas>
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
import {
  useIndexGetRevenueByDates,
  useIndexGetRevenueByLastSevenDates,
  useIndexGetRevenueByLastSevenDays,
  useIndexGetRevenueByLastSevenMonths
} from "@/repositories/dashboard";

const chartCanvas = ref(null);


const dataRevenueSevenDay = ref([])
const dataRevenueSevenMonth = ref([])
const dates = ref([])
const revenues = ref([])
const optionRevenue = ref('7 days')

watch(optionRevenue, getRevenueByDates, {immediate: true})

function createChart() {
  const ctx = chartCanvas.value.getContext('2d');

  const data = {
    labels: dates.value,
    datasets: [
      {
        label: 'Doanh thu',
        data: revenues.value,
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

function formatDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

function formatMonth(date) {
  const [year, month] = date.split('-');
  return `${month}-${year}`;
}

function getRevenueByDates() {
  useIndexGetRevenueByDates()
      .then((response) => {
        const dataType = response.data

        for (const key in dataType) {
          if (key == '7 days') {
            dataRevenueSevenDay.value = dataType[key]
          } else if (key == '7 months') {
            dataRevenueSevenMonth.value = dataType[key]
          }
        }

        dates.value = []
        revenues.value = []

        if (optionRevenue.value == '7 days') {
          dataRevenueSevenDay.value.forEach((item) => {
            const formattedDate = formatDate(item.date);
            dates.value.push(formattedDate);
            revenues.value.push(item.revenue)
          })
        } else if (optionRevenue.value == '7 months') {
          dataRevenueSevenMonth.value.forEach((item) => {
            const formattedMonth = formatMonth(item.month);
            dates.value.push(formattedMonth);
            revenues.value.push(item.revenue)
          })
        }

        createChart()
      })
}




</script>