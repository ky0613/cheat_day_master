<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div class="p-3">
      <p class="text-4xl font-bold">ルート検索結果</p>
      <p>
        1店舗では物足りないと思うので勝手に経由地を追加しておきました。(S:現在地、D:目的地、数字:経由順)
      </p>
      <p>
        余談ですが，このルートを歩いたら{{ burnedCalories }}kcal消費します。
      </p>
    </div>
    <div class="relative w-full pt-56.25">
      <div id="map" class="absolute w-full h-full top-0 left-0"></div>
    </div>
    <div class="p-3 mt-5">
      <p class="text-4xl font-bold">経由地の店舗情報</p>
      <p>
        経由地に追加されなければ食べない可能性があったので、こちらのお店で摂取したカロリーは<span
          class="text-3xl font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="this.allDescriptions" class="text-2xl font-bold">
        余談ですが，{{ allDescriptions[0] }}
      </p>
    </div>
    <StoreDataCard
      :wayPoint="true"
      v-if="wayPointsData.length !== 0"
      :stores="wayPointsData"
      :perPage="3"
    />
    <p class="text-6xl font-bold text-center my-24" v-else>
      ごめんなさい，<br />お店が見つかりません。
    </p>
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">経由地以外の店舗情報</p>
      <p>
        経由地以上に行かない可能性があったので、こちらのお店で摂取したカロリーは<span
          class="text-3xl font-bold"
          >0kcal</span
        >です。むしろマイナスです。
      </p>
      <p v-if="this.allDescriptions" class="text-2xl font-bold">
        余談ですが，{{ allDescriptions[1] }}
      </p>
    </div>
    <StoreDataCard
      v-if="recommendStoresData.length !== 0"
      :stores="recommendStoresData"
      :perPage="3"
    />
    <p class="text-6xl font-bold text-center my-24" v-else>
      ごめんなさい，<br />お店が見つかりません。
    </p>
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">ホットペッパーグルメの店舗情報</p>
      <p>
        ホットもペッパーも辛そうなので，こちらのお店で摂取したカロリーは<span
          class="text-3xl font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="this.allDescriptions" class="text-2xl font-bold">
        余談ですが，{{ allDescriptions[2] }}
      </p>
    </div>
    <HotPepperGourmandStores
      v-if="allStores.length !== 0"
      :stores="allStores"
    />
    <div class="p-3 mt-2">
      <p class="text-3xl font-bold">Yelpの店舗情報</p>
      <p>
        海外のサイトから取得したため「calorie」はありますが「カロリー」はありません。摂取カロリーは<span
          class="text-3xl font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="this.allDescriptions" class="text-2xl font-bold">
        余談ですが，{{ allDescriptions[3] }}
      </p>
    </div>
    <YelpStoreData v-if="allYelpStores.length !== 0" :stores="allYelpStores" />
    <p class="text-6xl font-bold text-center my-24" v-else>
      ごめんなさい，<br />お店が見つかりません。
    </p>
    <div class="my-6 w-full text-center">
      <router-link
        :to="{ name: 'TopIndex' }"
        @click.native="resetState()"
        class="rounded-full bg-orange-300 text-center py-2 px-9"
        >ホームに戻る</router-link
      >
    </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { mapGetters, mapActions } from "vuex";
import StoreDataCard from "../StoreDataCard.vue";
import HotPepperGourmandStores from "./HotPepperGourmandStores.vue";
import YelpStoreData from "./YelpStoreDataCard.vue";

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
    ...mapGetters(["allStores", "allYelpStores", "allDescriptions"]),
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
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      let rendererOptions = {
        map,
        draggable: true,
        suppressMarkers: true,
      };

      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer(
        rendererOptions
      );

      setMarker(
        self.startPositionData.latLng,
        "S",
        google.maps.Animation.BOUNCE
      );
      setMarker(
        self.destinationPositionData.latLng,
        "D",
        google.maps.Animation.BOUNCE
      );

      let index = 0;
      self.routeWayPointsData.forEach((waypoint) => {
        index++;
        setMarker(waypoint.location, String(index), google.maps.Animation.DROP);
      });

      function setMarker(position, label, animation) {
        new google.maps.Marker({
          map,
          position,
          label,
          animation,
        });
      }

      directionsRenderer.setMap(map);

      const startLatLng = self.startPositionData.latLng;
      const destinationLatLng = self.destinationPositionData.latLng;

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
    this.fetchHotPepperStores(this.destinationPositionData.latLng);
    this.fetchYelpStores(this.destinationPositionData.latLng);
    this.fetchDescriptions();
  },
  methods: {
    ...mapActions([
      "fetchHotPepperStores",
      "fetchYelpStores",
      "fetchDescriptions",
    ]),
    resetState() {
      this.$store.commit("googleMealOutStores/resetState");
      this.$store.commit("googleMealHomeStores/resetState");
      localStorage.removeItem("cheatDayMaster");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

p {
  font-family: "Yomogi", cursive;
}
</style>
