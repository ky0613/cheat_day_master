import axios from "../../plugins/axios";

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const state = {
  stores: [],
};

const getters = {
  allStores: (state) => state.stores,
};

const actions = {
  async fetchStores({ commit }, { lat, lng }) {
    const config = {
      params: {
        lat: String(lat),
        lng: String(lng),
      },
    };
    const response = await axios.get("hot_pepper_stores", config);
    commit("setStores", response.data.results.shop);
  },
};

const mutations = {
  setStores: (state, stores) => (state.stores = shuffle(stores)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
