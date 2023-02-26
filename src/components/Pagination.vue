<template>
    <div class="h-12 flex items-center justify-between px-4">
        <p class="text-zinc-400">Trước</p>
        <div class="flex gap-2 items-center">
            <input type="text" class="form-input w-7 px-2 py-0.5 text-center" />
            <p>/ 4</p>
        </div>
        <p class="text-zinc-400">Sau</p>
    </div>
</template>

<script setup>

const props = defineProps({
    total: Number
})

console.log(props.total)

</script>

