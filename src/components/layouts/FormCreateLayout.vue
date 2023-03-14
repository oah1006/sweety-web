<template>
  <div>
    <slot name="title"></slot>
    <form @submit.prevent="handleSubmit">
      <div class="bg-white w-full mt-5 rounded-lg shadow-md">
        <div class="border-b boder-gray-100 border-solid py-6">
          <div class="flex items-center gap-4 px-10">
            <p class="w-1/12">Email</p>
            <slot name="email-input"></slot>
          </div>
        </div>
        <div class="border-b boder-gray-100 border-solid py-6">
          <div class="flex items-center gap-4 px-10">
            <p class="w-1/12">Mật khẩu</p>
            <slot name="password-input"></slot>
          </div>
        </div>
        <div class="border-b boder-gray-100 border-solid py-6">
          <div class="flex items-center gap-4 px-10">
            <p class="w-1/12">Tên</p>
            <slot name="fullname-input"></slot>
          </div>
        </div>
        <div class="border-b boder-gray-100 border-solid py-6">
          <div class="flex items-center gap-4 px-10">
            <p class="w-1/12">Số điện thoại</p>
            <slot name="phone-input"></slot>
          </div>
        </div>
        <div class="border-b boder-gray-100 border-solid py-6">
          <div class="flex items-center gap-4 px-10">
            <p class="w-1/12">Địa chỉ</p>
            <slot name="address-input"></slot>
          </div>
        </div>
      </div>
      <div class="flex mt-4">
        <div class="flex items-center gap-3">
          <a class="font-medium text-lg inline-flex items-center rounded-md bg-white text-black px-4 py-2 shadow-lg hover:bg-zinc-50 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Danh sách nhân viên
          </a>
        </div>
        <div class="ml-auto">
          <button class="flex items-center gap-2 py-2 px-4 hover:bg-blue-400 bg-blue-500 rounded-lg text-white font-medium text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Xác nhận
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>

</script>