import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startLatLng: [],
    destinationLatLng: [],
  },
  mutations: {
    setStartPosition(state, position) {
      state.startLatLng = position;
    },
    setDestinationPosition(state, position) {
      state.destinationLatLng = position;
    },
  },
});
