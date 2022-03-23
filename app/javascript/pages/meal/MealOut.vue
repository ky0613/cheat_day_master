<template>
  <div>
    <p>MealOut</p>
    <router-link :to="{ name: 'MealOut' }" class="rounded-full bg-blue-400 p-2">
      ルートを検索する</router-link
    >
  </div>
</template>

<script>
export default {
  name: "MealOut",
};
</script>
