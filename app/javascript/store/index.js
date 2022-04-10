import Vue from "vue";
import Vuex from "vuex";

import rakutenItems from "./modules/rakutenItems";
import hotPepperGourmandStores from "./modules/hotPepperGourmand";

Vue.use(Vuex);

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default new Vuex.Store({
  state: {
    startLatLng: {},
    destinationLatLng: {},
    routeWayPoints: [],
    wayPoints: [],
  },
  getters: {
    startPositionData: (state) => state.startLatLng,
    destinationPositionData: (state) => state.destinationLatLng,
  },
  mutations: {
    setStartPosition(state, position) {
      state.startLatLng = position;
    },
    setDestinationPosition(state, position) {
      state.destinationLatLng = position;
    },
    setWaypointsPositions(state, positions) {
      const shuffleWaypoints = shuffle(positions);
      let conversionWayPoint = {};
      for (let i = 0; i < 4; i++) {
        state.wayPoints.push(shuffleWaypoints[i]);
        conversionWayPoint = {
          location: shuffleWaypoints[i].geometry.location,
          stopover: true,
        };
        state.routeWayPoints.push(conversionWayPoint);
      }
    },
  },
  modules: {
    rakutenItems,
    hotPepperGourmandStores,
  },
});
