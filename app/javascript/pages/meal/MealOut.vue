<template>
  <div>
    <div class="flex justify-center mt-8">
      <div class="w-1/2 rounded overflow-hidden shadow-lg">
        <GoogleMap />
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
