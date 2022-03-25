<template>
  <div>
    <div class="wrap">
      <div class="modalBox" id="startPoint">
        <div class="modalInner">現在地点に設定しました</div>
      </div>
      <div class="modalBox" id="destination">
        <div class="modalInner">行きたいお店に設定しました</div>
      </div>
    </div>
    <div class="map_wrapper">
      <div id="map" class="map"></div>
      <input
        id="pac-input"
        class="controls ignore-enterkey"
        type="text"
        placeholder="検索"
      />
    </div>
    <form class="w-full max-w mt-3">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            現在地
          </label>
        </div>
        <div class="md:w-1/2">
          <input
            type="text"
            id="data-start-point-name"
            readonly="readonly"
            placeholder="マップから選択してください"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
          />
          <input type="hidden" id="data-start-point-location" />
          <input type="hidden" id="data-start-point-address" />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          >
            行きたいお店
          </label>
        </div>
        <div class="md:w-1/2">
          <input
            type="text"
            id="data-destination-name"
            readonly="readonly"
            placeholder="マップから選択してください"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
          />
          <input type="hidden" id="data-destination-location" />
          <input type="hidden" id="data-destination-address" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyBe69s9_xYPZtwWPCUykqCP2qpimoGwfwg",
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

      ////////////////// 現在地ボタン作成 //////////////////
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

      // 位置情報ボタンのクリックイベント
      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
            document.getElementById("data-start-point-name").value =
              "現在地情報を取得しました";
            document.getElementById(
              "data-start-point-location"
            ).value = `(${pos.lat}, ${pos.lng})`;
            document.getElementById("data-start-point-address").value = null;
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
          const contentString =
            `<div id="ababab">` +
            `<p>${marker.title}</p>` +
            `<p>${marker.address}</p>` +
            `<input type="button" value="現在地に設定" id="addStartPoint"  href="#startPoint" class="border-solid bg-gray-400">` +
            `<input type="button" value="行きたいお店に設定" id="addDestination" href="#destination">` +
            `</div>`;
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

      // Infowindowを１つのみ開くために設定
      let currentInfoWindow = null;
      // マップ上のデフォルトで表示されるアイコンをクリックすると発火
      map.addListener("click", function (argument) {
        if (argument.placeId) {
          let placeId = argument.placeId;
          let service = new google.maps.places.PlacesService(map);
          service.getDetails(
            {
              placeId: placeId,
              fields: ["name", "formatted_address", "geometry"],
            },
            function (placeOnMap, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                let contentOnMap =
                  `<div id="ababab">` +
                  `<p>${placeOnMap.name}</p>` +
                  `<p>${placeOnMap.formatted_address}</p>` +
                  `<input type="button" value="現在地に設定" id="addStartPoint" href="#startPoint" class="rounded solid bg-blue-100 px-1 m-2">` +
                  `<input type="button" value="行きたいお店に設定" id="addDestination" href="#destination" class="rounded solid bg-blue-100 px-1">` +
                  `</div>`;
                let infowindow = new google.maps.InfoWindow({
                  content: contentOnMap,
                  position: argument.latLng,
                });
                if (currentInfoWindow) {
                  currentInfoWindow.close();
                }
                infowindow.open(map);
                currentInfoWindow = infowindow;
                // HTMLのformに値を送信
                infowindow.addListener("domready", () => {
                  document
                    .getElementById("addStartPoint")
                    .addEventListener("click", () => {
                      document.getElementById("data-start-point-name").value =
                        placeOnMap.name;
                      document.getElementById(
                        "data-start-point-location"
                      ).value = placeOnMap.geometry.location;
                      document.getElementById(
                        "data-start-point-address"
                      ).value = placeOnMap.formatted_address;
                    });
                  document
                    .getElementById("addDestination")
                    .addEventListener("click", () => {
                      document.getElementById("data-destination-name").value =
                        placeOnMap.name;
                      document.getElementById(
                        "data-destination-location"
                      ).value = placeOnMap.geometry.location;
                      document.getElementById(
                        "data-destination-address"
                      ).value = placeOnMap.formatted_address;
                    });
                });
              }
            }
          );
        }
      });
      // マップ上クリックでinfowindow閉じる
      google.maps.event.addListener(map, "click", function () {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
      });
      // 検索結果のマーカークリックで発火
      function attachInfoWindow(marker, places, contentString) {
        let infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });
        marker.addListener("click", () => {
          if (currentInfoWindow) {
            currentInfoWindow.close();
          }
          infoWindow.open(marker.get("map"), marker);
          currentInfoWindow = infoWindow;
          // HTMLのformに値を送信
          infoWindow.addListener("domready", () => {
            document
              .getElementById("addStartPoint")
              .addEventListener("click", () => {
                document.getElementById("data-start-point-name").value =
                  marker.title;
                document.getElementById("data-start-point-location").value =
                  marker.position;
                document.getElementById("data-start-point-address").value =
                  marker.address;
              });
            document
              .getElementById("addDestination")
              .addEventListener("click", () => {
                document.getElementById("data-destination-name").value =
                  marker.title;
                document.getElementById("data-destination-location").value =
                  marker.position;
                document.getElementById("data-destination-address").value =
                  marker.address;
              });
          });
        });
      }
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
  overflow: hidden;
  opacity: 1;
  display: none;
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
</style>
