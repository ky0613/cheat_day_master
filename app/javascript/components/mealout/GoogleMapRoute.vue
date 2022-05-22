<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div class="p-3 md:mt-5 mt-2">
      <p class="md:text-4xl text-xl font-bold">ルート検索結果</p>
      <p class="md:text-base text-xs">
        1店舗では物足りないと思うので勝手に経由地を追加しておきました。(S:現在地、D:目的地、数字:経由順)
      </p>
      <p class="md:text-base text-xs">
        余談ですが，このルートを歩いたら{{ burnedCalories }}kcal消費します。
      </p>
    </div>
    <div class="relative w-full pt-56.25">
      <div id="map" class="absolute w-full h-full top-0 left-0"></div>
    </div>
    <div class="p-3 mt-5">
      <p class="md:text-4xl text-xl font-bold">経由地の店舗情報</p>
      <p class="md:text-base text-xs">
        経由地に追加されなければ食べない可能性があったので、摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[0] }}
      </p>
    </div>
    <StoreDataCard
      v-if="wayPointsData.length !== 0"
      :way-point="true"
      :stores="wayPointsData"
    />
    <p v-else class="md:text-6xl text-xl font-bold text-center my-24">
      ごめんなさい，<br />お店が見つかりません。
    </p>
    <div class="p-3 mt-2">
      <p class="md:text-4xl text-xl font-bold">経由地以外の店舗情報</p>
      <p class="md:text-base text-xs">
        経由地以上に行かない可能性があったので、摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。むしろマイナスです。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[1] }}
      </p>
    </div>
    <StoreDataCard
      v-if="recommendStoresData.length !== 0"
      :stores="recommendStoresData"
      :per-page="3"
    />
    <p v-else class="md:text-6xl text-xl font-bold text-center my-24">
      ごめんなさい，<br />お店が見つかりません。
    </p>
    <div class="p-3 mt-2">
      <p class="md:text-4xl text-xl font-bold">
        ホットペッパーグルメの店舗情報
      </p>
      <p class="md:text-base text-xs">
        ホットもペッパーも辛そうなので，摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[2] }}
      </p>
    </div>
    <HotPepperGourmandStores
      v-if="hotPepperStores.length !== 0"
      :stores="hotPepperStores"
    />
    <div class="p-3 mt-2">
      <p class="md:text-3xl text-sm font-bold">Yelpの店舗情報</p>
      <p class="md:text-base text-xs">
        海外のサイトから取得したため「calorie」はありますが「カロリー」はありません。摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[3] }}
      </p>
    </div>
    <YelpStoreData v-if="yelpStores.length !== 0" :stores="yelpStores" />
    <p v-else class="md:text-6xl text-xl font-bold text-center my-24">
      ごめんなさい，<br />お店が見つかりません。
    </p>
    <div class="my-6 w-full text-center">
      <router-link
        :to="{ name: 'TopIndex' }"
        class="rounded-lg bg-orange-300 hover:bg-orange-400 text-center py-2 px-9"
        >ホームに戻る</router-link
      >
    </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { mapGetters } from "vuex";
import StoreDataCard from "../StoreDataCard.vue";
import HotPepperGourmandStores from "./HotPepperGourmandStores.vue";
import YelpStoreData from "./YelpStoreDataCard.vue";
import axios from "../../plugins/axios";

export default {
  components: {
    StoreDataCard,
    HotPepperGourmandStores,
    YelpStoreData,
  },
  data() {
    return {
      durationTime: null,
      digressions: [],
      yelpStores: [],
      hotPepperStores: [],
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
    burnedCalories() {
      return Math.trunc(1.05 * 3.5 * (this.durationTime / 3600) * 70);
    },
  },
  async mounted() {
    const self = this;

    const loader = new Loader({
      apiKey: process.env.API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let map;

    loader.load().then(() => {
      const google = window.google;
      const handleType =  window.innerWidth >= 768 ? "auto" : "greedy"
      map = new google.maps.Map(document.getElementById("map"), {
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: handleType,
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

    await this.fetchHotPepperStores();
    await this.fetchYelpStores();
    await this.fetchDigressions();
  },
  methods: {
    async fetchDigressions() {
      const response = await axios.get("digressions");
      let digressions = [];
      response.data.forEach((item) => {
        digressions.push(item.description);
      });
      this.digressions = digressions;
    },
    shuffle([...array]) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    async fetchHotPepperStores() {
      const { lat, lng } = this.destinationPositionData.latLng;
      const config = {
        params: {
          lat: String(lat),
          lng: String(lng),
        },
      };
      const response = await axios.get("hot_pepper_stores", config);
      let HotPepperStores = [];
      response.data.results.shop.map((store) => {
        let convertStore = {
          store_id: store.id,
          img_url: store.photo.pc.l,
          name: store.name,
          address: store.address,
          store_url: store.urls.pc,
          store_type: "HotPepper",
        };
        HotPepperStores.push(convertStore);
      });
      this.hotPepperStores = this.shuffle(HotPepperStores);
    },
    async fetchYelpStores() {
      const { lat, lng } = this.destinationPositionData.latLng;
      const config = {
        params: {
          lat: String(lat),
          lng: String(lng),
        },
      };
      const response = await axios.get("yelp_stores", config);
      let YelpStores = [];
      response.data.businesses.map((store) => {
        let convertStore = {
          store_id: store.id,
          img_url: store.image_url,
          name: store.alias,
          address: Object.values(store.location).splice(0, 3).join(" "),
          rating: store.rating,
          total_ratings: store.review_count,
          store_url: store.url,
          store_type: "Yelp",
        };
        YelpStores.push(convertStore);
      });
      this.yelpStores = YelpStores;
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
