<template>
  <div>
    <GoogleMap />
    <router-link
      :to="{ name: 'MealOutResult' }"
      class="rounded-full bg-blue-400 p-2"
    >
      ルートを検索する</router-link
    >
  </div>
</template>

<script>
import GoogleMap from "../../components/GoogleMap.vue";

export default {
  name: "MealOut",
  components: {
    GoogleMap,
  },
};
</script>
