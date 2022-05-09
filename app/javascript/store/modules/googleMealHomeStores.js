const convertStoreData = (stores) => {
  let googleStores = [];
  stores.map((store) => {
    let convertStore = {
      store_id: store.place_id,
      img_url: store.storePhoto,
      name: store.name,
      address: store.vicinity,
      rating: store.rating,
      total_ratings: store.user_ratings_total,
      store_type: "Google",
    };
    googleStores.push(convertStore);
  });
  return googleStores;
};

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
        convertStoreData(notHotelPositions).sort((a, b) =>
          a.rating < b.rating ? 1 : -1
        )
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
