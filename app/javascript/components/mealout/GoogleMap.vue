<template>
  <div>
    <div v-show="isLoading" class="h-80 w-auto">
      <LoadingPacmanPage class="bg-blend-darken" />
    </div>
    <div
      v-show="!isLoading"
      class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 w-full md:my-4 mt-12"
    >
      <transition>
        <div
          v-if="isStartModalShown"
          id="startPoint"
          class="fixed w-4/5 max-w-md m-auto opacity-100 rounded-sm z-1000 h-0 top-0 bottom-0 left-0 right-0"
        >
          <div
            class="p-3 text-center box-border bg-black opacity-70 text-white"
          >
            現在地点に設定しました
          </div>
        </div>
        <div
          v-if="isDestinationModalShown"
          id="destination"
          class="fixed w-4/5 max-w-md m-auto opacity-100 rounded-sm z-1000 h-0 top-0 bottom-0 left-0 right-0"
        >
          <div
            class="p-3 text-center box-border bg-black opacity-70 text-white"
          >
            行きたいお店に設定しました
          </div>
        </div>
      </transition>
      <div class="relative w-full md:h-auto h-96 pt-56.25">
        <div id="map" class="absolute w-full h-full top-0 left-0"></div>
        <input
          id="pac-input"
          class="md:text-base text-sm font-light mt-2 ml-2 md:w-60 w-30 md:h-8 h-6 truncate focus:border-blue-500 text-center rounded border-2 border-black"
          type="search"
          placeholder="検索"
        />
        <button
          id="locationButton"
          class="bg-orange-500 rounded-md text-white overflow-hidden md:h-8 h-6 cursor-pointer mt-2 mr-2 hover:bg-orange-300 px-3 py-1 md:text-lg text-sm"
        >
          現在地を取得
        </button>
      </div>
      <form class="w-full mt-3">
        <div class="flex items-center mb-6 mx-auto justify-center">
          <label class="text-gray-500 font-bold pr-4"> 現在地 </label>
          <input
            id="data-start-point-name"
            type="text"
            readonly="readonly"
            placeholder="マップから選択してください"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight min-w-250 text-center"
            :value="startPositionData.name"
          />
        </div>
        <div class="flex items-center mb-6 mx-auto justify-center">
          <label class="text-gray-500 font-bold pr-4"> 目的地 </label>
          <input
            id="data-destination-name"
            type="text"
            readonly="readonly"
            placeholder="マップから選択してください"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight min-w-250 text-center"
            :value="destinationPositionData.name"
          />
        </div>
        <div class="container mx-auto text-center">
          <span
            v-if="isValidation && validateSwitch"
            class="text-base text-red-500 justify-center"
            >現在地または目的地に地点が登録されていません。</span
          >
          <div class="flex flex-col mb-6 mt-6">
            <button
              id="getRoute"
              type="button"
              :disabled="isValidation"
              class="rounded-lg bg-orange-300 hover:bg-orange-400 disabled:bg-orange-200 text-center p-2 mb-3 mx-auto"
              @click="startLoading()"
            >
              ルートを検索する
            </button>
            <div class="mt-6">
              <router-link
                :to="{ name: 'TopIndex' }"
                class="rounded-lg bg-orange-300 hover:bg-orange-400 text-center p-2"
                >ホームに戻る</router-link
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { mapGetters, mapActions } from "vuex";
import LoadingPacmanPage from "../LoadingPacmanPage.vue";

