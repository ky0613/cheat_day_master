<template>
  <div class="map_wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  data() {
    return {
      startLatLng: this.$store.state.startLatLng,
      destinationLatLng: this.$store.state.destinationLatLng,
    };
  },
  mounted() {
    const loader = new Loader({
      apiKey: process.env.API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let map;
    console.log(this.startLatLng);
    console.log(this.destinationLatLng);

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6581, lng: 139.7017 },
        zoom: 15,
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      let rendererOptions = {
        map: map,
        draggable: true,
        preserveViewport: true,
      };

      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer(
        rendererOptions
      );

      directionsRenderer.setMap(map);

      let request = {
        origin: new google.maps.LatLng({
          lat: this.startLatLng[0],
          lng: this.startLatLng[1],
        }), // 出発地点
        destination: new google.maps.LatLng({
          lat: this.destinationLatLng[0],
          lng: this.destinationLatLng[1],
        }), // 待ち合わせ場所
        travelMode: google.maps.DirectionsTravelMode.WALKING, // 移動手段
      };

      directionsService.route(request, function (response, status) {
        console.log(response);
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setMap(map);
          directionsRenderer.setDirections(response);
        }
      });
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
