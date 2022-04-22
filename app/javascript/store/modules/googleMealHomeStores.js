const state = {
  currentLatLng: {},
  deliveryStores: [],
};

const getters = {
  currentPositionData: (state) => state.currentLatLng,
  deliveryStoresData: (state) => state.deliveryStores,
};

const actions = {
  setCurrentPosition({ commit }, position) {
    commit("setCurrentPosition", position);
  },
  setDeliveryStores({ commit }, positions) {
    const notHotelPositions = positions.filter((position) => {
      return position.name.match(/ホテル/) == null;
    });
    commit(
      "setDeliveryStores",
      notHotelPositions.sort((a, b) => (a.rating < b.rating ? 1 : -1))
    );
  },
};

const mutations = {
  setCurrentPosition: (state, position) => (state.currentLatLng = position),
  setDeliveryStores: (state, positions) => (state.deliveryStores = positions),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
