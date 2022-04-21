import Vue from "vue";
import Vuex from "vuex";

import rakutenItems from "./modules/rakutenItems";
import rakutenRecipes from "./modules/rakutenRecipes";
import hotPepperGourmandStores from "./modules/hotPepperGourmand";
import yelpStores from "./modules/yelpStores";

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
    recommendStores: [],
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
      const notHotelPositions = positions.filter((position) => {
        return position.name.match(/ホテル/) == null;
      });
      const shuffleWaypoints = shuffle(notHotelPositions);
      let conversionWayPoint = {};
      shuffleWaypoints.splice(0, 6).forEach((waypoint) => {
        state.wayPoints.push(waypoint);
        conversionWayPoint = {
          location: waypoint.geometry.location,
          stopover: true,
        };
        state.routeWayPoints.push(conversionWayPoint);
      });
      state.recommendStores = shuffleWaypoints.sort((a, b) =>
        a.rating < b.rating ? 1 : -1
      );
    },
  },
  modules: {
    rakutenItems,
    rakutenRecipes,
    hotPepperGourmandStores,
    yelpStores,
  },
});
