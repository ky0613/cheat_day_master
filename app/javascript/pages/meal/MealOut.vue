<template>
  <div>
    <p>MealOut</p>
    <TravelMap class="travel-map" />
    <router-link :to="{ name: 'MealOut' }" class="rounded-full bg-blue-400 p-2">
      ルートを検索する</router-link
    >
  </div>
</template>

<script>
import TravelMap from "../../components/TravelMap";

export default {
  name: "MealOut",
  components: {
    TravelMap,
  },
};
</script>

<style lang="scss" scoped>
.travel-map {
  height: 400px;
}
</style>
