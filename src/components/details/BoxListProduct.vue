<template>
  <div class="px-4 py-3 shadow-md rounded-md bg-white">
    <table class="bg-white rounded-lg">
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