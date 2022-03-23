<template>
  <div>
    <p>MealOut</p>
    <div class="map_wrapper">
      <div id="map" class="map"></div>
    </div>
    <router-link :to="{ name: 'MealOut' }" class="rounded-full bg-blue-400 p-2">
      ルートを検索する</router-link
    >
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "MealOut",
  mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyBe69s9_xYPZtwWPCUykqCP2qpimoGwfwg",
      version: "weekly",
    });

    let map;

    loader.load().then(() => {
      const google = window.google; //追加
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      console.log(map);
    });
  },
};
</script>

<style scoped>
.map_wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
