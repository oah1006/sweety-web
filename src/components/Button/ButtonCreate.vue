<template>
  <button @click="clickRedirect" class="flex gap-3 items-center px-4 py-2 text-white text-center bg-orange-500 rounded-xl">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    <p>{{ props.textButton }}</p>
  </button>
</template>

<script setup>
  const props = defineProps({
    textButton: String,
  });

  const emits = defineEmits(['click-redirect'])

  function clickRedirect() {
    emits('click-redirect')
  }
</script>