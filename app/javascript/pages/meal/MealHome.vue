<template>
  <div>
    <p>MealHome</p>
    <router-link
      :to="{ name: 'MealHomeResult' }"
      class="rounded-full bg-blue-400 p-2"
      >食べ物を検索する</router-link
    >
  </div>
</template>

<script>
export default {
  name: "MealHomeResult",
};
</script>
