<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div>
      <h1>1店舗では物足りないと思うので勝手に経由地を追加しておきました。</h1>
      <h3>
        余談ですが，このルートを歩いたら{{ burnedCalories }}kcal消費します。
      </h3>
    </div>
    <div class="map_wrapper object-cover w-full h-64">
      <div id="map" class="map"></div>
    </div>
    <StoreDataCard :stores="wayPointsData" :perPage="3" />
    <StoreDataCard :stores="recommendStoresData" :perPage="3" />
    <HotPepperGourmandStores :stores="allStores" />
    <YelpStoreData :stores="allYelpStores" />
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import StoreDataCard from "../StoreDataCard.vue";
import HotPepperGourmandStores from "./HotPepperGourmandStores.vue";
import YelpStoreData from "./YelpStoreDataCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    StoreDataCard,
    HotPepperGourmandStores,
    YelpStoreData,
  },
  data() {
    return {
      durationTime: null,
    };
  },
  computed: {
    ...mapGetters([
      "allItems",
      "allStores",
      "allYelpStores",
      "startPositionData",
      "destinationPositionData",
      "routeWayPointsData",
      "wayPointsData",
      "recommendStoresData",
    ]),
    burnedCalories() {
      return Math.trunc(1.05 * 3.5 * (this.durationTime / 3600) * 60);
    },
  },
  mounted() {
    const self = this;

    const loader = new Loader({
      apiKey: process.env.API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let map;

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      let rendererOptions = {
        map,
        draggable: true,
      };

      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer(
        rendererOptions
      );

      directionsRenderer.setMap(map);

      const startLatLng = self.startPositionData.latLng;
      const destinationLatLng = self.destinationPositionData.latLng;
      // const startLatLng = { lat: 35.6581, lng: 139.7017 };
      // const destinationLatLng = { lat: 35.6460739, lng: 139.7113368 };

      let request = {
        origin: new google.maps.LatLng(startLatLng), // 出発地点
        destination: new google.maps.LatLng(destinationLatLng), // 待ち合わせ場所
        waypoints: self.routeWayPointsData, // 経由地点
        travelMode: google.maps.DirectionsTravelMode.WALKING, // 移動手段
      };

      directionsService
        .route(request, function (response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(response);
          }
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          let route = response.routes[0];
          let sum = 0;
          for (let i = 0; i < route.legs.length; i++) {
            sum += route.legs[i].duration.value;
          }
          self.durationTime = sum;
        });
    });
  },
  created() {
    this.fetchStores(this.destinationPositionData.latLng);
    this.fetchYelpStores(this.destinationPositionData.latLng);
    // this.fetchStores({ lat: 35.6581, lng: 139.7017 });
    // this.fetchYelpStores({ lat: 35.6460739, lng: 139.7113368 });
  },
  methods: {
    ...mapActions(["fetchStores", "fetchYelpStores"]),
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
