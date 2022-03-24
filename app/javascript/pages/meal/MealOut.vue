<template>
  <div>
    <div class="flex justify-center mt-8">
      <div class="w-8/12 rounded overflow-hidden shadow-lg">
        <GoogleMap />
        <div class="container mx-auto">
          <div class="flex justify-center">
            <router-link
              :to="{ name: 'MealOutResult' }"
              class="rounded-full bg-blue-400 p-2 mb-3 text-center"
            >
              ルートを検索する</router-link
            >
          </div>
        </div>
      </div>
    </div>
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
