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
          <div class="ml-auto flex gap-3">
            <div class="px-2 py-1 w-44 bg-white rounded-lg border border-zinc-300">
              Tất cả chi nhánh
            </div>
            <div class="px-2 py-1 w-44 bg-white rounded-lg border border-zinc-300">
              7 ngày gần nhất
            </div>
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
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');


  const data = {
    labels: ['12/06/2023', '13/06/2023', '14/06/2023', '15/06/2023', '16/06/2023', '17/06/2023', '18/06/2023'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [900, 200, 200, 400, 400, 600, 500],
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
        ],// Màu viền các cột
        borderWidth: 1, // Độ rộng viền các cột
      },
    ],
  };

  // Tùy chỉnh biểu đồ
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Tạo biểu đồ bar chart
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options,
  });
});


</script>