<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div class="p-3">
      <p class="text-4xl font-bold">ルート検索結果</p>
      <p>1店舗では物足りないと思うので勝手に経由地を追加しておきました。</p>
      <p>
        余談ですが，このルートを歩いたら{{ burnedCalories }}kcal消費します。
      </p>
    </div>
    <div class="map_wrapper object-cover w-full h-64">
      <div id="map" class="map"></div>
    </div>
    <div class="p-3 mt-5">
      <p class="text-4xl font-bold">経由地の店舗情報</p>
      <p>
        経由地に追加されなければ食べない可能性があったのでこちらのお店で摂取したカロリーは0kcalです。
      </p>
      <p>安心してお立ち寄りください。</p>
      <p v-if="allDigressions">
        余談ですが，{{ allDigressions[0].description }}
      </p>
    </div>
    <StoreDataCard :stores="wayPointsData" :perPage="3" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">経由地以外の店舗情報</p>
      <p>
        評価によって店舗情報を並び替えたタイミングでカロリーが抜け落ちてしまったので，<br />こちらのお店で摂取したカロリーは0kcalです。
      </p>
      <p>安心して食事をお楽しみください。</p>
      <p v-if="allDigressions">
        余談ですが，{{ allDigressions[1].description }}
      </p>
    </div>
    <StoreDataCard :stores="recommendStoresData" :perPage="3" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">ホットペッパーグルメから取得した店舗情報</p>
      <p>
        ホットもペッパーも辛そうなので，こちらのお店で摂取したカロリーは0kcalです。
      </p>
      <p>安心して食事をお楽しみください。</p>
      <p v-if="allDigressions">
        余談ですが，{{ allDigressions[2].description }}
      </p>
    </div>
    <HotPepperGourmandStores :stores="allStores" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">Yelpから取得した店舗情報</p>
      <p>
        海外のサイトから取得したので「calorie」はありますが「カロリー」はないと思われます。<br />こちらのお店で摂取したカロリーは0kcalです。
      </p>
      <p>安心して食事をお楽しみください。</p>
      <p v-if="allDigressions">
        余談ですが，{{ allDigressions[3].description }}
      </p>
    </div>
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
    ...mapGetters("googleMealOutStores", [
      "startPositionData",
      "destinationPositionData",
      "routeWayPointsData",
      "wayPointsData",
      "recommendStoresData",
    ]),
    ...mapGetters(["allItems", "allStores", "allYelpStores", "allDigressions"]),
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
    this.fetchDigressions();
    // this.fetchStores({ lat: 35.6581, lng: 139.7017 });
    // this.fetchYelpStores({ lat: 35.6460739, lng: 139.7113368 });
  },
  methods: {
    ...mapActions(["fetchStores", "fetchYelpStores", "fetchDigressions"]),
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
