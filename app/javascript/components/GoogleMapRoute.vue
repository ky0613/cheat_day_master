<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div>
      <h3>このルートを歩いたら{{ burnedCalories }}kcal消費します。</h3>
    </div>
    <div class="map_wrapper object-cover w-full h-64">
      <div id="map" class="map"></div>
    </div>
    <div class="p-6 flex justify-between">
      <div
        class="mx-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
        v-for="index of [...Array(4)]"
        :key="index"
      >
        <img
          class="object-cover object-center w-full h-56"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />
        <div class="px-6 py-4">
          <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
            店舗情報
          </h1>
          <p class="py-2 text-gray-700 dark:text-gray-400">すき家</p>
          <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 11H10V13H14V11Z" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
              />
            </svg>
            <h1 class="px-2 text-sm">URL</h1>
          </div>
          <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
              />
            </svg>
            <h1 class="px-2 text-sm">住所</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  data() {
    return {
      startLatLng: this.$store.state.startLatLng,
      destinationLatLng: this.$store.state.destinationLatLng,
      routeWayPoints: this.$store.state.routeWayPoints,
      waypoints: this.$store.state.wayPoints,
      durationTime: null,
      // レイアウト整形のため仮で指定
      // startLatLng: {
      //   lat: 35.6534925,
      //   lng: 139.6927441,
      // },
      // destinationLatLng: {
      //   lat: 35.6587729,
      //   lng: 139.7156104,
      // },
      // wayPoints: [
      //   {
      //     location: {
      //       lat: 35.6612139,
      //       lng: 139.7162296,
      //     },
      //     stopover: true,
      //   },
      //   {
      //     location: {
      //       lat: 35.66143479999999,
      //       lng: 139.7238296,
      //     },
      //     stopover: true,
      //   },
      // ],
    };
  },
  mounted() {
    const that = this;

    const loader = new Loader({
      apiKey: process.env.API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let map;

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(document.getElementById("map"), {
        center: this.startLatLng.latLng,
        zoom: 15,
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      let rendererOptions = {
        map: map,
        draggable: true,
      };

      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer(
        rendererOptions
      );

      directionsRenderer.setMap(map);

      let request = {
        origin: new google.maps.LatLng(this.startLatLng.latLng), // 出発地点
        destination: new google.maps.LatLng(this.destinationLatLng.latLng), // 待ち合わせ場所
        waypoints: this.routeWayPoints,
        optimizeWaypoints: true,
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
          that.durationTime = sum;
        });
    });
  },
  computed: {
    burnedCalories() {
      return Math.trunc(1.05 * 3.5 * (this.durationTime / 3600) * 60);
    },
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
