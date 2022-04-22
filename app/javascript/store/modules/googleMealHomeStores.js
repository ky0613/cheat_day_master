export default {
  namespaced: true,
  state: {
    currentLatLng: {},
    deliveryStores: [],
  },
  getters: {
    currentPositionData: (state) => state.currentLatLng,
    deliveryStoresData: (state) => state.deliveryStores,
  },
  actions: {
    setCurrentPosition: ({ commit }, position) => {
      commit("setCurrentPosition", position);
    },
    setDeliveryStores: ({ commit }, positions) => {
      const notHotelPositions = positions.filter((position) => {
        return position.name.match(/ホテル/) == null;
      });
      commit(
        "setDeliveryStores",
        notHotelPositions.sort((a, b) => (a.rating < b.rating ? 1 : -1))
      );
    },
  },
  mutations: {
    setCurrentPosition: (state, position) => (state.currentLatLng = position),
    setDeliveryStores: (state, positions) => (state.deliveryStores = positions),
    resetState: (state) => {
      state.currentLatLng = {};
      state.deliveryStores = [];
    },
  },
};