export default {
  components: {
    LoadingPacmanPage,
  },
  data() {
    return {
      apiKey: process.env.API_KEY,
      isStartModalShown: false,
      isDestinationModalShown: false,
      wayPoints: [],
      validateSwitch: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("googleMealOutStores", [
      "startPositionData",
      "destinationPositionData",
    ]),
    isValidation() {
      return (
        Object.keys(this.startPositionData).length === 0 ||
        Object.keys(this.destinationPositionData).length === 0
      );
    },
  },
  mounted() {
    const self = this;
    function infoWindowContent(name, address) {
      const content =
        `<div>` +
        `<p>${name}</p>` +
        `<p>${address}</p>` +
        `<input type="button" value="現在地に設定" id="addStartPoint" href="#startPoint" class="rounded solid bg-blue-100 px-1 m-2" onclick="isOpenSetStartModal()">` +
        `<input type="button" value="行きたいお店に設定" id="addDestination" href="#destination" class="rounded solid bg-blue-100 px-1" onclick="isSetDestinationModal()">` +
        `</div>`;
      return content;
    }

    const loader = new Loader({
      apiKey: this.apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    let map;

    loader.load().then(() => {
      const google = window.google;
      const handleType = window.innerWidth >= 768 ? "auto" : "greedy";
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6581, lng: 139.7017 },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: handleType,
      });

      let service = new google.maps.places.PlacesService(map);

      ////////////////// 現在地取得ボタン作成 //////////////////
      const locationButton = document.getElementById("locationButton");
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

      // 現在地取得ボタンのクリックイベント
      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            new google.maps.Marker({
              map,
              position: pos, // 緯度軽度
              animation: google.maps.Animation.BOUNCE,
            });
            map.setCenter(pos);
            self.setStartPosition({
              name: "現在地情報を取得しました",
              latLng: pos,
            });
            self.isOpenSetStartModal();
          });
        } else {
          return false;
        }
      });
      ////////////////////////////////////////////////////

      ////////////////// 検索ボックス作成 //////////////////
      const input = document.getElementById("pac-input");
      const searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // 検索結果で表示範囲変更する
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
      let markers = [];
      // 検索で発火
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        // 古いマーカー削除
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < places.length; i++) {
          if (!places[i].geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          // マーカー作成
          let marker = new google.maps.Marker({
            map,
            title: places[i].name, // 名称
            position: places[i].geometry.location, // 緯度軽度
            address: places[i].formatted_address, // 住所
          });
          // infowindow表示内容
          const contentString = infoWindowContent(marker.title, marker.address);
          markers.push(new google.maps.Marker({ marker }));
          attachInfoWindow(marker, places, contentString, i);

          if (places[i].geometry.viewport) {
            bounds.union(places[i].geometry.viewport);
          } else {
            bounds.extend(places[i].geometry.location);
          }
        }
        map.fitBounds(bounds);
      });
      ////////////////////////////////////////////////////

      // Infowindowを１つのみ開くために設定
      let currentInfoWindow = null;
      // マップ上のデフォルトで表示されるアイコンをクリックすると発火
      map.addListener("click", function (argument) {
        if (argument.placeId) {
          let placeId = argument.placeId;
          service.getDetails(
            {
              placeId: placeId,
              fields: ["name", "formatted_address", "geometry"],
            },
            function (placeOnMap, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                let contentOnMap = infoWindowContent(
                  placeOnMap.name,
                  placeOnMap.formatted_address
                );
                let infowindow = new google.maps.InfoWindow({
                  content: contentOnMap,
                  position: argument.latLng,
                });
                if (currentInfoWindow) {
                  currentInfoWindow.close();
                }
                infowindow.open(map);
                currentInfoWindow = infowindow;
                let place = JSON.parse(JSON.stringify(placeOnMap));
                // HTMLのformに値を送信
                infowindow.addListener("domready", () => {
                  document
                    .getElementById("addStartPoint")
                    .addEventListener("click", () => {
                      self.setStartPosition({
                        name: place.name,
                        latLng: place.geometry.location,
                      });
                      currentInfoWindow.close();
                    });
                  document
                    .getElementById("addDestination")
                    .addEventListener("click", () => {
                      self.setDestinationPosition({
                        name: place.name,
                        latLng: place.geometry.location,
                      });
                      currentInfoWindow.close();
                    });
                });
              }
            }
          );
        }
      });

      // マップ上クリックでinfowindow閉じる
      google.maps.event.addListener(map, "click", function () {
        if (currentInfoWindow) currentInfoWindow.close();
      });
      // 検索結果のマーカークリックで発火
      function attachInfoWindow(marker, places, contentString) {
        let infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });
        marker.addListener("click", () => {
          if (currentInfoWindow) currentInfoWindow.close();
          infoWindow.open(marker.get("map"), marker);
          currentInfoWindow = infoWindow;
          const locationMarker = JSON.parse(JSON.stringify(marker.position));
          // HTMLのformに値を送信
          infoWindow.addListener("domready", () => {
            document
              .getElementById("addStartPoint")
              .addEventListener("click", () => {
                self.setStartPosition({
                  name: marker.title,
                  latLng: locationMarker,
                });
                currentInfoWindow.close();
              });
            document
              .getElementById("addDestination")
              .addEventListener("click", () => {
                self.setDestinationPosition({
                  name: marker.title,
                  latLng: locationMarker,
                });
                currentInfoWindow.close();
              });
          });
        });
      }
      document.getElementById("getRoute").addEventListener("click", () => {
        storeSearch();
        setTimeout(() => {
          self.isLoading = false;
          self.$router.push({ name: "MealOutResult" });
        }, 1000);
      });

      function storeSearch() {
        let radiusSearchRequest = {
          location: self.destinationPositionData.latLng,
          radius: 3000,
          type: ["food"],
          maxPriceLevel: 2,
        };
        service.nearbySearch(radiusSearchRequest, function (results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.map((result) => {
              const { photos } = result;
              if (photos && photos.length > 0)
                result.storePhoto = result.photos[0].getUrl();
              JSON.parse(JSON.stringify(result));
            });
            self.setWayPointPositions(results);
          }
        });
      }
    });
  },
  created() {
    window.isOpenSetStartModal = this.isOpenSetStartModal;
    window.isSetDestinationModal = this.isSetDestinationModal;
  },
  methods: {
    ...mapActions("googleMealOutStores", [
      "setStartPosition",
      "setDestinationPosition",
      "setWayPointPositions",
    ]),
    isOpenSetStartModal() {
      this.isStartModalShown = true;
      setTimeout(() => {
        this.isStartModalShown = false;
      }, 100);
    },
    isSetDestinationModal() {
      this.isDestinationModalShown = true;
      setTimeout(() => {
        this.isDestinationModalShown = false;
      }, 100);
    },
    startLoading() {
      this.isLoading = true;
    },
  },
};
</script>

<style scoped>
.v-leave-active {
  transition: opacity 2s;
}

.v-leave {
  opacity: 1;
}

.v-leave-to {
  opacity: 0;
}
</style>
