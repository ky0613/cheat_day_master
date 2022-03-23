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

    let map, infoWindow;

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 18,
      });
      infoWindow = new google.maps.InfoWindow();

      const locationButton = document.createElement("button");

      locationButton.textContent = "現在地を取得";
      Object.assign(locationButton.style, {
        backgroundColor: "#fff",
        border: "0",
        borderRadius: "2px",
        boxShadow: "0 1px 4px -1px rgb(0 0 0 / 30%)",
        margin: "10px",
        padding: "0 0.5em",
        font: "400 18px Roboto, Arial, sans-serif",
        overflow: "hidden",
        height: "40px",
        cursor: "pointer",
      });
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent("現在地");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
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
