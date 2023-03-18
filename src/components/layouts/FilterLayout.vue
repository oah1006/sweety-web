<template>
  <div class="border border-zinc-50 shadow bg-white mt-4 px-4 py-6 rounded-lg">
    <div>
      <div class="grid grid-cols-3 items-center gap-10">
        <div>
          <slot name="input-search"></slot>
        </div>
        <div>
          <slot name="select-role"></slot>
        </div>
        <div>
          <slot name="select-status"></slot>
        </div>
      </div>
    </div>
    <div class="flex mt-4 gap-4">
      <button @click="resetListEmployees" class="px-4 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-300">Reset tìm kiếm</button>
    </div>
  </div>
</template>