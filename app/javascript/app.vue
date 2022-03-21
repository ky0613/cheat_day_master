<template>
  <div id="app">
    <div class="text-red-800">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "Hello Vue!",
    };
  },
};
</script>

<style scoped></style>
