import Vue from "vue";
import Vuex from "vuex";

import items from "./modules/rakutenItems";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startLatLng: [],
    destinationLatLng: [],
    routeWayPoints: [],
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
      state.wayPoints = [];
      state.routeWayPoints = [];
      positions.sort((a, b) => (a.rating - b.rating) * -1);
      let conversionWayPoint = {};
      for (let i = 0; i < 4; i++) {
        state.wayPoints.push(positions[i]);
        conversionWayPoint = {
          location: positions[i].geometry.location,
          stopover: true,
        };
        state.routeWayPoints.push(conversionWayPoint);
      }
    },
  },
  modules: {
    items,
  },
});
