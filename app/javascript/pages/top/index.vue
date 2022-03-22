<template>
  <div class="h-full flex justify-center items-center">
    <div class="text-center">
      <div class="mb-10">
        <h3 class="mb-3">外食でチートデイを楽しみたい方はこちら</h3>
        <router-link
          :to="{ name: 'MealOut' }"
          class="rounded-full bg-blue-400 p-2"
          >外食でチートデイ</router-link
        >
      </div>
      <div>
        <h3 class="mb-3">自宅でチートデイを楽しみたい方はこちら</h3>
        <router-link
          :to="{ name: 'MealHome' }"
          class="rounded-full bg-blue-400 p-2"
          >自宅でチートデイ</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopIndex",
};
</script>

<style scoped></style>
