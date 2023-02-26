<template>
    <div class="h-12 flex items-center justify-between px-4">
        <a class="text-zinc-400 cursor-pointer" @click="prePage">Trước</a>
        <div class="flex gap-2 items-center">
            <input type="text" class="form-input w-7 px-2 py-0.5 text-center" />
            <p>/ 4</p>
        </div>
        <a class="text-zinc-400 cursor-pointer" @click="nextPage">Sau</a>
    </div>
</template>

<script setup>

const props = defineProps({
    total: Number,
    per_page: Number,
    page: Number
})

const emits = defineEmits(['pre-page'])

function prePage() {
    emits('pre-page')
}

function nextPage() {
    emits('next-page')
}






</script>

