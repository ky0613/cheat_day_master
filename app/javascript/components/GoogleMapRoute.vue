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
    <StoreDataCard :stores="this.$store.state.wayPoints" />
    <RakutenDataCard :items="allItems" />
    <HotPepperGourmandStores :stores="allStores" />
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import StoreDataCard from "./StoreDataCard.vue";
import RakutenDataCard from "./RakutenDataCard.vue";
import HotPepperGourmandStores from "./HotPepperGourmandStores.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    StoreDataCard,
    RakutenDataCard,
    HotPepperGourmandStores,
  },
  data() {
    return {
      durationTime: null,
    };
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
        center: this.$store.state.startLatLng.latLng,
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

      const { latLng: startLatLng } = this.$store.state.startLatLng;
      const { latLng: destinationLatLng } = this.$store.state.destinationLatLng;

      let request = {
        origin: new google.maps.LatLng(startLatLng), // 出発地点
        destination: new google.maps.LatLng(destinationLatLng), // 待ち合わせ場所
        waypoints: this.$store.state.routeWayPoints,
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
  computed: {
    ...mapGetters(["allItems", "allStores"]),
    burnedCalories() {
      return Math.trunc(1.05 * 3.5 * (this.durationTime / 3600) * 60);
    },
  },
  created() {
    this.fetchItems();
    this.fetchStores(this.$store.state.destinationLatLng.latLng);
  },
  methods: {
    ...mapActions(["fetchItems", "fetchStores"]),
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
