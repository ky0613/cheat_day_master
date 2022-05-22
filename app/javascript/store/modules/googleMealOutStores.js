const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

const state = {
  startLatLng: {},
  destinationLatLng: {},
  routeWayPoints: [],
  wayPoints: [],
  recommendStores: [],
};

const getters = {
  startPositionData: (state) => state.startLatLng,
  destinationPositionData: (state) => state.destinationLatLng,
  routeWayPointsData: (state) => state.routeWayPoints,
  wayPointsData: (state) => state.wayPoints,
  recommendStoresData: (state) => state.recommendStores,
};

const mutations = {
  setStartLatLng: (state, position) => (state.startLatLng = position),
  setDestinationLatLng: (state, position) =>
    (state.destinationLatLng = position),
  setWayPoints: (state, positions) => (state.wayPoints = positions),
  setRouteWayPoints: (state, positions) => (state.routeWayPoints = positions),
  setRecommendStores: (state, positions) => (state.recommendStores = positions),
  resetState: (state) => {
    state.startLatLng = {};
    state.destinationLatLng = {};
    state.routeWayPoints = [];
    state.wayPoints = [];
    state.recommendStores = [];
  },
};

const actions = {
  setStartPosition({ commit }, position) {
    commit("setStartLatLng", position);
  },
  setDestinationPosition({ commit }, position) {
    commit("setDestinationLatLng", position);
  },
  setWayPointPositions({ commit }, positions) {
    const notHotelPositions = positions.filter((position) => {
      return position.name.match(/ホテル/) == null;
    });
    const shuffleWayPoints = shuffle(notHotelPositions.splice(0, 6));
    let points = [];
    shuffleWayPoints.map((waypoint) => {
      let convertWayPoint = {};
      convertWayPoint = {
        location: waypoint.geometry.location,
        stopover: true,
      };
      points.push(convertWayPoint);
    });

    commit("setRouteWayPoints", points);
    commit("setWayPoints", convertStoreData(shuffleWayPoints));
    commit(
      "setRecommendStores",
      convertStoreData(notHotelPositions).sort((a, b) =>
        a.rating < b.rating ? 1 : -1
      )
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
