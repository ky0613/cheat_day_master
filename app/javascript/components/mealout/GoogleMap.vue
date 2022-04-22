<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 w-full my-4"
  >
    <transition>
      <div class="modalBox" id="startPoint" v-if="isStartModalShown">
        <div class="modalInner">現在地点に設定しました</div>
      </div>
      <div class="modalBox" id="destination" v-if="isDestinationModalShown">
        <div class="modalInner">行きたいお店に設定しました</div>
      </div>
    </transition>
    <div class="map_wrapper">
      <div id="map" class="map"></div>
      <input
        id="pac-input"
        class="controls ignore-enterkey"
        type="text"
        placeholder="検索"
      />
    </div>
    <form class="w-full mt-3">
      <div class="flex items-center mb-6 mx-auto justify-center">
        <label class="text-gray-500 font-bold pr-4"> 現在地 </label>
        <input
          type="text"
          id="data-start-point-name"
          readonly="readonly"
          placeholder="マップから選択してください"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight min-w"
          :value="startPositionData.name"
        />
      </div>
      <div class="flex items-center mb-6 mx-auto justify-center">
        <label class="text-gray-500 font-bold pr-4"> 目的地 </label>
        <input
          type="text"
          id="data-destination-name"
          readonly="readonly"
          placeholder="マップから選択してください"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight min-w"
          :value="destinationPositionData.name"
        />
      </div>
      <div class="container mx-auto">
        <div class="flex justify-center">
          <router-link
            :to="{ name: 'MealOutResult' }"
            class="rounded-full bg-blue-400 p-2 mb-3 text-center"
          >
            ルートを検索する</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      apiKey: process.env.API_KEY,
      isStartModalShown: false,
      isDestinationModalShown: false,
      wayPoints: [],
    };
  },
  computed: {
    ...mapGetters(["startPositionData", "destinationPositionData"]),
  },
  mounted() {
    const self = this;
    function infoWindowContent(name, address) {
      let content =
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
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6581, lng: 139.7017 },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      let service = new google.maps.places.PlacesService(map);

      ////////////////// 現在地取得ボタン作成 //////////////////
      const locationButton = document.createElement("button");
      locationButton.textContent = "現在地を取得";
      // 現在地ボタンのCSS
      Object.assign(locationButton.style, {
        appearance: "button",
        backgroundColor: "dimgray",
        border: "1px solid black",
        borderRadius: "2px",
        boxShadow: "0 1px 4px -1px rgb(0 0 0 / 30%)",
        margin: "10px",
        padding: "3px 11px 3px 13px",
        font: "400 15px Roboto, Arial, sans-serif",
        color: "white",
        overflow: "hidden",
        height: "30px",
        cursor: "pointer",
      });
      locationButton.addEventListener("mouseover", () => {
        Object.assign(locationButton.style, {
          backgroundColor: "white",
          color: "black",
        });
      });
      locationButton.addEventListener("mouseleave", () => {
        Object.assign(locationButton.style, {
          backgroundColor: "dimgray",
          color: "white",
        });
      });
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

      // 現在地取得ボタンのクリックイベント
      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
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
                    });
                  document
                    .getElementById("addDestination")
                    .addEventListener("click", () => {
                      self.setDestinationPosition({
                        name: place.name,
                        latLng: place.geometry.location,
                      });

                      let radiusSearchRequest = {
                        location: place.geometry.location,
                        radius: 3000,
                        type: ["food"],
                        maxPriceLevel: 2,
                      };

                      service.nearbySearch(
                        radiusSearchRequest,
                        function (results, status) {
                          if (
                            status == google.maps.places.PlacesServiceStatus.OK
                          ) {
                            results.map((result) => {
                              const { photos } = result;
                              if (photos && photos.length > 0)
                                result.storePhoto = result.photos[0].getUrl();
                              JSON.parse(JSON.stringify(result));
                            });
                            self.setWayPointPositions(results);
                          }
                        }
                      );
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
              });
            document
              .getElementById("addDestination")
              .addEventListener("click", () => {
                self.setDestinationPosition({
                  name: marker.title,
                  latLng: locationMarker,
                });

                let radiusSearchRequest = {
                  location: locationMarker,
                  radius: 3000,
                  type: ["food"],
                  maxPriceLevel: 2,
                };

                service.nearbySearch(
                  radiusSearchRequest,
                  function (results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                      results.map((result) => {
                        const { photos } = result;
                        if (photos && photos.length > 0)
                          result.storePhoto = result.photos[0].getUrl();
                        JSON.parse(JSON.stringify(result));
                      });
                      self.setWayPointPositions(results);
                    }
                  }
                );
              });
          });
        });
      }
    });
  },
  created() {
    window.isOpenSetStartModal = this.isOpenSetStartModal;
    window.isSetDestinationModal = this.isSetDestinationModal;
  },
  methods: {
    ...mapActions([
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

#pac-input {
  background-color: #fff;
  font-size: 15px;
  font-weight: 300;
  margin: 10px 0 0 10px;
  padding: 3px 8px 3px 13px;
  text-overflow: ellipsis;
  width: 230px;
  height: 30px;
}

#pac-input:focus {
  border-color: #4d90fe;
}

.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 300;
}

.min-w {
  min-width: 250px;
}

.modalBox {
  position: fixed;
  width: 85%;
  max-width: 420px;
  height: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  opacity: 1;
  border-radius: 3px;
  z-index: 1000;
}

.modalInner {
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

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
