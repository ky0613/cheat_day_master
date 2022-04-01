import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startLatLng: [],
    destinationLatLng: [],
    wayPoints: [],
  },
  mutations: {
    setStartPosition(state, position) {
      state.startLatLng = position;
    },
    setDestinationPosition(state, position) {
      state.destinationLatLng = position;
    },
    setWaypointsPositions(state, positions) {
      let conversionWayPoint = {};
      for (let i = 0; i < positions.length; i++) {
        conversionWayPoint = {
          location: {
            lat: positions[i].lat,
            lng: positions[i].lng,
          },
          stopover: true,
        };
        state.wayPoints.push(conversionWayPoint);
      }
    },
  },
});
