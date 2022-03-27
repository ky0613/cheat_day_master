<template>
  <div class="map_wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  mounted() {
    const loader = new Loader({
      apiKey: process.env.API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let map;

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6581, lng: 139.7017 },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
    });

    let renderOptions = {
      map: map,
      draggable: true,
      preserveViewport: true,
    };
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
