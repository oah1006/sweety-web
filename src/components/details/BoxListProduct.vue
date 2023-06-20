<template>
  <div class="my-6 shadow-md rounded-md bg-white lg:w-2/3 px-4">
    <table class="w-full bg-white rounded-lg">
      <thead class="uppercase rounded-lg">
        <slot name="list-table-row-head"></slot>
      </thead>
      <tbody>
        <slot name="list-table-row-body"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>

</script>