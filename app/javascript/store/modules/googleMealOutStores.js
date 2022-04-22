const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
    commit("setWayPoints", shuffleWayPoints);
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
    commit(
      "setRecommendStores",
      notHotelPositions.sort((a, b) => (a.rating < b.rating ? 1 : -1))
    );
  },
};

const mutations = {
  setStartLatLng: (state, position) => (state.startLatLng = position),
  setDestinationLatLng: (state, position) =>
    (state.destinationLatLng = position),
  setWayPoints: (state, positions) => (state.wayPoints = positions),
  setRouteWayPoints: (state, positions) => (state.routeWayPoints = positions),
  setRecommendStores: (state, positions) => (state.recommendStores = positions),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
